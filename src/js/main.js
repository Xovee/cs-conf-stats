document.addEventListener('DOMContentLoaded', (event) => {
  // select conference
  const dropdowns = document.querySelectorAll('select');
  const curConfSelection = document.getElementById('cur-conf');

  const loadingMessage = document.getElementById("loadingMessage");

  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('change', (event) => {
      const selectedValue = event.target.value;
      curConfSelection.textContent = `${selectedValue}`;

      document.querySelectorAll('select').forEach(function(otherDropdwon) {
        if (otherDropdwon !== dropdown) {
          otherDropdwon.querySelectorAll('option').forEach(function(option) {
            option.removeAttribute('selected');
          });
          otherDropdwon.querySelector('option').setAttribute('selected', 'selected');
        }
      });

      displayConfMetadata(selectedValue);

    });
  });

  // display conf stats
  fetch('../../data/conf.json')
    .then(response => response.json())
    .then(data => {

      const selectedConf = document.getElementById('cur-conf');

      loadingMessage.classList.add('hidden');

      function displayConfMetadata(conferenceSeries) {
        const statsDiv = document.getElementById('stats-card-container');
        const conference = data.conferences.find(c => c.series === conferenceSeries);

        if (conference) {
          const main_discipline = conference.metadata.main_discipline.map(discipline => `
          <span class="card-tag">${discipline}</span>
          `).join("");
          const other_discipline = conference.metadata.other_discipline.map(discipline => `
          <span class="card-tag-2">${discipline}</span>
          `).join("");

          let cards = `
            <div class="conf-card">
              <div class="conf-card-title">${conference.series}</div>
              <div class="conf-card-desc">${conference.metadata.series_full_title}</div>
            </div>
          `;

          if (conference.metadata.main_discipline && conference.metadata.main_discipline.length > 0) {
            cards += `
              <div class="conf-card">
                <div class="conf-card-title">Main Discipline</div>
                <div class="conf-card-desc">${main_discipline}</div>
            </div>
            `;
          }

          if (conference.metadata.other_discipline && conference.metadata.other_discipline.length > 0) {
            cards += `
              <div class="conf-card">
                <div class="conf-card-title">Other Discipline</div>
                <div class="conf-card-desc">${other_discipline}</div>
              </div>
            `
          }

          if (conference.metadata.parent_org && conference.metadata.parent_org.length > 0) {
            cards += `
              <div class="conf-card">
                <div class="conf-card-title">Parent Organization</div>
                <div class="conf-card-desc">${conference.metadata.parent_org}</div>
              </div>
            `;
          }

          if (conference.metadata.website && conference.metadata.website.length > 0) {
            cards += `
              <div class="conf-card">
                <div class="conf-card-title">Website</div>
                <div class="conf-card-desc"><a href="${conference.metadata.website}" target="_blank">${conference.metadata.website}</a></div>
              </div>
            `;
          }

          if (conference.metadata.proceedings && conference.metadata.proceedings.length > 0) {
            cards += `
              <div class="conf-card">
                <div class="conf-card-title">Proceedings</div>
                <div class="conf-card-desc"><a href="${conference.metadata.proceedings}" target="_blank">${conference.metadata.proceedings}</a></div>
              </div>
            `;
          }


          statsDiv.innerHTML = cards;

          // prepare plot data
          const years = conference.yearly_data.map(d => d.year);
          const ordinals = conference.yearly_data.map(d => d.ordinal);
          const num_acc = conference.yearly_data.map(d => d.main_track.num_acc);
          const num_sub = conference.yearly_data.map(d => d.main_track.num_sub);
          const acc_rate = conference.yearly_data.map(d => (d.main_track.num_acc / d.main_track.num_sub) * 100);
          const locations = conference.yearly_data.map(d => d.location);

          const confPlot = echarts.init(document.getElementById('plot-area'));

          const isMobile = window.innerWidth <= 768;
          const dataZoom = {
            show: false,
            id: 'dataZoomX',
            type: 'slider',
            xAxisIndex: [0],
            filterMode: 'empty',
            endValue: 0,
            zoomLock: true,
            brushSelect: false
          };

          if (isMobile && years.length > 10) {
            dataZoom.show = true;
            dataZoom.startValue = 10;
          } else if (!isMobile && years.length >= 30) {
            dataZoom.show = true;
            dataZoom.startValue = 30;
          }

          const option = {
            dataZoom: dataZoom,
            xAxis: {
              type: 'category',
              data: years,
              axisLabel: {
                textStyle: {
                  fontSize: 14
                }
              },
              inverse: true
            },
            yAxis: [
              {
                type: 'value',
                axisLabel: {
                  textStyle: {
                    fontSize: 14
                  },
                },
                position: 'left'
              },
              {
                type: 'value',
                position: 'right',
                axisLabel: {
                  textStyle: {
                    fontSize: 14
                  },
                  formatter: function (value) {
                    return value + '%';
                  }
                },
                splitLine: {
                  show: false
                }
              }
            ],
            legend: {
              data: ["Number of Submissions", "Acceptance Rate"],
              top: 'top'
            },
            series: [
              {
                name: 'Number of Submissions',
                data: num_sub,
                type: 'bar',
                itemStyle: {
                  color: '#004098'
                },
                barWidth: '60%',
                label: {
                  show: true,
                  position: 'top',
                  textStyle: {
                    fontSize: 14,
                    color: '#333'
                  }
                }
              },
              {
                name: 'Acceptance Rate',
                type: 'line',
                yAxisIndex: 1,
                data: acc_rate,
                symbolSize: 7,
                itemStyle: {
                  // color: '#F08300',
                  color: '#00409880',
                  borderColor: '#F08300',
                  borderWidth: 3
                },
                emphasis: {
                  scale: true
                },
                lineStyle: {
                  width: 3
                }
              }
            ],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              },
              borderColor: '#333',
              borderWidth: 1,
              textStyle: {
                color: '#004098',
                align: 'left'
              },
              formatter: function(params) {
                const year = params[0].name;
                const numSub = params[0].value;
                const accRate = params[1].value;
                const numAcc = num_acc[years.indexOf(parseInt(year, 10))];
                const location = locations[years.indexOf(parseInt(year, 10))];
                const ordinal = ordinals[years.indexOf(parseInt(year, 10))];
                return `<div class="text-left">
                    <div class="flex justify-between">
                      <span>Year: </span>
                      <span class="ml-2 text-uestc_orange">${year} (${ordinal})</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Number of Accepted: </span>
                        <span class="ml-2 text-uestc_orange">${numAcc}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Number of Submissions: </span>
                        <span class="ml-2 text-uestc_orange">${numSub}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Acceptance Rate: </span>
                        <span class="ml-2 text-uestc_orange">${accRate.toFixed(1)}%</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Conference Location: </span>
                        <span class="ml-2 text-uestc_orange">${location}</span>
                    </div>
                </div>`
              }
            },
          };

          confPlot.setOption(option);

          window.addEventListener('resize', function() {
            confPlot.resize();
          });
        }
      }

      // display init conference
      displayConfMetadata(selectedConf.textContent);

      window.displayConfMetadata = displayConfMetadata;

    });
});
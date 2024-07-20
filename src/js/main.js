document.addEventListener('DOMContentLoaded', (event) => {
  // select conference
  const dropdowns = document.querySelectorAll('select');
  const curConfSelection = document.getElementById('cur-conf');

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


  // define plot resize
  function setChartSize(xAxisData) {
    const container = document.getElementById('plot-area');
    const screenWidth = window.innerWidth;

    if (screenWidth < 768) {
      container.style.width = `100%`;
    } else {
      const dataLength = xAxisData.length;
      if (dataLength < 5) {
        container.style.width = '400px';
      } else if (dataLength < 10) {
        container.style.width = '800px';
      } else {
        container.style.width = '100%';
      }
    }
  }

  // display conf stats
  fetch('../../data/conf.json')
    .then(response => response.json())
    .then(data => {

      const statsDiv = document.getElementById('stats-card-container');
      const selectedConf = document.getElementById('cur-conf');
      const plotDiv = document.getElementById('plot-area');

      function displayConfMetadata(conferenceSeries) {
        const conference = data.conferences.find(c => c.series === conferenceSeries);
        if (conference) {
          const main_discipline = conference.metadata.main_discipline.map(discipline => `
          <span class="card-tag">${discipline}</span>
          `).join("");
          const other_discipline = conference.metadata.other_discipline.map(discipline => `
          <span class="card-tag-2">${discipline}</span>
          `).join("")

          const cards = `
            <div class="conf-card">
              <div class="conf-card-title">${conference.series}</div>
              <div class="conf-card-desc">${conference.metadata.series_full_title}</div>
            </div>
            <div class="conf-card">
              <div class="conf-card-title">Main Discipline</div>
              <div class="conf-card-desc">${main_discipline}</div>
            </div>
            <div class="conf-card">
              <div class="conf-card-title">Other Discipline</div>
              <div class="conf-card-desc">${other_discipline}</div>
            </div>
            <div class="conf-card">
              <div class="conf-card-title">Parent Organization</div>
              <div class="conf-card-desc">${conference.metadata.parent_org}</div>
            </div>
            <div class="conf-card">
              <div class="conf-card-title">Website</div>
              <div class="conf-card-desc"><a href="${conference.metadata.website}" target="_blank">${conference.metadata.website}</a></div>
            </div>
          `;

          statsDiv.innerHTML = cards;

          // prepare plot data
          const years = conference.yearly_data.map(d => d.year);
          const num_sub = conference.yearly_data.map(d => d.main_track.num_sub);
          const acc_rate = conference.yearly_data.map(d => (d.main_track.num_acc / d.main_track.num_sub) * 100);

          setChartSize(years);

          const confPlot = echarts.init(plotDiv)

          const option = {

            xAxis: {
              type: 'category',
              data: years,
              axisLabel: {
                textStyle: {
                  fontSize: 14
                }
              }
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
              top: 'bottom'
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
                  color: '#F08300',
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
                return `<div class="text-left">
                    <div class="flex justify-between">
                      <span>Year: </span>
                      <span class="ml-5">${year}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Acceptance Rate: </span>
                        <span class="ml-5">${accRate}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Number of Submissions: </span>
                        <span class="ml-5">${numSub}</span>
                    </div>
                </div>`


                // 'Year: ' + year + '<br/>' +
                //   'Number of Submissions: ' + numSub + '<br/>'
              }
            },
          };

          confPlot.setOption(option);

          window.addEventListener('resize', function() {
            setChartSize(years);
            confPlot.resize();
          });
        }
      }

      // display init conference
      displayConfMetadata(selectedConf.textContent);

      window.displayConfMetadata = displayConfMetadata;

    });
});
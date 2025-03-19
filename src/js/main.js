document.addEventListener('DOMContentLoaded', (event) => {
  // select conference
  const dropdowns = document.querySelectorAll('select');
  const curConfSelection = document.getElementById('cur-conf');
  const loadingMessage = document.getElementById("loadingMessage");

  function updateUrl(conference) {
    history.pushState({ conf: conference }, '', '?conf=' + encodeURIComponent(conference));
  }

  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('change', (event) => {
      const selectedValue = event.target.value;
      curConfSelection.textContent = selectedValue;

      dropdowns.forEach(otherDropdown => {
        if (otherDropdown !== dropdown) {
          otherDropdown.value = "";
        }
      });

      updateUrl(selectedValue);
      displayConfMetadata(selectedValue);

    });
  });

  function updateDropdownSelection(confValue) {
    let found = false;
    dropdowns.forEach(dropdown => {
      for (let i = 0; i < dropdown.options.length; i++) {
        if (dropdown.options[i].value === confValue) {
          dropdown.value = confValue;
          found = true;
          dropdown.dispatchEvent(new Event('change'));
          break;
        }
      }
    });
    return found;
  }

  // display conf stats
  fetch('/data/conf.json')
    .then(response => response.json())
    .then(data => {
      loadingMessage.classList.add('hidden');

      function displayConfMetadata(conferenceSeries) {
        const statsDiv = document.getElementById('stats-card-container');
        const conference = data.conferences.find(c => c.series === conferenceSeries);

        if (!conference) {
          statsDiv.innerHTML = `<p>No data available for ${conferenceSeries}</p>`;
          return;
        }

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

        // prepare plot data
        // main research track
        const mainTrackData = conference.yearly_data.map(d => ({
          year: d.year,
          ordinal: d.ordinal,
          num_acc: d.main_track.num_acc, 
          num_rej: d.main_track.num_sub - d.main_track.num_acc,
          num_sub: d.main_track.num_sub,
          acc_rate: (d.main_track.num_acc / d.main_track.num_sub) * 100,
          location: d.location,
          note: d.note
        }));
        
        let secondTrackData = [];
        if (conference.metadata.second_track_name) {
          secondTrackData = conference.yearly_data
              .filter(d => d.second_track && d.second_track.num_acc > 0)
              .map(d => ({
            year: d.year,
            ordinal: d.ordinal,
            num_acc: d.second_track.num_acc,
            num_rej: d.second_track.num_sub - d.second_track.num_acc,
            num_sub: d.second_track.num_sub,
            acc_rate: (d.second_track.num_acc / d.second_track.num_sub) * 100,
            location: d.location,
            note: d.note || ''
          }));
        }

        const sortedMainTrackData = mainTrackData.sort((a, b) => b.year - a.year);
        const yearsToConsider = Math.min(sortedMainTrackData.length, 5);
        const recentYearsData = sortedMainTrackData.slice(0, yearsToConsider);
        const recentAccRate = recentYearsData.reduce((acc, d) => acc + d.acc_rate, 0) / recentYearsData.length;

        if (conference.yearly_data && conference.yearly_data.length > 0) {
          cards += `
            <div class="conf-card">
              <div class="conf-card-title">Acceptance Rate</div>
              <div class="conf-card-desc">Average acceptance rate in recent ${yearsToConsider} confrence: ${recentAccRate.toFixed(2)}%</div>
            </div>
          `;
        }

        if (conference.metadata.note && conference.metadata.note.length > 0) {
          cards += `
            <div class="conf-card">
              <div class="conf-card-title">Note</div>
              <div class="conf-card-desc">${conference.metadata.note}</div>
            </div>
          `;
        }

        statsDiv.innerHTML = cards;

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

        const option = {
          dataZoom: dataZoom,
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
            top: 'top'
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {
                show: true
              }
            }
          },
          series: [],
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
              const trackData = (currentTrack === 'mainTrack') ? mainTrackData : secondTrackData;
              const dataIndex = params[0].dataIndex;
              const numRej = params[1].value;
              const numAcc = params[0].value;
              const numSub = trackData[dataIndex].num_sub;
              const accRate = params[2].value;
              const location = trackData[dataIndex].location;
              const ordinal = trackData[dataIndex].ordinal;
              const note = trackData[dataIndex].note;
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
                      <span>Number of Rejected: </span>
                      <span class="ml-2 text-uestc_orange">${numRej}</span>
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
                  ${note ? `<div class="flex justify-between">
                      <span>Note: </span>
                      <span class="ml-2 text-uestc_orange">${note}</span>
                  </div>` : ''}
              </div>`
            }
          },
        };

        function updateChart(trackData, title) {

          if (isMobile && trackData.length > 10) {
            dataZoom.show = true;
            dataZoom.startValue = 10;
          } else if (!isMobile && trackData.length >= 30) {
            dataZoom.show = true;
            dataZoom.startValue = 30;
          }

          option.xAxis = [
            {
              type: 'category',
              data: trackData.map(d => d.year),
              axisLabel: {
                textStyle: {
                  fontSize: 14
                }
              },
              inverse: true
            }
          ]
          option.series = [
            {
              name: "Number of Accepted",
              data: trackData.map(d => d.num_acc),
              type: 'bar',
              stack: 'paper',
              itemStyle: {
                color: '#F08300'
              }
              // barWidth: '60%'
            },
            {
              name: 'Number of Rejected',
              data: trackData.map(d => d.num_rej),
              type: 'bar',
              stack: 'paper',
              itemStyle: {
                color: '#004098'
              }
            },
            {
              name: 'Acceptance Rate',
              type: 'line',
              yAxisIndex: 1,
              data: trackData.map(d => d.acc_rate),
              symbolSize: 7,
              itemStyle: {
                color: '#F08300',
                borderColor: '#222',
                borderWidth: 3
              },
              emphasis: {
                scale: true
              },
              lineStyle: {
                width: 3
              }
            }
          ];

          confPlot.setOption(option);
        }

        updateChart(mainTrackData, "Research Track")

        let secondTrackName = '';

        if (secondTrackData.length > 0) {
          secondTrackName = conference.metadata.second_track_name;
        }

        const trackButtons = document.getElementById('track-buttons');

        if (secondTrackName) {
          trackButtons.innerHTML = `
            <label class=""><input type="radio" name="track" value="mainTrack" onclick="showTrack('mainTrack')" checked><span class="mx-2">Research Track</span></label>
            <label class=""><input type="radio" name="track" value="secondTrack" onclick="showTrack('secondTrack')"><span class="mx-2">${secondTrackName}</span></label>
            `;
        } else {
          trackButtons.innerHTML = '';
        }

        let currentTrack = 'mainTrack';

        window.showTrack = function(track) {
          currentTrack = track;
          if (track === 'mainTrack') {
            updateChart(mainTrackData, "Research Track");
          } else {
            updateChart(secondTrackData, secondTrackName);
          }
        };

        window.addEventListener('resize', function() {
          confPlot.resize();
        });
      }

      window.displayConfMetadata = displayConfMetadata;

      const params = new URLSearchParams(window.location.search);
      const conferenceFromUrl = params.get('conf');
      if (conferenceFromUrl) {
        curConfSelection.textContent = conferenceFromUrl;
        if (!updateDropdownSelection(conferenceFromUrl)) {
          displayConfMetadata(conferenceFromUrl);
        }
      } else {
        displayConfMetadata(curConfSelection.textContent);
      }
    });

  window.onpopstate = function(event) {
    if (event.state && event.state.conf) {
      const newConf = event.state.conf;
      curConfSelection.textContent = newConf;
      if (!updateDropdownSelection(newConf)) {
        displayConfMetadata(newConf);
      }
    }
  };

});

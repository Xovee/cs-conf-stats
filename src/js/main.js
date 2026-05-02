document.addEventListener('DOMContentLoaded', (event) => {
  // Debounce function to limit resize event firing
  function debounce(fn, delay = 250) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  }
  
  // select conference
  const dropdowns = Array.from(document.querySelectorAll('select'));
  const curConfSelection = document.getElementById('cur-conf');
  const conferenceSearch = document.getElementById('conference-search');
  const conferenceOptions = document.getElementById('conference-options');
  const conferencePickerForm = document.getElementById('conference-picker-form');
  const categoryTabs = document.getElementById('category-tabs');
  const categoryConferenceButtons = document.getElementById('category-conference-buttons');
  const loadingMessage = document.getElementById("loadingMessage");
  const plotArea = document.getElementById('plot-area');
  let confPlot = null;
  let activeCategorySelectId = 'dropdown-ai';

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[char]));
  }

  function asArray(value) {
    if (Array.isArray(value)) {
      return value;
    }
    if (value === undefined || value === null || value === '') {
      return [];
    }
    return [value];
  }

  function renderTags(values, className) {
    return asArray(values)
      .map(value => `<span class="${className}">${escapeHTML(value)}</span>`)
      .join("");
  }

  function renderTextValue(value) {
    return escapeHTML(asArray(value).join(", "));
  }

  function renderLinks(value) {
    const rawValue = asArray(value).join(" ");
    const urls = Array.from(new Set(rawValue.match(/https?:\/\/[^\s"'<>]+/g) || []));

    if (urls.length === 0) {
      return escapeHTML(rawValue.replace(/<[^>]+>/g, ''));
    }

    return urls
      .map(url => `<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(url)}</a>`)
      .join("<br>");
  }

  function formatNumber(value) {
    return Number(value).toLocaleString('en-US');
  }

  function renderSubmissionTrendCard(yearlyData) {
    const recentEvents = asArray(yearlyData)
      .filter(event => Number.isFinite(event.main_track?.num_sub) && event.main_track.num_sub > 0)
      .sort((a, b) => b.year - a.year)
      .slice(0, 5);

    if (recentEvents.length < 2) {
      return '';
    }

    const latest = recentEvents[0];
    const baseline = recentEvents[recentEvents.length - 1];
    const latestSubmissions = latest.main_track.num_sub;
    const baselineSubmissions = baseline.main_track.num_sub;
    const delta = latestSubmissions - baselineSubmissions;
    const percentChange = delta / baselineSubmissions;
    const sign = delta >= 0 ? '+' : '-';
    const changeLabel = `${sign}${Math.abs(percentChange * 100).toFixed(1)}%`;
    const deltaLabel = `${sign}${formatNumber(Math.abs(delta))}`;

    return `
      <div class="conf-card conf-card-trend">
        <div class="conf-card-title">Submission Trend</div>
        <div class="conf-card-big-desc">${changeLabel}</div>
        <div class="conf-card-desc">Last ${recentEvents.length} conferences (${escapeHTML(baseline.year)}-${escapeHTML(latest.year)}): ${formatNumber(baselineSubmissions)} &rarr; ${formatNumber(latestSubmissions)} submissions (${deltaLabel}).</div>
      </div>
    `;
  }

  window.addEventListener('resize', debounce(() => {
    if (confPlot) {
      confPlot.resize();
    }
  }, 250));

  // helper to update URL
  function updateUrl(conference) {
    history.pushState({ conf: conference }, '', '?conf=' + encodeURIComponent(conference));
  }

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

  // disable dropdowns until data loads
  dropdowns.forEach(dropdown => {
    dropdown.disabled = true;
  });

  // display conf stats
  fetch('./data/conf.json')
    .then(response => response.json())
    .then(data => {
      dropdowns.forEach(dropdown => {
        dropdown.disabled = false;
      });
      loadingMessage.classList.add('hidden');

      const dropdownAll = document.getElementById('dropdown-all');
      dropdownAll.replaceChildren(new Option('', '', true, true));
      dropdownAll.options[0].disabled = true;

      const sortedConferences = data.conferences
        .filter(c => c.series !== 'Template')
        .sort((a, b) => a.series.localeCompare(b.series));

      const categorySelects = dropdowns.filter(dropdown => dropdown.id !== 'dropdown-all');
      const conferenceByLower = new Map(sortedConferences.map(conference => [
        conference.series.toLowerCase(),
        conference.series
      ]));
      const eventCount = sortedConferences.reduce((total, conference) => total + conference.yearly_data.length, 0);

      const heroConfCount = document.getElementById('hero-conf-count');
      const heroEventCount = document.getElementById('hero-event-count');
      if (heroConfCount) heroConfCount.textContent = sortedConferences.length.toLocaleString();
      if (heroEventCount) heroEventCount.textContent = eventCount.toLocaleString();

      function getCategoryLabel(dropdown) {
        const label = document.querySelector(`label[for="${dropdown.id}"]`);
        return (label ? label.textContent : dropdown.id.replace('dropdown-', '')).trim();
      }

      function findCategorySelectId(conferenceSeries) {
        const select = categorySelects.find(dropdown =>
          Array.from(dropdown.options).some(option => option.value === conferenceSeries)
        );
        return select ? select.id : '';
      }

      function renderCategoryTabs() {
        if (!categoryTabs) return;

        const tabs = categorySelects.map(dropdown => {
          const button = document.createElement('button');
          button.type = 'button';
          button.className = `category-tab${dropdown.id === activeCategorySelectId ? ' is-active' : ''}`;
          button.dataset.selectId = dropdown.id;
          button.textContent = getCategoryLabel(dropdown);
          button.title = document.querySelector(`label[for="${dropdown.id}"]`)?.title || button.textContent;
          return button;
        });

        categoryTabs.replaceChildren(...tabs);
      }

      function renderConferenceButtons(selectId, selectedConference = curConfSelection.textContent) {
        if (!categoryConferenceButtons) return;

        const dropdown = document.getElementById(selectId);
        if (!dropdown) return;

        activeCategorySelectId = selectId;
        const buttons = Array.from(dropdown.options)
          .filter(option => option.value)
          .map(option => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `conference-choice${option.value === selectedConference ? ' is-active' : ''}`;
            button.dataset.selectId = selectId;
            button.dataset.conf = option.value;
            button.textContent = option.textContent;
            return button;
          });

        categoryConferenceButtons.replaceChildren(...buttons);
      }

      function syncPickerUI(conferenceSeries) {
        if (conferenceSearch && document.activeElement !== conferenceSearch) {
          conferenceSearch.value = conferenceSeries;
        }

        const categorySelectId = findCategorySelectId(conferenceSeries) || activeCategorySelectId;
        activeCategorySelectId = categorySelectId;
        renderCategoryTabs();
        renderConferenceButtons(categorySelectId, conferenceSeries);
      }

      function chooseConference(rawValue) {
        const query = String(rawValue || '').trim();
        if (!query) return;

        const normalizedQuery = query.toLowerCase();
        const matchedConference = conferenceByLower.get(normalizedQuery)
          || sortedConferences.find(conference => conference.series.toLowerCase().startsWith(normalizedQuery))?.series
          || sortedConferences.find(conference => {
            const title = asArray(conference.metadata.series_full_title).join(' ');
            return `${conference.series} ${title}`.toLowerCase().includes(normalizedQuery);
          })?.series;

        if (!matchedConference) {
          conferenceSearch.value = curConfSelection.textContent;
          return;
        }

        curConfSelection.textContent = matchedConference;
        if (!updateDropdownSelection(matchedConference)) {
          updateUrl(matchedConference);
          displayConfMetadata(matchedConference);
        }
      }

      if (conferenceOptions) {
        const datalistOptions = sortedConferences.map(conference => {
          const option = document.createElement('option');
          option.value = conference.series;
          option.label = asArray(conference.metadata.series_full_title).join(", ");
          return option;
        });
        conferenceOptions.replaceChildren(...datalistOptions);
      }

      if (conferencePickerForm) {
        conferencePickerForm.addEventListener('submit', event => {
          event.preventDefault();
          chooseConference(conferenceSearch.value);
        });
      }

      if (conferenceSearch) {
        conferenceSearch.addEventListener('change', () => chooseConference(conferenceSearch.value));
      }

      if (categoryTabs) {
        categoryTabs.addEventListener('click', event => {
          const button = event.target.closest('button[data-select-id]');
          if (!button) return;
          renderConferenceButtons(button.dataset.selectId);
          renderCategoryTabs();
        });
      }

      if (categoryConferenceButtons) {
        categoryConferenceButtons.addEventListener('click', event => {
          const button = event.target.closest('button[data-conf]');
          if (!button) return;

          const dropdown = document.getElementById(button.dataset.selectId);
          if (!dropdown) return;

          dropdown.value = button.dataset.conf;
          dropdown.dispatchEvent(new Event('change'));
        });
      }

      sortedConferences.forEach(conference => {
        const option = document.createElement('option');
        option.value = conference.series;
        option.textContent = `${conference.series}`;
        dropdownAll.appendChild(option);
      });

      function displayConfMetadata(conferenceSeries) {
        const statsDiv = document.getElementById('stats-card-container');
        const conference = data.conferences.find(c => c.series === conferenceSeries);

        if (!conference) {
          statsDiv.innerHTML = `<p>No data available for ${escapeHTML(conferenceSeries)}</p>`;
          return;
        }

        const main_discipline = renderTags(conference.metadata.main_discipline, 'card-tag');
        const other_discipline = renderTags(conference.metadata.other_discipline, 'card-tag-2');

        let cards = `
          <div class="conf-card">
            <div class="conf-card-title">${escapeHTML(conference.series)}</div>
            <div class="conf-card-desc">${escapeHTML(conference.metadata.series_full_title)}</div>
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
              <div class="conf-card-desc">${renderTextValue(conference.metadata.parent_org)}</div>
            </div>
          `;
        }

        if (conference.metadata.website && conference.metadata.website.length > 0) {
          cards += `
            <div class="conf-card">
              <div class="conf-card-title">Website</div>
              <div class="conf-card-desc">${renderLinks(conference.metadata.website)}</div>
            </div>
          `;
        }

        if (conference.metadata.proceedings && conference.metadata.proceedings.length > 0) {
          cards += `
            <div class="conf-card">
              <div class="conf-card-title">Proceedings</div>
              <div class="conf-card-desc">${renderLinks(conference.metadata.proceedings)}</div>
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

        const sortedMainTrackData = mainTrackData.slice().sort((a, b) => b.year - a.year);
        const yearsToConsider = Math.min(sortedMainTrackData.length, 5);
        const recentYearsData = sortedMainTrackData.slice(0, yearsToConsider);
        const recentAccRate = recentYearsData.reduce((acc, d) => acc + d.acc_rate, 0) / recentYearsData.length;

        if (conference.yearly_data && conference.yearly_data.length > 0) {
          cards += `
            <div class="conf-card">
              <div class="conf-card-title">Acceptance Rate</div>
              <div class="conf-card-desc">Average acceptance rate in recent ${yearsToConsider} conferences: ${recentAccRate.toFixed(2)}%</div>
            </div>
          `;

          cards += renderSubmissionTrendCard(conference.yearly_data);
        }

        if (conference.metadata.note && conference.metadata.note.length > 0) {
          cards += `
            <div class="conf-card">
              <div class="conf-card-title">Note</div>
              <div class="conf-card-desc">${escapeHTML(conference.metadata.note)}</div>
            </div>
          `;
        }

        statsDiv.innerHTML = cards;

        if (!confPlot) {
          confPlot = echarts.init(plotArea);
        }

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

        let currentTrack = 'mainTrack';

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
                    <span class="ml-2 text-uestc_orange">${escapeHTML(year)} (${escapeHTML(ordinal)})</span>
                  </div>
                  <div class="flex justify-between">
                      <span>Number of Accepted: </span>
                      <span class="ml-2 text-uestc_orange">${escapeHTML(numAcc)}</span>
                  </div>
                  <div class="flex justify-between">
                      <span>Number of Rejected: </span>
                      <span class="ml-2 text-uestc_orange">${escapeHTML(numRej)}</span>
                  </div>
                  <div class="flex justify-between">
                      <span>Number of Submissions: </span>
                      <span class="ml-2 text-uestc_orange">${escapeHTML(numSub)}</span>
                  </div>
                  <div class="flex justify-between">
                      <span>Acceptance Rate: </span>
                      <span class="ml-2 text-uestc_orange">${accRate.toFixed(1)}%</span>
                  </div>
                  <div class="flex justify-between">
                      <span>Conference Location: </span>
                      <span class="ml-2 text-uestc_orange">${escapeHTML(location)}</span>
                  </div>
                  ${note ? `<div class="flex justify-between">
                      <span>Note: </span>
                      <span class="ml-2 text-uestc_orange">${escapeHTML(note)}</span>
                  </div>` : ''}
              </div>`
            }
          },
        };

        function updateChart(trackData, title) {

          const isNarrowViewport = window.innerWidth <= 768;

          if (isNarrowViewport && trackData.length > 10) {
            dataZoom.show = true;
            dataZoom.startValue = 10;
          } else if (!isNarrowViewport && trackData.length >= 30) {
            dataZoom.show = true;
            dataZoom.startValue = 30;
          } else {
            dataZoom.show = false;
            dataZoom.startValue = 100000;
          }

          option.grid = {
            left: '10%'
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
                borderWidth: 1
              },
              emphasis: {
                scale: true
              },
              lineStyle: {
                width: 2
              }
            }
          ];

          confPlot.setOption(option, true);
        }

        updateChart(mainTrackData, "Research Track")

        let secondTrackName = '';

        if (secondTrackData.length > 0) {
          secondTrackName = conference.metadata.second_track_name;
        }

        const trackButtons = document.getElementById('track-buttons');

        if (secondTrackName) {
          trackButtons.innerHTML = `
            <label class=""><input type="radio" name="track" value="mainTrack" checked><span class="mx-2">Research Track</span></label>
            <label class=""><input type="radio" name="track" value="secondTrack"><span class="mx-2">${escapeHTML(secondTrackName)}</span></label>
            `;
        } else {
          trackButtons.innerHTML = '';
        }

        function showTrack(track) {
          currentTrack = track;
          if (track === 'mainTrack') {
            updateChart(mainTrackData, "Research Track");
          } else {
            updateChart(secondTrackData, secondTrackName);
          }
        }

        trackButtons.querySelectorAll('input[name="track"]').forEach(input => {
          input.addEventListener('change', event => showTrack(event.target.value));
        });

        syncPickerUI(conferenceSeries);
      }

      window.displayConfMetadata = displayConfMetadata;

      dropdownAll.addEventListener('change', (event) => {
        const selectedValue = event.target.value;
        curConfSelection.textContent = selectedValue;

        dropdowns.forEach(dropdown => {
          if (dropdown.id !== 'dropdown-all') {
            dropdown.value = "";
          }
        });
        
        updateUrl(selectedValue);
        displayConfMetadata(selectedValue);
      });

      dropdowns.forEach(dropdown => {
        if (dropdown.id === 'dropdown-all') return;
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
    })
    .catch(error => {
      console.error('Failed to load conference data:', error);
      loadingMessage.textContent = 'Failed to load conference data.';
    });

  window.onpopstate = function(event) {
    if (event.state && event.state.conf) {
      const newConf = event.state.conf;
      curConfSelection.textContent = newConf;
      if (!updateDropdownSelection(newConf)) {
        if (window.displayConfMetadata) {
          displayConfMetadata(newConf);
        }
      }
    }
  };

});

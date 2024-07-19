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

  // display conf stats
  fetch('../../data/conf.json')
    .then(response => response.json())
    .then(data => {
      const statsDiv = document.getElementById('stats-card-container');
      const selectedConf = document.getElementById('cur-conf');
      const plotDiv = document.getElementById('plot-area');

      const confPlot = echarts.init(plotDiv)

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
              <p class="conf-card-title">${conference.series}</p>
              <p class="conf-card-desc">${conference.metadata.series_full_title}</p>
            </div>
            <div class="conf-card">
              <p class="conf-card-title">Main Discipline</p>
              <p class="conf-card-desc">${main_discipline}</p>
            </div>
            <div class="conf-card">
              <p class="conf-card-title">Other Discipline</p>
              <p class="conf-card-desc">${other_discipline}</p>
            </div>
            <div class="conf-card">
              <p class="conf-card-title">Parent Organization</p>
              <p class="conf-card-desc">${conference.metadata.parent_org}</p>
            </div>
            <div class="conf-card">
              <p class="conf-card-title">Website</p>
              <p class="conf-card-desc"><a href="${conference.metadata.website}" target="_blank">${conference.metadata.website}</a></p>
            </div>
          `;

          statsDiv.innerHTML = cards;

          // prepare plot data
          const years = conference.yearly_data.map(d => d.year);
          const num_sub = conference.yearly_data.map(d => d.main_track.num_sub);

          const option = {
            title: {
              title: "Xovee",
              left: 'center'
            },
            xAxis: {
              data: years,
              axisLabel: {
                rotate: 45
              }
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: num_sub,
              type: 'bar'
            }],
            tooltip: {
              trigger: 'axis'
            }
          };

          confPlot.setOption(option);
        }
      }
      // display init conference
      displayConfMetadata(selectedConf.textContent);

      window.displayConfMetadata = displayConfMetadata;

    });
});
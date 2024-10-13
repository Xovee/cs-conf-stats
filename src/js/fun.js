// display conf stats
fetch('/data/conf.json')
  .then(response => response.json())
  .then(data => {

    const cityCount = {};
    const cityConferences = {};
    const countryCount = {};
    const seriesAccRates = {};
    const yearlyCounts = {};

    data.conferences.forEach(conference => {
      const series = conference.series;
      if (!seriesAccRates[series]) {
        seriesAccRates[series] = {totalAcc: 0, totalSub: 0, numConf: 0};
      }

      conference.yearly_data.forEach(yearData => {
        const location = yearData.location.split(',');
        console.log(location);
        const country = location[location.length - 1].trim();
        const city = location[0].trim() + ' ' + country.split(" ")[1];

        if (city !== "Virtual Conference") {
          if (cityCount[city]) {
            cityCount[city]++;
            cityConferences[city].push({year: yearData.year, name: `${conference.series} ${yearData.year}`});
          } else {
            cityCount[city] = 1;
            cityConferences[city] = [{year: yearData.year, name: `${conference.series} ${yearData.year}`}];
          }

          cityConferences[city].sort((a, b) => b.year - a.year);

          if (countryCount[country]) {
            countryCount[country]++;
          } else {
            countryCount[country] = 1;
          }
        }

        const numAcc = yearData.main_track.num_acc;
        const numSub = yearData.main_track.num_sub;

        if (numSub > 0) {
          seriesAccRates[series].totalAcc += numAcc;
          seriesAccRates[series].totalSub += numSub;
          seriesAccRates[series].numConf += 1;
        }

        // for yearly counting
        const year = yearData.year;
        const numAccYearly = yearData.main_track.num_acc;
        const numSubYearly = yearData.main_track.num_sub;

        if (!yearlyCounts[year]) {
          yearlyCounts[year] = {totalAcc: 0, totalSub: 0};
        }

        yearlyCounts[year].totalAcc += numAccYearly;
        yearlyCounts[year].totalSub += numSubYearly;

      });

    });


    // for yearly counting
    const years = Object.keys(yearlyCounts).sort();
    const submissions = years.map(year => yearlyCounts[year].totalSub);
    const acceptances = years.map(year => yearlyCounts[year].totalAcc);
    const rateYearly = years.map(year => (yearlyCounts[year].totalSub > 0 ? (yearlyCounts[year].totalAcc / yearlyCounts[year].totalSub) * 100 : 0));

    renderYearly(years, submissions, acceptances, rateYearly, rateYearly);

    const cityData = Object.keys(cityCount).map(city => ({
      name: city,
      value: cityCount[city],
      conferences: cityConferences[city]
    })).sort((a, b) => b.value - a.value).slice(0, 50);

    renderCity(cityData);

    const sortedCountryData = Object.keys(countryCount).map(country => ({
      name: country,
      value: countryCount[country]
    })).sort((a, b) => b.value - a.value)

    const countryData = sortedCountryData.slice(0, 20);
    const remainingCountrySum = sortedCountryData.slice(20).reduce((sum, { value }) => sum + value, 0);
    countryData.push({name: 'Others', value: remainingCountrySum});

    renderCountry(countryData);

    const aggregatedAccRates = Object.keys(seriesAccRates).map(series => {
      const {totalAcc, totalSub, numConf} = seriesAccRates[series];
      const accRate = (totalAcc / totalSub) * 100;

      return {name: series, value: accRate};
    });

    const aggregatedNumAcc = Object.keys(seriesAccRates).map(series => {
      const {totalAcc, totalSub, numConf} = seriesAccRates[series];
      return {name: series, value: totalAcc, numConf: numConf};
    })

    const sortedAccRate = aggregatedAccRates.sort((a, b) => a.value - b.value).slice(0, 20);
    const sortedAccRateInv = aggregatedAccRates.sort((a, b) => b.value - a.value).slice(0, 20);
    const sortedLarge = aggregatedNumAcc.sort((a, b) => b.value - a.value).slice(0, 30);
    const sortedSmall = aggregatedNumAcc.sort((a, b) => (a.value / a.numConf) - (b.value / b.numConf)).slice(0, 20);
    
    renderPicky(sortedAccRate);
    renderGenerous(sortedAccRateInv);

    renderLarge(sortedLarge);
    renderSmall(sortedSmall);

  });

function renderYearly(years, submissions, acceptances, rateYearly) {
  const yearlyChart = echarts.init(document.getElementById('viz-yearly-num'));
  const yearlyOption = {
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
      }
    },
    legend: {
      top: 'top'
    },
    xAxis: {
      type: 'category',
      data: years,
      axisLabel: {
        fontSize: 14,
        rotate: 45
      }
    },
    series: [
      {
        name: 'Number of Accepted',
        data: acceptances,
        type: 'bar',
        stack: 'yearly',
        itemStyle: {
          color: '#f08300'
        }
      },
      {
        name: 'Number of Submissions',
        data: submissions,
        type: 'bar',
        stack: 'yearly',
        itemStyle: {
          color: '#004098'
        }
      },
      {
        name: "Overall Acceptance Rate",
        data: rateYearly,
        symbolSize: 7,
        type: 'line',
        yAxisIndex: 1,
        itemStyle: {
          color: '#f08300',
          borderColor: '#222',
          borderWidth: 3
        },
        tooltip: {
          valueFormatter: value => value.toFixed(2) + '%'
        },
        emphasis: {
          scale: true
        },
        lineStyle: {
          width: 3
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          textStyle: {
            fontSize: 16
          }
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
    ]
  };

  yearlyChart.setOption(yearlyOption);

  window.addEventListener('resize', function() {
    yearlyChart.resize();
  });
}

function renderCity(cityData) {
  var minCityValue = Math.min(...cityData.map(item => item.value));
  var maxCityValue = Math.max(...cityData.map(item => item.value));

  const cityChart = echarts.init(document.getElementById('viz-city'));
  const cityOption = {
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
        const cityName = params.name;
        const conferences = params.data.conferences.map(conf => conf.name);

        const columnCount = 3;
        const columnWidth = 100 / columnCount;
        let columns = '';
        for (let i = 0; i < columnCount; i++) {
          const columnData = conferences.slice(i * Math.ceil(conferences.length / columnCount), (i + 1) * Math.ceil(conferences.length / columnCount));
          columns += `<div style="float:left;width:${columnWidth}%;padding-right:50px;">${columnData.join('<br>')}</div>`;
        }

        return `<div>${cityName}: ${params.value}<br><div style="overflow:hidden;">${columns}</div></div>`;
      }
    },
    grid: { containLabel: true },
    visualMap: {
      type: 'continuous',
      id: 'viz-city',
      inRange: {
        color: ['#00409830', '#004098']
      },
      dimension: 0,
      min: minCityValue,
      max: maxCityValue,
    },
    xAxis: {
      name: 'Frequency',
      nameTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      axisLabel: {
        fontSize: 16,
        color: '#000'
      },
      nameLocation: 'middle',
      nameGap: 30,
      type: 'value'
    },
    yAxis: {
      name: 'City',
      nameLocation: 'start',
      nameTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      type: 'category',
      data: cityData.map(city => city.name),
      inverse: true,
      axisLabel: {
        fontSize: 16,
        color: '#000'
      }
    },
    series: [
      {
        name: "City Frequency",
        type: 'bar',
        data: cityData.map(city => ({
          value: city.value,
          conferences: city.conferences
        })),
        label: {
          show: true,
          position: 'right',
          textStyle: {
            fontSize: 16,
            color: '#000'
          }
        }
      }
    ]
  };

  cityChart.setOption(cityOption);

  window.addEventListener('resize', function() {
    cityChart.resize();
  })
}

function renderCountry(countryData) {
  var totalValue = countryData.reduce((sum, item) => sum + item.value, 0);

  var minCountryValue = Math.min(...countryData.map(item => item.value));
  var maxCountryValue = Math.max(...countryData.map(item => item.value));

  const countryChart = echarts.init(document.getElementById('viz-country'));
  const countryOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: { containLabel: true },
    visualMap: {
      type: 'continuous',
      min: minCountryValue,
      max: maxCountryValue,
      inRange: {color: ['#00409830', '#004098']},
      dimension: 0,
      // inverse: true,
    },
    xAxis: {
      name: 'Frequency',
      nameTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      axisLabel: {
        fontSize: 16,
        color: '#000'
      },
      nameLocation: 'middle',
      nameGap: 30,
      type: 'value'
    },
    yAxis: {
      name: 'Country/Region',
      nameLocation: 'start',
      nameTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      type: 'category',
      data: countryData.map(country => country.name),
      inverse: true,
      axisLabel: {
        fontSize: 16,
        color: '#000'
      }
    },
    series: [
      {
        name: "Country Frequency",
        type: 'bar',
        data: countryData.map(country => country.value),
        label: {
          show: true,
          position: 'right',
          formatter: function (params) {
            if (params.dataIndex === 0 || params.dataIndex === countryData.length - 1) {
              var perc = (params.value / totalValue * 100).toFixed(2);
              return params.value + ' (' + perc + '%)';
            } else {
              return params.value;
            }
          },
          textStyle: {
            fontSize: 16,
            color: '#000'
          }
        }
      }
    ]
  };

  countryChart.setOption(countryOption);

  window.addEventListener('resize', function() {
    countryChart.resize();
  })
}

function renderPicky(accRate) {
  var minPickyValue = Math.min(...accRate.map(item => item.value));
  var maxPickyValue = Math.max(...accRate.map(item => item.value));

  const pickyChart = echarts.init(document.getElementById('viz-picky'));
  const pickyOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
        return `${params[0].name}: ${params[0].value.toFixed(2)}%`
      }
    },
    grid: { containLabel: true },
    visualMap: {
      type: 'continuous',
      min: minPickyValue,
      max: maxPickyValue,
      inRange: {color: ['#004098', '#00409830']},
      dimension: 0,
      // inverse: true,
    },
    xAxis: {
      name: 'Average Acceptance Rate',
      nameTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      axisLabel: {
        formatter: '{value}%',
        fontSize: 16,
        color: '#000'
      },
      nameLocation: 'middle',
      nameGap: 30,
      type: 'value'
    },
    yAxis: {
      name: 'Conference',
      nameLocation: 'start',
      nameTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      type: 'category',
      data: accRate.map(rate => rate.name),
      inverse: true,
      axisLabel: {
        fontSize: 16,
        color: '#000'
      }
    },
    series: [
      {
        name: "Acceptance Rate",
        type: 'bar',
        data: accRate.map(rate => rate.value),
        label: {
          show: true,
          position: 'right',
          formatter: function (params) {
            return `${params.value.toFixed(1)}%`;
          },
          textStyle: {
            fontSize: 16,
            color: '#000'
          }
        }
      }
    ]
  };

  pickyChart.setOption(pickyOption);

  window.addEventListener('resize', function() {
    pickyChart.resize();
  })
}

function renderGenerous(accRate) {
  var minGenerousValue = Math.min(...accRate.map(item => item.value));
  var maxGenerousValue = Math.max(...accRate.map(item => item.value));

  const generousChart = echarts.init(document.getElementById('viz-generous'));
  const generousOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
        return `${params[0].name}: ${params[0].value.toFixed(2)}%`
      }
    },
    grid: { containLabel: true },
    visualMap: {
      type: 'continuous',
      min: minGenerousValue,
      max: maxGenerousValue,
      inRange: {color: ['#00409830', '#004098']},
      dimension: 0,
    },
    xAxis: {
      name: 'Average Acceptance Rate',
      nameTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      axisLabel: {
        formatter: '{value}%',
        fontSize: 16,
        color: '#000'
      },
      nameLocation: 'middle',
      nameGap: 30,
      type: 'value'
    },
    yAxis: {
      name: 'Conference',
      nameLocation: 'start',
      nameTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      type: 'category',
      data: accRate.map(rate => rate.name),
      inverse: true,
      axisLabel: {
        fontSize: 16,
        color: '#000'
      }
    },
    series: [
      {
        name: "Acceptance Rate",
        type: 'bar',
        data: accRate.map(rate => rate.value),
        label: {
          show: true,
          position: 'right',
          formatter: function (params) {
            return `${params.value.toFixed(1)}%`;
          },
          textStyle: {
            fontSize: 16,
            color: '#000'
          }
        }
      }
    ]
  };

  generousChart.setOption(generousOption);

  window.addEventListener('resize', function() {
    generousChart.resize();
  })
}

function renderLarge(numAcc) {
  var minLargeValue = Math.min(...numAcc.map(item => item.value));
  var maxLargeValue = Math.max(...numAcc.map(item => item.value));

  const largeChart = echarts.init(document.getElementById('viz-large'));
  const largeOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
    },
    grid: { containLabel: true },
    visualMap: {
      type: 'continuous',
      min: minLargeValue,
      max: maxLargeValue,
      inRange: {color: ['#00409830', '#004098']},
      dimension: 0,
    },
    xAxis: {
      name: 'Total Accepted Papers',
      nameTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      axisLabel: {
        formatter: '{value}',
        fontSize: 16,
        color: '#000'
      },
      nameLocation: 'middle',
      nameGap: 30,
      type: 'value'
    },
    yAxis: {
      name: 'Conference',
      nameLocation: 'start',
      nameTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      type: 'category',
      data: numAcc.map(num => num.name),
      inverse: true,
      axisLabel: {
        fontSize: 16,
        color: '#000'
      }
    },
    series: [
      {
        name: "Total Accepted Papers",
        type: 'bar',
        data: numAcc.map(num => num.value),
        label: {
          show: true,
          position: 'right',
          formatter: function (params) {
            return `${params.value.toLocaleString()}`;
          },
          textStyle: {
            fontSize: 16,
            color: '#000'
          }
        }
      }
    ]
  };

  largeChart.setOption(largeOption);

  window.addEventListener('resize', function() {
    largeChart.resize();
  })
}

function renderSmall(numYearlyAcc) {
  var minSmallValue = Math.min(...numYearlyAcc.map(item => item.value / item.numConf));
  var maxSmallValue = Math.max(...numYearlyAcc.map(item => item.value / item.numConf));

  const smallChart = echarts.init(document.getElementById('viz-small'));
  const smallOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
        return `${params[0].name}: Yearly ${params[0].value.toFixed(0)} papers.`
      }
    },
    grid: { containLabel: true },
    visualMap: {
      type: 'continuous',
      min: minSmallValue,
      max: maxSmallValue,
      inRange: {color: ['#004098', '#00409830']},
      dimension: 0,
    },
    xAxis: {
      name: 'Yearly Accepted Papers',
      nameTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      axisLabel: {
        formatter: '{value}',
        fontSize: 16,
        color: '#000'
      },
      nameLocation: 'middle',
      nameGap: 30,
      type: 'value'
    },
    yAxis: {
      name: 'Conference',
      nameLocation: 'start',
      nameTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      type: 'category',
      data: numYearlyAcc.map(num => num.name),
      inverse: true,
      axisLabel: {
        fontSize: 16,
        color: '#000'
      }
    },
    series: [
      {
        name: "Yearly Accepted Papers",
        type: 'bar',
        data: numYearlyAcc.map(num => (num.value / num.numConf)),
        label: {
          show: true,
          position: 'right',
          formatter: function (params) {
            return `${params.value.toFixed(0)}`;
          },
          textStyle: {
            fontSize: 16,
            color: '#000'
          }
        }
      }
    ]
  };

  smallChart.setOption(smallOption);

  window.addEventListener('resize', function() {
    smallChart.resize();
  })
}

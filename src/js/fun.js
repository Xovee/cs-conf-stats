// display conf stats


function countryToCode(countryName) {
  const countries = {
    'USA': 'US',
    'Canada': 'CA',
    'China': 'CN',
    'Australia': 'AU',
    'Online': 'Online',
    'Singapore': 'SG',
    'UK': 'GB',
    'France': 'FR',
    'Italy': 'IT',
    'Spain': 'ES',
    'Korea': 'KR',
    'Japan': 'JP',
    'The Netherlands': 'NL',
    'Austria': 'AT',
    'India': 'IN',
    'Ireland': 'IE',
    'Sweden': 'SE',
    'Greece': 'GR',
    'Switzerland': 'CH',
    'Germany': 'DE',
    'Hungary': 'HU',
    'Israel': 'IL',
    'Finland': 'FI',
    'Portugal': 'PT',
    'United States': 'US',
  };

  return countries[countryName] || 'Unknown';
}

fetch('/data/conf.json')
  .then(response => response.json())
  .then(data => {

    const cityCount = {};
    const cityConferences = {};
    const countryCount = {};
    const seriesAccRates = {};
    const yearlyCounts = {};
    const disciplineCounts = {};
    const singleConfs = [];
    const singleConfsScatter = [];

    function getCountryFlag(countryCode) {
      if (countryCode === 'Online') {
        return '🌏';
      } else if (countryCode === 'Unknown') {
        return '🤔';
      } else {
        const codePoints = countryCode
          .toUpperCase()
          .split('')
          .map(char => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
      }
    }

    data.conferences.forEach(conference => {
      const series = conference.series;
      if (series === 'Template') {
        return;
      }
      const discipline = conference.discipline;

      if (!seriesAccRates[series]) {
        seriesAccRates[series] = {totalAcc: 0, totalSub: 0, numConf: 0};
      }

      conference.yearly_data.forEach(yearData => {
        const location = yearData.location.split(',');
        const country = location[location.length - 1].trim();
        const city = location[0].trim();

        const countryCode = countryToCode(country);
        const flag = getCountryFlag(countryCode);

        const cityWithFlag = `${city} ${flag}`;
        const countryWithFlag = `${country} ${flag}`;

        if (cityCount[cityWithFlag]) {
          cityCount[cityWithFlag]++;
          cityConferences[cityWithFlag].push({year: yearData.year, name: `${conference.series} ${yearData.year}`});
        } else {
          cityCount[cityWithFlag] = 1;
          cityConferences[cityWithFlag] = [{year: yearData.year, name: `${conference.series} ${yearData.year}`}];
        }

        cityConferences[cityWithFlag].sort((a, b) => b.year - a.year);

        if (countryCount[countryWithFlag]) {
          countryCount[countryWithFlag]++;
        } else {
          countryCount[countryWithFlag] = 1;
        }

        const numAcc = yearData.main_track.num_acc;
        const numSub = yearData.main_track.num_sub;
        const accRate = (numAcc / numSub) * 100;

        if (numSub > 0) {
          singleConfs.push({
            name: `${conference.series} ${yearData.year}`,
            sub: numSub,
            acc: numAcc,
            rate: accRate,
            conf: series,
            discipline: discipline
          });
        }

        if (numSub > 0) {
          seriesAccRates[series].totalAcc += numAcc;
          seriesAccRates[series].totalSub += numSub;
          seriesAccRates[series].numConf += 1;

          if (!seriesAccRates[series].accRates) {
            seriesAccRates[series].accRates = [];
          }
          const accRate = (numAcc / numSub) * 100;
          seriesAccRates[series].accRates.push(accRate);
        }

        // count discipline
        if (discipline) {
          if (disciplineCounts[discipline]) {
            disciplineCounts[discipline] += numAcc;
          } else {
            disciplineCounts[discipline] = numAcc;
          }
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

    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const numVenues = Object.keys(seriesAccRates).length - 1;  // remove the template conf entry
    const numConfs = singleConfs.length;
    const numTotalAcc = singleConfs.reduce((sum, conf) => sum + conf.acc, 0);
    const numTotalSub = singleConfs.reduce((sum, conf) => sum + conf.sub, 0);
    const avgAccRateViz = (numTotalAcc / numTotalSub) * 100;
    const numTotalCountry = Object.keys(countryCount).length;
    const numTotalCity = Object.keys(cityCount).length;
    const [popCountry, popCountryVal] = Object.entries(countryCount)
        .sort((a, b) => b[1] - a[1])[0];
    const [popuCity, popCityVal] = Object.entries(cityCount)
        .sort((a, b) => b[1] - a[1])[1];
    const [popDiscipline, popDisciplineVal] = Object.entries(disciplineCounts)
        .sort((a, b) => b[1] - a[1])[0];
    const [popConfName, popConfVal] = Object.entries(seriesAccRates)
        .sort((a, b) => b[1].totalSub - a[1].totalSub)[0];
    const popSingleConf = singleConfs.slice().sort((a, b) => b.acc - a.acc)[0];
    const mostSelective = singleConfs.slice().sort((a, b) => a.rate - b.rate)[0];

    document.querySelector('#viz-num-venues .conf-card-big-desc').textContent = numberWithCommas(numVenues);
    document.querySelector('#viz-num-confs .conf-card-big-desc').textContent = numberWithCommas(numConfs);
    document.querySelector('#viz-num-country .conf-card-big-desc').textContent = numberWithCommas(numTotalCountry);
    document.querySelector('#viz-num-cities .conf-card-big-desc').textContent = numberWithCommas(numTotalCity);
    document.querySelector('#viz-num-acc .conf-card-big-desc').textContent = numberWithCommas(numTotalAcc);
    document.querySelector('#viz-num-sub .conf-card-big-desc').textContent = numberWithCommas(numTotalSub);
    document.querySelector('#viz-num-rate .conf-card-big-desc').textContent = avgAccRateViz.toFixed(2) + '%';

    document.querySelector('#viz-popular-country .conf-card-big-desc').textContent = popCountry;
    document.querySelector('#viz-popular-city .conf-card-big-desc').textContent = popuCity;
    document.querySelector('#viz-top-subject .conf-card-big-desc').textContent = popDiscipline;
    document.querySelector('#viz-top-conference .conf-card-big-desc').textContent = popConfName;
    document.querySelector('#viz-top-event .conf-card-big-desc').textContent = popSingleConf.name + ` (${numberWithCommas(popSingleConf.acc)})`;
    document.querySelector('#viz-selective-event .conf-card-big-desc').textContent = `${mostSelective.name} (${mostSelective.rate.toFixed(1)}%)`;

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

    const sortedCountryData = Object.keys(countryCount).map(country => ({
      name: country,
      value: countryCount[country]
    })).sort((a, b) => b.value - a.value)

    console.log(sortedCountryData);

    const countryData = sortedCountryData.slice(0, 20);
    const remainingCountrySum = sortedCountryData.slice(20).reduce((sum, { value }) => sum + value, 0);
    countryData.push({name: 'Others', value: remainingCountrySum});

    renderCountry(countryData);
    
    renderCity(cityData);

    const aggregatedAccRates = Object.keys(seriesAccRates).map(series => {
      const { accRates } = seriesAccRates[series];
      const avgAccRate = accRates.reduce((sum, rate) => sum + rate, 0) / accRates.length;

      return {name: series, value: avgAccRate };
    });

    const aggregatedNumAcc = Object.keys(seriesAccRates).map(series => {
      const {totalAcc, totalSub, numConf} = seriesAccRates[series];
      return {name: series, value: totalAcc, numConf: numConf};
    })

    const sortedAccRate = aggregatedAccRates.sort((a, b) => a.value - b.value).slice(0, 20);
    const sortedAccRateInv = aggregatedAccRates.sort((a, b) => b.value - a.value).slice(0, 20);
    const sortedLarge = aggregatedNumAcc.sort((a, b) => b.value - a.value).slice(0, 30);
    const sortedSmall = aggregatedNumAcc.sort((a, b) => (a.value / a.numConf) - (b.value / b.numConf)).slice(0, 20);

    const sortedSingleConfs = singleConfs.sort((a, b) => a.rate - b.rate).slice(0, 20);

    renderDiscipline(disciplineCounts);

    // renderWorldMap(countryCount);

    // window.addEventListener('resize', debounce(() => {
    //   renderWorldMap(countryCount);
    // }, 500));

    // function debounce(fn, delay = 500) {
    //   let timer;
    //   return (...args) => {
    //     clearTimeout(timer);
    //     timer = setTimeout(() => {
    //       fn.apply(this, args);
    //     }, delay);
    //   };
    // }

    const uniqueConfs = Array.from(new Set(singleConfs.map(d => d.conf))).sort();
    renderScatter(singleConfs, uniqueConfs);

    renderPicky(sortedAccRate);
    renderPickySingle(sortedSingleConfs);

    renderGenerous(sortedAccRateInv);

    renderLarge(sortedLarge);
    renderSmall(sortedSmall);

    
    var yearData = [
      {name: "AAAI", value: 1980},
      {name: "ACL", value: 1963},
      {name: "ACM MM", value: 1993},
      {name: "ASE", value: 1986},
      {name: "Asiacrypt", value: 1990},
      {name: "ASPLOS", value: 1982},
      {name: "CASES", value: 1998},
      {name: "CAV", value: 1989},
      {name: "CCC", value: 1986},
      {name: "CCS", value: 1993},
      {name: "CHI", value: 1982},
      {name: "CIKM", value: 1992},
      {name: "COLT", value: 1988},
      {name: "Crypto", value: 1981},
      {name: "CSCW", value: 1986},
      {name: "CVPR", value: 1983},
      {name: "DAC", value: 1964},
      {name: "ECCV", value: 1990},
      {name: "ECIR", value: 1978},
      {name: "ECOOP", value: 1987},
      {name: "ECRTS", value: 1989},
      {name: "EMNLP", value: 1996},
      {name: "EMSOFT", value: 2001},
      {name: "Eurocrypt", value: 1982},
      {name: "EuroSys", value: 2006},
      {name: "FAST", value: 2002},
      {name: "FOCS", value: 1960},
      {name: "FSE", value: 1993},
      {name: "HPCA", value: 1995},
      {name: "HPDC", value: 1992},
      {name: "ICALP", value: 1972},
      {name: "ICCAD", value: 1982},
      {name: "ICCV", value: 1987},
      {name: "ICDE", value: 1984},
      {name: "ICDM", value: 2001},
      {name: "ICFP", value: 1996},
      {name: "ICLR", value: 2013},
      {name: "ICME", value: 1994},
      {name: "ICML", value: 1980},
      {name: "ICMR", value: 2011},
      {name: "ICS", value: 1987},
      {name: "ICSE", value: 1975},
      {name: "ICWSM", value: 2007},
      {name: "IEEE S&P", value: 1980},
      {name: "IJCAI", value: 1969},
      {name: "IMC", value: 2001},
      {name: "INFOCOM", value: 1982},
      {name: "IPDPS", value: 1987},
      {name: "ISCA", value: 1973},
      {name: "ISSTA", value: 1993},
      {name: "KDD", value: 1994},
      {name: "LICS", value: 1986},
      {name: "MICRO", value: 1968},
      {name: "MobiCom", value: 1995},
      {name: "MobiSys", value: 2003},
      {name: "NAACL", value: 2000},
      {name: "NDSS", value: 1993},
      {name: "NeurIPS", value: 1987},
      {name: "NSDI", value: 2004},
      {name: "OOPSLA", value: 1986},
      {name: "OSDI", value: 1994},
      {name: "PLDI", value: 1979},
      {name: "PODS", value: 1982},
      {name: "POPL", value: 1973},
      {name: "PPoPP", value: 1988},
      {name: "RTAS", value: 1995},
      {name: "RTSS", value: 1980},
      {name: "SC", value: 1988},
      {name: "SDM", value: 2001},
      {name: "SenSys", value: 2003},
      {name: "SIGCOMM", value: 1969},
      {name: "SIGIR", value: 1971},
      {name: 'SIGMETRICS', value: 1973},
      {name: 'SODA', value: 1990},
      {name: 'SOSP', value: 1965},
      {name: 'STOC', value: 1969},
      {name: 'WWW', value: 1994},
      {name: 'UAI', value: 1985},
      {name: 'UbiComp', value: 1999},
      {name: 'UIST', value: 1988},
      {name: 'USENIX ATC', value: 1983},
      {name: 'USENIX Security', value: 1988},
      {name: 'VLDB', value: 1975},
      {name: 'WSDM', value: 2008},
    ]

    renderOld(yearData);
    renderYoung(yearData);

  });

function renderDiscipline(disciplineCounts) {
  const sortedDisciplineCounts = Object.entries(disciplineCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([key, value]) => ({ name: key, value}));

  const disciplineChart = echarts.init(document.getElementById('viz-discipline'));
  const disciplineOption = {
    tooltip: {
      trigger: 'item',
      formatter: '<b>{b}</b><br />{c} Paper ({d}%)'
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
          show: true
        }
      }
    },
    series: [
      {
        name: 'Discipline',
        type: 'pie',
        clockwise: false,
        radius: '80%',
        data: sortedDisciplineCounts,
        label: {
          fontSize: 16,
          alignTo: 'labelLine'
        },
        itemStyle: {
          borderColor: '#111'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  disciplineChart.setOption(disciplineOption);

  window.addEventListener('resize', function() {
    disciplineChart.resize();
  });
}

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
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
          show: true
        }
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

function renderWorldMap(countryCount) {
  google.charts.load('current', {
    'packages':['geochart'],
  });
  google.charts.setOnLoadCallback(() => drawRegionsMap(countryCount));

  function drawRegionsMap(countryCount) {
    const countryData = {};
    for (const [countryWithFlag, count] of Object.entries(countryCount)) {
      const parts = countryWithFlag.split(' ');
      const flag = parts.pop();
      const countryName = parts.join(' ');
      const countryCode = countryName;

      if (countryCode != 'Unknown' && countryCode != 'Online') {
        countryData[countryCode] = (countryData[countryCode] || 0) + count;
      }
    }

    const chartData = [['Country', 'Frequency']];
    Object.entries(countryData).forEach(([code, count]) => {
      chartData.push([code, count]);
    });

    chartData.push(['Taiwan', countryData['China']]);
    chartData.push(['North Korea', countryData['Korea']]);
    chartData.push(['South Korea', countryData['Korea']]);
    chartData.push(['United Kingdom', countryData['UK']]);
    chartData.push(['Netherlands', countryData['UK']]);
    chartData.push(['Czech', countryData['Czech Republic']]);
    chartData.push(['AE', countryData['UAE']]);
    chartData.push(['US', countryData['USA']]);

    const data = google.visualization.arrayToDataTable(chartData);

    const options = {
      backgroundColor: {
        fill: "rgb(243,244,246)",
      },
      colorAxis: {values: [1, 60, 140, 2000], colors: ['#e5ebf4', '#004098', '#00204c', '#000']},
      domain: 'CN',
    };

    const chart = new google.visualization.GeoChart(document.getElementById('country-map'));

    chart.draw(data, options);
  }
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
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
          show: true
        }
      }
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
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
          show: true
        }
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

function renderScatter(dataPoints, uniqueConfs) {
  const confsSeries = uniqueConfs.map((conf, idx) => {
    const confsData = dataPoints.filter(d => d.conf === conf)
        .map(d => [d.rate, d.sub, d.conf, d.discipline, d.name, d.acc]);

    return {
      name: conf,
      type: 'scatter',
      symbolSize: 12,
      data: confsData,
      encode: { x: 0, y: 1 },
      itemStyle: {
        borderColor: '#333',
        borderWidth: 1
      },
      label: { show: true, position: 'right', formatter: `{@[4]}` },
      labelLayout: { hideOverlap: true }
    }
  });

  const latestConfsSeries = uniqueConfs.map((conf) => {
    const latestConfData = dataPoints
        .filter(d => d.conf === conf)
        .sort((a, b) => {
          const yearA = parseInt(a.name.match(/\d{4}$/)?.[0] || '0', 10);
          const yearB = parseInt(b.name.match(/\d{4}$/)?.[0] || '0', 10);
          return yearB - yearA;
        })[0];

    if (latestConfData) {
      return {
        name: conf,
        type: 'scatter',
        symbolSize: 12,
        data: [[latestConfData.rate, latestConfData.sub, latestConfData.conf, latestConfData.discipline, latestConfData.name, latestConfData.acc]],
        encode: { x: 0, y: 1 },
        itemStyle: {
          borderColor: '#333',
          borderWidth: 1
        },
        label: { show: true, position: 'right', formatter: `{@[4]}` },
        labelLayout: { hideOverlap: true }
      };
    }
    return null;
  }).filter(Boolean);

  const defaultSelected = {};
  uniqueConfs.forEach(conf => {
    defaultSelected[conf] = conf === 'ICLR' || conf === 'NeurIPS';
  });

  const scatterChart = echarts.init(document.getElementById('viz-scatter'));

  const customColors = [
    '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231',
    '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabed4',
    '#ff7f7f', '#7f7fff', '#7fff7f', '#ff7f00', '#7f00ff',
    '#00ff7f', '#007fff', '#ff007f', '#ffbf00', '#bfbf00',
    '#00bfbf', '#bf00bf', '#7f3f00', '#3f7f00', '#007f3f',
    '#003f7f', '#3f007f', '#7f003f', '#ffdfbf', '#bfffd0',
    '#d0bfff', '#bfbfbf', '#d0d0ff', '#ffd0d0', '#d0ffd0',
    '#ffd0bf', '#bf7fd0', '#d07fbf', '#7fd0bf', '#7fbfd0',
    
    // New rich jewel tones
    '#1A535C', '#4ECDC4', '#FF6B6B', '#FFE66D', '#2EC4B6',
    '#E71D36', '#FF9F1C', '#011627', '#FDFFFC', '#2EC4B6',
    
    // New muted pastels
    '#D4A5A5', '#9BC1BC', '#F4F1DE', '#A5668B', '#69306D',
    '#8E9AAF', '#DEE2FF', '#B8D8D8', '#FEDFD7', '#EFD9CE',
    
    // New deep sophisticated tones
    '#264653', '#287271', '#2A9D8F', '#E76F51', '#F4A261',
    '#5F0F40', '#9A031E', '#FB8B24', '#0F4C5C', '#540D6E',
    
    // New vibrant but balanced
    '#00A896', '#F26430', '#6B2D5C', '#D81159', '#218380',
    '#73D2DE', '#FFA69E', '#AA4465', '#462255', '#854D27',
    
    // New gradient-friendly neutrals
    '#495867', '#577399', '#BDD5EA', '#F7F7FF', '#FE5F55',
    '#3A405A', '#5E6472', '#AEC5EB', '#E9AFA3', '#685044'
]

  const scatterOption = {
    color: customColors,
    tooltip: {
      trigger: 'item',
      formatter: function (params) {
        const rate = params.data[0].toFixed(2) + '%';
        const sub = params.data[1];
        const conf = params.data[4];
        const name = params.data[3];
        const acc = params.data[5];


        return `<b>${conf}</b><br>
                Discipline: ${name}<br>
                Accepted: ${acc}<br>
                Submissions: ${sub}<br>
                Acceptance Rate: ${rate}`;
      }
    },
    legend: {
      top: 'top',
      selected: defaultSelected,
      textStyle: {
        fontSize: 14
      },
      itemStyle: {
        borderWidth: 1
      },
      inactiveBorderWidth: 1,
      selector: [{ type: 'inverse', title: 'inv'}],
      selectorPosition: 'start'
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
          show: true
        }
      }
    },
    grid: { containLabel: true,  top: 250},
    xAxis: {
      name: 'Acceptance Rate',
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
      type: 'value',
      min: 5
    },
    yAxis: {
      name: 'Number of Submissions (Popularity)',
      nameLocation: 'middle',
      nameGap: 70,
      nameTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      type: 'value',
      axisLabel: {
        fontSize: 16,
        color: '#000'
      }
    },
    series: confsSeries
  };

  scatterChart.setOption(scatterOption);

  const latestScatterChart = echarts.init(document.getElementById('viz-scatter-latest'));
  const latestScatterOption = {
    tooltip: scatterOption.tooltip,
    legend: {
      top: 'top',
      textStyle: {
        fontSize: 14
      },
      itemStyle: {
        borderWidth: 1
      }
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
          show: true
        }
      }
    },
    color: customColors,
    grid: scatterOption.grid,
    xAxis: scatterOption.xAxis,
    yAxis: scatterOption.yAxis,
    series: latestConfsSeries
  };
  latestScatterChart.setOption(latestScatterOption);

  window.addEventListener('resize', function() {
    scatterChart.resize();
    latestScatterChart.resize();
  });
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
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
          show: true
        }
      }
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
      type: 'value',
      min: 10
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

function renderPickySingle(pickySingle) {
  var minPickySingleValue = Math.min(...pickySingle.map(item => item.rate));
  var maxPickySingleValueXovee = Math.max(...pickySingle.map(item => item.rate));

  const pickySingleChart = echarts.init(document.getElementById('viz-picky-single'));
  const pickySingleOption = {
    tooltip: {
      trigger: 'item',
      axisPointer: { type: 'shadow' },
      formatter: function (params) {
        const d = params.data;
        return `${d.name}:<br> ${d.rate.toFixed(2)}% (${d.acc}/${d.sub})`;
      }
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
          show: true
        }
      }
    },
    grid: { containLabel: true },
    visualMap: {
      type: 'continuous',
      min: minPickySingleValue,
      max: maxPickySingleValueXovee,
      inRange: {color: ['#004098', '#00409830']},
      dimension: 0,
      // inverse: true,
    },
    xAxis: {
      name: 'Acceptance Rate',
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
      type: 'value',
      min: 5
    },
    yAxis: {
      name: 'Single Conference Event',
      nameLocation: 'start',
      nameTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      type: 'category',
      data: pickySingle.map(rate => rate.name),
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
        data: pickySingle.map(d => ({
          value: d.rate,
          name: d.name,
          sub: d.sub,
          acc: d.acc,
          rate: d.rate
        })),
        label: {
          show: true,
          position: 'right',
          formatter: function (params) {
            const d = params.data;
            return `${d.rate.toFixed(2)}% (${d.acc}/${d.sub})`;
          },
          textStyle: {
            fontSize: 16,
            color: '#000'
          }
        }
      }
    ]
  };

  pickySingleChart.setOption(pickySingleOption);

  window.addEventListener('resize', function() {
    pickySingleChart.resize();
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
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
          show: true
        }
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
      type: 'value',
      min: 20
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
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
          show: true
        }
      }
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
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
          show: true
        }
      }
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
      type: 'value',
      min: 10
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


function renderOld(data) {
  data.sort((a, b) => a.value - b.value);
  data = data.slice(0, 20);
  var minSmallValue = Math.min(...data.map(item => item.value));
  var maxSmallValue = Math.max(...data.map(item => item.value));

  const oldChart = echarts.init(document.getElementById('viz-old'));
  const oldOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
        return `${params[0].name}: Started in ${params[0].value}.`
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
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
          show: true
        }
      }
    },
    xAxis: {
      name: 'Birthyear',
      nameTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      min: 1950,
      max: 2030,
      axisLabel: {
        formatter: '',
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
      data: data.map(item => item.name),
      inverse: true,
      axisLabel: {
        fontSize: 16,
        color: '#000'
      }
    },
    series: [
      {
        name: "The Oldest Conferences",
        type: 'bar',
        data: data,
        label: {
          show: true,
          position: 'right',
          formatter: function (params) {
            return `${params.value}`;
          },
          textStyle: {
            fontSize: 16,
            color: '#000'
          }
        }
      }
    ]
  };

  oldChart.setOption(oldOption);

  window.addEventListener('resize', function() {
    oldChart.resize();
  })
}

function renderYoung(data) {
  data.sort((a, b) => b.value - a.value);
  data = data.slice(0, 20);
  var minSmallValue = Math.min(...data.map(item => item.value));
  var maxSmallValue = Math.max(...data.map(item => item.value));

  const youngChart = echarts.init(document.getElementById('viz-young'));
  const youngOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
        return `${params[0].name}: Started in ${params[0].value}.`
      }
    },
    grid: { containLabel: true },
    visualMap: {
      type: 'continuous',
      min: minSmallValue,
      max: maxSmallValue,
      inRange: {color: ['#00409830', '#004098']},
      dimension: 0,
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
          show: true
        }
      }
    },
    xAxis: {
      name: 'Birthyear',
      nameTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      axisLabel: {
        formatter: '',
        fontSize: 16,
        color: '#000'
      },
      nameLocation: 'middle',
      nameGap: 30,
      type: 'value',
      min: 1950,
      max: 2030
    },
    yAxis: {
      name: 'Conference',
      nameLocation: 'end',
      nameTextStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      type: 'category',
      data: data.map(item => item.name),
      inverse: false,
      axisLabel: {
        fontSize: 16,
        color: '#000'
      }
    },
    series: [
      {
        name: "The Youngest Conferences",
        type: 'bar',
        data: data,
        label: {
          show: true,
          position: 'right',
          formatter: function (params) {
            return `${params.value}`;
          },
          textStyle: {
            fontSize: 16,
            color: '#000'
          }
        }
      }
    ]
  };

  youngChart.setOption(youngOption);

  window.addEventListener('resize', function() {
    youngChart.resize();
  })
}

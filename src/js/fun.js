// display conf stats
fetch('/data/conf.json')
  .then(response => response.json())
  .then(data => {

    const cityCount = {};
    const countryCount = {};

    data.conferences.forEach(conference => {
      conference.yearly_data.forEach(yearData => {
        const location = yearData.location.split(',');
        const city = location[0].trim();
        const country = location.length > 1 ? location[location.length - 1].trim() : "Unknown";
        if (city !== "Virtual Conference") {
          if (cityCount[city]) {
            cityCount[city]++;
          } else {
            cityCount[city] = 1;
          }

          if (countryCount[country]) {
            countryCount[country]++;
          } else {
            countryCount[country] = 1;
          }
        }
      });
    });

    const cityData = Object.keys(cityCount).map(city => ({
      name: city,
      value: cityCount[city]
    })).sort((a, b) => b.value - a.value).slice(0, 20);

    const countryData = Object.keys(countryCount).map(country => ({
      name: country,
      value: countryCount[country]
    })).sort((a, b) => b.value - a.value).slice(0, 20);

    renderCity(cityData);
    renderCountry(countryData);


  });

function renderCity(cityData) {
  var minCityValue = Math.min(...cityData.map(item => item.value));
  var maxCityValue = Math.max(...cityData.map(item => item.value));

  const cityChart = echarts.init(document.getElementById('viz-city'));
  const cityOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
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
      nameLocation: 'middle',
      nameGap: 25,
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
        fontSize: 16
      }
    },
    series: [
      {
        name: "City Frequency",
        type: 'bar',
        data: cityData.map(city => city.value),
      }
    ]
  };

  cityChart.setOption(cityOption);

  window.addEventListener('resize', function() {
    cityChart.resize();
  })
}

function renderCountry(countryData) {
  var minCountryValue = Math.min(...countryData.map(item => item.value));
  var maxCountryValue = Math.max(...countryData.map(item => item.value));

  console.log(minCountryValue);
  console.log(maxCountryValue);

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
      nameLocation: 'middle',
      nameGap: 25,
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
        fontSize: 16
      }
    },
    series: [
      {
        name: "Country Frequency",
        type: 'bar',
        data: countryData.map(country => country.value),
      }
    ]
  };

  countryChart.setOption(countryOption);

  window.addEventListener('resize', function() {
    countryChart.resize();
  })
}
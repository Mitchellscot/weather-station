const axios = require("axios");

const formatResults = (data) => {
    let currentTemp = data.current.temp;
    let feelsLike = data.current.feels_like;
    let dailyHigh = data.daily[0].temp.max;
    let dailyLow = data.daily[0].temp.min;
    let conditions = data.daily[0].weather[0].main;
    let parsedConditions = parseConditions(conditions);
    let weatherData = { 
        current: currentTemp.toFixed(0), 
        feels: feelsLike.toFixed(0), 
        high: dailyHigh.toFixed(0), 
        low: dailyLow.toFixed(0), 
        conditions: parsedConditions};
    if (weatherData.conditions == 'Clouds')
    {
        let x = getClouds(data.daily[0].weather[0].id);
        weatherData.conditions = x;
    }
    return weatherData;
}

const parseConditions = (conditions) => {
    switch(conditions) {
        case 'Clear':
            return 'Clear';
        case 'Thunderstorm':
            return 'Tstorm';
        case 'Drizzle':
            return 'Drizzl';
        case 'Rain':
            return 'Rain';
        case 'Snow':
            return 'Snow';
        case 'Mist':
            return 'Mist';
        case 'Smoke':
            return 'Smoke';
        case 'Haze':
            return 'Haze';
        case 'Dust':
            return 'Dust';
        case 'Fog':
            return 'Mist';
        case 'Sand':
            return 'Smoke';
        case 'Ash':
            return 'Ash';
        case 'Squall':
            return 'Squall';
        case 'Tornado':
            return 'Torndo';
        case 'Clouds':
            return 'Clouds';
    }
}

const getClouds = (conditions) => {
    switch(conditions) {
        case 801:
            return 'Sunny';
        case 802:
            return 'PCloud';
        case 803:
            return 'Cloudy';
        case 804:
            return 'OvCast';
    }
}

const getWeather = async (apiKey) => {
    let weatherData;
    await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=46.357994&lon=-94.268458&exclude=minutely,hourly&appid=${apiKey}&units=imperial`)
        .then((response) => {
            weatherData = formatResults(response.data);
        }).catch((err) => console.log(`HEY MITCH - COULDN'T GET YOUR WEATHER ${err}`));
    return weatherData;
};

module.exports = { getWeather };
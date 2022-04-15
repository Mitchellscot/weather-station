import axios, { AxiosResponse } from "axios";
import WeatherData from './WeatherData';


function formatResults(data: any): WeatherData{
    let currentTemp: number = data.current.temp.toFixed(0);
    let feelsLike: number = data.current.feels_like.toFixed(0);
    let dailyHigh: number = data.daily[0].temp.max.toFixed(0);
    let dailyLow: number = data.daily[0].temp.min.toFixed(0);
    let conditions: string = parseConditions(data.daily[0].weather[0].main);
    let weatherData = new WeatherData(currentTemp, feelsLike, dailyHigh, dailyLow, conditions);
    if (weatherData.conditions == 'Clouds')
    {
        weatherData.conditions = getClouds(data.daily[0].weather[0].id);
    }
    return weatherData;
}

function parseConditions(conditions: string): string {
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
        default:
            return 'HUH?'
    }
}

function getClouds(conditions: number): string{
    switch(conditions) {
        case 801:
            return 'Sunny';
        case 802:
            return 'PCloud';
        case 803:
            return 'Cloudy';
        case 804:
            return 'OvCast';
        default:
            return 'WUT?';
    }
}

export default async function getWeather(apiKey: string | undefined): Promise<WeatherData | any>{
    if(typeof apiKey === undefined){
        throw 'Unable to find the API Key';
    }
    await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=46.357994&lon=-94.268458&exclude=minutely,hourly&appid=${apiKey}&units=imperial`)
        .then((response: AxiosResponse) => {
            return formatResults(response.data);
        }).catch((err: unknown) => console.log(`HEY MITCH - COULDN'T GET YOUR WEATHER ${err} - here is api key ${apiKey}`));
};
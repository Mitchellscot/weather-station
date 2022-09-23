import axios, { AxiosResponse } from "axios";
import WeatherData from './WeatherData';


function formatResults(data: any): WeatherData{
    let currentTemp: number = <number>data.current.temp.toFixed(0);
    let feelsLike: number = <number>data.current.feels_like.toFixed(0);
    let dailyHigh: number = <number>data.daily[0].temp.max.toFixed(0);
    let dailyLow: number = <number>data.daily[0].temp.min.toFixed(0);
    let conditions: string = parseConditions(<string>data.daily[0].weather[0].main);
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

export default async function GetWeather(apiKey: string, latitude: string, longitude: string): Promise<WeatherData>{

    try {
        if(apiKey === undefined){
            throw new Error("Unable to find the API Key.");
        }
        const response: AxiosResponse = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${apiKey}&units=imperial`).catch(error => {
            let gmtTime: Date = new Date(error?.response?.headers?.date);
            const time = gmtTime.toLocaleString('en-us', { timeZone: 'CST', timeZoneName: 'short' });
            throw new Error(`An error occured while sending a request to open weather map.\n Status Code: ${error?.response?.status === undefined ? '??' : error.response.status}\n Message: ${error?.response?.data?.message === undefined ? "??" : error?.response?.data?.message}\n Time: ${time === undefined ? "?": time}\n`);
        });
        const weather = formatResults(response.data);
        return weather;
    }
    catch (error: unknown) {
        let message: string = "";
        if(error instanceof Error) {
            message = error.message;
        }
        else {
            message = String(error);
        }
        console.error(`HEY MITCH - ${message}`);
        process.exit(1);
    }
};

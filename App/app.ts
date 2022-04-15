require('dotenv').config();
const apiKey = process.env.WEATHER_API_KEY
import getWeather from "./Modules/weather";
import { buildTopString, buildBottomString } from "./Modules/screenFormating";
import determineScheduledHours from "./Modules/schedule";
//import { displayWeather, turnOff } from "./Modules/lcd";
import { turnOff } from "./Modules/lcd";
//import WeatherData from "./Modules/WeatherData";

const runProgram: boolean = determineScheduledHours();

if (runProgram){
    let top: string | undefined;
    let bottom: string;
    getWeather(apiKey).then(async (response: any) => {
        console.log(response);
        top = await buildTopString(response);
        bottom = buildBottomString(response);
    }).then(() => {
        console.log(top);
        console.log(bottom);
        //displayWeather(top, bottom);
    }).catch((err: unknown) => console.log(err));
}
else {
    turnOff();
}
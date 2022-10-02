require('dotenv').config();
const apiKey = process.env.WEATHER_API_KEY
let { displayWeather, turnOff } = require("./modules/lcd");
let { getWeather } = require("./modules/weather");
let { buildTopString, buildBottomString } = require("./modules/screen-formating");
const { determineScheduledHours } = require("./modules/schedule");

let top, bottom, runProgram;

runProgram = determineScheduledHours();

if (runProgram){
    let data = getWeather(apiKey).then(async (response) => {
        top = await buildTopString(response);
        bottom = buildBottomString(response);
    }).then(() => {
        displayWeather(top, bottom);
    }).catch((err) => console.log(err));
}
else {
    turnOff();
}

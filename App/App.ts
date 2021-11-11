require('dotenv').config();
const apiKey = process.env.WEATHER_API_KEY
const { /* displayWeather, */ turnOff } = require("./modules/lcd");
const { getWeather } = require("./modules/weather");
const { buildTopString, buildBottomString } = require("./modules/screen-formating");
const { determineScheduledHours } = require("./modules/schedule");

let top: string, bottom: string, runProgram: string;

runProgram = determineScheduledHours();

if (runProgram) {
    let data = getWeather(apiKey).then(async (response) => {
        top = await buildTopString(response);
        bottom = buildBottomString(response);
    }).then(() => {
        //displayWeather(top, bottom);
        console.log(top);
        console.log(bottom);
    }).catch((err) => console.log(err));
}
else {
    turnOff();
}

//add this when you are done:
/*"node-dht-sensor": "^0.4.3",
"rpio": "^2.4.2"*/
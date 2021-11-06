require('dotenv').config();
const apiKey = process.env.WEATHER_API_KEY
let { displayWeather } = require("./modules/lcd");
let { getWeather, buildString } = require("./modules/weather");

let top, bottom;

//finish this so it doesn't run at night. Also turn the LCD off during off hours.
const offTime = "22:00";
let currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false});
Date.parse(`1/1/2021 ${currentTime}`) < Date.parse(`1/1/2021 ${offTime}`) ? console.log('run program') : console.log('dont run program');

let data = getWeather(apiKey).then((response) => {
    top = buildString(response, 'top');
    bottom = buildString(response, 'bottom');
}).then(() => {
    //displayWeather(top, bottom);
    console.log(top);
    console.log(bottom);
}).catch((err) => console.log(err));
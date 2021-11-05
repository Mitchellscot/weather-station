require('dotenv').config();
const apiKey = process.env.WEATHER_API_KEY
let { displayWeather } = require("./modules/lcd");
let { getWeather } = require("./modules/weather");

let top;
let bottom;

let data = getWeather(apiKey).then((r) => {
    top = `OUT: ${r.current} - IN: 68`;
    bottom = `H ${r.high} L ${r.low} ${r.conditions}`;
}).then(() => {
    displayWeather(top, bottom);
}).catch((err) => console.log(err));



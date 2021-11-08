const sensor = require("node-dht-sensor");


const getIndoorTemperature = () => {
    sensor.read(22, 4, (err, temperature, humidity) => {
        if(!err) {
            setTimeout(() => console.log(temperature), 3000)
            return temperature;
        }
    })
}

module.exports = { getIndoorTemperature };
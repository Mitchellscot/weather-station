//const sensor = require("node-dht-sensor").promises;

const buildBottomString = (response) => {
    return `H${formatTemp(response.high)} L${formatTemp(response.low)} ${response.conditions}`;
};

const buildTopString = async (response) => {
    try {
        //const readTemp = await sensor.read(22, 4);
        let convertedToFahrenheit = 72;//convertToFahrenheit(readTemp.temperature.toFixed(0));
        return `C${formatTemp(response.current)} F${formatTemp(response.feels)} I ${convertedToFahrenheit}`;
    } catch (error) {
        console.log(`HEY MITCH - COULDNT READ TEMPERATURE ${error}`);
    }
}

const convertToFahrenheit = (temp) => {
    return temp * 9 / 5 + 32;
}

const formatTemp = (temperature) => {
    return temperature.length == 3 ? `${temperature}` : ` ${temperature}`
}

module.exports = { buildTopString, buildBottomString };
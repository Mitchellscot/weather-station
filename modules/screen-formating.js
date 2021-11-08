const { getIndoorTemperature } = require("./indoor-temp");


const buildString = (response, position) => {
    let indoorTemperature = getIndoorTemperature();
    setTimeout(() => console.log(`this is indoorTemperature: ${indoorTemperature}`), 3000)
    
     let formattedTemperature = convertToFahrenheit(indoorTemperature);
    console.log(formattedTemperature);
    return position === 'top' ? 
        `C${formatTemp(response.current)} F${formatTemp(response.feels)} I ${indoorTemperature}` :
        `H${formatTemp(response.high)} L${formatTemp(response.low)} ${response.conditions}`;
};

const convertToFahrenheit = (temp) => {
    return temp * 9/5 + 32;
}

const formatTemp = (temperature) => {
    return temperature.length == 3 ? `${temperature}` : ` ${temperature}`
}

module.exports = { buildString };
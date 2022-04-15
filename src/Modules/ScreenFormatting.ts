import WeatherData from "./WeatherData";

//const sensor = require("node-dht-sensor").promises;
//when you are back on a linux comp npm install node-dht-sensor
//throws an error on windows

export function BuildBottomString(data: WeatherData){
    return `H${formatTemp(data.high.toString())} L${formatTemp(data.low.toString())} ${data.conditions}`;
};

export function BuildTopString(data: WeatherData): string{
    let topString: string;
    try {
        const readTemp = { temperature: 25 }; //await sensor.read(22, 4);
        let convertedToFahrenheit = convertToFahrenheit(readTemp.temperature);
        topString =  ` C${formatTemp(data.current.toString())} F${formatTemp(data.feels.toString())} I ${convertedToFahrenheit.toFixed(0)}`;
    } catch (error) {
        console.log(`HEY MITCH - COULDNT READ TEMPERATURE ${error}`);        
    }
    return topString;
}

function convertToFahrenheit(temp: number): number{
    return Number((temp * 9/5 + 32).toFixed(0));
}

function formatTemp(temperature: string): string{
    return temperature.length == 3 ? `${temperature}` : ` ${temperature}`
}
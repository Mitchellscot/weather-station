import WeatherData from "./WeatherData";

//const sensor = require("node-dht-sensor").promises;

export function buildBottomString(data: WeatherData){
    return `H${formatTemp(data.high.toString())} L${formatTemp(data.low.toString())} ${data.conditions}`;
};

export async function buildTopString(data: WeatherData){
    try {
        const readTemp = { temperature: 25 }; //await sensor.read(22, 4);
        let convertedToFahrenheit = convertToFahrenheit(readTemp.temperature);
        return ` C${formatTemp(data.current.toString())} F${formatTemp(data.feels.toString())} I ${convertedToFahrenheit.toFixed(0)}`;
    } catch (error) {
        console.log(`HEY MITCH - COULDNT READ TEMPERATURE ${error}`);        
    }
}

function convertToFahrenheit(temp: number): number{
    return Number((temp * 9/5 + 32).toFixed(0));
}

function formatTemp(temperature: string): string{
    return temperature.length == 3 ? `${temperature}` : ` ${temperature}`
}
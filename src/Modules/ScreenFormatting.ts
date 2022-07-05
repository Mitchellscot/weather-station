import WeatherData from "./WeatherData";
const sensor = require("node-dht-sensor").promises;

export function BuildBottomString(data: WeatherData){
    return `H${formatTemp(data.high.toString())} L${formatTemp(data.low.toString())} ${data.conditions}`;
};

export async function BuildTopString(data: WeatherData): Promise<string>{
    let topString: string;
    try {
        let temp: string;
        const readTemp = await sensor.read(22, 4);
        if(readTemp === undefined){
            temp = "??";
        }
        else{
            temp = convertToFahrenheit(readTemp.temperature);
        }
        topString =  ` C${formatTemp(data.current.toString())} F${formatTemp(data.feels.toString())} I ${temp}`;
    } catch (error: unknown) {
        console.log(`HEY MITCH - PROBLEM READING TEMP ${error}`);
        process.exit(1);        
    }
    return topString;
}

function convertToFahrenheit(temp: number): string {
    return Number((temp * 9/5 + 32).toFixed(0)).toFixed(0);
}

function formatTemp(temperature: string): string{
    return temperature.length == 3 ? `${temperature}` : ` ${temperature}`
}
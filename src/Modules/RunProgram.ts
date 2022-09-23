import GetWeather from "./Weather";
import { BuildTopString, BuildBottomString } from "./ScreenFormatting";
import { DisplayWeather } from "./LCD";
import WeatherData from "./WeatherData";

export default async function RunProgram(apiKey: string, latitude: string, longitude: string): Promise<void>{
    try{
        const data: WeatherData = await GetWeather(apiKey, latitude, longitude);
        const topString = await BuildTopString(data);
        const bottomString = BuildBottomString(data);
	let d = new Date();
	console.log(d.toLocaleString('en-US'));
	console.log(topString);
	console.log(bottomString);
        DisplayWeather(topString, bottomString);
    }catch(error: unknown){
        console.error(`MESSAGE FOR YOU MITCHELL ${error}`);
        const topString = "  HEY MITCHELL  ";
        const bottomString = " CHECK THE LOGS ";
        DisplayWeather(topString, bottomString);
    }
}

import GetWeather from "./Weather";
import { BuildTopString, BuildBottomString } from "./ScreenFormatting";
//import { DisplayWeather } from "./LCD";
import WeatherData from "./WeatherData";

export default async function RunProgram(apiKey: string, latitude: string, longitude: string): Promise<void>{
    const data: WeatherData = await GetWeather(apiKey, latitude, longitude);
    const topString = BuildTopString(data);
    const bottomString = BuildBottomString(data);
    console.log(topString);
    console.log(bottomString);
    //DisplayWeather(topString, bottomString);
}
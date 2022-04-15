require('dotenv').config();
import RunProgram from './Modules/RunProgram';
import DetermineScheduledHours from "./Modules/Schedule";
import { TurnOff } from "./Modules/LCD";
const apiKey = process.env.WEATHER_API_KEY
const latitude = process.env.LATITUDE
const longitude = process.env.LONGITUDE

DetermineScheduledHours() ? RunProgram(apiKey, latitude, longitude) : TurnOff();
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
var WeatherData_1 = require("./WeatherData");
function formatResults(data) {
    var currentTemp = data.current.temp.toFixed(0);
    var feelsLike = data.current.feels_like.toFixed(0);
    var dailyHigh = data.daily[0].temp.max.toFixed(0);
    var dailyLow = data.daily[0].temp.min.toFixed(0);
    var conditions = parseConditions(data.daily[0].weather[0].main);
    var weatherData = new WeatherData_1["default"](currentTemp, feelsLike, dailyHigh, dailyLow, conditions);
    if (weatherData.conditions == 'Clouds') {
        weatherData.conditions = getClouds(data.daily[0].weather[0].id);
    }
    return weatherData;
}
function parseConditions(conditions) {
    switch (conditions) {
        case 'Clear':
            return 'Clear';
        case 'Thunderstorm':
            return 'Tstorm';
        case 'Drizzle':
            return 'Drizzl';
        case 'Rain':
            return 'Rain';
        case 'Snow':
            return 'Snow';
        case 'Mist':
            return 'Mist';
        case 'Smoke':
            return 'Smoke';
        case 'Haze':
            return 'Haze';
        case 'Dust':
            return 'Dust';
        case 'Fog':
            return 'Mist';
        case 'Sand':
            return 'Smoke';
        case 'Ash':
            return 'Ash';
        case 'Squall':
            return 'Squall';
        case 'Tornado':
            return 'Torndo';
        case 'Clouds':
            return 'Clouds';
        default:
            return 'HUH?';
    }
}
function getClouds(conditions) {
    switch (conditions) {
        case 801:
            return 'Sunny';
        case 802:
            return 'PCloud';
        case 803:
            return 'Cloudy';
        case 804:
            return 'OvCast';
        default:
            return 'WUT?';
    }
}
function getWeather(apiKey) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (typeof apiKey === undefined) {
                        throw 'Unable to find the API Key';
                    }
                    return [4 /*yield*/, axios_1["default"].get("https://api.openweathermap.org/data/2.5/onecall?lat=46.357994&lon=-94.268458&exclude=minutely,hourly&appid=" + apiKey + "&units=imperial")
                            .then(function (response) {
                            return formatResults(response.data);
                        })["catch"](function (err) { return console.log("HEY MITCH - COULDN'T GET YOUR WEATHER " + err + " - here is api key " + apiKey); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports["default"] = getWeather;
;

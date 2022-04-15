"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WeatherData = (function () {
    function WeatherData(current, feels, high, low, conditions) {
        this.current = current;
        this.feels = feels;
        this.high = high;
        this.low = low;
        this.conditions = conditions;
    }
    return WeatherData;
}());
exports.default = WeatherData;

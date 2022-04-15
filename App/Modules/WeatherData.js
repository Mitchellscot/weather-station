"use strict";
exports.__esModule = true;
var WeatherData = /** @class */ (function () {
    function WeatherData(current, feels, high, low, conditions) {
        this.current = current;
        this.feels = feels;
        this.high = high;
        this.low = low;
        this.conditions = conditions;
    }
    return WeatherData;
}());
exports["default"] = WeatherData;

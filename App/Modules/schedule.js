"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function DetermineScheduledHours() {
    var morningOffTime = "06:00";
    var eveningOffTime = "22:00";
    var currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    return Date.parse("1/1/2021 ".concat(morningOffTime)) < Date.parse("1/1/2021 ".concat(currentTime)) &&
        Date.parse("1/1/2021 ".concat(eveningOffTime)) > Date.parse("1/1/2021 ".concat(currentTime));
}
exports.default = DetermineScheduledHours;

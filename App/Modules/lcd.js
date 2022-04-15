"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurnOff = exports.DisplayWeather = void 0;
var rpio = require('rpio');
var init = Buffer.from([0x03, 0x03, 0x03, 0x02, 0x28, 0x0c, 0x01, 0x06]);
var LCD_LINE1 = 0x80, LCD_LINE2 = 0xc0;
var LCD_ENABLE = 0x04, LCD_BACKLIGHT = 0x08;
function lcdWriteBits(data) {
    rpio.i2cWrite(Buffer.from([(data | LCD_BACKLIGHT)]));
    rpio.i2cWrite(Buffer.from([(data | LCD_ENABLE | LCD_BACKLIGHT)]));
    rpio.i2cWrite(Buffer.from([((data & ~LCD_ENABLE) | LCD_BACKLIGHT)]));
}
function lcdWrite(data, mode) {
    lcdWriteBits(mode | (data & 0xF0));
    lcdWriteBits(mode | ((data << 4) & 0xF0));
}
function lineOut(str, addr) {
    lcdWrite(addr, 0);
    str.split('').forEach(function (c) {
        lcdWrite(c.charCodeAt(0), 1);
    });
}
function DisplayWeather(stringOne, stringTwo) {
    rpio.i2cBegin();
    rpio.i2cSetSlaveAddress(0x27);
    rpio.i2cSetBaudRate(10000);
    rpio.i2cSetClockDivider(2500);
    for (var i = 0; i < init.length; i++) {
        lcdWrite(init[i], 0);
        lineOut(stringOne, LCD_LINE1);
        lineOut(stringTwo, LCD_LINE2);
    }
    rpio.i2cEnd();
}
exports.DisplayWeather = DisplayWeather;
function TurnOff() {
    rpio.i2cBegin();
    rpio.i2cSetSlaveAddress(0x27);
    rpio.i2cSetBaudRate(10000);
    rpio.i2cWrite(Buffer.from([0]));
    rpio.i2cEnd();
}
exports.TurnOff = TurnOff;
;

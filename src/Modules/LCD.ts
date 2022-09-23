var rpio = require('rpio');

var init: Buffer = Buffer.from([0x03, 0x03, 0x03, 0x02, 0x28, 0x0c, 0x01, 0x06]);
var LCD_LINE1 = 0x80, LCD_LINE2 = 0xc0;
var LCD_ENABLE = 0x04, LCD_BACKLIGHT = 0x08;

function lcdWriteBits(data: any): void{
    rpio.i2cWrite(Buffer.from([(data | LCD_BACKLIGHT)]));
    rpio.i2cWrite(Buffer.from([(data | LCD_ENABLE | LCD_BACKLIGHT)]));
    rpio.i2cWrite(Buffer.from([((data & ~LCD_ENABLE) | LCD_BACKLIGHT)]));
}

function lcdWrite(data: number, mode: number): void{
    lcdWriteBits(mode | (data & 0xF0));
    lcdWriteBits(mode | ((data << 4) & 0xF0));
}

function lineOut(str: string, addr: number): void{
    lcdWrite(addr, 0);
        str.split('').forEach((c: string) => {
            lcdWrite(c.charCodeAt(0), 1);
        });
}
    
export function DisplayWeather(stringOne: string, stringTwo: string): void {
    rpio.i2cBegin();
    rpio.i2cSetSlaveAddress(0x27);
    rpio.i2cSetBaudRate(100000);
   // rpio.i2cSetClockDivider(2500);
    
    for (var i = 0; i < init.length; i++)
    {
        lcdWrite(init[i], 0);
        lineOut(stringOne, LCD_LINE1);
        lineOut(stringTwo, LCD_LINE2);
    }
    rpio.i2cEnd();
}

export function TurnOff(): void{
    rpio.i2cBegin();
    rpio.i2cSetSlaveAddress(0x27);
    rpio.i2cSetBaudRate(10000);
    rpio.i2cWrite(Buffer.from([0]));
    rpio.i2cEnd();
};

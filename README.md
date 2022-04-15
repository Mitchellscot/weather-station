# Raspberry Pi Weather Station
 This is a node program that runs on a raspberry pi and displays weather information on an LCD screen. Weather data is obtained via an API call and the indoor temperature is obtained through the white sensor you see on the left of the picture.

[![Pi](/images/operational.JPG "It works!")

- C stands for Current (not Celcius - all temps are in Fahrenheit)
- F stands for 'Feels Like'
- I stands for Indoor Temperature
- H stands for High
- L stands for Low
- And then there are 6 character spaces that sum up the conditions
(I only have 16 characters per line, so I'm a bit limited on what I can display 😉)

***

## Hardware
This project uses a raspbery pi zero W single core model. The pi makes a call to a weather api to get the current weather, so if you plan to make your own you need to get a wireless model, though you could do a single or quad core pi zero either one would work. I also have an LCD screen and a temperature / humidity sensor that you can see is on the left side of the box in the picture above. Finally I had a friend print a case for me with his 3D printer. If you are interested in having the 3d printer plans to make your own, contact me and I could hunt it down for you.

| Hardware | Amazon Link |
| ------ | ------ |
| Raspberry Pi Zero | [Link][LinkPi] | 
| Temperature Sensor | [Link][LinkSensor] |
| LCD Screen | [Link][LinkLcd] |

[LinkPi]: <https://www.amazon.com/Raspberry-Pi-Zero-Wireless-model/dp/B06XFZC3BX>
[LinkSensor]: <https://www.amazon.com/gp/product/B073F472JL/ref=ppx_yo_dt_b_search_asin_title>
[LinkLcd]: <https://www.amazon.com/GeeekPi-Character-Backlight-Raspberry-Electrical/dp/B07S7PJYM6>

***

##  Steps to install
1. Purchase the hardware (above) and make sure you also have an sd card and power supply for the Pi.
2. Install raspbian OS, you need the vcgencmd library for the sensor to work. I think you can put ubuntu on there and add vcgencmd. I think you have to add the user to the video group if you do.
3. If you have the single core model (armv6), you have to install an older version of node. The latest supported version of node for armv6 is 10.24.1. download [here](https://nodejs.org/dist/v10.24.1/node-v10.24.1-linux-armv6l.tar.xz)
- If you have the newer Pi Zero (armv7) than you can get away with the latest version.
4. Install this repo. I installed mine in the /srv folder but you can put yours wherever you want. If you install it in a different folder, change the cronjob below.
5. Go to open weather map and create an account. Get an api key [here](https://openweathermap.org/)
6. Go to google maps, find the location where you want to get your weather from, and get the longitude and latitude
7. Create a file named .env in the root folder of the project and add this to it:
```sh
WEATHER_API_KEY=(API KEY GOES HERE)
LATITUDE=(LATITUDE HERE)
LONGITUDE=(LONGITUDE HERE)
```
8. Create a cronjob to run the program every 15 minutes. I hard coded the screen to turn off between the hours of 10pm and 6am, otherwise it fetches the weather every 15 minutes (or however often you want the cronjob to run). I think there is a limit on how many times you can call the api in a given day.
```sh
PATH=/usr/bin/node
*/15 6-23 * * * /usr/bin/node /srv/weather-station/dist/Program.js >> ~/weather.log 2>&1
```
- This will output errors to ~/weather.log if any
- I use the sudo cronjob. You need to do that to access the sensor. That's ``crontab -e``
9. Attach the LCD screen to the pi with the given cables. Attach the temp sensor as well. Get it all packaged up in a nice case. See the image below to see what wires map to which gpio pins. Let me know if you have trouble installing the display I have some instructions but I can't link them here.
10. Plug it in and let it run! Most of this was set up 6 months ago, I might have missed some steps. If you run into any trouble just email me.

[![inside](/images/raspi-guts.JPG "insde the pi")

***

## Tech used
- [node-dht-sensor](https://www.npmjs.com/package/node-dht-sensor) Node library for the temp sensor
- [rpio](https://www.npmjs.com/package/rpio) Node library for the lcd screen
- typescript, dotenv, axios...

## Support
Email with questions or whatever mitchellscott@me.com

## License

[MIT](https://choosealicense.com/licenses/mit/)

ninja-time=========This driver gives an hourly, sunrise and sunset data emit to the dashboard as a HID device. 
VERY UNTESTED.## Description



There are a few requirements. 

The main helpers I used were cron and request which is are node modules see https://github.com/mikeal/request and https://github.com/ncb000gt/node-cron

simply do npm install request and npm install cron we also need npm install querystring

I really like the cron approach as you can do things like

var job = new cronJob({cronTime: '0 * * * * *', 
onTick: function() {

which runs every minute (the first parameter 0 is the seconds), but there is alot of flexibility in the cron job e.g. from the help page 00 30 11 * * 1-5 runs every weekday (Monday through Friday) at 11:30:00 AM. It does not run on Saturday or Sunday.

I think the setInterval works ok for rough time based events but the cron job seems to give more flexibility. I think if you want to say report a temperature every 5 minutes then this is a better approach. But not tried this longer term.

Anyway then we need the latitude and longitude which are entered manually - use this link to find them http://itouchmap.com/latlong.html

I then used this API located at https://www.mashape.com/biio/geoastroapi#endpoint-sunInfo simply signup for a free account and then subscribe to this API. You get 1000 calls per month and we should only need 1 per day. Unfortunately you need to provide credit card information even though you need not pay. Bear in mind that this is pretty untested code - please do your own investigation. 

The site gives you a key to use and this needs entering in the code. 

The rest of the code is pretty straightforward - we are using a HID device and then sending 'sunrise' and 'sunset' to the dashboard (once these are up and recorded then the two lines can be removed). Save the controls and set rules up as you like. 

set up as per http://ninjablocks.com/blogs/how-to/7355902-creating-modules-for-fun-and-profit 


Good luck and happy rule making.
## LicensePermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.







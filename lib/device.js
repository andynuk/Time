var stream = require('stream')
  , util = require('util')
, cronJob = require('cron').CronJob
,querystring = require('querystring')
,request = require('request');

// Give our device a stream interface
util.inherits(Device,stream);

// Export it
module.exports=Device;

/**
 * Creates a new Device Object
 *
 * @property {Boolean} readable Whether the device emits data
 * @property {Boolean} writable Whether the data can be actuated
 *
 * @property {Number} G - the channel of this device
 * @property {Number} V - the vendor ID of this device
 * @property {Number} D - the device ID of this device
 *
 * @property {Function} write Called when data is received from the Ninja Platform
 *
 * @fires data - Emit this when you wish to send data to the Ninja Platform
 */
function Device() {

  var self = this;

  // This device will emit data
  this.readable = true;
  // This device can be actuated
  this.writeable = true;

  this.G = "time"; // G is a string a represents the channel
  this.V = 0; // 0 is Ninja Blocks' device list
  this.D = 14; // 2000 is a generic Ninja Blocks sandbox device


    var res =0;
    var sunset = new Date(2013,3,13,20,49,0,0);
    var sunrise = new Date(2013,3,13,20,44,0,0);


    
    var latitude = 52.9;
    var longtitude = -0.645;
    var key = 'Q27290SXj8rhkS9CoEKhewnuiHBN9tLV';
    var post_domain = 'biio-geoastroapi.p.mashape.com';
    var post_path = 'sun_info';
    var post_port = 433;
 
 // bit of  hack but on first run set sunrise and sunset
    var today = new Date();
    
    var post_data = querystring.stringify({
                                          'day' : today.getDate(),
                                          'lat' : latitude,
                                          'lng' : longtitude,
                                          'month' : (today.getMonth()+1),
                                          'year' : today.getFullYear()
                                          });
    
    
    request(
            {method: 'GET',
            url: 'https://'+post_domain+'/'+post_path+'?'+post_data,
            headers : { 'X-Mashape-Authorization':key}
            }
            , function(error,response,body){
            //console.log(body);
            
            var result = JSON.parse(body);
            
            sunrise = new Date(today.getFullYear(),today.getMonth(),today.getDate(),result.sunrise.substring(0,2),result.sunrise.substring(3,5));
            sunset  = new Date(today.getFullYear(),today.getMonth(),today.getDate(),result.sunset.substring(0,2),result.sunset.substring(3,5));
            
            console.log('Sunrise is at :'+sunrise+' Sunset is at :'+sunset);
            });
    
    
    
    
    
    
    
    
    var jobSetSunset = new cronJob({cronTime: '0 1 0 * * *',
                                   onTick: function(){
                                   //runs once a day at 1 minute past midnight
                                   sunset = new Date(2013,1,1,0,0,0,0);
                                   sunrise = new Date(2013,1,1,0,0,0,0);
                                   
                                   var today = new Date();
                                   
                                   var post_data = querystring.stringify({
                                                                         'day' : today.getDate(),
                                                                         'lat' : latitude,
                                                                         'lng' : longtitude,
                                                                         'month' : (today.getMonth()+1),
                                                                         'year' : today.getFullYear()
                                                                         });
                                   
                                   
                                   request(
                                           {method: 'GET',
                                           url: 'https://'+post_domain+'/'+post_path+'?'+post_data,
                                           headers : { 'X-Mashape-Authorization':key}
                                           }
                                           , function(error,response,body){
                                           //console.log(body);
                                           
                                           var result = JSON.parse(body);
                                           
                                           sunrise = new Date(today.getFullYear(),today.getMonth(),today.getDate(),result.sunrise.substring(0,2),result.sunrise.substring(3,5));
                                           sunset  = new Date(today.getFullYear(),today.getMonth(),today.getDate(),result.sunset.substring(0,2),result.sunset.substring(3,5));
                                           
                                           console.log('Sunrise is at :'+sunrise+' Sunset is at :'+sunset);
                                           });
                                   
                                   
                                   },
                                   start:true});
    
    
    
    var job = new cronJob({cronTime: '0 * * * * *', 
                          onTick: function() {
                          //runs every minute
                          var currentDate = new Date();
                          var hours = currentDate.getHours();
                          var minutes = currentDate.getMinutes();
                          if (hours == sunset.getHours() && minutes == sunset.getMinutes())
                          {
                          self.emit('data','sunset');

                          console.log('sunset');
                          }
                          //self.emit('data','sunset');
                          //self.emit('data','sunrise');
                          //self.emit('data','midnight');
                          if (hours == 0 && minutes==0)
                          {
                          self.emit('data','midnight');

                          console.log('midnight');
                          }
                          if (minutes ==0)
                          {
                          self.emit('data',hours);
                          console.log(hours);
                          }
                          if (hours == sunrise.getHours() && minutes == sunrise.getMinutes())
                          {
                          self.emit('data','sunrise');
                          console.log('sunrise');
                          }
                          
                          //if (res==0)
                          //{
                          //self.emit('data','sunrise');
                          //}
                          //if (res==1)
                          //{
                          //self.emit('data','sunset');
                          //}
                          //if (res==2)
                          //{
                          //self.emit('data','midnight');
                          //}
                          //res = res + 1;
                          //if (res==3)
                          //{
                          //res=0;
                          //}
                          
            },
            start:true
            });


};

/**
 * Called whenever there is data from the Ninja Platform
 * This is required if Device.writable = true
 *
 * @param  {String} data The data received
 */
Device.prototype.write = function(data) {

  // I'm being actuated with data!
  console.log(data);
};

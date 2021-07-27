const dns = require("dns");
var ping = require ("net-ping");

var targetUrl = "google.com";

function getIpAddressFromUrl(url, callback){
    dns.resolve4(url, (err, addresses) => {
        if (err) {
          console.log(err);
          callback(null)
          return;
        }
      
        var ip = addresses[0];
        callback(ip)
    });
}

function getPingFromHost(target, callback){
    var session = ping.createSession ();
    var ms = null;
    
    session.pingHost (target, function (error, target, sent, rcvd) {
        ms = rcvd - sent;
        
        if (error){
            console.log (target + ": " + error.toString ());
            callback(null);
        }
        else{
            callback(ms);
        }
    });
}

function getPingFromUrl(url, callback){
    getIpAddressFromUrl(url, (ip) => {
        getPingFromHost(ip, (ping) => {
            callback(ping);
        });
    });
}

module.exports.getPingFromUrl = getPingFromUrl;

function isStringHaveSpaces(str){
    return str.indexOf(' ') != -1;
}
module.exports.isStringHaveSpaces = isStringHaveSpaces;


function isLengthInRange(str, from ,to){
    return str.length >= from && str.length <= to;
}
module.exports.isLengthInRange = isLengthInRange;

function isEmail(str){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(str);
}
module.exports.isEmail = isEmail;

function isPhoneNumber(str){
    const re1 = /^\+?[0-9]{12}$/; //+380977777777
    const re2 = /^[0-9]{10}$/; //0977777777
    return re1.test(str) || re2.test(str);
}
module.exports.isPhoneNumber = isPhoneNumber;

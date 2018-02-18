var request = require('request');   //request package is used for making requests


// BASIC WORKING OF REQUEST PACKAGE
// var url = "http://www.google.com";
//
// request(url, function (error, response, body) {
//    if(!error && response.statusCode == 200){
//        console.log(body);
//    }
//    else {
//        console.log("Something went wrong");
//        console.log(error);
//    }
// });


// WORKING WITH YAHOO WEATHER API
var url = "https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
request(url, function (error, res, body) {
    if (!error && res.statusCode ==200){
        // console.log(body["query"]);  // we cannot use it like this bcoz it is  a string and we need to use JSON.parse()
        // console.log(typeof body)    // we get the result as string.
        var parseddata = JSON.parse(body);
        var sunsettime = (parseddata["query"]["results"]["channel"]["astronomy"]["sunset"]);
        console.log("sunset time is " + sunsettime);
    }
    else {
        console.log(error);
    }
});
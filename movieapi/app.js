//&apikey=thewdb

var express = require('express');
var app = express();

var ejs= require('ejs');
var request = require('request');
var bodyParser = require('body-parser');



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.render("moviesearch")
});


app.get('/results', function (req, res) {
    var movie = req.query.nameofmovie;
    var url = "http://www.omdbapi.com/?s="+ movie +"&apikey=thewdb";
    request(url, function (error, response, body) {
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
        else {
            console.log("some error occoured");
            console.log(error);
        }
    })
});




// app.get("/results", function (req, res) {
//     var movie = req.query.nameofmovie;    //nameofmovie is the name in .ejs file
//     var url = "http://www.omdbapi.com/?s="+ movie +"&apikey=thewdb";
//     request(url, function (error, response, body) {
//         if(!error && response.statusCode == 200){
//             var data = JSON.parse(body);
//             // res.send(results["Search"][0]["Title"]);
//             res.render("results", {data : data});
//         }
//     })
// });



app.listen(3000, function () {
    console.log("server on 3000")
});
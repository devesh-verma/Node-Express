var express = require('express');
var app = express();


// "/" => Hi
// "/bye" => Goodbye
// "/dog" => MEOW


app.get("/", function (req, res) {
    res.send("Hi");
});


app.get("/bye", function (req, res) {
    res.send("Goodbye")
});


app.get("/dog", function (req, res) {
    res.send(
        "MEOW"
    )
});


app.listen(3000, function () {
    console.log("server running at 3000")
});
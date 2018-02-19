var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
   res.render("landing")
});


var campgrounds = [
    {name:"Ground 1", image: "https://farm9.staticflickr.com/8737/16979987328_1dcbfe73a8.jpg"},
    {name:"Ground 2", image: "https://farm3.staticflickr.com/2870/13589924443_aba8d074e5.jpg"},
    {name:"Ground 3", image: "https://farm9.staticflickr.com/8798/16979982678_3fefe3c2a7.jpg"},
    {name:"Ground 1", image: "https://farm9.staticflickr.com/8737/16979987328_1dcbfe73a8.jpg"},
    {name:"Ground 2", image: "https://farm3.staticflickr.com/2870/13589924443_aba8d074e5.jpg"},
    {name:"Ground 3", image: "https://farm9.staticflickr.com/8798/16979982678_3fefe3c2a7.jpg"},
    {name:"Ground 1", image: "https://farm9.staticflickr.com/8737/16979987328_1dcbfe73a8.jpg"},
    {name:"Ground 2", image: "https://farm3.staticflickr.com/2870/13589924443_aba8d074e5.jpg"},
    {name:"Ground 3", image: "https://farm9.staticflickr.com/8798/16979982678_3fefe3c2a7.jpg"}
];


// This route shows all the campgrounds
app.get("/campgrounds", function (req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
});


// POST route so that user can submit his own campground
app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}; //This is assign the new name and new image to campgrounds
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");   //we have two "/campgrounds" url but by default it goes to GET
});


// This route shows the form to add new campground
app.get("/campgrounds/new", function (req, res) {
   res. render("new");
});


app.listen(3000, function () {
    console.log("server at 3000")
});
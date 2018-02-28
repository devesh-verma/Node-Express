var express     = require('express'),
    app         = express(),
    ejs         = require('ejs'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose');


mongoose.connect("mongodb://localhost/yelp_camp");  // Connecting to mongoose database named yelp_camp
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
   res.render("landing")
});


//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    description:String
});


//The line below is converting the schema to model and generating an object which is stored in Campgrounds variable
//which we  use to perform functions.
var Campground = mongoose.model("Campground", campgroundSchema);


// Campground.create({
//     name:"1",
//     image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSthll6flqT-KHyj4fB004RDVHPHN99vw5I5sKGWM3R2AAHOhdFOA",
//     description:"This is a nice camp"
// }, function (err, campground) {
//     if(err){
//         console.log(err)
//     }
//     else {
//         console.log(campground)
//     }
// });

// This is INDEX route: shows all the campgrounds
app.get("/campgrounds", function (req, res) {
    //GET ALL CAMPGROUNDS
    Campground.find({}, function (err, allCampgrounds) {
        if(err){
            console.log(err);
        }
        else {
            res.render("index", {campgrounds: allCampgrounds});   //This line is use to send the data from db to the .ejs file which has campgrounds as
        }
    });
});


// This is a CREATE route: POST route so that user can submit his own campground
app.post("/campgrounds", function (req, res) {
    //Getting the name and image url entered by the user in the form at /campgrounds/new
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    //Making a new object named newCampground which has name and image coming form form
    var newCampground = {name: name, image: image, description: description}; //This is assign the new name and new image to campgrounds
    //Create a new campground and save to DB
    Campground.create(newCampground,function (err) {
        if(err){
            console.log(err);
        }
        else{
            // if everything was fine we redirect user to all campgrounds page
            res.redirect("/campgrounds");
        }
    });
});


// This is NEW route : shows the form to add new campground
app.get("/campgrounds/new", function (req, res) {
   res. render("new");
});

//NOTE : THE ORDER OF THE ROUTES "/campgrounds/new" AND "/campgrounds/:id" IS VERY IMPORTANT
//BECAUSE IF WE PUT THE ROUTE "/campgrounds/:id" BEFORE THIS ROUTE "/campgrounds/new" THE USER
//WILL NEVER BE ABLE TO ACCESS "/campgrounds/new".


//This is SHOW route: this is used to display info of a particular campground
app.get("/campgrounds/:id",function (req, res) {
    //find the campground with provided mongoDB ID
    var campID = req.params.id;     //getting the mongoose ID
    Campground.findById(campID, function (err, foundCampground) {
        if (err){
            console.log(err);
        }
        else {
            //In show.ejs we will be displaying the complete info of the selected campground
            res.render("show", {campground:foundCampground});
        }
    });
});


// RUNNING THE SERVER
app.listen(3000, function () {
    console.log("server at 3000")
});
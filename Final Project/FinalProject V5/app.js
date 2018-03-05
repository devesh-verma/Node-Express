var express     = require('express'),
    app         = express(),
    ejs         = require('ejs'),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose');

//Importing modules

//1.SCHEMA SETUP
var Campground = require('./models/campground');
var Comment    = require('./models/comment');
var seedDB     = require('./seeds');
mongoose.connect("mongodb://localhost/yelp_camp_V4");  // Connecting to mongoose database named yelp_camp

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

seedDB();   // This will execute everytime and it will remove the data from and and populate it with sample data for our use.

app.get("/", function (req, res) {
   res.render("landing")
});


// This is INDEX route: shows all the campgrounds
app.get("/campgrounds", function (req, res) {
    //GET ALL CAMPGROUNDS
    Campground.find({}, function (err, allCampgrounds) {
        if(err){
            console.log(err);
        }
        else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});   //This line is use to send the data from db to the .ejs file which has campgrounds as
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
   res. render("campgrounds/new");
});

//NOTE : THE ORDER OF THE ROUTES "/campgrounds/new" AND "/campgrounds/:id" IS VERY IMPORTANT
//BECAUSE IF WE PUT THE ROUTE "/campgrounds/:id" BEFORE THIS ROUTE "/campgrounds/new" THE USER
//WILL NEVER BE ABLE TO ACCESS "/campgrounds/new".


//This is SHOW route: this is used to display info of a particular campground
app.get("/campgrounds/:id",function (req, res) {
    //find the campground with provided mongoDB ID
    var campID = req.params.id;     //getting the mongoose ID
    //In the below line we are retrieving the campground and then poppulating the comments data in it that it with the complete comment not just the ID
    Campground.findById(campID).populate("comments").exec(function(err, foundCampground){
        if (err){
            console.log(err);
        }
        else {
            // console.log(foundCampground);
            //The output in console is below:
            //
            // { comments:
            //     [ { _id: 5a9054cfbab9062cf84a2363,
            //         text: 'This place is great',
            //         author: 'Author',
            //         __v: 0 } ],
            //         _id: 5a9054cfbab9062cf84a2360,
            //     name: 'camp 1',
            //     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSthll6flqT-KHyj4fB004RDVHPHN99vw5I5sKGWM3R2AAHOhdFOA',
            //     description: 'blah blah blah',
            //     __v: 1 }

            //In show.ejs we will be displaying the complete info of the selected campground
            res.render("campgrounds/show", {campground:foundCampground});
        }
    });
});


//NOTE: SINCE WE ALREADY HAD A FILE NAMED AS new.ejs SO WE MOVED FILES TO PARTICULAR FOLDERS
//=======================
// COMMENTS ROUTES
//=======================

app.get("/campgrounds/:id/comments/new", function (req, res) {
    //find campground by ID
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
        }
        else{
            //if the campground is found all we do is render the form.
            res.render("comments/new", {campground:campground});
        }
    });

});

//submitting the comment form
app.post("/campgrounds/:id/comments", function (req, res) {
    //Lookup campground using ID
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            // console.log(req.body.comment);
            Comment.create(req.body.comment, function (err, comment) {
                if(err){
                    console.log(err);
                }
                else{
                    campground.comments.push(comment._id);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
    //create new comment
    //connect new comment to campground
    //after submitting refirect to campground
});


// RUNNING THE SERVER
app.listen(3000, function () {
    console.log("server at 3000")
});
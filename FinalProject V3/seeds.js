var mongoose = require('mongoose');

//import  models
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "camp 1",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSthll6flqT-KHyj4fB004RDVHPHN99vw5I5sKGWM3R2AAHOhdFOA",
        description: "blah blah blah"
    },
    {
        name: "camp 2",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScywb_dWxB6Ft-OPvyAtx-QOTJ2TliWfjRpqGkju0D_9_UDqkT",
        description: "blah blah blah"
    },
    {
        name: "camp 3",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScywb_dWxB6Ft-OPvyAtx-QOTJ2TliWfjRpqGkju0D_9_UDqkT",
        description: "blah blah blah"
    }
];


//This function is used to empty the database and populate it again.
function seedDB() {
    //The below four lines of code will delete all the data from database.
    Campground.remove({}, function (err) {
        if(err){
            console.log(err)
        }
        console.log("removed campgrounds");

        //Add few comments
        //The below code will wait until we have removed all from the database
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if(err){
                    console.log(err)
                }
                else{
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great",
                            author:"Author"
                        }, function (err, comment) {
                                if(err){
                                    console.log(err)
                                }
                                else {
                                    campground.comments.push(comment._id);
                                    campground.save();
                                    console.log("created new comment");
                                }
                        })
                }
            })
        })
    });
}

//This line returns the function seedDB() to the app.js file and is stored in variable seedDB in app.js and is execute everytime we run the server.
module.exports = seedDB;

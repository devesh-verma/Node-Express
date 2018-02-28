var mongoose = require('mongoose');


//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    description:String,
    comments:[
            //What we are saying here is comment property is an array of comment IDs
        {   //the below code means that we are not embedding the actual comment here we are embedding the IDs
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});


//The line below is converting the schema to model and generating an object which is stored in Campgrounds variable
//which we  use to perform functions.
var Campground = mongoose.model("Campground", campgroundSchema);

//returning the value
module.exports = Campground;
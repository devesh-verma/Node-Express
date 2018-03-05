var mongoose = require('mongoose');

//import  models
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "camp 1",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSthll6flqT-KHyj4fB004RDVHPHN99vw5I5sKGWM3R2AAHOhdFOA",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    },
    {
        name: "camp 2",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScywb_dWxB6Ft-OPvyAtx-QOTJ2TliWfjRpqGkju0D_9_UDqkT",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    },
    {
        name: "camp 3",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScywb_dWxB6Ft-OPvyAtx-QOTJ2TliWfjRpqGkju0D_9_UDqkT",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
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

var express =require('express');
var bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.urlencoded({extended: true})); //this is to tell express to use body parser.
app.set("view engine", "ejs"); //this tell express that app the templates are in ejs.

var friends = ["tony", "Thea", "Oliver"];

app.get("/", function(req, res){
   res.render("home");
});


app.get("/friends", function(req, res){
   res.render("friends", {friends:friends})
});


//post route is used when we are sending data
app.post("/addfrnd", function(req, res){
    var newfrnd = req.body.newfrnd; //namefrnd is the name attribute in friends.ejs
    // console.log(frnd);
    friends.push(newfrnd);
    res.redirect("/friends")
});



app.listen(3000, function(req, res){
   console.log("server at 3000")
});
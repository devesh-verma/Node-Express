var express = require('express');

var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

//root route
app.get("/animal/:thing", function (req, res) {
   var thing = req.params.thing;
    res.render("home", {thingvar: thing})
});


//looping
app.get("/posts", function (req, res) {
    var posts = [
        {title: "post1", writer: "susy"},
        {title: "Post2", writer: "roma"},
        {title: "Post3", writer: "seema"}
    ];

    res.render("post", {posts: posts});
});



app.listen(3000, function () {
    console.log("server runnuing 3000")
});
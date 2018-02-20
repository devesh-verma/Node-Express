var express         = require('express'),
    methodOverride  = require('method-override'),
    bodyParser      = require('body-parser'),
    expressSanitizer= require('express-sanitizer'),
    mongoose        = require('mongoose'),
    app             = express();


//connecting to mongodb
mongoose.connect("mongodb://localhost/restfulblogapp");
//setting view engine
app.set("view engine", "ejs");
//serving css files
app.use(express.static("public"));
//body-parser
app.use(bodyParser.urlencoded({extended: true}));
//Express-Sanitizer should always be after body-parser
app.use(expressSanitizer());
//The line below searches for _method in the URL
app.use(methodOverride("_method"));


//Creating schema for mongoDB
var blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{type: Date, default: Date.now}
});

//creating a mondel and storing the object in Blog.
var Blog = mongoose.model("Blog", blogSchema);


//Sample for populating db

// Blog.create({
//     title:"Test Blog",
//     image:"https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg",
//     body:"This is a test blog"
// },function (err, blog) {
//     if(err){
//         console.log(err)
//     }
//     else {
//         console.log(blog)
//     }
// });


//RESTful Routes

app.get("/", function (req, res) {
    res.redirect("/blogs")
});

//INDEX
app.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if(err){
            console.log(err)
        }
        else {
            res.render("index", {blogs: blogs})
        }
    });
});


//NEW Route
app.get("/blogs/new", function (req, res) {
    res.render("new");
});

//CREATE Route
app.post("/blogs", function(req, res){
   //The below line is used to sanitize.In order to understand that lets make two console.log() statements.One before sanitizing and one after.
   console.log(req.body);
   req.body.blog.body = req.sanitize(req.body.blog.body);
   console.log(req.body);
   //create blog
   var data = req.body.blog;
   //In the above line we have done "req.body.blog". this is because in our new.ejs we are using the name="blog[title]".
   //what this doing is it will be storing all the data i.e. title, image url, blog post to one object named blog.
   //and hence we can access it all at once by just doing "req.body.blog"
   Blog.create(data, function (err, newblog) {
       if(err){
           res.render("new")
       }
       else {
           //then redirect to index
           res.redirect("/blogs")
       }
   });
});


//SHOW route
app.get("/blogs/:id", function (req, res) {
    var id = req.params.id;
    Blog.findById(id, function (err, foundBlog) {
        if(err){
            res.redirect("/blogs");
        }
        else {
            res.render("show", {blog:foundBlog});
        }
    });
});


// EDIT route
app.get("/blogs/:id/edit", function (req, res) {
    var id = req.params.id;
    Blog.findById(id, function (err, foundBlog) {
        if(err){
            res.redirect("/blogs")
        }
        else {
            res.render("edit", {blog: foundBlog})
        }
    });
});


// UPDATE Route
app.put("/blogs/:id", function (req, res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);  //sanitization after update
    var id = req.params.id;     //Stores the ID of the particular post
    var body = req.body.blog;   //This take the value of title image and desc which we have given name="blog[title/image/content]".
    Blog.findByIdAndUpdate(id, body, function (err, updatedBlog) {
        if(err){
            res.redirect("/blogs")
        }
        else{
            res.redirect("/blogs/" + id)    //Redirect user to updated post page.
        }
    })
});


//DELETE Route
app.delete("/blogs/:id", function (req, res) {
    var id = req.params.id;     //Stores the ID of the particular post
    Blog.findByIdAndRemove(id, function (err) {
        if(err){
            res.redirect("/blogs");
        }
        else {
            res.redirect("/blogs");
        }
    });
});


//SERVER
app.listen(3000, function () {
    console.log("server at 3000")
});
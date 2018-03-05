var express               = require('express'),
    mongoose              = require('mongoose'),
    passport              = require('passport'),
    bodyParser            = require('body-parser'),
    LocalStratergy        = require('passport-local'),
    PassportLocalMongoose = require('passport-local-mongoose');

//Requiring files
var User = require("./models/user");


mongoose.connect("mongodb://localhost/authdemo_app");
var app = express();

app.use(require("express-session")({
    //Secret is to encode and decode and it can anything.
    secret: "dexter",
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
//Below two lines are required whenever we are using passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStratergy(User.authenticate()));
//These are very imp lines in passport.js.
//These are responsible for reading the session, taking the data
//from the session, encoding and unencoding it
//These have  added automatically when we added the line "UserSchema.plugin(passportLocalMongoose);"
//So we need not define by ourselves rather we are using what comes with user.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ===========================
//     ROUTES
// ===========================

app.get("/", function(req, res){
    res.render("home");
});


app.get("/secret", function(req, res){
    res.render("secret")
});

//Auth Routes

//Show signup form
app.get("/register", function(req, res){
    res.render("register")
});

//handling user sign up
app.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    //What we are doing in the above line is we are making a new user and storing in db, and then we pass
    //the  password from the form but the password is never save instead a hashed version is saved.
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret")
        });
    });
});


//LOGIN ROUTES

//login form
app.get("/login", function(req, res){
    res. render("login")
});

//login logic
app.post("/login", passport.authenticate("local", {
    //This is a middleware, a middleware a piece a code that runs between start of the route and final end of the route.
    successRedirect: "/secret",
    failureRedirect: "/login"
}) ,function(req, res){

});

app.listen(3000, function(){
    console.log("server at 3000")
});
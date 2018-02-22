var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/blog_demo");


//POST Schema is intentionally kept on top because we need to
//POST Schema - title, content

var postSchema = new mongoose.Schema({
    title:String,
    content:String
});

var Post = mongoose.model("Post", postSchema);


//USER Schema - email, name

var userSchema = new mongoose.Schema({
    email:String,
    name:String,
    posts:[postSchema]      //A user can have multiple posts, and this adds a posts array to userSchema
});

var User = mongoose.model("User", userSchema);

//Populating db
//Adding new user to DB
// var newUser  = new User({
//     email:"hermione@gmail.com",
//     name:"hermione"
// });
//
// //Pushing post to particular user
// newUser.posts.push({
//     title:"How do ride",
//     content:"I know how to ride"
// });
//
// //Save the content to DB
// newUser.save(function (err, user) {
//     if(err){
//         console.log(err)
//     }
//     else {
//         console.log(user)
//     }
// });

// User.create({
//     name:"Devesh",
//     email:"devesh@gmail.com",
// },function (err, newuser) {
//     if(err){
//         console.log(err)
//     }
//     else {
//         console.log(newuser)
//     }
// });


// Post.create({
//     title:"new post",
//     content:"new content"
// }, function (err, newpost) {
//     if (err){
//         console.log(err)
//     }
//     else {
//         console.log(newpost)
//     }
// });


//Retrieving user
//If we use findOne() function then we get back a dictionary kind of output
//But if we just use find() then get back an array.
User.findOne({name:"hermione"}, function (err, user) {
    if(err){
        // console.log(err)
    }
    else {
        user.posts.push({
            title:"this is new post",
            content:"this is new content"
        });
        user.save(function (err, user) {
            if(err){
                console.log(err)
            }
            else{
                console.log(user)
            }
        })
    }
});
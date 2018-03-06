var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/blog_demo_2");

//Importing modules Post and User
var Post = require("./models/post");
var User = require("./models/user");


//In the below function we are adding comments to a user, and in console instead of seeing the actual post content we get to see the IDs of posts
Post.create({
    title:"kachua burger part 4",
    content:"kachua blah part 4"
},function(err, post) {
    User.findOne({email:"kachua@gmail.com"}, function (err, foundUser) {
        if(err){
            console.log(err)
        }
        else {
            //in the below line .posts is referring to the posts we have declared in userSchema.
            //where as (post) is referring to the post that is just being created and pushed
            foundUser.posts.push(post);
            foundUser.save(function (err, data) {
                if(err){
                    console.log()
                }
                else {
                    console.log(data)
                }
            });
        }
    });
});

//find user with this email and retrieve the posts
// User.findOne({email:"kachua@gmail.com"}).populate("posts").exec(function (err, user) {
//     if(err){
//         console.log(err)
//     }
//     else {
//         console.log(user)
//     }
// });


//
// User.create({
//     email:"kachua@gmail.com",
//     name:"kachua Belcher"
// });
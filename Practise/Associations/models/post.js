var mongoose = require('mongoose');


//POST Schema - title, content
var postSchema = new mongoose.Schema({
    title:String,
    content:String
});

var Post = mongoose.model("Post", postSchema);

//The below line is returning the value
module.exports = Post;
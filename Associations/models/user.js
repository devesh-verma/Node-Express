var mongoose = require('mongoose');

//USER Schema - email, name

var userSchema = new mongoose.Schema({
    email:String,
    name:String,
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ]      //A user can have multiple posts, and this adds a posts array to userSchema
});

var User = mongoose.model("User", userSchema);

//The below line is returning the value
module.exports = User;
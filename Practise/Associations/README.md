## export.models()

This is used  when we want to make our project modular and we are using different files for 
different uses.

Like in this project our file `references.js` was like as follow:
```js
//POST Schema - title, content
var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    title:String,
    content:String
});

var Post = mongoose.model("Post", postSchema);


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
```

Now we want to make seperate files for USER and POST.
So to get that modularity we make two new files named post.js and user.js.

`post.js`
```js
var mongoose = require('mongoose');


//POST Schema - title, content
var postSchema = new mongoose.Schema({
    title:String,
    content:String
});

var Post = mongoose.model("Post", postSchema);

module.exports = Post;
```

`user.js`
```js
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

module.exports = User;
```

And after this we need to require post.js and user.js in out references.js for this all we need to do is-
```js
//Importing modules Post and User
var Post = require("./models/post");
var User = require("./models/user");
```

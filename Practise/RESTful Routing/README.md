# RESTful Routes

----------------------------------------------------------------------------------------------------------------
| Name       | Path          | Method | Purpose                                        |Mongoose Methods       | 
| ---------- |:-------------:| -----: |:----------------------------------------------:|:---------------------:|
| Index      | /blog         |  GET   |List all blogs.                                 |Blog.find()            |  
| New        | /blog/new     |  GET   |Show new blog addition form.                    |N/A                    |   
| Create     | /blog         |  POST  |Create a new blog and redirect somewhere.       |Blog.created()          |  
| Show       | /blog/:id     |  GET   |Show info about one specific blog.              |Blog.findByid()         |
| Edit       | /blog/:id/edit|  GET   |Show edit form for one blog.                    |Blog.findByid()         |
| Update     | /blog/:id     |  PUT   |Update a particular blog and redirect somewhere |Blog.findByidAndUpdate()|
| Destroy    | /blog/:id     | DELETE |Delete a particular blog and redirect somewhere.|Blog.findByidAndRemove()|
----------------------------------------------------------------------------------------------------------------

## Method Overriding

app.js
```js
//UPDATE ROUTE
app.put("/blogs/:id", function (req, res) {
    res.send("Updated")
});
```

edit.ejs
```ejs
<div class="ui main text container segment">
    <div class="ui huge header">Edit  <%= blog.title%></div>
    <form class="ui form" action="/blogs/<%= blog._id%>" method="PUT">
</div>
```
After doing the above changes when we got to /blogs/:id/edit and edit the content and submit.
it takes us to the SHOW page and the data we entered is not updated instead we can see the all the data is
displayed in the URL.
Something like this `http://localhost:3000/blogs/5a8be6cb9fce132ff52a50f0?blog%5Btitle%5D=new+post+3+UPDATED&blog%5Bimage%5D=https%3A%2F%2Fwww.guideBlogs.org%2Fwp-content%2Fuploads%2F2015%2F05%2FBlog-Im-Not.jpg&blog%5Bbody%5D=new+post+3`

This happens because HTML forms dont support PUT request, they only support GET and POST.
THIS IS WHY WHEN WE ARE SENDING A `PUT` REQUEST IT IS TREATED AS A `GET` REQUEST.


SO THIS IS WHERE METHOD OVERRIDE COME-IN.

Method-Override is a simple package and we tell express to use.

`npm install method-override --save`

edit.ejs
```ejs
<div class="ui main text container segment">
    <div class="ui huge header">Edit  <%= blog.title%></div>
    <form class="ui form" action="/blogs/<%= blog._id%>?_method=PUT" method="POST">
</div>
```

app.js
```js
var methodOverrirde = require('method-override');
//The line below searches for _method in the URL
app.use(methodOverride("_method"));
```

So what happens now is when we hit the submit button after editing the content
what method-override does is as it see's `_method` in the URL it gets to know it is not a POST request instead it
is a PUT request and hence PUT request is executed.

## Express Sanitizer

When we provide user with the ability in our textarea to use html tags, a user can also misuse that by executing
scripts.
To protect out website from such things we can make use of `express-sanitizer`.

In the below gif we can clearly see after submitting the first console.log() has HTML and script tags in body.
```text
{ blog: 
   { title: 'newly created post with html tags and script tag for sanitiza
tion',
     image: 'https://www.guideBlogs.org/wp-content/uploads/2015/05/Blog-Im-N
ot.jpg',
     body: '<h1>My new Blog</h1>\r\n<script>alert("Hacked")</script>' } }
``` 

But in the second console.log() the body doesnot have script tag.
```text
{ blog: 
   { title: 'newly created post with html tags and script tag for sanitization',
     image: 'https://www.guideBlogs.org/wp-content/uploads/2015/05/Blog-Im-Not.jpg',
     body: '<h1>My new Blog</h1>\r\n' } }
```
![sanitization](https://github.com/devshiva619/Node-Express/blob/master/RESTful%20Routing/READMEassests/sanitization.gif)
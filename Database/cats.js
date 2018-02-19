var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/cat_app");


var catSchema = new mongoose.Schema({
    name:String,
    age:Number,
    temperament:String
});


var Cat = mongoose.model("Cat", catSchema);

// add new cat

// var george = new Cat({
//     name: "Billu",
//     age: 11,
//     temperament: "Angry"
// });
//
// george.save(function (err, cat) {
//     if(err){
//         console.log("somthing went wrong");
//     }
//     else {
//         console.log("saved cat to database");
//         console.log(cat);
//     }
// });


// ALTERNATE WAY OF ADDING CATS
// Cat.create({
//    name:"Norris",
//    age:7,
//    temperament:"Angry"
// }, function (err, cat) {
//     if(err){
//         console.log("Error");
//     }
//     else{
//         console.log("All cats");
//         console.log(cat);
//     }
// });




// Find cats
Cat.find({}, function (err, cats) {
    if(err) {
        console.log("somthing went wrong");
    }
    else {
        console.log("all the cats");
        console.log(cats);
    }
});
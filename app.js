var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true }); 

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

// model set up

var Campground = mongoose.model("Campground", campgroundSchema);

//create campground

// Campground.create(
//     {
//         name: "Salmon Creek", 
//         image: "https://s-media-cache-ak0.pinimg.com/originals/cc/31/24/cc31246cd4053bd5fd6a4830c2607096.jpg"
        
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//           console.log("newly created campground");
//           console.log(campground)
//         }
// });






app.get("/", function(req, res){
    res.render("landing");
});





app.get("/campgrounds", function(req, res){
        // get all campgrounds from db
        Campground.find({}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            } else {
            res.render("campgrounds", {campgrounds:allCampgrounds});
            }
        // res.render("campgrounds", {campgrounds: campgrounds});
}); 
});




app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    // create a new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
    // redirect back to campgrounds page
    res.redirect("/campgrounds");
});


app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("yelp camp server has started")
})
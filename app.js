var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/yelp_camp');


// Schema SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
    {
        name: " Granite Hill",
        image: "https://pixabay.com/get/54e6d0434957a514f6da8c7dda793f7f1636dfe2564c704c722c72d09f49c45f_340.jpg",
        description: "this is a huge granite hill,no water, beautifull granite"
    }, function (err, campgrounds) {
        if (err) {
            console.log(err);
        } else {
            console.log("NEWLY CREATED CAMPGROUND : ");
            console.log(campgrounds);
        }
    });

// Tell Express to use Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
// Setting render to render ejs file
app.set("view engine", "ejs");



// Route to targeting views
app.get("/", (req, res) => {
    res.render("landing");
})

// SHOW ALL THE CAMPGROUNDS
app.get("/campgrounds", (req, res) => {
    // GET ALL CAMPGROUND FROM DB
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds", { campgrounds: allCampgrounds });
        }
    })
   
})

// CREATE ROUTE to add Campground
app.post("/campgrounds", (req, res) => {
    // res.send("YOU HIT THE POST REQUEST!");
    // get data from form and add  to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = { name: name, image: image }

    // Create a new campground and save to DB
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });    
})

// NEW - show to create new campground
app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs")
})

app.get("/campgrounds/:id",function(req,res){
    // find the campground with provided ID
    // 
    res.send("THIS WILL BE THE SHOW PAGE ONE DAY")

})


app.listen(port, process.env.IP, () => {
    console.log("YELP CAMP SERVER HAS STARTED !")
})


var express = require("express");
var app = express();
var port = 3000;

app.set("view engine","ejs");

// Route to targeting views
app.get("/",(req,res)=>{
    res.render("landing");
})

app.get("/campgrounds",(req,res) =>{
    var campgrounds = [
        { name : "Salmon Creek", image:"https://www.photosforclass.com/download/pixabay-1846142?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c722c72d09f49c45f_960.jpg&user=Pexels"},
        { name : " Granite Hill", image:"https://pixabay.com/get/54e6d0434957a514f6da8c7dda793f7f1636dfe2564c704c722c72d09f49c45f_340.jpg"},
        { name : "Mountain Goat's Rest", image: "https://www.photosforclass.com/download/pixabay-4522970?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c722c72d09f49c45f_960.jpg&user=Ben_Frieden"}
    ]

    res.render("campgrounds",{campgrounds:campgrounds});

})

app.listen(port,process.env.IP,()=>{
    console.log("YELP CAMP SERVER HAS STARTED !")
})
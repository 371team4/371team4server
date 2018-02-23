var express = require('express');
var mongoose = require('mongoose');
var body_parser = require("body-parser");
var event = require("./models/event");
var image = require("./models/image");
var seedDB = require("./seed")
var fileUpload = require('express-fileupload');
var btoa = require("btoa");


mongoose.connect("mongodb://localhost/events");

var app = express();
seedDB();
app.set("view engine","ejs");
app.use(body_parser.urlencoded({extended:true}));
app.use(fileUpload());

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("yale camp server start");
})

app.get("/", function(req,res){
    res.render("main");
})

app.get("/events", function(req,res){
    event.find({}, function(err,allevent){
        if(err){
            console.log(err);
        }
        else{
            res.render("show",{events:allevent});  
        }
    });
})

app.get("/events/new", function(req,res){
    res.render("new")
})

app.post("/events/new", function(req,res){
    var aname = req.body.name;
    var aimage = req.files.image;
    var adescription = req.body.description;
    image.create({
        data: btoa(aimage.data)
    }, function(err, aimage){
        if(err){
            console.log(err)
        }
        else{
            var new_event = {
                name: aname,
                images: [],
                description: adescription
            }
            event.create(new_event, function(err, event){
                if(err){
                    console.log(err)
                }
                else{
                    event.images.push(aimage);
                    event.save();
                    res.render("main")
                }
            })
        }
    })
})

app.get("/events/:id", function(req,res){
    event.findById(req.params.id).exec(function(err, findEvent){
        if(err){
            console.log(err);
        }
        else{
            console.log(findEvent);
            res.render("edit", {event:findEvent});
        }
    })
})

app.get("/show/:id", function(req,res){
    event.findById(req.params.id).populate("images").exec(function(err, findEvent){
        if(err){
            console.log(err);
        }
        else{
            console.log(findEvent);
            res.render("spec", {event:findEvent});
        }
    })
})

app.post("/events/:id", function(req,res){
    var aid = req.params.id;
    var aname = req.body.name;
    var aimage = req.body.image;
    var adescription = req.body.description;
    var aevent = {
        name: aname,
        image: aimage,
        description: adescription
    }
    event.update({_id:aid},aevent,function(err){
        if(err){
            console.log(err)
        }
        res.render("main")
    })
})

app.get("/events/delete/:id", function(req,res){
    event.remove({_id:req.params.id},function(err){
        if(err){
            console.log(err);
        }
        res.render("main");
    })
})
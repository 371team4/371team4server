var express = require('express');
var mongoose = require('mongoose');
var body_parser = require("body-parser");
var event = require("./models/event");
var seedDB = require("./seed");
var fileUpload = require('express-fileupload');
var fs = require('fs');
var base64Img = require('base64-img');


mongoose.connect("mongodb://localhost/events");

var app = express();
seedDB();
app.set("view engine","ejs");
app.use(body_parser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(express.static(__dirname + '/show'));



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("yale camp server start");
});

app.get("/", function(req,res){
    res.render("main");
});

app.get("/events", function(req,res){
    event.find({}, function(err,allevent){
        if(err){
            console.log(err);
        }
        else{
            // console.log(allevent)
            res.render("show",{events:allevent});  
        }
    });
});

app.get("/events/new", function(req,res){
    res.render("new");
});

app.get("/events/:id", function(req,res){
    event.findById(req.params.id).exec(function(err, findEvent){
        if(err){
            console.log(err);
        }
        else{
            res.render("edit", {event:findEvent});
        }
    });
});

app.get("/show/:id", function(req,res){
    event.findById(req.params.id).exec(function(err, findEvent){
        if(err){
            console.log(err);
        }
        else{
            // console.log(findEvent);
            res.render("spec", {event:findEvent});
        }
    });
});

var fileUploaded = 0;

var imageEncoded = 0;

function writeFilePromise(name, path){
    return new Promise(function (resolve, reject) {
        fs.writeFile(name, path, function (err) {
            if (err) {
                reject(err);
            }
            else{
                resolve("the file is saved");
            }
        });
    });
}

function encodeImgPromise(path){
    return new Promise(function(resolve, reject){
        base64Img.base64(path,function(err, data){
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })
}

app.post("/events/new", function(req,res){
    var atitle = req.body.title;
    var atitle_color = req.body.title_color;
    var atitle_font_size = req.body.title_font_size;
    var atitle_font_style = req.body.title_font_style;
    var atitle_font_weight = req.body.title_font_weight;
    var adescription = req.body.description;
    var adescription_color = req.body.description_color;
    var adescription_font_size = req.body.description_font_size;
    var adescription_font_style = req.body.description_font_style;
    var adescription_font_weight = req.body.description_font_weight;
    var adate = new Date;
    var adate_color = req.body.date_color;
    var adate_font_size = req.body.date_font_size;
    var adate_font_style = req.body.date_font_style;
    var adate_font_weight = req.body.date_font_weight;
    var atime = req.body.time;
    var atime_color = req.body.time_color;
    var atime_font_size = req.body.time_font_size;
    var atime_font_style = req.body.time_font_style;
    var atime_font_weight = req.body.time_font_weight;
    var aslide_settings = req.body.slide_settings;
    var images = req.files.image;
    var images64 = [];
    images.forEach(function(aimage){
        writeFilePromise("./show/"+aimage.name,aimage.path).then(function(value){
            fileUploaded++;
            var path = "./show/"+aimage.name;
            encodeImgPromise(path).then(function(value){
                images64.push(value);
                imageEncoded++;
                if(fileUploaded == images.length && imageEncoded == images.length){
                    console.log(images64)
                    var aevent = {
                        title: {
                            title: atitle,
                            color: atitle_color,
                            font_size: atitle_font_size,
                            font_weight: atitle_font_weight,
                            font_style: atitle_font_style
                        },
                        description: {
                            description: adescription,
                            color: adescription_color,
                            font_size: adescription_font_size,
                            font_weight: adescription_font_weight,
                            font_style: adescription_font_style
                        },
                        date: {
                            date: adate,
                            color: adate_color,
                            font_size: adate_font_size,
                            font_weight: adate_font_weight,
                            font_style: adate_font_style
                        },
                        time:  {
                            time: atime,
                            color: atime_color,
                            font_size: atime_font_size,
                            font_weight: atime_font_weight,
                            font_style: atime_font_style
                        },
                        images:images64,
                        slide_settings: aslide_settings
                    };
                    event.create(aevent, function(err, aevent){
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log("new event created");
                        }
                        fileUploaded = 0;
                        imageEncoded = 0;
                        res.render("main")
                    });
                }
            }).catch(function(err){
                console.log(err);
            })
        }).catch(function(err){
            console.log(err);
        })
    });
});



app.post("/events/:id", function(req,res){
    var aid = req.params.id;
    var atitle = req.body.title;
    var atitle_color = req.body.title_color;
    var atitle_font_size = req.body.title_font_size;
    var atitle_font_style = req.body.title_font_style;
    var atitle_font_weight = req.body.title_font_weight;
    var adescription = req.body.description;
    var adescription_color = req.body.description_color;
    var adescription_font_size = req.body.description_font_size;
    var adescription_font_style = req.body.description_font_style;
    var adescription_font_weight = req.body.description_font_weight;
    var adate = new Date;
    var adate_color = req.body.date_color;
    var adate_font_size = req.body.date_font_size;
    var adate_font_style = req.body.date_font_style;
    var adate_font_weight = req.body.date_font_weight;
    var atime = req.body.time;
    var atime_color = req.body.time_color;
    var atime_font_size = req.body.time_font_size;
    var atime_font_style = req.body.time_font_style;
    var atime_font_weight = req.body.time_font_weight;
    var aslide_settings = req.body.slide_settings;
    var images = req.files.image;
    var images64 = [];
    images.forEach(function(aimage){
        writeFilePromise("./show/"+aimage.name,aimage.path).then(function(value){
            fileUploaded++;
            var path = "./show/"+aimage.name;
            encodeImgPromise(path).then(function(value){
                images64.push(value);
                imageEncoded++;
                if(fileUploaded == images.length && imageEncoded == images.length){
                    console.log(images64)
                    var aevent = {
                        title: {
                            title: atitle,
                            color: atitle_color,
                            font_size: atitle_font_size,
                            font_weight: atitle_font_weight,
                            font_style: atitle_font_style
                        },
                        description: {
                            description: adescription,
                            color: adescription_color,
                            font_size: adescription_font_size,
                            font_weight: adescription_font_weight,
                            font_style: adescription_font_style
                        },
                        date: {
                            date: adate,
                            color: adate_color,
                            font_size: adate_font_size,
                            font_weight: adate_font_weight,
                            font_style: adate_font_style
                        },
                        time:  {
                            time: atime,
                            color: atime_color,
                            font_size: atime_font_size,
                            font_weight: atime_font_weight,
                            font_style: atime_font_style
                        },
                        images:images64,
                        slide_settings: aslide_settings
                    };
                    event.update({_id:aid},aevent,function(err){
                        if(err){
                            console.log(err);
                        }
                        fileUploaded = 0;
                        imageEncoded = 0;
                        res.render("main");
                    });
                }
            }).catch(function(err){
                console.log(err);
            })
        }).catch(function(err){
            console.log(err);
        })
    });
});

app.get("/events/delete/:id", function(req,res){
    event.remove({_id:req.params.id},function(err){
        if(err){
            console.log(err);
        }
        res.render("main");
    });
});

// testing code for base64Img
app.get("/image_test", function(req,res){
    var imagedata = base64Img.base64Sync('./show/google.jpg');
    res.render("image", {img: imagedata});
});
app.get("/image_test2", function(req,res){
    var imagedata = [];
    base64Img.base64('./show/google.jpg', function(err,data){
        if(err){
            console.log(err)
        }
        else{
            imagedata.push(data);
            base64Img.base64('./show/print.png', function(err,data){
                if(err){
                    console.log(err)
                }
                else{
                    imagedata.push(data);
                    base64Img.base64('./show/select.png', function(err,data){
                        if(err){
                            console.log(err)
                        }
                        else{
                            imagedata.push(data);
                            res.render("image", {img: imagedata});
                        }
                    });
                }
            });
        }
    });
});
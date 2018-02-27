var mongoose = require('mongoose');
var fs = require('fs');
var base64Img = require('base64-img');
var event = require('./models/event');

// connvert image to base 64
var imagedata = base64Img.base64Sync('./show/google.jpg')

// demo event array
var default_event = [
    {
        title: {
            title: "first",
            color: "Blue",
            font_size: "Small",
            font_weight:"Normal",
            font_style:"Italic"
        },
        description: {
            description: "first event",
            color: "Red",
            font_size: "Large",
            font_weight:"Bold",
            font_style:"Oblique"
        },
        date: {
            date: "Wed 5 Feb 2015",
            color: "Green",
            font_size: "X-Small",
            font_weight:"Lighter",
            font_style:"Normal"
        },
        time: {
            time: "02:05 AM",
            color: "Yellow",
            font_size: "XX-Small",
            font_weight:"Bolder",
            font_style:"Normal"
        },
        image: [],
        slide_settings: 20
    },
    {
        title: {
            title: "Second",
            color: "Blue",
            font_size: "Smaller",
            font_weight:"Normal",
            font_style:"Italic"
        },
        description: {
            description: "second event",
            color: "Red",
            font_size: "Medium",
            font_weight:"Bold",
            font_style:"Oblique"
        },
        date: {
            date: "Mon 6 Mar 2016",
            color: "Green",
            font_size: "Larger",
            font_weight:"Lighter",
            font_style:"Normal"
        },
        time: {
            time: "01:00 AM",
            color: "Yellow",
            font_size: "XX-Large",
            font_weight:"Bolder",
            font_style:"Normal"
        },
        image: [],
        slide_settings: 40
    },
    {
        title: {
            title: "Third",
            color: "Blue",
            font_size: "X-Large",
            font_weight:"Normal",
            font_style:"Italic"
        },
        description: {
            description: "third event",
            color: "Red",
            font_size: "Large",
            font_weight:"Bold",
            font_style:"Oblique"
        },
        date: {
            date: "Fri 8 Apr 2017",
            color: "Green",
            font_size: "X-Small",
            font_weight:"Lighter",
            font_style:"Normal"
        },
        time: {
            time: "23:05 AM",
            color: "Yellow",
            font_size: "XX-Small",
            font_weight:"Bolder",
            font_style:"Normal"
        },
        image: [],
        slide_settings: 80
    }
];


// initialize database
function seedDB(){
    // clear database
    event.remove({},function(err){
        if(err){
            console.log(err);
        }
        else{
            // re-insert all data
            default_event.forEach(function(seed){
                event.create(seed,function(err,aevent){
                    if(err){
                        console.log(err);
                    }
                    else{
                        // update image array 
                        aevent.images.push(imagedata);
                        aevent.save();
                    }
                });
            });
        }
    });
}

module.exports = seedDB;
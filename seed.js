var mongoose = require('mongoose');
var event = require('./models/event');

var default_event = [
    {
        name: "first",
        image: "./image/2017.jpg",
        description: "first event"
    },
    {
        name: "second",
        image: "./image/2018.jpg",
        description: "second event"
    },
    {
        name: "third",
        image: "./image/2019.jpg",
        description: "third event"
    }
];

function seedDB(){
    // clear database
    event.remove({},function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("remove event");
            default_event.forEach(function(seed){
                event.create(seed,function(err,campground){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log("newly created event");
                    }
                });
            });
        }
    });
}

module.exports = seedDB;
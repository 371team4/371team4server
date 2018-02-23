var mongoose = require('mongoose');
var event = require('./models/event');
var image = require('./models/image');
var fs = require('fs')
var btoa = require("btoa")


var default_event = [
    {
        name: "first",
        description: "first event"
    },
    {
        name: "second",
        description: "second event"
    },
    {
        name: "third",
        description: "third event"
    }
];

// not work
function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}
// need some way to transfer buffer to an src
var imagedata = fs.readFileSync('./sample_image/google.jpg')
// console.log(imagedata)
var stringdata = "data:image/jpg;base64,"+btoa(imagedata.toString());
// console.log(stringdata)

function seedDB(){
    // clear database
    event.remove({},function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("remove event");
            default_event.forEach(function(seed){
                event.create(seed,function(err,aevent){
                    if(err){
                        console.log(err);
                    }
                    else{
                        // console.log("newly created event");
                        image.create(
                            {
                                data: stringdata
                            }, 
                            function(err,aimage){
                                if(err){ 
                                    console.log(err)
                                }
                                else{
                                    // console.log(aimage)
                                    aevent.images.push(aimage);
                                    aevent.save();
                                    // console.log(aevent)
                                }
                            }
                        )
                       
                    }
                });
            });
        }
    });
}

module.exports = seedDB;
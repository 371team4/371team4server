var mongoose = require('mongoose');

var event_schema = new mongoose.Schema({
    name: String,
    description: String,
    images:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "image"
        }
    ],
});

module.exports = mongoose.model("Event",event_schema);
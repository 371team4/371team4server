var mongoose = require('mongoose');

var event_schema = new mongoose.Schema({
    title: {
        title: String,
        color: String,
        font_size: String,
        font_weight: String,
        font_style: String
    },
    description: {
        description: String,
        color: String,
        font_size: String,
        font_weight: String,
        font_style: String
    },
    date: {
        date: String,
        color: String,
        font_size: String,
        font_weight: String,
        font_style: String
    },
    time:  {
        time: String,
        color: String,
        font_size: String,
        font_weight: String,
        font_style: String
    },
    images:[],
    slide_settings: Number
});

module.exports = mongoose.model("Event",event_schema);
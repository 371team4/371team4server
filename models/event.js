var mongoose = require('mongoose');

var event_schema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

module.exports = mongoose.model("Event",event_schema);
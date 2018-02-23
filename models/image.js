var mongoose = require('mongoose');

var image_schema = new mongoose.Schema({
        data: String
});

module.exports = mongoose.model("image",image_schema);
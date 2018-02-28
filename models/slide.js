var mongoose = require("mongoose");


/**
 * Defin the Slide schema
 */
var SlideSchema = new mongoose.Schema({
  title: {
    content: String,
    fontColor: String,
    fontSize: String,
    fontWeight: String,
    fontStyle: String
  },
  description: {
    content: String,
    fontColor: String,
    fontSize: String,
    fontWeight: String,
    fontStyle: String
  },
  date: {
    content: String,
    fontColor: String,
    fontSize: String,
    fontWeight: String,
    fontStyle: String
  },
  time: {
    content: String,
    fontColor: String,
    fontSize: String,
    fontWeight: String,
    fontStyle: String
  },
  meta: {
    template: String,
    timeout: String,
    repeatable: Boolean,
    startDate: String,
    endDate: String
  },
  images: []
});

module.exports = mongoose.model("Slide", SlideSchema);

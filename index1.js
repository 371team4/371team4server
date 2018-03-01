const mongoose = require("mongoose");
const util = require("util");

// config should be imported before importing any other file
const config = require("./config/config");
const app = require("./config/express");

// Slides collection seeds
const seed = require("./config/seed");

// connect to mongo db
const mongoUri = config.mongoURI;
mongoose.connect(mongoUri, { keepAlive: 1 }).then(
  () => {
    seed
      .initSlidesCollection()
      .then(console.log("Clean up and Init was done!"));
  },
  err => {
    throw new Error(`unable to connect to database: ${mongoUri}`);
  }
);

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  });
}

module.exports = app;

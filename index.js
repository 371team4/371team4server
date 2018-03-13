const fs = require('fs')
const https = require('https')
const mongoose = require('mongoose')

// config should be imported before importing any other file
const config = require('./src/config/config')
const app = require('./src/config/express')

// import the redirection http server
require('./src/config/http-redirection-server')

// Slides collection seeds
//const seed = require('./src/config/seed')

// connect to mongo db
const mongoUri = config.mongoURI
// allow mongoose to log to console in development and/or test
if (config.env === 'development') {
  mongoose.set('debug', true)
}

// connection to MongoDB
mongoose
  .connect(mongoUri, { keepAlive: 1 })
  // .then(
  // async () => {
  // seed the database if we are in test environment
  // if (config.env === 'test' || config.env === 'development') {
  // await seed.initImagesCollection()
  // await seed.initSlidesCollection()
  // await seed.initUsersCollection()
  // console.log('Clean up and Init was completed!')
  // }
  // }
  // )
  .catch(err => {
    throw new Error(`Unable to connect to database: ${mongoUri}, ${err}`)
  })

const sslOptions = {
  key: fs.readFileSync('./key.pem', 'utf8'),
  cert: fs.readFileSync('./cert.pem', 'utf8'),
  passphrase: 'localhost'
}

const server = https.createServer(sslOptions, app).listen(config.httpsPort, () => {
  console.info(`server started on port ${config.httpsPort} (${config.env})`) // eslint-disable-line no-console
})

// listen on port config.port
// const server = app.listen(config.port, () => {
//   console.info(`server started on port ${config.port} (${config.env})`) // eslint-disable-line no-console
// })

module.exports = { app, server }

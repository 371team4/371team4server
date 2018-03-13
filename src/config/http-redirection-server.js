const config = require('./config')
const express = require('express')

// secondary server to listen to http requests and redirect to https
// set up plain http server
const http = express()

// set up a route to redirect http to https
http.use(function (req, res, next) {
  if (!/https/.test(req.protocol)) {
    // replace the port number with the https
    req.headers.host = req.headers.host.replace(config.httpPort, config.httpsPort)
    res.redirect(`https://${req.headers.host}${req.url}`)
  } else {
    return next()
  }
})

// have it listen on the http port
http.listen(config.httpPort)
// no need to export, this will just listen here

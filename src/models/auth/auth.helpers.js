const jwt = require('jsonwebtoken')
const APIError = require('../../helpers/APIError')
const httpStatus = require('http-status')
const config = require('../../config/config')

/**
 * Helper function for verifying authentication, this will
 * check the token from the body object provided if it valid or invalid
 */
function JwtVerify (req, res, next) {
  // error to throw when no token is present
  const err = new APIError('No token is present', httpStatus.UNAUTHORIZED, true)

  // check that token is present in the request
  const token = req.body.token || req.param('token') || req.headers['x-access-token'];
  if (token) {
    // verify the token against the secret
    jwt.verify(token, config.jwtSecret, function (e) {
      // handle error, or otherwise continue to the next middleware
      if (e) {
        return next(err)
      } else {
        return next()
      }
    })
  } else {// return error if no token is provided
    return next(err)
  }
}

module.exports = { JwtVerify }
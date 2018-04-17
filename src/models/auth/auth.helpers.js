const jwt = require('jsonwebtoken')
const APIError = require('../../helpers/APIError')
const httpStatus = require('http-status')
const config = require('../../config/config')
const User = require('../user/user.model')

/**
 * Helper function for verifying authentication, this will
 * check the token from the body object provided if it valid or invalid
 */
function JwtVerify (req, res, next) {
  // error to throw when no token is present
  const err = new APIError('No token is present', httpStatus.UNAUTHORIZED, true)
  // check that token is present in the request
  const token = req.body.token || req.params.token || req.headers['x-access-token']
  if (token) {
    // verify the token against the secret
    jwt.verify(token, config.jwtSecret, function (e) {
      // handle error, or otherwise continue to the next middleware
      if (e) {
        return next(new APIError(e.name, httpStatus.UNAUTHORIZED, true))
      } else {
        return next()
      }
    })
  } else {
    // return error if no token is provided
    return next(err)
  }
}

/**
 * Helper function for verifying role of user, this will
 * check the token from the body object provided to identify role of user
 */
function JwtRoleVerify (req, res, next) {
  // error to throw when no token is present
  const err = new APIError('No token is present', httpStatus.UNAUTHORIZED, true)
  // check that token is present in the request
  const token = req.body.token || req.params.token || req.headers['x-access-token']
  if (token) {
    // verify the token against the secret
    jwt.verify(token, config.jwtSecret, function (e) {
      // handle error, or otherwise continue to the next middleware
      if (e) {
        return next(err)
      } else {
        var decoded = jwt.decode(token)
        var name = decoded.username
        const staffErr = new APIError('Staff is not allowed to change user data', httpStatus.UNAUTHORIZED, true)
        const userErr = new APIError('Username is not find', httpStatus.UNAUTHORIZED, true)
        User.findOne({username: name}, function(errr, user) {
          if(errr){
            console.log('not find user')
            return next(userErr)
          }
          else{
            if(user.role === 'admin'){
              return next()
            }
            else {
              return next(staffErr)
            }
          }
        });
      }
    })
  } else {
    // return error if no token is provided
    return next(err)
  }
}

module.exports = { JwtVerify, JwtRoleVerify }

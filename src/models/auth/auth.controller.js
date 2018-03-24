const jwt = require('jsonwebtoken')
const httpStatus = require('http-status')
const APIError = require('../../helpers/APIError')
const config = require('../../config/config')
const User = require('../user/user.model')

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login (req, res, next) {
  // find a user with
  const response = {} // empty response object
  // find a user with given name
  User.findOne({ username: req.body.username })
    .exec() // need to return a promise
    .then(async function (user) {
      // check that we were able to find a user
      if (user) {
        // compare the hash of the password
        const match = await user.comparePassword(req.body.password)
        if (match) {
          // create the JWT
          const token = jwt.sign(
            { username: user.username },
            config.jwtSecret,
            { expiresIn: '1h' } // default token expire in 1 hour
          )
          // populate the response object
          response.token = token
          response.user = user
        } else {
          // password didn't match
          throw new APIError('Either username or password is incorrect', httpStatus.UNAUTHORIZED, true)
        }
      } else {
        // username was not found
        throw new APIError('Either username or password is incorrect', httpStatus.UNAUTHORIZED, true)
      }
      return res.json(response)
    })
    .catch(err => next(err))
}

module.exports = { login }

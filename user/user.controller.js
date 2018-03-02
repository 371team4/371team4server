const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../config/config');
const User = require('./user.model')

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  // Get All User From Database
  User.get()
    .then(AllUser => {
      // Loop Through Each User To Match A User
      var find = false
      AllUser.forEach(user => {
        // If User Info Is Found
        if (req.body.username === user.username && req.body.password === user.password) {
          // console.log("req: name:"+req.body.username+" password: "+req.body.password)
          // console.log("user: name:"+user.username+" password: "+user.password)
          const token = jwt.sign({
            username: user.username
          }, config.jwtSecret)
          find = true
          return res.json({
            token,
            username: user.username
          })
        }
      });
      // If User Info Not Found In Database
      if(!find){
        const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true)
        return next(err)
      }
    })
    .catch(e => next(e))
}

/**
 * Create new User
 * @returns {Slide}
 */
function create(req, res, next) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  })

  user
    .save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e))
}

module.exports = { login, create };

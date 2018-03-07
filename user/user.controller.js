const jwt = require('jsonwebtoken')
const httpStatus = require('http-status')
const APIError = require('../helpers/APIError')
const config = require('../config/config')
const User = require('./user.model')

/**
 * Create new User
 * @returns {User}
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

/**
 * Update existing user
 * @returns {User}
 */
function update(req, res, next) {
  const user = req.user
  const updates = {
    username: req.body.username,
    password: req.body.password
  }

  user.username = updates.username
  user.password = updates.password

  user
    .save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e))
}

/**
 * Delete User.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user
  user
    .remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e))
}

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.getById(id)
    .then(user => {
      req.user = user // eslint-disable-line no-param-reassign
      return next()
    })
    .catch(e => next(e))
}

function list(req, res, next){
  User.get().then(AllUser => res.json(AllUser))
  .catch(e => next(e))
}

module.exports = { create, update, remove, load, list };

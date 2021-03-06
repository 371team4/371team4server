const httpStatus = require('http-status')
const APIError = require('../../helpers/APIError')
const User = require('./user.model')

/**
 * Create new User
 * @returns {User}
 */
function create (req, res, next) {
  const user = new User(prepUser(req.body))

  User.findOne({ username: req.body.username })
    .exec() // need to return a promise
    .then(userInCollection => {
      if (userInCollection) {
        throw new APIError('Username is not unique', httpStatus.BAD_REQUEST, true)
      }
      user.save().then(savedUser => res.json(savedUser))
    })
    .catch(e => {
      return next(e)
    })
}

/**
 * Update existing user
 * @returns {User}
 */
function update (req, res, next) {
  const user = req.user
  const updates = prepUser(req.body)

  user.password = updates.password
  user.email = updates.email
  user.role = updates.role

  user
    .save()
    .then(savedUser => res.json(savedUser))
    .catch(/* istanbul ignore next */ e => next(e))
}

/**
 * Delete User.
 * @returns {User}
 */
function remove (req, res, next) {
  const user = req.user
  user
    .remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(/* istanbul ignore next */ e => next(e))
}

/**
 * Load user and append to req.
 */
function load (req, res, next, id) {
  User.get(id)
    .then(user => {
      req.user = user // eslint-disable-line no-param-reassign
      return next()
    })
    .catch(e => next(e))
}

/**
 * Get user
 * @returns {User}
 */
function get (req, res) {
  return res.json(req.user)
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {Slide[]}
 */
function list (req, res, next) {
  // extract the limit and skip from the query object,
  // if limit or object is not present then assign defaults
  const { limit = 50, skip = 0 } = req.query

  // limit the batch size to 50 objects
  // skip must be positive
  const safeLimit = limit > 50 ? 50 : limit
  const safeSkip = skip < 0 ? 0 : skip

  User.list({ limit: safeLimit, skip: safeSkip })
    .then(users => res.json(users))
    .catch(/* istanbul ignore next */ e => next(e))
}

/**
 * Helper function for `create()` and update() this will
 * return a User object from the body object provided
 */
function prepUser (body) {
  return {
    username: body.username,
    password: body.password,
    email: body.email,
    role: body.role
  }
}

module.exports = { list, get, create, update, remove, load }

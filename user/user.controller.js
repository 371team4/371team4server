const User = require('./user.model')

/**
 * Create new User
 * @returns {User}
 */
function create (req, res, next) {
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
function update (req, res, next) {
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
function remove (req, res, next) {
  const user = req.user
  user
    .remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e))
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
  const { limit = 50, skip = 0 } = req.query
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e))
}

module.exports = { list, get, create, update, remove, load }

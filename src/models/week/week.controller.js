const Week = require('./week.model')

/**
 * Create new week
 * @returns {week}
 */
function create (req, res, next) {
  const week = new Week(prepWeek(req.body))

    week.save().then(savedWeek => res.json(savedWeek))
    .catch(/* istanbul ignore next */ e => {
      return next(e)
    })
}

/**
 * Update existing week
 * @returns {week}
 */
function update (req, res, next) {
  const week = req.week
  const updates = prepWeek(req.body)

  week.startDate = updates.startDate
  week.days = updates.days

  week
    .save()
    .then(savedWeek => res.json(savedWeek))
    .catch(/* istanbul ignore next */ e => next(e))
}

/**
 * Delete week.
 * @returns {week}
 */
function remove (req, res, next) {
  const week = req.week
  week
    .remove()
    .then(deletedWeek => res.json(deletedWeek))
    .catch(/* istanbul ignore next */ e => next(e))
}

/**
 * Load week and append to req.
 */
function load (req, res, next, id) {
  Week.get(id)
    .then(week => {
      req.week = week // eslint-disable-line no-param-reassign
      return next()
    })
    .catch(e => next(e))
}

/**
 * Get week
 * @returns {week}
 */
function get (req, res) {
  return res.json(req.week)
}

/**
 * Get week list.
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

  Week.list({ limit: safeLimit, skip: safeSkip })
    .then(weeks => res.json(weeks))
    .catch(/* istanbul ignore next */ e => next(e))
}

/**
 * Helper function for `create()` and update() this will
 * return a week object from the body object provided
 */
function prepWeek (body) {
  return { startDate: body.startDate, days: body.days }
}

module.exports = { list, get, create, update, remove, load }

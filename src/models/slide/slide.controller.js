const Slide = require('./slide.model')

/**
 * Load slide and append to req.
 */
function load (req, res, next, id) {
  Slide.get(id)
    .then(slide => {
      req.slide = slide // eslint-disable-line no-param-reassign
      return next()
    })
    .catch(e => next(e))
}

/**
 * Get slide
 * @returns {Slide}
 */
function get (req, res) {
  return res.json(req.slide)
}

/**
 * Create new slide
 * @returns {Slide}
 */
function create (req, res, next) {
  const slide = new Slide(prepSlide(req.body))
  slide
    .save()
    .then(savedSlide => res.json(savedSlide))
    .catch(/* istanbul ignore next */ e => next(e))
}

/**
 * Update existing slide
 * @returns {Slide}
 */
function update (req, res, next) {
  const slide = req.slide
  const updates = prepSlide(req.body)

  slide.title = updates.title
  slide.description = updates.description
  slide.time = updates.time
  slide.date = updates.date
  slide.meta = updates.meta
  slide.images = updates.images

  slide
    .save()
    .then(savedSlide => res.json(savedSlide))
    .catch(/* istanbul ignore next */ e => next(e))
}

/**
 * Get slide list.
 * @property {number} req.query.skip - Number of slides to be skipped.
 * @property {number} req.query.limit - Limit number of slides to be returned.
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

  Slide.list({ limit: safeLimit, skip: safeSkip })
    .then(slides => res.json(slides))
    .catch(/* istanbul ignore next */ e => next(e))
}

/**
 * Delete slide.
 * @returns {Slide}
 */
function remove (req, res, next) {
  const slide = req.slide
  slide
    .remove()
    .then(deletedSlide => res.json(deletedSlide))
    .catch(/* istanbul ignore next */ e => next(e))
}

/**
 * Helper function for `create()` this will
 * return a Slide object from the body object provided
 */
function prepSlide (body) {
  return {
    title: {
      content: body.title.content,
      fontColor: body.title.fontColor,
      fontSize: body.title.fontSize,
      fontWeight: body.title.fontWeight,
      fontStyle: body.title.fontStyle
    },
    description: {
      content: body.description.content,
      fontColor: body.description.fontColor,
      fontSize: body.description.fontSize,
      fontWeight: body.description.fontWeight,
      fontStyle: body.description.fontStyle
    },
    date: {
      content: body.date.content,
      fontColor: body.date.fontColor,
      fontSize: body.date.fontSize,
      fontWeight: body.date.fontWeight,
      fontStyle: body.date.fontStyle
    },
    time: {
      content: body.time.content,
      fontColor: body.time.fontColor,
      fontSize: body.time.fontSize,
      fontWeight: body.time.fontWeight,
      fontStyle: body.time.fontStyle
    },
    meta: {
      template: body.meta.template,
      timeout: body.meta.timeout,
      datesOnDisplay: body.meta.datesOnDisplay
    },
    images: body.images
  }
}

module.exports = { load, get, create, update, list, remove }

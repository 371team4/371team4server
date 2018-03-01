const Slide = require('./slide.model');

/**
 * Load slide and append to req.
 */
function load(req, res, next, id) {
  Slide.get(id)
    .then((slide) => {
      req.slide = slide; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get slide
 * @returns {Slide}
 */
function get(req, res) {
  return res.json(req.slide);
}

/**
 * Create new slide
 * @property {string} req.body.slidename - The slidename of slide.
 * @property {string} req.body.mobileNumber - The mobileNumber of slide.
 * @returns {Slide}
 */
function create(req, res, next) {
  const slide = new Slide({
    slidename: req.body.slidename,
    mobileNumber: req.body.mobileNumber
  });

  slide.save()
    .then(savedSlide => res.json(savedSlide))
    .catch(e => next(e));
}

/**
 * Update existing slide
 * @property {string} req.body.slidename - The slidename of slide.
 * @property {string} req.body.mobileNumber - The mobileNumber of slide.
 * @returns {Slide}
 */
function update(req, res, next) {
  const slide = req.slide;
  slide.slidename = req.body.slidename;
  slide.mobileNumber = req.body.mobileNumber;

  slide.save()
    .then(savedSlide => res.json(savedSlide))
    .catch(e => next(e));
}

/**
 * Get slide list.
 * @property {number} req.query.skip - Number of slides to be skipped.
 * @property {number} req.query.limit - Limit number of slides to be returned.
 * @returns {Slide[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Slide.list({ limit, skip })
    .then(slides => res.json(slides))
    .catch(e => next(e));
}

/**
 * Delete slide.
 * @returns {Slide}
 */
function remove(req, res, next) {
  const slide = req.slide;
  slide.remove()
    .then(deletedSlide => res.json(deletedSlide))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
const express = require('express');
const slideCtrl = require('./slide.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/slides - Get list of slides */
  .get(slideCtrl.list)

  /** POST /api/slides - Create new slide */
  .post(slideCtrl.create);

router.route('/:slideId')
  /** GET /api/slides/:slideId - Get slide */
  .get(slideCtrl.get)

  /** PUT /api/slides/:slideId - Update slide */
  .put(slideCtrl.update)

  /** DELETE /api/slides/:slideId - Delete slide */
  .delete(slideCtrl.remove);

/** Load slide when API with slideId route parameter is hit */
router.param('slideId', slideCtrl.load);

module.exports = router;
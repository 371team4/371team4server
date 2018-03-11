const express = require('express')
const validate = require('express-validation')
const paramValidation = require('../../config/param-validation')
const slideCtrl = require('./slide.controller')

const router = express.Router() // eslint-disable-line new-cap

router
  .route('/')
  /** GET /api/slides - Get list of slides */
  .get(slideCtrl.list)

  /** POST /api/slides - Create new slide */
  .post(validate(paramValidation.createSlide), slideCtrl.create)

router
  .route('/:slideId')
  /** GET /api/slides/:slideId - Get slide */
  .get(slideCtrl.get)

  /** PUT /api/slides/:slideId - Update slide */
  .put(validate(paramValidation.updateSlide), slideCtrl.update)

  /** DELETE /api/slides/:slideId - Delete slide */
  .delete(slideCtrl.remove)

/** Load slide when API with slideId route parameter is hit */
router.param('slideId', slideCtrl.load)

module.exports = router

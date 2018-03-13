const express = require('express')
const validate = require('express-validation')
const paramValidation = require('../../config/param-validation')
const slideCtrl = require('./slide.controller')
const { JwtVerify } = require('../auth/auth.helpers')

const router = express.Router() // eslint-disable-line new-cap

router
  .route('/')
  /** GET /api/slides - Get list of slides */
  .get(slideCtrl.list)

  /** POST /api/slides - Create new slide */
  .post(JwtVerify, validate(paramValidation.createSlide), slideCtrl.create)

router
  .route('/:slideId')
  /** GET /api/slides/:slideId - Get slide */
  .get(slideCtrl.get)

  /** PUT /api/slides/:slideId - Update slide */
  .put(JwtVerify, validate(paramValidation.updateSlide), slideCtrl.update)

  /** DELETE /api/slides/:slideId - Delete slide */
  .delete(JwtVerify, slideCtrl.remove)

/** Load slide when API with slideId route parameter is hit */
router.param('slideId', slideCtrl.load)

module.exports = router

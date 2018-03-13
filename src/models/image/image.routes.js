const express = require('express')
const validate = require('express-validation')
const paramValidation = require('../../config/param-validation')
const imageCtrl = require('./image.controller')
const { JwtVerify } = require('../auth/auth.helpers')

const router = express.Router() // eslint-disable-line new-cap

router
  .route('/')
  /** GET /api/images - Get list of images */
  .get(imageCtrl.list)

  /** PUT /api/images - Upload a new image */
  .put(JwtVerify, validate(paramValidation.uploadImage), imageCtrl.upload)

router
  .route('/:imageId')
  /** GET /api/images/:imageId - Get image */
  .get(imageCtrl.get)

  /** DELETE /api/images/:imageId - Delete image */
  .delete(JwtVerify, validate(paramValidation.deleteImage), imageCtrl.remove)

/** Load image when API with imageId route parameter is hit */
router.param('imageId', imageCtrl.load)

module.exports = router

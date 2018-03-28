const express = require('express')
const validate = require('express-validation')
const paramValidation = require('../../config/param-validation')
const weekCtrl = require('./week.controller')

const router = express.Router() // eslint-disable-line new-cap
const { JwtVerify } = require('../auth/auth.helpers')

router
  .route('/')

  /** GET /api/weeks - Get list of weeks */
  .get(weekCtrl.list)

  /** POST /api/weeks - Create new week */
  .post(JwtVerify, validate(paramValidation.createWeek), weekCtrl.create)

router
  .route('/:weekId')

  /** GET /api/weeks/:weekId - Get week */
  .get(weekCtrl.get)

  /** POST /api/weeks/:weekId - Update current week */
  .put(JwtVerify, validate(paramValidation.updateWeek), weekCtrl.update)

  /** DELETE /api/weeks/:weekId - Delete week */
  .delete(JwtVerify, weekCtrl.remove)

router.param('weekId', weekCtrl.load)

module.exports = router

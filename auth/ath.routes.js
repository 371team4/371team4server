const express = require('express')
const validate = require('express-validation')
const paramValidation = require('../config/param-validation')
const authCtrl = require('./auth.controller')

const router = express.Router() // eslint-disable-line new-cap

router.
  route('/')
  /** POST /api/user/login - Login as user */
  .post(validate(paramValidation.login), authCtrl.login)

module.exports = router

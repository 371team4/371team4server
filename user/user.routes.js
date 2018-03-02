const express = require('express')
const validate = require('express-validation')
const paramValidation = require('../config/param-validation')
const userCtrl = require('./user.controller')

const router = express.Router() // eslint-disable-line new-cap

router.
  route('/')
  /** POST /api/user - create a new user */
  .post(validate(paramValidation.register),userCtrl.create)

router.
  route('/login')
  /** POST /api/user/login - login as an administrater */
  .post(validate(paramValidation.login), userCtrl.login)

module.exports = router

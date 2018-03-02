const express = require('express')
const validate = require('express-validation')
const paramValidation = require('../config/param-validation')
const userCtrl = require('./user.controller')

const router = express.Router() // eslint-disable-line new-cap

router.
  route('/')
  /** POST /api/user - Create new user */
  .post(validate(paramValidation.createUser),userCtrl.create)

router.
  route('/login')
  /** POST /api/user/login - Login as user */
  .post(validate(paramValidation.login), userCtrl.login)

router.
  route('/:userId')
  /** POST /api/user/:userId - Update current user */
  .post(validate(paramValidation.createUser),userCtrl.create)
  /** DELETE /api/user/:userId - Delete user */
  .delete(userCtrl.remove)

router.param('userId', userCtrl.load)

module.exports = router

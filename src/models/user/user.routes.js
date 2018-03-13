const express = require('express')
const validate = require('express-validation')
const paramValidation = require('../../config/param-validation')
const userCtrl = require('./user.controller')

const router = express.Router() // eslint-disable-line new-cap
const { JwtVerify } = require('../auth/auth.helpers')

router
  .route('/')

  /** GET /api/users - Get list of users */
  .get(JwtVerify, userCtrl.list)

  /** POST /api/users - Create new user */
  .post(JwtVerify, validate(paramValidation.createUser), userCtrl.create)

router
  .route('/:userId')

  /** GET /api/users/:userId - Get user */
  .get(JwtVerify, userCtrl.get)

  /** POST /api/users/:userId - Update current user */
  .put(JwtVerify, validate(paramValidation.updateUser), userCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(JwtVerify, userCtrl.remove)

router.param('userId', userCtrl.load)

module.exports = router

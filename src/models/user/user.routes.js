const express = require('express')
const validate = require('express-validation')
const paramValidation = require('../../config/param-validation')
const userCtrl = require('./user.controller')

const router = express.Router() // eslint-disable-line new-cap
const JWT = require('../auth/auth.helpers')

router
  .route('/')

  /** GET /api/users - Get list of users */
  .get(JWT.JwtRoleVerify, userCtrl.list)

  /** POST /api/users - Create new user */
  .post(JWT.JwtRoleVerify, validate(paramValidation.createUser), userCtrl.create)

router
  .route('/:userId')

  /** GET /api/users/:userId - Get user */
  .get(JWT.JwtRoleVerify, userCtrl.get)

  /** POST /api/users/:userId - Update current user */
  .put(JWT.JwtRoleVerify, validate(paramValidation.updateUser), userCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(JWT.JwtRoleVerify, userCtrl.remove)

router.param('userId', userCtrl.load)

module.exports = router

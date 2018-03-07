const express = require('express')
const validate = require('express-validation')
const paramValidation = require('../config/param-validation')
const userCtrl = require('./user.controller')

const router = express.Router() // eslint-disable-line new-cap

router
  .route('/')

  /** GET /api/users - Get list of users */
  .get(userCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createUser), userCtrl.create)

router
  .route('/:userId')

  /** GET /api/users/:userId - Get user */
  .get(userCtrl.get)

  /** POST /api/users/:userId - Update current user */
  .post(validate(paramValidation.createUser), userCtrl.create)

  /** DELETE /api/users/:userId - Delete user */
  .delete(userCtrl.remove)

router.param('userId', userCtrl.load)

module.exports = router

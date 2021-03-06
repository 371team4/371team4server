const express = require('express')
const slideRoutes = require('./slide/slide.routes')
const imageRoutes = require('./image/image.routes')
const userRoutes = require('./user/user.routes')
const authRoutes = require('./auth/auth.routes')
const weekRoutes = require('./week/week.routes')

const router = express.Router() // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'))

// mount slide routes at /slides
router.use('/slides', slideRoutes)

// mount slide routes at /images
router.use('/images', imageRoutes)

// mount user routes at /users
router.use('/users', userRoutes)

// mount login routes at /login
router.use('/login', authRoutes)

// mount week routes at /weeks
router.use('/weeks', weekRoutes)

module.exports = router

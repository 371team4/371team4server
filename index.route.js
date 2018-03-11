const express = require('express')
const slideRoutes = require('./src/models/slide/slide.routes')
const imageRoutes = require('./src/models/image/image.routes')
const userRoutes = require('./src/models/user/user.routes')
const authRoutes = require('./src/models/auth/auth.routes')

const router = express.Router() // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'))

// mount slide routes at /slides
router.use('/slides', slideRoutes)

// mount slide routes at /images
router.use('/images', imageRoutes)

// mount user routes at /user
router.use('/user', userRoutes);

// mount login routes at /login
router.use('/login', authRoutes);

module.exports = router

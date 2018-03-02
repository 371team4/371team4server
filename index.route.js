const express = require("express");
const slideRoutes = require("./slide/slide.routes");
const imageRoutes = require("./image/image.routes");

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get("/health-check", (req, res) => res.send("OK"));

// mount slide routes at /slides
router.use("/slides", slideRoutes);

// mount slide routes at /images
router.use("/images", imageRoutes);

module.exports = router;

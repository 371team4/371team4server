const express = require("express");
const slideRoutes = require("./slide/slide.routes");

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get("/health-check", (req, res) => res.send("OK"));

// mount slide routes at /slides
router.use("/slides", slideRoutes);

module.exports = router;

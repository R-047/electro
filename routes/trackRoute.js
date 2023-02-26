const express = require("express");

const trackRoute = express.Router();
const track = require("../api/track")

trackRoute.post("/", (req, res) => {
	track(req, res)
})

module.exports = trackRoute
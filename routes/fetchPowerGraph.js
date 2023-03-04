const express = require("express");

const fetchPowerGraphRoute = express.Router();
const fetchPowerGraph = require("../api/fetchPowerGraph.js")

fetchPowerGraphRoute.get("/", (req, res) => {
	fetchPowerGraph(req, res)
})

module.exports = fetchPowerGraphRoute
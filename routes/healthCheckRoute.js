const express = require("express");

const healthCheckRoute = express.Router();
const healthCheckDbReadRoute = express.Router();
const healthCheckDbReadWriteRoute = express.Router();
const {healthCheck, healthCheckDbRead, healthCheckDbWrite} = require('../api/healthCheck.js')

healthCheckRoute.get("/", (req, res) => {
	healthCheck(req, res)
})

healthCheckDbReadRoute.get("/", (req, res) => {
	healthCheckDbRead(req, res)
})


healthCheckDbReadWriteRoute.post("/:string", (req, res) => {
	healthCheckDbWrite(req, res)
})





module.exports = {healthCheckRoute, healthCheckDbReadRoute, healthCheckDbReadWriteRoute}

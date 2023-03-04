const { PrismaClient }  = require('@prisma/client')
const crypto = require('crypto')
const { Dayjs } = require('dayjs')

const {getCurrentTime} = require('../utils/date_time_helper')



const prisma = new PrismaClient()

const healthCheck = async (req, res) => {
	console.log("hehehehe")
	res.json({success: true})
}

const healthCheckDbRead = async (req, res) => {
	await prisma.$connect()
	const test_strings = await prisma.test.findMany()
	res.json({success: true, test_strings})
}

const healthCheckDbWrite = async (req, res) => {
	await prisma.$connect()
	await prisma.test.create({
		data: {
		  test_string: req.params.string,
		  slug: crypto.randomBytes(64).toString('hex'),
		  created_time: getCurrentTime()
		},
	})
	// const test_strings = await prisma.test.findMany()
	res.json({success: true})
}


module.exports = {healthCheck, healthCheckDbRead, healthCheckDbWrite}
const { PrismaClient }  = require('@prisma/client')
const { time } = require('console')
const crypto = require('crypto')
const dayjs = require('dayjs')

const prisma = new PrismaClient()

const track = async (req, res) => {
    console.log("event recieved")
    const voltage = req.body.voltage
    const current = req.body.current
    const power_factor = req.body.power_factor
    const active_power = voltage * current * (power_factor || 1)
    const power = active_power

    const energy = req.body.energy

    await prisma.$connect()
	await prisma.electro.create({
		data: {
		  slug: crypto.randomBytes(64).toString('hex'),
          voltage :voltage,
          current: current,
          power: power,
          energy: energy,
          power_factor: power_factor,
          active_power: active_power,
          created_time: dayjs().format()

		},
	})    
	res.json({success: true})
}

module.exports = track

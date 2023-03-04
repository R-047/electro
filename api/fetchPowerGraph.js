const { PrismaClient }  = require('@prisma/client')
const { Console } = require('console')
const crypto = require('crypto')
const {getCurrentTime, filteredDate} = require('../utils/date_time_helper')
const eventEmitter = require('../utils/streamer')
const {VALUES_RECIEVED} = require('../utils/streamer')

const prisma = new PrismaClient()


let interval = undefined

let count = 0

const fetchPowerGraph = async (req, res) => {
  
  res.setHeader("Content-Type", "text/event-stream")
  
  if(!interval){
    interval = setInterval(async () => {
      const date_filter = req.query.filter
      const time = filteredDate(date_filter)

      const values = await prisma.electro.findMany({
        where: {
          created_time: {
            gte: time
          },
        },
        select: {
          power: true,
          created_time: true
        },
      });

      
      console.log(`writing data to stream ${count}`)
      count = count + 1

      res.write("data: "+JSON.stringify(JSON.parse(JSON.stringify(values)))+"\n\n")
    }, 1000)       
  } 
  
}


module.exports = fetchPowerGraph



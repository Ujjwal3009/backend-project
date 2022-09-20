const express = require('express')
const logger = require('./logger/logger')
const app = express()
const route = require('./routes/route')
require('dotenv').config()
const port = process.env.PORT || 3070



// Database conncetion

const connectDatabase = require('./config/database')

connectDatabase()

app.use(express.json())
app.use('/', route)
app.listen(port, function () {
  logger.info('running server on from port:::::::' + port)
})

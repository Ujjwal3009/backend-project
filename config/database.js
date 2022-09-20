const mongoose = require('mongoose')
const logger = require('../logger/logger')

const connectDatabase = () => {
  mongoose.connect(process.env.DB_CONNECTION_STR, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((data) => {
      logger.info(`mongo db  connected with server : ${data.connection.host}`)
    }).catch((err) => console.log(err))
}

module.exports = connectDatabase

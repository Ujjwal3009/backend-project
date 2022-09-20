const axios = require('axios')
const transactionModel = require('../models/transactionModel')
require('dotenv').config()

// Task 1: Develop an API using Node.js to fetch the crypto transaction of a user

const API_KEY = process.env.API_KEY
const transaction = async (req, res) => {
  try {
    const options = {
      method: 'get',
      url: `https://api.etherscan.io/api?module=account&action=balance&address=${req.params.address}&tag=latest&apikey=${API_KEY}`
    }
    const result = await axios(options)
    const data = result.data
    res.status(200).send({ msg: data, status: true })
  } catch (err) {
    res.status(500).send({ msg: err.message })
  }
}

// Storing Transaction against this address in database.

const registerAddress = async (req, res) => {
  try {
    if (!req.body.address || !req.body.transaction) { return res.status(400).send({ msg: 'please provide address and transaction' }) }

    const data = await transactionModel.create(req.body)
    return res.status(201).send({ msg: 'successfully added', result: data })
  } catch (err) {
    res.status(500).send({ msg: err.message })
  }
}

module.exports = { transaction, registerAddress }

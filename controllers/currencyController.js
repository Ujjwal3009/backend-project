const axios = require('axios')
const currencyModel = require('../models/currencyModel')
require('dotenv').config()

// Task 3 :  Fetching the price of Ethereum

const API_URL = process.env.ETHRENUM_URL

const getethereumPrice = async (req, res) => {
  try {
    const options = {
      method: 'get',
      url: `${API_URL}`
    }
    const result = await axios(options)
    const data = result.data

    const value = data.ethereum.inr

    const update = {}

    update['ethereum.inr'] = value

    await currencyModel.findOneAndUpdate({ _id: '632a0bd1e7b11fa17892c496' }, update)

    res.status(200).send({ msg: data, status: true })
  } catch (err) {
    res.status(500).send({ msg: err.message })
  }
}

// Subtask 1 : Adding the Currency in Database

const registerCurrency = async (req, res) => {
  try {
    const data = req.body
    const ans = await currencyModel.create(data)
    return res.status(201).send(ans)
  } catch (err) {
    res.status(500).send({ msg: err.message })
  }
}

// SUbTask : Fetching the price of Ethereum every 10 minutes

const gettFreq = async (req, res) => {
  try {
    const result = await currencyModel.find()
    res.status(200).send({ data: result })
  } catch (err) {
    res.status(500).send({ msg: err.message })
  }
}

module.exports = { getethereumPrice, registerCurrency, gettFreq }

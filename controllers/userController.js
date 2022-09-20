const transactionModel = require('../models/transactionModel')
const currencyModel = require('../models/currencyModel')

// Task : Develop a GET API for a user where they give their address as an input and get their
// current balance and current price of ether as output.
const getUserDetails = async (req, res) => {
  try {
    const address = req.params.address
    const found = await transactionModel.findOne({ address })
    const balance = found.transaction
    const ethereumPrice = await currencyModel.find()
    const price = ethereumPrice[0].ethereum.inr
    const result = {
      userBalance: balance,
      ethreumPrice: price
    }
    return res.status(200).send({ msg: 'user details fetched', data: result })
  } catch (err) {
    res.status(500).send({ msg: err.message })
  }
}

// Transaction between two parties

const deals = async (req, res) => {
  try {
    if (req.query.choice === 'from') {
      const user1 = await transactionModel.findOne({ address: req.params.address1 })
      const user1Money = user1.transaction // money froim add2

      const user2 = await transactionModel.findOne({ address: req.params.address2 })
      const user2Money = user2.transaction

      const update1 = {}
      const update2 = {}

      update2.transaction = (+user1Money) + (+user2Money)
      update1.transaction = 0

      await transactionModel.findOneAndUpdate({ address: req.params.address1 }, update1)
      await transactionModel.findOneAndUpdate({ address: req.params.address2 }, update2)

      const dataa = await transactionModel.findOne({ address: req.params.address1 })
      return res.status(200).send({ data: dataa })
    } else {
      const sender = await transactionModel.findOne({ address: req.params.address2 })
      const senderMoney = sender.transaction

      const reciever = await transactionModel.findOne({ address: req.params.address1 })
      const recieverMoney = reciever.transaction

      const update1 = {}; const update2 = {}

      update1.transaction = (+senderMoney) + (+recieverMoney)
      update2.transaction = 0

      await transactionModel.findOneAndUpdate({ address: req.params.address1 }, update1)
      await transactionModel.findOneAndUpdate({ address: req.params.address2 }, update2)

      const dataa = await transactionModel.findOne({ address: req.params.address1 })
      return res.status(200).send({ data: dataa })
    }
  } catch (err) {
    return res.status(500).send({ msg: err.msg })
  }
}
module.exports = { getUserDetails, deals }

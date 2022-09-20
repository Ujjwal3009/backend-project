const express = require('express')
const router = express.Router()
const transactionController = require('../controllers/transactionController')
const currencyController = require('../controllers/currencyController')
const userController = require('../controllers/userController')


router.get("/",(req,res,)=>{
    res.status(200).send({ msg: "Please try listed endpoints", status: true })
    
})
router.get('/transaction/:address', transactionController.transaction)
router.post('/register', transactionController.registerAddress)

router.get('/getPrice', currencyController.getethereumPrice)
router.post('/addCurrency', currencyController.registerCurrency)
router.get('/getFreq', currencyController.gettFreq)

router.get('/userDetails/:address', userController.getUserDetails)
router.get('/deals/:address1/:address2', userController.deals)

module.exports = router

const express = require('express')
const router = express.Router()

const getAllProducts = require('../controller/controller')

router.route('/shopease/api/products').get(getAllProducts)

module.exports = router
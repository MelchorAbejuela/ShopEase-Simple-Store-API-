const mongoose = require('mongoose')
require('dotenv').config()

const dbConnect = async (url) => {
    return mongoose.connect(url)
}

module.exports = dbConnect
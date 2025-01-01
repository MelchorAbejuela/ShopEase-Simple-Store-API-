const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }, 
    originalPrice: {
        type: Number, 
        required: true
    }, 
    rating: {
        type: Number,
        default: 0
    },
    onSale: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('ProductModel', ProductSchema)
const ProductSchema = require('../schema/product')

const getAllProducts = async (req, res) => {
    const { name, company, minRating } = req.query
    let queryObject = {}

    if(name) {
        queryObject.name = {$regex: name, $options: "i"}
    }
    if(company) {
        queryObject.company = {$regex: company, $options: "i"}
    }
    if(minRating) {
        // I'm currently working with this
    }

    try {
        const products = await ProductSchema.find(queryObject)
        res.status(200).json({products, productsNum: products.length})
    } catch (error) {
        res.status(500).json({msg: "An unexpected error occured while fetching products."})
    }

    console.log(queryObject)
};

module.exports = getAllProducts;

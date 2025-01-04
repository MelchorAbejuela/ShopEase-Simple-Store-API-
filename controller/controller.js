const ProductSchema = require('../schema/product')

const getAllProducts = async (req, res) => {
    const { name, company, numericalFilter, price, onSale, sort, pageParam } = req.query
    let queryObject = {}

    if(name) {
        queryObject.name = {$regex: name, $options: "i"}
    }

    if(company) {
        queryObject.company = {$regex: company, $options: "i"}
    }

    // check if the numericalFilter is a truthy 
    if(numericalFilter) {
        // if it is, creator an object of key pair value (human and mongoose version of operator)
        const operator = {
            ">=": "$gte",
            "<=": "$lte"
        }
        // create a regEx that will be use to compare if there is a matching operator
        const regex = /\b(>=|<=)\b/g
        // use replace method to replace the human version of operator into mongoose version
        let filter = numericalFilter.replace(regex, (match) => {
            return `-${operator[match]}-`
        })
        // use split method 
        filter = filter.split(",").forEach(element => {
            const [field, operator, value] = element.split("-") // once split, it will be look like this (price $gte 100)
            // check if queryObject[field] does not exist yet
            if(!queryObject[field]) { 
                queryObject[field] = {} // create the queryObject[field] if does not
            }
            // create and add the final value
            queryObject[field][operator] = Number(value)
        });
        // log the queryObject
        console.log(queryObject)
    }

    if(onSale) {
        queryObject.onSale = onSale
    }

    const limit = 5
    const page = Number(pageParam) || 1
    const skip = (page - 1) * limit

    try {
        const products = await ProductSchema.find(queryObject)
            .sort(sort || "name")
            .limit(limit)
            .skip(skip)
        res.status(200).json({products, productsNum: products.length})
    } catch (error) {
        res.status(500).json({msg: "An unexpected error occured while fetching products."})
    }
};

module.exports = getAllProducts;

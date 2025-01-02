const ProductSchema = require('../schema/product')

const getAllProducts = async (req, res) => {
    const { name, company, numericalFilter, onSale, sort, pageParam } = req.query
    let queryObject = {}

    if(name) {
        queryObject.name = {$regex: name, $options: "i"}
    }

    if(company) {
        queryObject.company = {$regex: company, $options: "i"}
    }

    if(numericalFilter) {
        const symbol = {
            ">=": "$gte",
            "<=": "$lte"
        }

        const regEx = /\b(>=|<=)\b/g
        let filter = numericalFilter.replace(regEx, (match) => {
            return `-${symbol[match]}-`
        })
        
        filter = filter.split(",").forEach(element => {
            const [ field, operator, value ] = element.split("-")
            const options = ["rating", "price"]
            if(options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
            }
        });
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

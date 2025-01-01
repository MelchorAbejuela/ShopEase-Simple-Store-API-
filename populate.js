const mongoose = require("mongoose");

const dbConnect = require('./db/db_connect')
const ProductModel = require("./schema/product");
const productJSON = require("./product.json");

const populateFunc = async () => {
  try {
    await dbConnect(process.env.MONGO_URI)
    await ProductModel.deleteMany({});
    await ProductModel.create(productJSON);
    console.log("product.json successfully transfer to MongoDB");
    process.exit(0)
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
};
populateFunc();

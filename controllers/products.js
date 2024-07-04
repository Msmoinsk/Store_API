const Product_model = require('../models/product')

const getAllProductsStatic = async(req, res) => {
    const allProducts = await Product_model.find({
        name: "a first wooden table"
    })
    // throw new Error("Testing async Errors from package")
    res.status(200).json({
        allProducts,
        nbHits: allProducts.length
    })
}
const getAllProducts = async(req, res) => {
    const allProducts = await Product_model.find()
    if(!allProducts) return res.status(404).json({message: "No product found"})

    res.status(200).json({
        success:true, 
        message:"Products",
        products_list: allProducts,
    })
}
module.exports = {
    getAllProductsStatic,
    getAllProducts
}
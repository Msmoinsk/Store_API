const Product_model = require('../models/product')

const getAllProductsStatic = async(req, res) => {
    const search = 'm'
    const allProducts = await Product_model.find({
        name: {$regex: search, $options: 'i'},
        // this is for finding by char  \\ options is to tell like insensitive or sensitive 
    })
    // throw new Error("Testing async Errors from package")
    res.status(200).json({
        allProducts,
        nbHits: allProducts.length
    })
}

const getAllProducts = async(req, res) => {
    // When the query from request come u can set to any name rather than the exact name in databasse 
    // req.query = name but while fetching the req you can do this { search } = req.query
    const { featured, company, name } = req.query
    const queryObject = {}
    if(featured){
        queryObject.featured = featured === "true"? true:false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex: name, $options: 'i'}
    }
    console.log(queryObject)


    const allProducts = await Product_model.find(queryObject)
    if(!allProducts || allProducts.length === 0) {
        return res.status(404).json({message: "No product found"})
    }

    res.status(200).json({
        success:true, 
        message:"Products",
        products_list: allProducts,
        nbitsNum: allProducts.length,
    }) 
}
module.exports = {
    getAllProductsStatic,
    getAllProducts
}
const Product_model = require('../models/product')

const getAllProductsStatic = async(req, res) => {
    const allProducts = await Product_model.find({price:{$gt:30}})
    // const allProducts = await Product_model.find({}).sort('name').limit(10).skip(5)
    // const allProducts = await Product_model.find({}).select('name price')
    // const allProducts = await Product_model.find({}).sort('-name')
    // const allProducts = await Product_model.find({
    //     name: {$regex: search, $options: 'i'},
    //     // this is for finding by char  \\ options is to tell like insensitive or sensitive 
    // })

    // throw new Error("Testing async Errors from package")
    res.status(200).json({
        nbHits: allProducts.length,
        allProducts,
    })
}

const getAllProducts = async(req, res) => {
    // When the query from request come u can set to any name rather than the exact name in databasse 
    // req.query = name but while fetching the req you can do this { search } = req.query
    
    // ---> This is how you can filter raw Query [ level : basic ]
    const { featured, company, name, sort, fields, numericFilters } = req.query
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
    if(numericFilters){
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        };
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        );
        // 1. filters output = price-$gt-30, rating-$gte-4
        const options = ['price', 'rating'];
        // 2. split.forEach output = [ price-$gt-30, rating-$gte-4 ]
        filters = filters.split(',').forEach((item) => {
            // 3. item.split output = [ price, $gt, 30 ], [ rating, $gte, 4 ]
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) };
            }
        });
    }
    console.log(queryObject)

    // ---> This is how you can sort and select Fields from Query [ level: intermidiate ]
    let allProductsList = Product_model.find(queryObject)

    // Sort
    if(sort){
        const sortList = sort.split(',').join(' ')
        allProductsList = allProductsList.sort(sortList)
    }else{
        allProductsList = allProductsList.sort('createedAt')
    }
    // Fields
    if(fields){
        const selectList = fields.split(',').join(' ')
        allProductsList = allProductsList.select(selectList)
    }
    // Skip & Limit with PAGE
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    // 23 items
    // page = 3 : 10(limit) 10(limit) 3(limit)
    //                skipped by 10 
    allProductsList = allProductsList.skip(skip).limit(limit)

    // Calling the main API ( allProductsList )
    const allProducts = await allProductsList


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
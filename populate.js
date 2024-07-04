require('dotenv').config()

const db_connection = require('./db/connect'),
Product_Model = require('./models/product')

const jsonProducts = require('./products.json')


const start = async () => {
    try {
        await db_connection(process.env.MONGO_URL)
        await Product_Model.deleteMany()
        await Product_Model.create(jsonProducts)
        console.log("success!!!");
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
start()
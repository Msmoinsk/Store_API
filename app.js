require('dotenv').config()
// async Errors

const express = require("express"),
app = express()

const db_connection = require('./db/connect')
const product = require('./routes/products')

const notFoundMiddleWare = require("./middleware/not-found"),
errorHandlerMiddleWare = require("./middleware/error-handler")

// MiddleWare 
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">product route</a>')
})

app.use('/api/v1/products', product)

// Product Route



app.use(notFoundMiddleWare)
app.use(errorHandlerMiddleWare)

const port = process.env.PORT || 3000
// (^-^) You have to Call the function start() at the end if not server will not run and stuck
const start = async() => {
    try {
        // Connect DB
        await db_connection(process.env.MONGO_URL)
        app.listen(port, () => console.log(`Server Running at PORT : ${port}`))
    } catch (error) {
        console.log(error);
    }
}
start()

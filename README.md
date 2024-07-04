### This is for the Search Engine Frontend will send http req to server and sever will do all the heavy things for search

### day 2 learned in this project
1. learned about the expres-async-errors module :  that it use to handle the unwanted error just by using the {
    throw new Error("error name")
}
first we need to use the asyncWrapper() define in the different file {
    const asyncWrapper = (func) => {
        return async( req, res, next ) => {
            try {
                await func(req, res, next)
            } catch (error) {
                next(error)
            }
        }
    }
    and in the controller
    asyncWrapper( async(req, res) => {
        // your dataBase code
        const tasks = await Task.create(req.body)
        res.status(200).json({tasks}) 
    })
}

2. and how to populate the dataBase if the data in array by runnning one file name Poplate.js and exiting the process by the process.exit(0){
    watch the file populate.js
    you will understand
}

https://www.youtube.com/watch?v=rltfdjcXjmk
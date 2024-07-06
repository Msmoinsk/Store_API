### This is for the Search Engine Frontend will send http req to server and sever will do all the heavy things for search

### day 2 learned in this project
1. learned about the expres-async-errors module :  that it use to handle the unwanted error just by using the 
    ```javascript
    throw new Error("error name")
    ```
first we need to use the asyncWrapper() define in the different file 
```javascript
{
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

```

2. and how to populate the dataBase if the data in array by runnning one file name Poplate.js and exiting the process by the process.exit(0){
    watch the file populate.js
    you will understand
}

3. how to manage the query and select the query you allow to search on by using the code
```javascript
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
        queryObject.name = name
    }
    console.log(queryObject)


    const allProducts = await Product_model.find(queryObject)
    if(!allProducts || allProducts.length === 0) {
        return res.status(404).json({message: "No product found"})
    }

```

4. go to mongo db query operator and you will find many operators some used are given below
>>> name : {$regex: search, $options: 'i'},
---> { $regex } will pass on the char to search  { $option } you have to specify how it should be pass on like [ case sensitive or insensitive ]

for mongoDB oparators
https://www.mongodb.com/docs/manual/reference/operator/query/


5. TO by using url and sending all data without reducing the data
for Mongoose Query sorting 
https://mongoosejs.com/docs/queries.html
```javascript
// With a JSON doc
await Person.
  find({
    occupation: /host/,
    'name.last': 'Ghost',
    age: { $gt: 17, $lt: 66 },
    likes: { $in: ['vaporizing', 'talking'] }
  }).
  sort({ occupation: -1 }).  // This one
  exec();

// Using query builder
await Person.
  find({ occupation: /host/ }).
  where('name.last').equals('Ghost').
  where('age').gt(17).lt(66).
  where('likes').in(['vaporizing', 'talking']).
  sort('-occupation').   // This one
  exec();
```

6. To select only Fields you want to see, by Using query 
--->> example : feild = name, price
soo
```javascript
products: {
    {
        name: "name",
        price: 469
    },
    {
        name: "name2",
        price:984
    }
}
```
USe this for understanding :
```javascript
// With a JSON doc
await Person.
  find({
    occupation: /host/,
    'name.last': 'Ghost',
    age: { $gt: 17, $lt: 66 },
    likes: { $in: ['vaporizing', 'talking'] }
  }).
  select({ name: 1, occupation: 1 }).  // this one
  exec();

// Using query builder
await Person.
  find({ occupation: /host/ }).
  where('name.last').equals('Ghost').
  where('age').gt(17).lt(66).
  where('likes').in(['vaporizing', 'talking']).
  select('name occupation').   // This one
  exe
```

7. To skip and Limit the data 
only the limited amount of data is provided by this key word
```javascript
// With a JSON doc
await Person.
  find({
    occupation: /host/,
    'name.last': 'Ghost',
    age: { $gt: 17, $lt: 66 },
    likes: { $in: ['vaporizing', 'talking'] }
  }).
  limit(10).   // this one
  skip(10).    // This one
  exec();

// Using query builder
await Person.
  find({ occupation: /host/ }).
  where('name.last').equals('Ghost').
  where('age').gt(17).lt(66).
  where('likes').in(['vaporizing', 'talking']).
  limit(10).  // This one
  skip(10)    // This one
  exe
```

8. Now Filter on the basis of the Numeric Values like Price or Rating



refer This: 
https://www.youtube.com/watch?v=rltfdjcXjmk


refer This for underStanding the Search API:
https://hn.algolia.com/api
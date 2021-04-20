 
const express = require('express')
const products = require('./data/products')
const app = express()
const port = 4000
 
app.get('/', (req, res)=>{
	res.send('API is running....')

})

app.get('/api/products', (req, res)=>{
	res.json(products)
})
 
app.get('/api/products/:id', (req, res)=>{
	res.json(products.find((p) => p._id === req.params.id))
})

app.listen(port, 
	console.log(`Hey Jo The Backend is listening at http://localhost:${port}`))
 
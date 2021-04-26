 
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './connection/database.js'
import productRoutes from './routes/productRoutes.js'

import {notFound, errorHandler} from './middleware/errorMiddleWare.js'
//import files from the .env
dotenv.config()

//connect the database
connectDB()

const app = express()
 


 
app.get('/', (req, res)=>{
	res.send('API is running....')

})

app.use('/api/products', productRoutes)

app.use(notFound)
app.use(errorHandler)
//console.log("hello there")

 
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Hey Jo The Backend is listening at http://localhost:${PORT}`.yellow.bold))
 
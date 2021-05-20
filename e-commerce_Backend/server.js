 
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './connection/database.js'
import productRoutes from './routes/productRoutes.js'
import  userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleWare.js'
//import files from the .env
dotenv.config()

//connect the database
connectDB()

const app = express()
 
//to accept json from the body for user {email, password}
app.use(express.json())
 
app.get('/', (req, res)=>{
	res.send('API is running....')

})

app.use('/api/products', productRoutes) 
app.use('/api/users', userRoutes)
app.use('/api/orders',orderRoutes)
//app.use('/api/users',userRoutes)

app.use(notFound)
app.use(errorHandler)
//console.log("hello there")

 
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Hey Jo The Backend is listening at http://localhost:${PORT}`.yellow.bold))
  
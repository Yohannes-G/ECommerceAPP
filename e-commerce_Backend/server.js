import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './connection/database.js'
import productRoutes from './routes/productRoutes.js'
import  userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import {notFound, errorHandler} from './middleware/errorMiddleWare.js'
//import files from the .env
dotenv.config()

//connect the database
connectDB()

const app = express()
 
if(process.env.NODE_ENV === 'development'){
	app.use(morgan('dev'))
}
//to accept json from the body for user {email, password}
app.use(express.json())
/* 
app.get('/', (req, res)=>{
	res.send('API is running....')

})
*/
app.use('/api/products', productRoutes) 
app.use('/api/users', userRoutes)
app.use('/api/orders',orderRoutes)

app.use('/api/upload',uploadRoutes)

app.get('/api/config/paypal', 
		(req, res) => res.send(process.env.PAYPAL_CLIENT_ID))


const __dirname = path.resolve()
//making the upload folder static to browse it in browser
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'production'){

	app.use(express.static(path.join(__dirname, '/e-commerce_FrontEnd/build')))
	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'e-commerce_FrontEnd', 'build', 'index.html')))

}else{

	app.get('/', (req, res)=>{
	res.send('API is running....')

})
}
app.use(notFound)
app.use(errorHandler)
//console.log("hello there")

 
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Hey Jo The Backend is listening at http://localhost:${PORT}`.yellow.bold))
  
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModels.js'
import Product from './models/productModels.js'
import Order from './models/orderModels.js'
import connectDB from './connection/database.js'

dotenv.config()

connectDB()

//
const importData = async () => {
	try{
		//order, product is promising to give value
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()
		//put the array of user id on the createduser variable
		const createdUsers = await User.insertMany(users)

		const adminUser = createdUsers[0]._id

		//it will take previous products with adding users
		const sampleProducts = products.map(product=>{
			return { ...product, user:adminUser }
		})

		await Product.insertMany(sampleProducts)

		console.log('Data Imported!'.green.inverse)
		process.exit()


	}catch(error){
		console.error(`${error.red.inverse}`)
		process.exit(1)

	}
}

	const destroyData = async () => {
	try{
		//order, product is promising to give value
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()
		
		console.log('Data Destroyed:'.red.inverse)
		process.exit()


	}catch(error){
		console.error(`${error.red.inverse}`)
		process.exit(1)

	}
} 

if (process.argv[2] === '-d'){

	destroyData()

}else{

	importData()

}
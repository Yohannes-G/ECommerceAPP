import asyncHandler from 'express-async-handler'
import generateToken from '../utills/generateTokens.js'
import User from '../models/userModels.js'


//description Auth user and get token
//router      POST /api/users/login
//access      Public

const authUser = asyncHandler(async (req, res)=>{
	 const { email, password } = req.body

	/* res.send(
	 	
	 	{ email,
	 	 password, }

	 	)*/
	 const user = await User.findOne({ email })

	 if (user && (await user.matchPassword(password))){
	 	res.json({
	 		_id: user._id,
	 		name:user.name, 
	 		email:user.email,
	 		isAdmin:user.isAdmin,
	 		token: generateToken(user._id),
	 	})
	 }else{
	 	res.status(401)
	 	throw new Error('Invalid email or password')
	 }
})

//description get user profile
//router      GET /api/users/profile
//access      Private

const getUserProfile = asyncHandler(async (req, res)=>{
	// console.log(" Hello getUserProfile")

	const user = await User.findById(req.user._id)
	//console.log(user)
	//console.log(req.user._id)
	if(user){
		res.json({
			_id: user._id,
	 		name:user.name,
	 		email:user.email,
	 		isAdmin:user.isAdmin,
		})

		//console.log(req.user._id)
		//console.log(req.user.name)
	}else{
		res.status(404)
		throw new Error('User not found')
	} 
})

//description Update user profile
//router      PUT /api/users/profile
//access      Private

const updateUserProfile = asyncHandler(async (req, res)=>{
	//console.log("Hello updateUserProfile.................................1")
	const user = await User.findById(req.user._id)
	/*console.log(req.user._id)
	console.log(user)
console.log("Hello updateUserProfile......................................2")
	console.log(req.body.name)
	console.log(req.body.email)
	console.log(req.body.password)
console.log("Hello updateUserProfile.....................................3")
	console.log(user.name)
	console.log(user.email)
	console.log(user.password)*/
	if(user){
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email
		 if(req.body.password){
		 	user.password = req.body.password
		 }

	//console.log(user)
	//	console.log("Hello updateUserProfile..............................4")

	const updateUser = await user.save()

	//	console.log(updateUser._id)
	//	console.log(updateUser.name)
	//	console.log(updateUser.email)

		res.json({

		 		_id: updatedUser._id,
		 		name:updatedUser.name,
		 		email:updatedUser.email,
		 		isAdmin:updatedUser.isAdmin,
		 		token: generateToken(updatedUser._id),
		 	})

	//	console.log("Hello updateUserProfile..............................5")
	//	console.log(_id)
	//	console.log(updateUser._d)

	}else{
		res.status(404)
		throw new Error('User not found')
	}})


//description  Register a new user
//router      POST /api/users
//access      Public

const registerUser = asyncHandler(async (req, res)=>{
	const { name, email, password } = req.body
	//console.log("hello")
	const userExists = await User.findOne({ email })

	if(userExists){
		res.status(400)//400-- bad request
		 throw new Error('User already exist')
		} 

		const user = await User.create({
			name,
			email,
			password
		})

	 if(user){
			res.status(201).json({       //201- something is created in database
				_id: user._id,
		 		name:user.name,
		 		email:user.email,
		 		isAdmin:user.isAdmin,
		 		token: generateToken(user._id),
			})
		}else{
			res.status(404)
			throw new Error('User not found')
		}
})

const getUsers = asyncHandler(async (req, res)=>{
	const users = await User.find({})
	//console.log(products[0]._id)
	//console.log("Hello There")
	res.json(users)
})




export { getUsers,authUser,registerUser, getUserProfile , updateUserProfile}


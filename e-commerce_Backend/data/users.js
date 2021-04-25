import bcrypt from 'bcryptjs'

const users = [
	{
		name: 'Admin User',
		email: 'amdin@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true
	},
	{
		name: 'Jonatan Jo',
		email: 'john@example.com',
		password: bcrypt.hashSync('123456', 10),
		
	},
	{
		name: 'Yohannes Girmaw',
		email: 'yoni@example.com',
		password: bcrypt.hashSync('123456', 10),
		 
	}
]

export default users
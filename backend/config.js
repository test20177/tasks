import dotenv from 'dotenv'
dotenv.config()
 
const port = process.env.PORT || 3000
const database = process.env.DATABASE || 'mongodb://localhost:27017/tasks'

export { port, database }
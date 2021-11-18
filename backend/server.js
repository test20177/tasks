import express from 'express'
import { port } from './app/config.js' 
import taskRouter from './app/routes/tasks.js'
import homeRouter from './app/routes/home.js'
import cors from 'cors'

const app = express()

// db
import './app/db/mongoose.js'

// parser
// Content-Type: application/json
app.use(express.json())

// fix cors
app.use(cors())

// routes
app.use('/api/v1', homeRouter)
app.use('/api/v1/tasks', taskRouter)

app.listen(port, () => {
    console.log(`Serwer startuje... http://localhost:${port}`)
}) 
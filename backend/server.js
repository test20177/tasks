import express from 'express'
import { port } from './config.js' 
import taskRouter from './routes/tasks.js'
import homeRouter from './routes/home.js'

const app = express()

// db
import './db/mongoose.js'

// parser
// Content-Type: application/json
app.use(express.json())

// routes
app.use('/api/v1', homeRouter)
app.use('/api/v1/tasks', taskRouter)

app.listen(port, () => {
    console.log(`Serwer startuje... http://localhost:${port}`)
}) 
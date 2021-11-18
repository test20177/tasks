import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true 
    },
    done: {
        type: Boolean,
        required: false,
        default: false 
    }
})

const Task = mongoose.model('Task', TaskSchema)

export default Task
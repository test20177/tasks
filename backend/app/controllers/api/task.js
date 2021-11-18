import Task from '../../db/models/task.js'

export const getAllTasks = async (req, res) => {
    let tasks
    try {
        tasks = await Task.find({})
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.status(200).json(tasks)
}

export const getTaskById = async (req, res) =>  {
    const { id } = req.params
    let task
    try {
        task = await Task.findOne({ _id: id })
    } catch (err) {
        return res.status(500).send({ message: `Error while retrieving order with id ${id}` })
    }
    return res.status(200).json(task)
}

export const saveTask = async (req, res) => {
    const { title, body, done } = req.body
    let task = new Task({ title, body, done })
    try {
        await task.save()
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.status(201).json(task)
}

export const updateTask = async (req, res) => {
    const { id } = req.params
    const { title, body, done } = req.body 
    let task
    try {
        task = await Task.findOne({ _id: id })
    } catch (err) {
        return res.status(500).send({ message: `Error while retrieving order with id ${id}` })
    }
    
    task.title = title
    task.body = body
    task.done = done

    try {
        await task.save()
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.status(201).json(task)
}

export const deleteTask = async (req, res) => {
    const { id } = req.params
    try {
        await Task.deleteOne({ _id: id })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.sendStatus(204)
}

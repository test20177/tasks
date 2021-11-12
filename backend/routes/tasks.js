import express from 'express'
const router = express.Router()

import * as taskController from '../controllers/api/task.js'

router.get('/' , taskController.getAllTasks)
router.get('/:id', taskController.getTaskById)
router.post('/', taskController.saveTask)
router.put('/:id', taskController.updateTask)
router.delete('/:id', taskController.deleteTask)

export default router
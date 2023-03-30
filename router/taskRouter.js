const express = require('express')
const TaskController = require('../controllers/TaskController')
const authMiddleware = require('../middleware/auth-middle')
const taskRouter = express.Router()

taskRouter.get('/get', authMiddleware, TaskController.getAllTasks)
taskRouter.get('/get/:user', authMiddleware, TaskController.getTasksByUser)
taskRouter.post('/create', authMiddleware, TaskController.createTask)
taskRouter.put('/update/:id', authMiddleware, TaskController.updateTask)
taskRouter.delete('/delete/:id', TaskController.deleteTask)

module.exports = taskRouter

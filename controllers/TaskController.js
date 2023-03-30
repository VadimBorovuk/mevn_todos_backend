const taskService = require('../services/TaskService')
const ApiError = require('../exceptions/api-err')

class TaskController {
    async getAllTasks(req, res, next) {
        try {
            const dataTasks = await taskService.getTasksService(req.query)
            res.status(200).json(dataTasks)
        } catch (e) {
            next(e)
        }
    }

    async getTasksByUser(req, res, next) {
        try {
            if (!req.params.user) throw ApiError.BadRequest('not find id')
            const taskTotal = await taskService.getTaskByIdService(req.params.user, req.query)
            res.status(200).json(taskTotal)
        } catch (e) {
            next(e)
        }
    }

    async createTask(req, res, next) {
        try {
            const task = await taskService.createTaskService({...req.body, user: req.user.id.id})
            res.status(201).json(task)
        } catch (e) {
            next(e)
        }
    }

    async updateTask(req, res, next) {
        try {
            const taskId = req.params.id
            if (!taskId) throw ApiError.BadRequest('not find id')
            const task = await taskService.updateTaskService(taskId, {...req.body, user: req.user.id.id}, {new: true})
            res.status(201).json(task)
        } catch (e) {
            next(e)
        }
    }

    async deleteTask(req, res, next) {
        try {
            const taskId = req.params.id
            if (!taskId) throw ApiError.BadRequest('not find id')
            const task = await taskService.deleteTaskService(taskId)
            res.status(200).json({message: `Task '${task.title}' is deleted`})
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new TaskController()

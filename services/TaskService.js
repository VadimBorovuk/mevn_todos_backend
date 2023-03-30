const taskSchema = require("../schema/taskSchema");

class TaskService {
    async getTaskByIdService(id, {page, limit, title, isChecked, sort}){
        let params = {}
        let countTasks
        if(title) params.title = title
        if(isChecked) params.isChecked = isChecked
        if(sort) params.sort = sort
        let tasks = await taskSchema.find({user: id}).find(params).sort({'updated_at': -1})
        countTasks = tasks.length

        if (!page) page = '1'
        if (!limit) limit = '10'

        let startIndex = (page - 1) * limit;
        let endIndex = page * limit;

        tasks = tasks.slice(startIndex, endIndex);
        return {page, limit, total_items: countTasks, tasks}
    }

    async createTaskService (data) {
        return taskSchema.create(data);
    }

    async updateTaskService(id, data) {
        return taskSchema.findByIdAndUpdate(id, data, {new: true});
    }

    async deleteTaskService(id) {
        return taskSchema.findByIdAndDelete(id)
    }
}

module.exports = new TaskService()

const {Schema, model} = require('mongoose')

const TaskSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, default: ''},
    sort: {type: Number, default: 0},
    isChecked: {type: Boolean, default: false},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}})

module.exports = model('Task', TaskSchema)

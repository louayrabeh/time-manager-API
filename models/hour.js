const mongoose = require('mongoose')

const schema = mongoose.Schema

const hourSchema = new schema(
    {
        projectId: { type: String, required: true },
        taskId: { type: String, required: true },
        startDate: { type: String, default : '' },
        userId: { type: String, required: true },
        
    }
)
module.exports = mongoose.model('hours', hourSchema) 
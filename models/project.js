const mongoose = require('mongoose')

const schema = mongoose.Schema

const projectSchema = new schema(
    {
        name: { type: String, required: true },
        startDate: { type: String, default : ''},
        endDate: { type: String, default : '' },
        status: { type: String, required: true },
        finance: { type: Number, required: true },
        users: { type: Array, default: [] }
    }
)

module.exports = mongoose.model('project', projectSchema)
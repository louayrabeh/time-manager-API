const mongoose = require('mongoose')

const schema = mongoose.Schema

const subCategorySchema = new schema(
    {
        label: { type: String, required: true },
        description: { type: String, required: true },
        creationDate: { type: String, default : '' },
        users: { type: Array, default : [] },
        status: { type: String, required: true },
        projectId: { type: String, required: true },
    }
)

module.exports = mongoose.model('subCategories', subCategorySchema)
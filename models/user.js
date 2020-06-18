const mongoose = require('mongoose')

const schema = mongoose.Schema

const userSchema = new schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        userName: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
        creationDate: { type: String , default : '' },
        userRole : { type: String, default : '' },
        confirmed : {type : Boolean , default : false},
        projects: { type: Array, default : [] },
        hours :  { type: Array, default : [] },
        
    }
)
module.exports = mongoose.model('users', userSchema) 
import mongoose from "mongoose"

const UsersRoles = new mongoose.Schema({
    IdUsers:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    IdRoles:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Roles',
        required: true
    }
})

export default mongoose.model('UsersRoles',UsersRoles)
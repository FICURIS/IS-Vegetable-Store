import mongoose from "mongoose"

const Users = new mongoose.Schema({
    Username: {type: String, required: true},
    Passwors:{type: String, reqired: true},
    Email:{type: String, required: true, unique: true},
    Phone:{type: String, required: true}
})

export default mongoose.model('Users',Users)
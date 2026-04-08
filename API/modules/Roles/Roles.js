import mongoose from "mongoose"

const Roles = new mongoose.Schema({
    Name:{type: String, required: true}
})

export default mongoose.model('Roles',Roles)
import mongoose from "mongoose"

const Roles = new mongoose.Schema({
    Name:{type: String, required: true}
})
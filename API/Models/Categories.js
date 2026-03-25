import mongoose from "mongoose"

const Categories = new mongoose.Schema({
    Name:{type: String, required: true},
    Description:{type: String}
})
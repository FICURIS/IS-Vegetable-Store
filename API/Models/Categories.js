import mongoose from "mongoose"

const Categories = new mongoose.Schema({
    Name:{type: String, required: true},
    Description:{type: String}
})

export default mongoose.model('Categories',Categories)
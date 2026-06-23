import mongoose from "mongoose"

const Categories = new mongoose.Schema({
    name:{type: String, required: true},
    description:{type: String}
})

export default mongoose.model('Categories',Categories)
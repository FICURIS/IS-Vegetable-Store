import mongoose from "mongoose"

const Address = new mongoose.Schema({
    IdUsers:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    City:{type: String, required: true},
    Street:{type: String, required: true},
    House:{type: String, required: true},
    Apartment:{type: String}
})

export default mongoose.model('Address',Address)
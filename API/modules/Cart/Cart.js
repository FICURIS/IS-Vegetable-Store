import mongoose from "mongoose"

const Cart = new mongoose.Schema({
    IdUsers:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
})

export default mongoose.model('Cart',Cart)
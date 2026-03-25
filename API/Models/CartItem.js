import mongoose from "mongoose"

const CartItem = new mongoose.Schema({
    IdCart:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    IdProducts:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    Quantity:{type: Number, min: 1, requried: true},
    PriceAtMoment:{type: Number, required: true}
})
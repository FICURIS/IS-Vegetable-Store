import mongoose from "mongoose"

const ProductDescription = new mongoose.Schema({
    IdProducts:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    Variety:{type: String},
    Text:{type: String}
})
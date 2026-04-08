import mongoose from "mongoose"

const ProductImages = new mongoose.Schema({
    IdProducts:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    ImageURL:{type: String}
})

export default mongoose.model('ProductImages',ProductImages)
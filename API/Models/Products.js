import mongoose from 'mongoose';

const Products = new mongoose.Schema({
    Name: {type: String, required: true},
    Quantity: {type: Number, required: true},
    Price: {type: Number, required: true},
    IdCategories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
})

export default mongoose.model('Products',Products)
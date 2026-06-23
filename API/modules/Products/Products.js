import mongoose from "mongoose";

const Products = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true,
        min: 0
    },
    Price: {
        type: Number,
        required: true,
        min: 0
    },
    IdCategories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories"
    }
});

export default mongoose.model("Products", Products);
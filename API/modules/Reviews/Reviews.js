import mongoose from "mongoose";

const Reviews = new mongoose.Schema({
    IdProducts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true
    },
    IdOrders: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orders"
    },
    Date: {
        type: Date,
        default: Date.now
    },
    Rating: {
        type: Number,
        min: 1,
        max: 5
    },
    Text: {
        type: String
    }
});

export default mongoose.model("Reviews", Reviews);
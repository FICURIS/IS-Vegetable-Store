import mongoose from "mongoose";

const Orders = new mongoose.Schema({
    IdUsers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    IdOrdersStatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrdersStatus",
        required: true
    },
    IdAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },
    DateOrder: {
        type: Date,
        default: Date.now
    },
    TotalPrice: {
        type: Number,
        required: true
    }
});

export default mongoose.model("Orders", Orders);
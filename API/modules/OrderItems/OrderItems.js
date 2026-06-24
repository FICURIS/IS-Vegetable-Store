import mongoose from "mongoose";

const OrderItems = new mongoose.Schema({
    IdOrders: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orders",
        required: true
    },
    IdProducts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    },
    IdCartItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CartItem"
    },
    Quantity: {
        type: Number,
        min: 1,
        required: true
    },
    Price: {
        type: Number,
        required: true
    }
});

export default mongoose.model("OrderItems", OrderItems);

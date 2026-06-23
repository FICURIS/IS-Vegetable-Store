import mongoose from "mongoose";

const OrdersStatus = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    }
});

export default mongoose.model("OrdersStatus", OrdersStatus);
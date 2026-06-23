import mongoose from "mongoose";

const Roles = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

export default mongoose.model("Roles", Roles);
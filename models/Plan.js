import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: Number,
    duration: Number
});

const Plan = mongoose.models.plan || mongoose.model("plan", planSchema);

export default Plan;
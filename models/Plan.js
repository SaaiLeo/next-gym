import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pirce: Number,
    duration: Number
});

const Plan = mongoose.models.plan || mongoose.models("plan", planSchema);

export default Plan;
import { EditNote } from "@mui/icons-material";
import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: String,
    age: Number,
    height: Number,
    weight: Number,
    plan: String,
    startDate: Date,
    endDate: Date,
    trainer: String,
});

const Member = mongoose.models.member || mongoose.model("member", memberSchema);

export default Member;
import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    salary: Number,
    workingHours: String
})

const Staff = mongoose.models.staff || mongoose.model("staff", staffSchema);

export default Staff;
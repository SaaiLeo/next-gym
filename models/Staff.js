import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
    name: String,
    phone: String,
    salary: Number,
    workinghour: String,
})

const Staff = mongoose.models.staff || mongoose.model("staff", staffSchema);

export default Staff;
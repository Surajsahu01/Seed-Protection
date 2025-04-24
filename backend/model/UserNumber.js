import mongoose from "mongoose";

const userNumberSchema = new mongoose.Schema({
    phone: { type: String, required: true },
});

const UserNumber = mongoose.model("UserNumber", userNumberSchema);  
export default UserNumber;
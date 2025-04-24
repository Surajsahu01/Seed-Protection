import mongoose from "mongoose";
import moment from "moment-timezone";

const SensorDataSchema = new mongoose.Schema({
    temperature: Number,
    humidity: Number,
    waterDetected: Boolean,
    flameDetected: Boolean,
    createdAt: { 
        type: Date, 
        default: () => moment().tz('Asia/Kolkata').toDate()
    }
  });
  
const SensorData = mongoose.model("SensorData", SensorDataSchema);
export default SensorData;
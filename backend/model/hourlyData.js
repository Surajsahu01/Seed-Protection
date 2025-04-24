import mongoose from "mongoose";

const hourlyAverageSchema = new mongoose.Schema({
    temperature: Number,
    humidity: Number,
    waterDetected: Boolean,
    flameDetected: Boolean,
    timestamp: Date
});

const HourlyAverage = mongoose.model("HourlyAverage", hourlyAverageSchema);
export default HourlyAverage;

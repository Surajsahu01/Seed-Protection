import express from "express";
import { downloadReport, getAlertLogs, getAllSensorData, getFiveMinuteAverage, getHistoricalData, getSensorData } from "../controller/sensoreDataController.js";


const router = express.Router();

router.post("/getSensorData", getSensorData); // Route to get sensor data

// 🔹 GET latest 10 entries
router.get("/latest", getAllSensorData);

// 🔹 GET 5-minute average data
router.get("/average", getFiveMinuteAverage);

// 🔹 GET historical data with query params
router.get("/history", getHistoricalData);

// 🔹 GET download report in CSV or PDF
router.get("/download", downloadReport);

// 🔹 GET flame/water alert logs
router.get("/alerts", getAlertLogs);



export default router;
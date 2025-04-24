import axios from "axios";
import { API_BASE_URL } from "../Utils/util";

const BASE_URL = API_BASE_URL; // 🔁 Replace with your production URL if needed

// 🔹 1. Send new sensor data (POST)
export const sendSensorData = async (sensorData) => {
  try {
    const res = await axios.post(`${BASE_URL}/sensor/getSensorData`, sensorData);
    return res.data;
  } catch (err) {
    console.error("Error sending sensor data:", err);
    return null;
  }
};

// 🔹 2. Get latest 10 sensor entries (GET)
export const fetchLatestSensorData = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/sensor/latest`);
    return res.data;
  } catch (err) {
    console.error("Error fetching latest sensor data:", err);
    return [];
  }
};

// 🔹 3. Get 5-minute average data (GET)
export const fetchAverageData = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/sensor/average`);
    return res.data;
  } catch (err) {
    console.error("Error fetching 5-minute average data:", err);
    return null;
  }
};

// 🔹 4. Get historical data with filters (GET)
export const fetchHistoricalData = async (params = {}) => {
  try {
    const res = await axios.get(`${BASE_URL}/sensor/history`, { params });
    return res.data;
  } catch (err) {
    console.error("Error fetching historical data:", err);
    return [];
  }
};

// 🔹 5. Download reports (CSV or PDF)
export const downloadReport = async (format = "csv") => {
  try {
    const res = await axios.get(`${BASE_URL}/sensor/download?format=${format}`, {
      responseType: "blob",
    });
    return res.data;
  } catch (err) {
    console.error("Error downloading report:", err);
    return null;
  }
};

// 🔹 6. Get alert logs (optional route)
export const fetchAlertLogs = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/sensor/alerts`);
    return res.data;
  } catch (err) {
    console.error("Error fetching alert logs:", err);
    return [];
  }
};

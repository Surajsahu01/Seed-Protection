import SensorData from "../model/sensoreData.js";
import cron from "node-cron";
import moment from "moment-timezone";
import HourlyAverage from "../model/hourlyData.js";
import { Parser } from "json2csv";
import { io } from "../server.js"
import { sendFlameAlertSMS} from "../alerts/smsAlert.js";


export const getSensorData = async (req, res) => {
    try {
      const { temperature, humidity, waterDetected, flameDetected } = req.body;
  
      const sensorData = new SensorData({
        temperature,
        humidity,
        waterDetected,
        flameDetected: flameDetected === 0 ? true : false, 

      });
  
      await sensorData.save();
      io.emit("sensorData", {
        temperature: sensorData.temperature,
        humidity: sensorData.humidity,
        waterDetected: sensorData.waterDetected,
        flameDetected: sensorData.flameDetected
      });
  
      // Optional: Send alert if flame is detected
      if (sensorData.flameDetected === true) {
        await sendFlameAlertSMS(sensorData); // Send SMS alert
      }

      res.status(201).send('Sensor data saved & broadcasted');
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Server error');
    }
  };

// GET latest 10 entries
export const getAllSensorData = async (req, res) => {
  try {
    const data = await SensorData.find()
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// CRON JOB: Every 5 minutes
cron.schedule("0 * * * *", async () => {
  try {
    const end = moment.tz("Asia/Kolkata");
    const start = end.clone().subtract(1, "hour");

    const data = await SensorData.find({
      createdAt: {
        $gte: start.toDate(),
        $lt: end.toDate(),
      },
    });

    if (data.length === 0) return;
    // Calculate average
    let total = {
      temperature: 0,
      humidity: 0,
      waterDetected: 0,
      flameDetected: false, // default to false
    };

    for (let entry of data) {
      total.temperature += entry.temperature;
      total.humidity += entry.humidity;
      total.waterDetected += entry.waterDetected;
      if (entry.flameDetected === true) total.flameDetected = true; // If any is true, set true
    }

    const avg = {
      temperature: Math.round(total.temperature / data.length),
      humidity: Math.round(total.humidity / data.length),
      waterDetected: Math.round(total.waterDetected / data.length), // optional: make it 0 or 1
      flameDetected: total.flameDetected,
      timestamp: start.toDate(),
    };

    await HourlyAverage.create(avg);
  } catch (error) {
    console.error("CRON Error:", error);
  }
});


export const getFiveMinuteAverage = async (req, res) => {
  try {
    const {startDate, endDate} = req.query;

    const filter = {};
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }
    const data = await HourlyAverage.find(filter).sort({ createdAt: -1 }).limit(100);
    // const data = await HourlyAverage.find().sort({ createdAt: -1 }).limit(1);
    // res.status(200).json(data[0] || {});
    res.status(200).json(data);
  }
  catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


export const getHistoricalData = async (req, res) => {
  try {
    const {startDate, endDate} = req.query;

    const filter = {};
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const data = await SensorData.find(filter).sort({ createdAt: -1 });
    res.status(200).json(data);
    // console.log(data);
    
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};  


export const downloadReport = async (req, res) => {
  try {
    const data = await SensorData.find().sort({ createdAt: -1 }).limit(100);
    const format = req.query.format || "csv";

    if (format === "csv") {
      const parser = new Parser();
      const csv = parser.parse(data);
      res.header("Content-Type", "text/csv");
      res.attachment("report.csv");
      return res.send(csv);
    } else {
      res.status(400).send("Only CSV supported currently");
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });  
  }
}


export const getAlertLogs = async (req, res) => {
  try {
    const alerts = await SensorData.find({
      $or: [{ flameDetected: true }, { waterDetected: true }]
    }).sort({ createdAt: -1 });

    const formatted = alerts.map(item => ({
      type: item.flameDetected ? "Flame 🔥" : "Rain 🌧️",
      time: item.createdAt,
    }));

    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ error: "Error fetching alerts" });
  }
};





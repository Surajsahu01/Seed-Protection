import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./DataBase/db.js";
import cors from "cors";
import sensorRoutes from "./routes/sensorRoutes.js";
import http from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import SensorData from "./model/sensoreData.js";
import userRoutes from "./routes/user.js";
import dotenv from "dotenv";
// import path from "path";

dotenv.config();

connectDB();
const app = express();



const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND, // ✅ no trailing slash
    methods: ["GET", "POST"],
    credentials: true // ✅ make sure this is inside cors
  }
});

app.set("io", io); // Set the io instance in the app for later use

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/sensor", sensorRoutes);
app.use("/api/user", userRoutes); // Assuming you have a userRoutes file

io.on("connection", (socket) => {
    const interval = setInterval(async () => {
        try {
          const latestData = await SensorData.findOne().sort({ createdAt: -1 });
    
          if (latestData) {
            socket.emit('sensorData', {
              temperature: latestData.temperature,
              humidity: latestData.humidity,
              waterDetected: latestData.waterDetected,
              flameDetected: latestData.flameDetected,
            });
          }
        } catch (err) {
          console.error('Error fetching sensor data:', err);
        }
      }, 2000);
    
      socket.on('disconnect', () => {
        clearInterval(interval);
      });
});

export { io } // Export the io instance for use in other files

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
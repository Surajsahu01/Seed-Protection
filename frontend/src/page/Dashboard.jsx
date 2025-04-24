import React, { useEffect, useState } from 'react';
import SensorCharts from '../components/SensorCharts';
import AlertLogTable from '../components/AlertLogTable';
import { CSVLink } from 'react-csv';
import 'jspdf-autotable';
import socket from '../websocket/Socket';
import SensorCard from '../components/Sensorcard';


const Dashboard = () => {
  const [data, setData] = useState({
    temperature: 0,
    humidity: 0,
    flame: false,
    rain: false,
  });

  const [sensorHistory, setSensorHistory] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    socket.on('sensorData', (newData) => {
      const parsedData = {
        temperature: newData.temperature || 0,
        humidity: newData.humidity || 0,
        rain: newData.waterDetected || false,
        flame: newData.flameDetected || false,
      };

      setData(parsedData);

     
      const timestamp = new Date().toLocaleString();

      setSensorHistory((prev) => [
        ...prev.slice(-50),
        { ...parsedData, timestamp },//: new Date().toISOString() },
      ]);

      // Check if a similar alert exists in last 10 seconds
      const isRecent = (type) =>
        alerts.some(
          (alert) =>
            alert.type === type &&
            Date.now() - new Date(alert.time).getTime() < 10000
        );

      if (parsedData.flame && !isRecent('Flame')) {
        setAlerts((prev) => [
          ...prev,
          { type: 'Flame', time: timestamp },
        ]);
      }

      if (parsedData.rain && !isRecent('Rain')) {
        setAlerts((prev) => [
          ...prev,
          { type: 'Rain', time: timestamp },
        ]);
      }

    });

    return () => {
      socket.off("sensorData");
    };
  }, [alerts]);


  // const generatePDF = () => {
  //   const doc = new jsPDF();
  //   doc.text('Sensor Report', 14, 16);
  //   const tableData = sensorHistory.map((row, i) => [
  //     i + 1,
  //     row.timestamp,
  //     row.temperature,
  //     row.humidity,
  //     row.flame ? 'Yes' : 'No',
  //     row.rain ? 'Yes' : 'No'
  //   ]);
  //   doc.autoTable({
  //     head: [['#', 'Time', 'Temperature (°C)', 'Humidity (%)', 'Flame', 'Rain']],
  //     body: tableData,
  //   });
  //   doc.save('Sensor_Report.pdf');
  // };


  return (
    
    <div className="p-4">
      <h1 className="text-2xl md:text-3xl font-semibold mb-4">Live Dashboard</h1>

      {/* Sensor Cards */}
      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 bg-light md:items-center md:justify-center ml-2 mr-2 md:ml-24 md:mr-0">
        <SensorCard type="temperature" value={`${data.temperature} °C`} />
        <SensorCard type="humidity" value={`${data.humidity} %`} />
        <SensorCard
          type="flame"
          value={data.flame ? '🔥Detected' : '✅ No Fire'}
          color={data.flame ? 'error' : 'success'}
        />
        <SensorCard
          type="rain"
          value={data.rain ? '🌧️ Detected' : '☀️ No Rain'}
          color={data.rain ? 'info' : 'success'}
        />
      </div>

      {/* Charts */}
      <div className="mt-8">
        <SensorCharts data={sensorHistory} />
      </div>

      {/* Alert Logs */}
      <div className="mt-8 max-h-80 overflow-y-auto">
        <AlertLogTable alerts={alerts} />
      </div>

      {/* Export Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <CSVLink
          data={sensorHistory}
          filename="Sensor_Report.csv"
          className="inline-block"
        >
          <button className="px-4 py-2 border border-gray-500 rounded hover:bg-gray-100 w-full sm:w-auto">
            Download CSV
          </button>
        </CSVLink>
        {/* <button
          onClick={generatePDF}
          className="px-4 py-2 border border-gray-500 rounded hover:bg-gray-100 w-full sm:w-auto"
        >
          Download PDF
        </button> */}
      </div>
    </div>
  )
}

export default Dashboard




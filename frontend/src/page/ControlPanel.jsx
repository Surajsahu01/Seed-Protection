import React, { useState } from "react";
import axios from "axios";
import { BLYNK_AUTH_TOKEN, BLYNK_URL } from "../Utils/util";

const Blynk_token =BLYNK_AUTH_TOKEN;
const Blynk_url = BLYNK_URL;

const sendCommand = async (device, value) => {
  try {
    const virtualPin = {
      DCMOTOR: "V0",
      FAN: "V1",
      PUMP: "V2",
    }[device];

    const url = `${Blynk_url}?token=${Blynk_token}&${virtualPin}=${value}`;
    const response = await axios.get(url);

  } catch (error) {
    console.error("Error sending command:", error.message);
    alert(`Failed to send command to ${device}`);
  }
};


const ControlPage = () => {
  const [states, setStates] = useState({
    DCMOTOR: null,
    FAN: null,
    PUMP: null,
  });

  const handleToggle = async (device) => {
    const current = states[device];
    const newState = current === 1 ? 0 : 1;
    await sendCommand(device, newState);
    setStates((prev) => ({ ...prev, [device]: newState }));
  };

  const handleAuto = async (device) => {
    setStates((prev) => ({ ...prev, [device]: null }));
    // Optional: Inform user that "AUTO" logic should run in hardware
    alert(`AUTO mode set for ${device} (only visual, device must handle it internally)`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10 text-center">
      <h1 className="text-3xl font-bold mb-8">🛠️ IoT Device Control Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Fan", key: "DCMOTOR" },
          { label: "Exhaust Fan", key: "FAN" },
          { label: "Water Pump", key: "PUMP" },
        ].map(({ label, key }) => (
          <div key={key} className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">{label}</h2>
            <p className="mb-2 text-gray-600">
              Current Mode:{" "}
              <span className="font-medium">
                {states[key] === null ? "AUTO" : states[key] === 1 ? "ON" : "OFF"}
              </span>
            </p>
            <div className="flex flex-col gap-3">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                onClick={() => handleToggle(key)}
              >
                {states[key] === null ? "ON" : states[key] === 1 ? "OFF" : "ON"} {label}
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                onClick={() => handleAuto(key)}
              >
                Set to AUTO
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlPage;

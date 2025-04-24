import React from 'react';
import {
  MdWhatshot,
  MdOpacity,
  MdLocalFireDepartment,
  MdUmbrella,
} from 'react-icons/md';

const iconMap = {
  temperature: {
    icon: <MdWhatshot className="text-red-500" size={28} />,
    label: 'Temperature',
  },
  humidity: {
    icon: <MdOpacity className="text-blue-500" size={28} />,
    label: 'Humidity',
  },
  flame: {
    icon: <MdLocalFireDepartment className="text-red-600" size={28} />,
    label: 'Flame',
  },
  rain: {
    icon: <MdUmbrella className="text-indigo-500" size={28} />,
    label: 'Rain',
  },
};


const SensorCard = ({ type, value, color = 'text-gray-800' }) => {
  const sensor = iconMap[type];

  if (!sensor) return null; // skip rendering if unknown type
  return (

    <div className="bg-white rounded-2xl shadow-md p-4 m-2  w-full items-center sm:w-[70%] md:w-[65%] lg:w-[65%] flex flex-col justify-between">
    <div className="flex items-center gap-2 mb-2">
      {sensor.icon}
      <h3 className="text-lg  font-semibold text-gray-700 items-center">{sensor.label}</h3>
    </div>
    <div>
      <p className={`text-xl md:text-2xl font-bold ${color}`}>{value}</p>
    </div>
  </div>
  )
}

export default SensorCard
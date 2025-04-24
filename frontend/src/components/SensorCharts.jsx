import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart,ReferenceLine } from 'recharts';
import { Box, Typography } from '@mui/material';

const SensorCharts = ({data}) => {
  return (
    <Box mt={2}>
      <Typography variant="h6" gutterBottom>📈 Temperature & Humidity Over Time</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" domain={[0, 100]}/>
          <Tooltip />
          <Legend />

          {/* Threshold lines */}
          <ReferenceLine yAxisId="right" y={35}  stroke="#d32f2f" strokeDasharray="3 3" />
          <ReferenceLine yAxisId="right" y={60}  stroke="#d32f2f" strokeDasharray="3 3" />

          {/* Actual data lines */}
          <Line yAxisId="right" type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature (°C)" />
          <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#82ca9d" name="Humidity (%)" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  )
}

export default SensorCharts
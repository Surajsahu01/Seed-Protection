import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Stack
} from '@mui/material';
import axios from 'axios';
import { API_BASE_URL } from '../Utils/util';

const Alert = () => {
  const [alerts, setAlerts] = useState([]);

      useEffect(() => {
        // Fetch from backend
        const fetchAlerts = async () => {
          try {
            const res = await axios.get(`${API_BASE_URL}/api/sensor/alerts`); // Update your URL if needed
            const formatted = res.data
            .filter(entry => entry.flame || entry.rain) // only alert logs
            .map((entry, index) => ({
              id: entry._id || index,
              type: entry.flame ? 'Flame Detected 🔥' : entry.rain ? 'Rain Detected 🌧️' : 'No Alert',
              time: entry.timestamp || entry.time || new Date(),
              acknowledged: false,
            }));
      setAlerts(formatted.slice(-15).reverse()); // show latest 15
          } catch (err) {
            console.error('Failed to fetch alerts:', err);
          }
        };

        fetchAlerts();
      }, []);

  const handleAcknowledge = (id) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === id ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  const handleClear = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };
  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>🚨 Alerts</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alerts.map((alert, index) => (
              <TableRow key={alert.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{alert.type}</TableCell>
                <TableCell>{new Date(alert.time).toLocaleString()}</TableCell>
                <TableCell>
                  {alert.acknowledged ? '✅ Acknowledged' : '⚠️ Not Acknowledged'}
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => handleAcknowledge(alert.id)}
                      disabled={alert.acknowledged}
                    >
                      Acknowledge
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleClear(alert.id)}
                    >
                      Clear
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {alerts.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  🎉 No sensor logs available!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Alert



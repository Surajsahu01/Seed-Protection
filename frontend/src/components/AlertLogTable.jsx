import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const AlertLogTable = ({alerts}) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
    <Typography variant="h6" sx={{ p: 2 }}>🚨 Flame Alert Log</Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Alert Type</TableCell>
          <TableCell>Time</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {alerts.map((alert, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{alert.type}</TableCell>
            <TableCell>{alert.time}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default AlertLogTable
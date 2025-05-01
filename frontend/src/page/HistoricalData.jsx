import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TextField, Pagination, Stack, CircularProgress
} from '@mui/material';
import { CSVLink } from 'react-csv';
import 'jspdf-autotable';
import axios from "axios";
import { API_BASE_URL } from '../Utils/util';
import { Link } from 'react-router-dom';

// import api from '../services/api'; // For later real DB fetch

const HistoricalData = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 10;

  // Dummy fetch for now
  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/sensor/history`); // Adjust URL as needed
        // console.log("data", response.data);
        
        let data = response.data.map(entry => ({
          ...entry,
          timestamp: entry.createdAt || entry.time || entry.timestamp, // adjust field as needed
          flameDetected: entry.flameDetected ?? entry.flame ?? false,
          rainDetected: entry.rainDetected ?? entry.waterDetected ?? entry.rain ?? false
        }));
         // ✅ Sort by timestamp descending and take the latest 100 entries
        data = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 1000);
        setLogs(data);
        setFilteredLogs(data); // Initialize filtered logs with all logs
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
        setLoading(false);
      }
    };
    fetchSensorData();
  }, []);

  

  const handleFilter = () => {
    const fromDate = new Date(dateRange.from);
    const toDate = new Date(dateRange.to);
    const filtered = logs.filter(log => {
      const logDate = new Date(log.timestamp);
      return (!dateRange.from || logDate >= fromDate) &&
             (!dateRange.to || logDate <= toDate);
    });
    setFilteredLogs(filtered);
    setPage(1);
  };

  // const downloadPDF = () => {
  //   const doc = new jsPDF();
  //   doc.text('Historical Sensor Data', 14, 16);
  //   const tableData = filteredLogs.map((log, i) => [
  //     i + 1, 
  //     log.timestamp, 
  //     log.temperature, 
  //     log.humidity,
  //     log.flameDetected ? 'Yes' : 'No',
  //     log.rainDetected ? 'Yes' : 'No'
  //   ]);
  //   doc.autoTable({
  //     head: [['#', 'Timestamp', 'Temp (°C)', 'Humidity (%)', 'Flame', 'Rain']],
  //     body: tableData,
  //   });
  //   doc.save('historical_data.pdf');
  // };

  const paginatedLogs = filteredLogs.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  return (
    <Box p={4}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
      <Typography variant="h4" gutterBottom>📚 Live All Data</Typography>
      {/* <Link to={'/average'} className='bg-blue-500 rounded-full p-4 text-white'>Avarage Data</Link> */}
      <Link to="/average-data" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="secondary" >
              View Average Data
            </Button>
          </Link>
      </div>
      {/* Filters */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
        <TextField
          label="From Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={dateRange.from}
          onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
        />
        <TextField
          label="To Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={dateRange.to}
          onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
        />
        <Button variant="contained" onClick={handleFilter}>Filter</Button>
      </Stack>


      {/* Loading Indicator */}

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
          <CircularProgress />
          </Box>
      ) : (
        <>  
      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>So. </TableCell>
              <TableCell>Time & Date</TableCell>
              <TableCell>Temp (°C)</TableCell>
              <TableCell>Humidity (%)</TableCell>
              <TableCell>Flame</TableCell>
              <TableCell>Rain</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedLogs.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{(page - 1) * rowsPerPage + i + 1}</TableCell>
                <TableCell>{
                  isNaN(new Date(row.timestamp).getTime())
                    ? `❌ Invalid Date (${row.timestamp})`
                    : new Date(row.timestamp).toLocaleString()
                }</TableCell>
                <TableCell>{row.temperature}</TableCell>
                <TableCell>{row.humidity}</TableCell>
                <TableCell>{row.flameDetected ? '🔥 Yes' : '❌ No'}</TableCell>
                <TableCell>{row.rainDetected ? '🌧️ Yes' : '☀️ No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box mt={3} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(filteredLogs.length / rowsPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>

      {/* Export */}
      <Box mt={3} display="flex" gap={2}>
        <CSVLink data={filteredLogs} filename="Historical_Data.csv" style={{ textDecoration: 'none' }}>
          <Button variant="outlined">Download CSV</Button>
        </CSVLink>
        {/* <Button variant="outlined" onClick={downloadPDF}>Download PDF</Button> */}
      </Box>
      </>
      )}
    </Box>
  )
}

export default HistoricalData

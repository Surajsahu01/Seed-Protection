import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './page/Home';
import About from './page/About';
import Alert from './page/Alert';
import HistoricalData from './page/HistoricalData';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import ControlPanel from './page/ControlPanel';
import DashboardWrapper from './page/DashboardWrapper';
import Cookies from "js-cookie";
import AOS from 'aos';

function App() {
  const token = Cookies.get("auth_token");
  
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  
  

  return (
    // <Router>
    <>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<DashboardWrapper />} />
          <Route path="/control" element={<ControlPanel />} />
          <Route path="/historical" element={<HistoricalData />} />
          <Route path="/alert" element={<Alert />} />
        </Routes>
        <Footer />
      </ThemeProvider>

    </>
  // </Router>
  )
}

export default App

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    
    <div className="h-screen flex flex-col items-center justify-center text-white text-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-4">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-xl"
      >
        <h1 className="text-3xl sm:text-4xl md:text-4xl  md:leading-snug font-bold mb-4">
          🌱 Smart Seed Protection System
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-light mb-6">
          Real-time flame, rain, and soil monitoring using IoT and AI.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-white text-gray-800 px-6 py-3 rounded-full text-sm sm:text-base font-semibold shadow-md hover:bg-green-500 transition"
        >
          Go to Dashboard
        </button>
      </motion.div>
    </div>
  )
}

export default Home
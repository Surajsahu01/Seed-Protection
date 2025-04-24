import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box mt={5} py={3} textAlign="center" bgcolor="#f5f5f5">
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Seed Protection System — Built with MERN STACK & IoT
      </Typography>
    </Box>
  )
}

export default Footer

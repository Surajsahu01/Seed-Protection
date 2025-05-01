import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "../Utils/util";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // ✅


export default function PhoneNumberPopup({ onSuccess }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // 🔄 loading state
  const navigate = useNavigate();


  const handleSubmit = async () => {
    const phoneRegex = /^\+[1-9]{1}[0-9]{1,3}[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid phone number with country code.");
      return;
    }

    setLoading(true); // start loading


    try {
      const res = await axios.post(`${API_BASE_URL}/api/user/phone`, { phone });
      const token = res.data.token;
      Cookies.set("auth_token", token, { expires: 7 }); // store for 7 days
      
      

      alert("Number saved successfully.");
      if (onSuccess) {
        onSuccess(); // optional — still call it
      } // show dashboard

    
      navigate("/dashboard"); // or navigate to the dashboard directly
      window.location.reload(); // reload the page to show the dashboard
    } catch (error) {
      setError("Failed to save number. Please try again.");
      console.error("Error saving number:", error);  
    } 
    finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <Dialog open fullWidth maxWidth="xs">
    <DialogTitle>Enter Mobile Number</DialogTitle>
    <DialogContent>
      <TextField
        label="Phone Number"
        fullWidth
        variant="outlined"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
          setError("");
        }}
        placeholder="+911234567890"
      />
      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </DialogContent>
    <DialogActions>
    <Box position="relative">
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading}
          >
            Submit & Continue
          </Button>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
    </DialogActions>
  </Dialog>
  );
}

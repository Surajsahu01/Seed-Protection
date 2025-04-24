import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "../Utils/util";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // ✅


export default function PhoneNumberPopup({ onSuccess }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async () => {
    const phoneRegex = /^\+[1-9]{1}[0-9]{1,3}[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid phone number with country code.");
      return;
    }
    try {
      const res = await axios.post(`${API_BASE_URL}/api/user/phone`, { phone });
      const token = res.data.token;
      Cookies.set("auth_token", token, { expires: 7 }); // store for 7 days
      
      

      alert("Number saved successfully.");
      if (onSuccess) {
        onSuccess(); // optional — still call it
      } // show dashboard

      window.location.reload(); // reload the page to show the dashboard

      navigate("/dashboard"); // or navigate to the dashboard directly
    } catch (error) {
      setError("Failed to save number. Please try again.");
      console.error("Error saving number:", error);
      
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
      <Button onClick={handleSubmit} variant="contained">
        Submit & Continue
      </Button>
    </DialogActions>
  </Dialog>
  );
}

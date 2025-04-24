// DashboardWrapper.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import PhoneNumberPopup from "./PhoneNumberPopup";
import Dashboard from "./Dashboard";

export default function DashboardWrapper() {
  const [tokenExists, setTokenExists] = useState(false);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
      setTokenExists(true);
    }
    setChecking(false);
  }, []);

  const handleSuccess = () => {
    Cookies.set("auth_token", "true"); // Optional: ensure token is set
    navigate("/dashboard"); // Go to main dashboard
  };

  if (checking) {
    return null; // or a loading spinner if you prefer
  }

  return tokenExists ? <Dashboard /> : <PhoneNumberPopup onSuccess={handleSuccess} />;
}

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DashboardContent() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    // 🔒 If token does not exist, redirect to login
    if (!token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard</p>
    </>
  );
}

export default DashboardContent;

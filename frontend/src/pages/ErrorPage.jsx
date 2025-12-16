import React from "react";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Button } from "@mui/material";

const ErrorPage = ({
  title = "Page Not Found",
  message = "The page you are looking for doesn’t exist or has been moved.",
}) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, color: "#6366f1", mb: 2 }} />

      <h1 style={{ fontSize: "2.2rem", fontWeight: 700, marginBottom: "10px" }}>
        {title}
      </h1>

      <p style={{ color: "#6b7280", maxWidth: "500px", marginBottom: "30px" }}>
        {message}
      </p>

      <div style={{ display: "flex", gap: "12px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Go to Home
        </Button>

        <Button variant="outlined" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;

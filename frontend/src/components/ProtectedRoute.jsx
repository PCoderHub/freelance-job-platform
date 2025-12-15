import React from "react";
import { Navigate, useParams } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const { role } = useParams();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to={`/home/${user.role || role}`} replace />;
  }

  return children;
}

export default ProtectedRoute;

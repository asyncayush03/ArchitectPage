import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return decoded;
  } catch {
    return null;
  }
}

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const decoded = decodeJwt(token);

  // ❌ invalid token
  if (!decoded || !decoded.exp) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  // ⏰ expiry check (exp is in seconds)
  const isExpired = decoded.exp * 1000 < Date.now();

  if (isExpired) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
}

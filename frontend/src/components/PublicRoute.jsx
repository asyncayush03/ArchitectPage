import React from "react";
import { Navigate } from "react-router-dom";

function decodeJwt(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
}

export default function PublicRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    const decoded = decodeJwt(token);
    const isExpired = !decoded || decoded.exp * 1000 < Date.now();

    if (!isExpired) {
      return <Navigate to="/admin" replace />;
    }

    // expired token cleanup
    localStorage.removeItem("token");
  }

  return children;
}

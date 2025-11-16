import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

//  src/components/ProtectedRoute.jsx
// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";

 /**
//  * Safe JWT payload decoder for base64url
//  * returns parsed payload object or null on failure
//  */
// function decodeJwtPayload(token) {
//   try {
//     const parts = token.split(".");
//     if (parts.length < 2) return null;
//     // base64url -> base64
//     let payload = parts[1].replace(/-/g, "+").replace(/_/g, "/");
//     // pad with '='
//     while (payload.length % 4) payload += "=";
//     const decoded = atob(payload); // browser native
//     return JSON.parse(decoded);
//   } catch (e) {
//     return null;
//   }
// }

// /**
//  * ProtectedRoute:
//  * - checks token in localStorage
//  * - tries to decode token to verify role/isAdmin
//  * - falls back to localStorage flag "isAdmin"
//  * - if not allowed, redirects to /login and stores attempted path in location.state.from
//  */
// export default function ProtectedRoute({ children }) {
//   const location = useLocation();

//   const token = localStorage.getItem("token");
//   let isAllowed = false;

//   if (token) {
//     const payload = decodeJwtPayload(token);
//     if (payload) {
//       // Accept either role === 'admin' OR a truthy isAdmin claim in token
//       if (payload.role === "admin" || payload.isAdmin === true || payload.isAdmin === "true") {
//         isAllowed = true;
//       }
//     }
//   }

//   // fallback: explicit localStorage flag (useful during development)
//   if (!isAllowed) {
//     const fallback = localStorage.getItem("isAdmin");
//     if (fallback === "true") isAllowed = true;
//   }

//   if (!isAllowed) {
//     // redirect to login, save current location so login can redirect back
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// }

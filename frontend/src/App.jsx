import { useState } from "react";
import Navbar from "./components/common/Navbar";
import ModernFooter from "./components/common/ModernFooter";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import Studio from "./pages/studio";
import Login from "./pages/login";
import AdminDashboard from "./pages/admin/Dashboard.jsx";






function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/studio" element={<Studio />} />

          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
       
       
        </Routes>
        <ModernFooter />
      </BrowserRouter>
    </>
  );
}

export default App;

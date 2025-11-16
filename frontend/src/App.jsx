import { useState } from "react";
import Navbar from "./components/common/Navbar";
import ModernFooter from "./components/common/ModernFooter";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactPage from "./pages/ContactPage";
import ManageBlogs from "./pages/admin/ManageBlogs.jsx";
import BlogPage from "./pages/BlogPage";
import Studio from "./pages/studio";
import Login from "./pages/login";
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import AddBlog from "./pages/admin/AddBlog.jsx";
import AddEmployee from "./pages/admin/AddEmployee.jsx";
import AddProject from "./pages/admin/AddProject.jsx";
import Projects from "./pages/Projects.jsx";
import Register from "./pages/register.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";



function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Projects/>} />
          <Route path="/studio" element={<Studio />} />

          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path = "/register" element ={<Register/>}/>
          {/* Admin Routes */}
          <Route path="/admin/blogs" element={<ProtectedRoute><ManageBlogs /></ProtectedRoute>} />
          <Route path="/admin/employees" element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />
          <Route path="/admin/projects" element={<ProtectedRoute><AddProject /></ProtectedRoute>} />
          <Route path="/admin/blogs/new" element={<ProtectedRoute><AddBlog /></ProtectedRoute>} />
          
       
        </Routes>
        <ModernFooter />
      </BrowserRouter>
    </>
  );
}

export default App;

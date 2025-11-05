import { useState } from "react";
import Navbar from "./components/common/Navbar";
import ModernFooter from "./components/common/ModernFooter";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import Studio from "./pages/studio";
import Login from "./pages/login";
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import AddBlog from "./pages/admin/AddBlog.jsx";
import AddEmployee from "./pages/admin/AddEmployee.jsx";
import AddProject from "./pages/admin/AddProject.jsx";





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

          {/* Admin Routes */}
          <Route path="/admin/blogs" element={<AddBlog />} />
          <Route path="/admin/employees" element={<AddEmployee />} />
          <Route path="/admin/projects" element={<AddProject />} />
       
       
        </Routes>
        <ModernFooter />
      </BrowserRouter>
    </>
  );
}

export default App;

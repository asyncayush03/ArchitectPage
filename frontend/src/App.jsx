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
import Projects from "./pages/Projects.jsx";
import Register from "./pages/register.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ManageProjects from "./pages/admin/ManageProjects.jsx";
import AddProjects from "./pages/admin/AddProjects.jsx";
import Home from "./pages/home.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import EditProject from "./pages/admin/EditProject.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
      <ScrollToTop/>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path = "/register" element ={<Register/>}/>
          <Route path="/projects/:id" element={<ProjectDetails />} />
          

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute> } />
          <Route path="/admin/blogs" element={<ProtectedRoute><ManageBlogs /></ProtectedRoute>} />
          <Route path="/admin/blogs/new" element={<ProtectedRoute><AddBlog /></ProtectedRoute>} />

          <Route path="/admin/employees" element={<ProtectedRoute><AddEmployee /></ProtectedRoute>} />

          <Route path="/admin/projects" element={<ProtectedRoute><ManageProjects /></ProtectedRoute>} />
          <Route path="/admin/projects/new" element={<ProtectedRoute><AddProjects /></ProtectedRoute>} />
          <Route path="/admin/projects/edit/:id" element={<EditProject />} />

          
       
        </Routes>
        <ModernFooter />
      </BrowserRouter>
    </>
  );
}

export default App;

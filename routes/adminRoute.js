// routes/adminRoute.js
const express = require("express");
const {
  adminLogin,
  adminRegister,
  createBlog,
  getBlogs,
  deleteBlog,
  createProject,
  getProjects,
  deleteProject,
  getProjectById
} = require("../controllers/adminController");

const router = express.Router();

// Admin auth
router.post("/login", adminLogin);
router.post("/register", adminRegister);

// Blogs
router.post("/blog", createBlog);
router.get("/blog", getBlogs);
router.delete("/blog/:id", deleteBlog);

router.post("/project", (createProject));
router.get("/project", (getProjects));
router.delete("/project/:id", (deleteProject));
router.get("/project/:id", getProjectById);
module.exports = router;

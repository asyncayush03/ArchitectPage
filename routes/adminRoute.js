// routes/adminRoute.js
const express = require("express");
const {
  adminLogin,
  adminRegister,
  createBlog,
  getBlogs,
  deleteBlog,
} = require("../controllers/adminController");

const router = express.Router();

// Admin auth
router.post("/login", adminLogin);
router.post("/register", adminRegister);

// Blogs
router.post("/blog", createBlog);
router.get("/blog", getBlogs);
router.delete("/blog/:id", deleteBlog);

module.exports = router;

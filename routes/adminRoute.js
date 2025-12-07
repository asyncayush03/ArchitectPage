// routes/adminRoute.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

const {
  adminLogin,
  adminRegister,

  // Media Event Controller
  createMediaEvent,
  getMediaEvents,
  deleteMediaEvent,

  // Project Controllers
  createProject,
  getProjects,
  deleteProject,
  getProjectById,
  updateProject,

  // Old blog functions (REMOVE SOON)
  // createBlog,
  // getBlogs,
  // deleteBlog
} = require("../controllers/adminController");

// ==================================
// ADMIN AUTH
// ==================================
router.post("/login", adminLogin);
router.post("/register", adminRegister);

// ==================================
// MEDIA EVENTS (Corrected)
// ==================================

// CREATE EVENT — multiple image upload
router.post("/blog", upload.array("images", 20), createMediaEvent);

// GET ALL EVENTS
router.get("/blog", getMediaEvents);

// DELETE EVENT
router.delete("/blog/:id", deleteMediaEvent);

// ==================================
// PROJECT ROUTES
// ==================================
router.post("/project", createProject);
router.get("/project", getProjects);
router.delete("/project/:id", deleteProject);
router.get("/project/:id", getProjectById);
router.put("/project/:id", updateProject);

module.exports = router;

// routes/adminRoute.js
const express = require("express");
const router = express.Router();

const {
  adminLogin,
  adminRegister,

  // Media Event Controllers
  createMediaEvent,
  getMediaEvents,
  deleteMediaEvent,

  // Project Controllers
  createProject,
  getProjects,
  deleteProject,
  getProjectById,
  updateProject,

  // Multer (memory) for images
  eventUpload,
} = require("../controllers/adminController");

// ==================================
// ADMIN AUTH
// ==================================
router.post("/login", adminLogin);
router.post("/register", adminRegister);

// ==================================
// MEDIA EVENTS (Cloudinary + memory)
// ==================================
router.post("/blog", eventUpload, createMediaEvent);
router.get("/blog", getMediaEvents);
router.delete("/blog/:id", deleteMediaEvent);

// ==================================
// PROJECT ROUTES (Cloudinary + memory)
// ==================================
router.post("/project", eventUpload, createProject);
router.get("/project", getProjects);
router.delete("/project/:id", deleteProject);
router.get("/project/:id", getProjectById);
router.put("/project/:id", eventUpload, updateProject);

module.exports = router;

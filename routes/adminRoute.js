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

  // Article Controllers
   createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
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

// ==================================
// Article ROUTES (Cloudinary + memory)
// ==================================

// PUBLIC
router.get("/articles", getArticles);
router.get("/article/:id", getArticleById);

// ADMIN
router.post("/article", eventUpload, createArticle);
router.put("/article/:id", eventUpload, updateArticle);
router.delete("/article/:id", deleteArticle);

module.exports = router;

// controllers/adminController.js
const Article = require("../models/articleModel");
const adminModel = require("../models/adminModel");
const Blog = require("../models/blogModel");
const Project = require("../models/projectModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const multer = require("multer");
const cloudinary = require("../claudinary");
const sharp = require("sharp");

// -----------------------------------
// MULTER (MEMORY) FOR ALL IMAGES
// -----------------------------------
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image and video files are allowed"), false);
  }
};

// -----------------------------------
// MULTER (MEMORY) FOR IMAGES + VIDEOS
// -----------------------------------
const eventUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) cb(null, true);
    else cb(new Error("Only image/video allowed"), false);
  },
  limits: {
    fileSize: 200 * 1024 * 1024, // ✅ 200MB
  },
}).fields([
  { name: "images", maxCount: 15 },
  { name: "videos", maxCount: 5 },
]);


// Upload compressed buffer to Cloudinary
const uploadCompressedToCloudinary = (buffer, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
    stream.end(buffer);
  });

// ===================================
// ADMIN REGISTER
// ===================================
const adminRegister = async (req, res) => {
  try {
    const existingUser = await adminModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(200)
        .send({ success: false, message: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await adminModel.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    return res.status(201).send({
      success: true,
      message: "Registered Successfully",
    });
  } catch (error) {
    console.log("Register Error:", error);
    res.status(500).send({ success: false, message: error.message });
  }
};

// ===================================
// ADMIN LOGIN
// ===================================
const adminLogin = async (req, res) => {
  try {
    const user = await adminModel
      .findOne({ email: req.body.email })
      .select("+password");

    if (!user) {
      return res
        .status(200)
        .send({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ success: false, message: "Invalid Email or Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });

    return res.status(200).send({
      success: true,
      message: "Login Success",
      token,
    });
  } catch (error) {
    console.log("Login Error:", error);
    res.status(500).send({ success: false, message: error.message });
  }
};

// ===================================
// CREATE MEDIA EVENT – Cloudinary
// ===================================
const createMediaEvent = async (req, res) => {
  try {
    const { title, eventDate } = req.body;

    if (!title || !eventDate) {
      return res.status(400).json({
        success: false,
        message: "Event title and date are required",
      });
    }

    const imageFiles = req.files?.images || [];

    if (imageFiles.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required",
      });
    }

    const uploads = await Promise.all(
      imageFiles.map(async (file) => {
        const compressedBuffer = await sharp(file.buffer)
          .resize({ width: 1920, withoutEnlargement: true })
          .jpeg({ quality: 80 })
          .toBuffer();

        return uploadCompressedToCloudinary(
          compressedBuffer,
          "architectpage/events"
        );
      })
    );

    const imageUrls = uploads.map((u) => u.secure_url);
    const imagePublicIds = uploads.map((u) => u.public_id);

    const newEvent = await Blog.create({
      title,
      eventDate,
      images: imageUrls,
      imagePublicIds,
    });

    return res.status(201).json({
      success: true,
      message: "Media event created successfully",
      event: newEvent,
    });
  } catch (error) {
    console.log("Create Media Event Error:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};

// ===================================
// GET ALL MEDIA EVENTS
// ===================================
const getMediaEvents = async (req, res) => {
  try {
    const events = await Blog.find().sort({ createdAt: -1 });

    return res.send({
      success: true,
      events,
    });
  } catch (error) {
    console.log("Fetch Media Events Error:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
};

// ===================================
// DELETE MEDIA EVENT (Cloudinary)
// ===================================
const deleteMediaEvent = async (req, res) => {
  try {
    const event = await Blog.findById(req.params.id);

    if (!event) {
      return res
        .status(404)
        .send({ success: false, message: "Event not found" });
    }

    if (event.imagePublicIds && event.imagePublicIds.length > 0) {
      await Promise.all(
        event.imagePublicIds.map((publicId) =>
          cloudinary.uploader
            .destroy(publicId)
            .catch((err) =>
              console.log("Cloudinary delete error for", publicId, err.message)
            )
        )
      );
    }

    await event.deleteOne();

    return res.send({
      success: true,
      message: "Media event deleted successfully",
    });
  } catch (error) {
    console.log("Delete Media Event Error:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
};

// ===================================
// CREATE PROJECT – Cloudinary (UPDATED)
// ===================================
const createProject = async (req, res) => {
  try {
    const {
      name,
      client,
      type,
      area,
      startDate,
      status,
      description,
      location,
      progress,
    } = req.body;

    if (!name || !client || !type) {
      return res.status(400).json({
        success: false,
        message: "Name, Client & Type are required",
      });
    }

    // -----------------------------
    // PARSE ADDITIONAL FEATURES
    // -----------------------------
    const keys = Array.isArray(req.body.feature_keys)
      ? req.body.feature_keys
      : req.body.feature_keys
      ? [req.body.feature_keys]
      : [];

    const values = Array.isArray(req.body.feature_values)
      ? req.body.feature_values
      : req.body.feature_values
      ? [req.body.feature_values]
      : [];

    const additionalFeatures = keys.map((key, index) => ({
      key,
      value: values[index] || "",
    }));

    // -----------------------------
    // PARSE CAPTIONS
    // -----------------------------
    let captions = req.body.captions || [];
    if (!Array.isArray(captions)) captions = [captions];

    // -----------------------------
    // HANDLE IMAGES
    // -----------------------------
    const images = [];
    const imageFiles = req.files?.images || [];

    if (imageFiles.length) {
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];

        const compressedBuffer = await sharp(file.buffer)
          .resize({ width: 1920, withoutEnlargement: true })
          .jpeg({ quality: 80 })
          .toBuffer();

        const uploaded = await uploadCompressedToCloudinary(
          compressedBuffer,
          "architectpage/projects"
        );

        images.push({
          url: uploaded.secure_url,
          caption: captions[i] || "",
          publicId: uploaded.public_id,
        });
      }
    }

    // -----------------------------
    // CREATE PROJECT
    // -----------------------------
    const project = await Project.create({
      name,
      client,
      type,
      area,
      startDate,
      status,
      description,
      location,
      progress,
      additionalFeatures,
      images,
    });

    return res.status(201).send({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.log("Create Project Error:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
};

// ===================================
// GET ALL PROJECTS
// ===================================
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    return res.send({ success: true, projects });
  } catch (error) {
    console.log("Fetch Projects Error:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
};

// ===================================
// GET ONE PROJECT BY ID
// ===================================
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res
        .status(404)
        .send({ success: false, message: "Project not found" });
    }

    res.send({ success: true, project });
  } catch (error) {
    console.log("Get Project Error:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
};

// ===================================
// UPDATE PROJECT – Cloudinary (UPDATED)
// ===================================
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    // -----------------------------
    // UPDATE BASIC FIELDS
    // -----------------------------
    const fields = [
      "name",
      "client",
      "type",
      "area",
      "startDate",
      "status",
      "description",
      "location",
      "progress",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        project[field] = req.body[field];
      }
    });

    // -----------------------------
    // UPDATE ADDITIONAL FEATURES
    // -----------------------------
    const keys = Array.isArray(req.body.feature_keys)
      ? req.body.feature_keys
      : req.body.feature_keys
      ? [req.body.feature_keys]
      : [];

    const values = Array.isArray(req.body.feature_values)
      ? req.body.feature_values
      : req.body.feature_values
      ? [req.body.feature_values]
      : [];

    if (keys.length > 0) {
      project.additionalFeatures = keys.map((key, index) => ({
        key,
        value: values[index] || "",
      }));
    }

    // -----------------------------
    // HANDLE NEW IMAGES
    // -----------------------------
    let captions = req.body.captions || [];
    if (!Array.isArray(captions)) captions = [captions];

    const imageFiles = req.files?.images || [];

    if (imageFiles.length) {
      for (let i = 0; i < imageFiles.length; i++) {
        const compressedBuffer = await sharp(imageFiles[i].buffer)
          .resize({ width: 1920, withoutEnlargement: true })
          .jpeg({ quality: 80 })
          .toBuffer();

        const uploaded = await uploadCompressedToCloudinary(
          compressedBuffer,
          "architectpage/projects"
        );

        project.images.push({
          url: uploaded.secure_url,
          caption: captions[i] || "",
          publicId: uploaded.public_id,
        });
      }
    }

    await project.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("Update Project Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ===================================
// DELETE PROJECT – Cloudinary cleanup
// ===================================
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).send({
        success: false,
        message: "Project not found",
      });
    }

    // delete images from Cloudinary (if they have publicId)
    await Promise.all(
      (project.images || []).map((img) =>
        img.publicId
          ? cloudinary.uploader
              .destroy(img.publicId)
              .catch((e) =>
                console.log("Cloudinary delete error:", img.publicId, e.message)
              )
          : Promise.resolve()
      )
    );

    await project.deleteOne();

    return res.send({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.log("Delete Project Error:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
};

/* ----------------------------------
   Upload VIDEO buffer to Cloudinary
---------------------------------- */
const uploadVideoToCloudinary = (buffer, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "video", // ⭐ REQUIRED
        chunk_size: 6 * 1024 * 1024, // ⭐ REQUIRED for stability
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
    stream.end(buffer);
  });

/* ==================================
   CREATE ARTICLE
================================== */
const createArticle = async (req, res) => {
  try {
    const { title, summary, description, category, publishDate } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    // -------------------------
    // TAGS
    // -------------------------
    const tags =
      typeof req.body.tags === "string"
        ? req.body.tags.split(",").map((t) => t.trim())
        : [];

    // -------------------------
    // CAPTIONS
    // -------------------------
    let captions = req.body.captions || [];
    if (!Array.isArray(captions)) captions = [captions];

    // -------------------------
    // IMAGES LOOP  ✅ THIS IS IT
    // -------------------------
    const images = [];
    const imageFiles = req.files?.images || [];

    for (const file of imageFiles) {
      const compressed = await sharp(file.buffer)
        .resize({ width: 1920, withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toBuffer();

      const uploaded = await uploadCompressedToCloudinary(
        compressed,
        "centanni/articles/images"
      );

      images.push({
        url: uploaded.secure_url,
        publicId: uploaded.public_id,
      });
    }

    // -------------------------
    // VIDEOS LOOP  ✅ FIX
    // -------------------------
    const videos = [];
    const videoFiles = req.files?.videos || [];

    for (const file of videoFiles) {
      const uploaded = await uploadVideoToCloudinary(
        file.buffer,
        "centanni/articles/videos"
      );

      videos.push({
        url: uploaded.secure_url,
        publicId: uploaded.public_id,
      });
    }

    const article = await Article.create({
      title,
      summary,
      description,
      category,
      publishDate,
      tags,
      images,
      videos,
    });

    res.status(201).json({
      success: true,
      message: "Article created successfully",
      article,
    });
  } catch (error) {
    console.error("Create Article Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==================================
   GET ALL ARTICLES
================================== */
const getArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ publishDate: -1 });

    res.status(200).json({
      success: true,
      articles,
    });
  } catch (error) {
    console.error("Fetch Articles Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ==================================
   GET ARTICLE BY ID
================================== */
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    res.status(200).json({
      success: true,
      article,
    });
  } catch (error) {
    console.error("Get Article Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ==================================
   UPDATE ARTICLE
================================== */
const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    const fields = [
      "title",
      "summary",
      "description",
      "category",
      "publishDate",
    ];

    fields.forEach((f) => {
      if (req.body[f] !== undefined) article[f] = req.body[f];
    });

    if (req.body.tags) {
      article.tags =
        typeof req.body.tags === "string"
          ? req.body.tags.split(",").map((t) => t.trim())
          : req.body.tags;
    }

    await article.save();

    res.status(200).json({
      success: true,
      message: "Article updated successfully",
      article,
    });
  } catch (error) {
    console.error("Update Article Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/* ==================================
   DELETE ARTICLE
================================== */
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    // delete images from cloudinary
    await Promise.all(
      (article.images || []).map((img) =>
        img.publicId
          ? cloudinary.uploader.destroy(img.publicId)
          : Promise.resolve()
      )
    );

    // delete videos from cloudinary
    await Promise.all(
      (article.videos || []).map((vid) =>
        vid.publicId
          ? cloudinary.uploader.destroy(vid.publicId, { resource_type: "video" })
          : Promise.resolve()
      )
    );

    await article.deleteOne();

    res.status(200).json({
      success: true,
      message: "Article deleted successfully",
    });
  } catch (error) {
    console.error("Delete Article Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// EXPORT ALL
module.exports = {
  adminLogin,
  adminRegister,

  // media events
  createMediaEvent,
  getMediaEvents,
  deleteMediaEvent,

  // projects
  createProject,
  getProjects,
  deleteProject,
  getProjectById,
  updateProject,

  // multer
  eventUpload,

  // articles
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
};
// controllers/adminController.js

const adminModel = require("../models/adminModel");
const Blog = require("../models/blogModel");
const Project = require("../models/projectModel"); // <-- added

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// -----------------------------------
// MULTER UPLOAD CONFIG
// -----------------------------------
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  if (
    allowed.test(file.mimetype) &&
    allowed.test(path.extname(file.originalname).toLowerCase())
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed (jpg, jpeg, png, webp)"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
}).single("image");

// MULTIPLE IMAGE UPLOADER FOR PROJECTS
const uploadMultiple = multer({
  storage,
  fileFilter,
  limits: { fileSize: 4 * 1024 * 1024 },
}).array("images", 10); // maximum 10 images


// ===================================
// ADMIN REGISTER
// ===================================
const adminRegister = async (req, res) => {
  try {
    const existingUser = await adminModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(200).send({
        message: "User Already Exists",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new adminModel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();

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
    const user = await adminModel.findOne({ email: req.body.email }).select("+password");

    if (!user) {
      return res.status(200).send({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(200).send({ success: false, message: "Invalid Email or Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
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
// CREATE BLOG
// ===================================
const createMediaEvent = async (req, res) => {
  try {
    const { title, eventDate } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Event title is required" });
    }

    if (!eventDate) {
      return res.status(400).json({ success: false, message: "Event date is required" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "At least one image is required" });
    }

    // Store uploaded image paths
    const images = req.files.map((file) => `/uploads/${file.filename}`);

    const newEvent = await Blog.create({
      title,
      eventDate,
      images,
    });

    return res.status(201).json({
      success: true,
      message: "Media event created successfully",
      event: newEvent,
    });

  } catch (error) {
    console.log("Create Media Event Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




// ===================================
// GET ALL BLOGS
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
// DELETE BLOG
// ===================================
const deleteMediaEvent = async (req, res) => {
  try {
    const event = await Blog.findById(req.params.id);

    if (!event) {
      return res.status(404).send({ success: false, message: "Event not found" });
    }

    // Delete images from server
    if (event.images && event.images.length > 0) {
      event.images.forEach((imgPath) => {
        const filePath = path.join(process.cwd(), imgPath.replace(/^\//, ""));
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
    }

    await Blog.findByIdAndDelete(req.params.id);

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
// CREATE PROJECT (MULTIPLE IMAGES + CAPTIONS)
// ===================================
const createProject = (req, res) => {
  uploadMultiple(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).send({ success: false, message: err.message });
      }

      const { name, client, status, budget, startDate, type, description } = req.body;

      if (!name || !client || !type) {
        return res.status(400).json({
          success: false,
          message: "Name, Client & Type are required",
        });
      }

      // Captions: always convert to array
      let captions = req.body.captions || [];
      if (!Array.isArray(captions)) captions = [captions];

      // Build images array
      const images = (req.files || []).map((file, index) => ({
        url: `/uploads/${file.filename}`,
        caption: captions[index] || "",
      }));

      const project = await Project.create({
        name,
        client,
        type,
        budget,
        startDate,
        status,
        description,
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
  });
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
// DELETE PROJECT
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

    // Delete each image file
    for (const img of project.images) {
      const filePath = path.join(process.cwd(), img.url.replace(/^\//, ""));
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.log("File delete error:", e);
        }
      }
    }

    await Project.findByIdAndDelete(req.params.id);

    return res.send({
      success: true,
      message: "Project deleted successfully",
    });

  } catch (error) {
    console.log("Delete Project Error:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
};

// GET ONE PROJECT BY ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).send({ success: false, message: "Project not found" });
    }

    res.send({ success: true, project });

  } catch (error) {
    console.log("Get Project Error:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
};
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};


// EXPORT ALL
module.exports = {
  adminLogin,
  adminRegister,
  createMediaEvent,
  getMediaEvents,
  deleteMediaEvent,
  createProject,
  getProjects,
  deleteProject,
  getProjectById,
  updateProject   
};

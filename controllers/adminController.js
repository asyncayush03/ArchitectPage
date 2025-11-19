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
const createBlog = (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err) return res.status(400).send({ success: false, message: err.message });

      const { title, content, category } = req.body;

      if (!title) {
        return res.status(400).send({ success: false, message: "Title is required" });
      }

      const image = req.file ? `/uploads/${req.file.filename}` : "";

      const blog = await Blog.create({ title, content, category, image });

      return res.status(201).send({
        success: true,
        message: "Blog created",
        blog,
      });

    } catch (error) {
      console.log("Create Blog Error:", error);
      res.status(500).send({ success: false, message: "Server error" });
    }
  });
};


// ===================================
// GET ALL BLOGS
// ===================================
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.send({ success: true, blogs });
  } catch (error) {
    console.log("Fetch Blogs Error:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
};


// ===================================
// DELETE BLOG
// ===================================
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).send({ success: false, message: "Blog not found" });
    }

    if (blog.image) {
      const filePath = path.join(process.cwd(), blog.image.replace(/^\//, ""));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await Blog.findByIdAndDelete(req.params.id);

    return res.send({ success: true, message: "Blog deleted" });

  } catch (error) {
    console.log("Delete Blog Error:", error);
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


// EXPORT ALL
module.exports = {
  adminLogin,
  adminRegister,
  createBlog,
  getBlogs,
  deleteBlog,
  createProject,
  getProjects,
  deleteProject,
};

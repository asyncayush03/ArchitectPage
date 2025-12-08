// controllers/adminController.js

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
  const allowed = /jpeg|jpg|png|webp/;
  const okMime = allowed.test(file.mimetype.toLowerCase());
  const okName = allowed.test(file.originalname.toLowerCase());
  if (okMime && okName) cb(null, true);
  else cb(new Error("Only image files allowed (jpg, jpeg, png, webp)"));
};

const eventUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB before compression
}).array("images", 15); // field name = images

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

    const files = req.files || [];
    if (files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "At least one image is required" });
    }

    const uploads = await Promise.all(
      files.map(async (file) => {
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
// CREATE PROJECT – Cloudinary
// ===================================
const createProject = async (req, res) => {
  try {
    const {
      name,
      client,
      type,
      budget,
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

    // captions can be array or single string
    let captions = req.body.captions || [];
    if (!Array.isArray(captions)) captions = [captions];

    const images = [];

    const files = req.files || [];
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

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

    const project = await Project.create({
      name,
      client,
      type,
      budget,
      startDate,
      status,
      description,
      location,
      progress,
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
// UPDATE PROJECT – Cloudinary
// ===================================
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    // update primitive fields
    const updatableFields = [
      "name",
      "client",
      "type",
      "budget",
      "startDate",
      "status",
      "description",
      "location",
      "progress",
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        project[field] = req.body[field];
      }
    });

    // new captions for new images
    let captions = req.body.captions || [];
    if (!Array.isArray(captions)) captions = [captions];

    const files = req.files || [];
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const compressedBuffer = await sharp(file.buffer)
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
};

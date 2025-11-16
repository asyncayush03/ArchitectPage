
import express from "express";
import multer from "multer";
import path from "path";
import Blog from "../models/Blog.js";
import fs from "fs";

const router = express.Router();

// Storage config for multer (save to /uploads)
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  },
});
const upload = multer({ storage });

// CREATE blog (multipart/form-data with optional file field "image")
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";
    const blog = await Blog.create({ title, content, category, image });
    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// READ all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE blog by id (also deletes image file if present)
router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Not found" });

    // remove associated file from disk (if exists)
    if (blog.image) {
      const filePath = path.join(process.cwd(), blog.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

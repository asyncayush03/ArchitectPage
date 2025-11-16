const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Blog = require('../models/Blog');

const { adminLogin, adminRegister } = require("../controllers/adminController");

const router = express.Router();

// ensure uploads dir exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// multer storage + basic validation
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '';
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  // allow common image types only
  const allowed = /jpeg|jpg|png|webp/;
  const mimetypeOK = allowed.test(file.mimetype);
  const extOK = allowed.test(path.extname(file.originalname).toLowerCase());
  if (mimetypeOK && extOK) cb(null, true);
  else cb(new Error('Only image files (jpg, jpeg, png, webp) are allowed'));
};

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
  fileFilter,
});

// Create blog (multipart/form-data: image field name => "image")
router.post('/blog', upload.single('image'), async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title) return res.status(400).json({ message: 'Title required' });

    const image = req.file ? `/uploads/${req.file.filename}` : '';
    const blog = await Blog.create({ title, content, category, image });
    return res.status(201).json(blog);
  } catch (err) {
    console.error('Create blog error', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Get all blogs
router.get('/blog', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.json(blogs);
  } catch (err) {
    console.error('Get blogs error', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Delete blog by id (also remove uploaded file)
router.delete('/blog/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.image) {
      // blog.image is expected to be like "/uploads/filename.ext"
      const filePath = path.join(process.cwd(), blog.image.replace(/^\//, ''));
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.warn('Failed to delete file:', filePath, e);
        }
      }
    }

    await Blog.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Blog deleted' });
  } catch (err) {
    console.error('Delete blog error', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', adminLogin);
router.post('/register', adminRegister);

module.exports = router;

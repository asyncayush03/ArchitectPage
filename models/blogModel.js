// backend/models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    category: { type: String },
    image: { type: String }, // stores relative path like: /uploads/12345.jpg
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);

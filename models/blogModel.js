// backend/models/Blog.js
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
    },

    eventDate: {
      type: Date,
      required: [true, "Event date is required"],
    },

    images: [
      {
        type: String, // store Cloudinary or server image URLs
        required: true,
      },
    ],
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model("Blog", blogSchema);

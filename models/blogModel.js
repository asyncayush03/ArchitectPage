// backend/models/blogModel.js
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
        type: String, // Cloudinary URL (or legacy /uploads URL)
        required: true,
      },
    ],

    imagePublicIds: [
      {
        type: String, // Cloudinary public_id (for deletion)
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);

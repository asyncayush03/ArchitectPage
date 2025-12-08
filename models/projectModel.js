// models/projectModel.js
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    client: { type: String, required: true },
    type: { type: String, required: true },
    budget: { type: String, required: true },
    startDate: { type: String, required: true },

    status: {
      type: String,
      required: true,
      enum: ["Planning", "In Progress", "Completed"],
    },

    description: { type: String, required: true },

    // ✅ these were in your form/UI but not in schema
    location: { type: String },
    progress: { type: Number, default: 0 },

    // ✅ multiple images with caption + cloudinary publicId
    images: [
      {
        url: { type: String },       // Cloudinary secure_url
        caption: { type: String },
        publicId: { type: String },  // Cloudinary public_id
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);

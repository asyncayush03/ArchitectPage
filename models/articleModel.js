const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    summary: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      lowercase: true,
      trim: true,
    },

    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],

    images: [
      {
        url: String,
        caption: String,
        publicId: String,
      },
    ],

    videos: [
      {
        url: String,
        publicId: String,
      },
    ],

    publishDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);

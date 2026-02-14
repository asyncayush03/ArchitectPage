const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  client: { type: String, required: true },
  type: { type: String, required: true },

  area: {
    type: String,
    required: true,
  },

  startDate: { type: Date, required: true },
  status: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  progress: { type: Number, default: 0 },

  // KEY–VALUE ADDITIONAL FEATURES
  additionalFeatures: [
    {
      key: { type: String },
      value: { type: String },
    }
  ],

  // IMAGE UPLOADS (with publicId)
  images: [
    {
      url: String,
      caption: String,
      publicId: String,     // ✅ MUST EXIST
    }
  ],

}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);

const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    client: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Planning", "In Progress", "Completed"],
    },
    description: {
      type: String,
      required: true,
    },

    // MULTIPLE IMAGES WITH CAPTIONS
    images: [
      {
        url: { type: String },
        caption: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);

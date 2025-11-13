const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true }
);

// ✅ EXPORT THE MODEL
module.exports = mongoose.model("Admin", adminSchema);

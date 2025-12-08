// scripts/migrateUploadsToCloudinary.js
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
require("dotenv").config();

const cloudinary = require("../claudinary");
const Blog = require("../models/blogModel");
const Project = require("../models/projectModel");

async function uploadCompressed(localPath, folder) {
  const compressedBuffer = await sharp(localPath)
    .resize({ width: 1920, withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toBuffer();

  if (compressedBuffer.length > 10 * 1024 * 1024) {
    throw new Error(
      `Still too large after compression (${compressedBuffer.length} bytes)`
    );
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(compressedBuffer);
  });
}

async function migrateBlogs() {
  const events = await Blog.find({
    images: { $elemMatch: { $regex: "^/uploads/" } },
  });

  console.log("Blog events to migrate:", events.length);

  for (const event of events) {
    const newImageUrls = [];
    const newPublicIds = event.imagePublicIds || [];

    for (const imgPath of event.images) {
      if (typeof imgPath !== "string" || !imgPath.startsWith("/uploads/")) {
        newImageUrls.push(imgPath);
        continue;
      }

      const localPath = path.join(process.cwd(), imgPath.replace(/^\//, ""));
      if (!fs.existsSync(localPath)) {
        console.warn("File not found:", localPath);
        continue;
      }

      try {
        const result = await uploadCompressed(
          localPath,
          "architectpage/events"
        );

        newImageUrls.push(result.secure_url);
        newPublicIds.push(result.public_id);

        try {
          fs.unlinkSync(localPath);
        } catch (e) {
          console.log("Local file delete error:", e.message);
        }
      } catch (err) {
        console.error("Cloudinary upload failed for", localPath, err.message);
        newImageUrls.push(imgPath);
      }
    }

    event.images = newImageUrls;
    event.imagePublicIds = newPublicIds;
    await event.save();
    console.log("Updated event:", event._id.toString());
  }
}

async function migrateProjects() {
  const projects = await Project.find({
    "images.url": { $regex: "^/uploads/" },
  });

  console.log("Projects to migrate:", projects.length);

  for (const project of projects) {
    const newImages = [];

    for (const img of project.images) {
      if (!img.url || typeof img.url !== "string") {
        newImages.push(img);
        continue;
      }

      if (!img.url.startsWith("/uploads/")) {
        newImages.push(img);
        continue;
      }

      const localPath = path.join(process.cwd(), img.url.replace(/^\//, ""));
      if (!fs.existsSync(localPath)) {
        console.warn("File not found:", localPath);
        newImages.push(img);
        continue;
      }

      try {
        const result = await uploadCompressed(
          localPath,
          "architectpage/projects"
        );

        newImages.push({
          ...img.toObject(),
          url: result.secure_url,
          publicId: result.public_id,
        });

        try {
          fs.unlinkSync(localPath);
        } catch (e) {
          console.log("Local file delete error:", e.message);
        }
      } catch (err) {
        console.error("Cloudinary upload failed for", localPath, err.message);
        newImages.push(img);
      }
    }

    project.images = newImages;
    await project.save();
    console.log("Updated project:", project._id.toString());
  }
}

async function migrate() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Mongo connected");

  await migrateBlogs();
  await migrateProjects();

  await mongoose.disconnect();
  console.log("Migration done");
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});

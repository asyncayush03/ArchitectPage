// scripts/uploadFromCDriveWithStructure.js
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const cloudinary = require("../config/cloudinary");
require("dotenv").config();

// ================== CONFIG ==================
const LOCAL_ROOT = "C:\\Users\\hp\\Downloads\\For Website\\For Website";
const CLOUD_ROOT = "hotels";
const MAX_SIZE_MB = 9;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const allowedExt = /\.(png|jpe?g|jfif|webp)$/i;
// ============================================

console.log("🚀 Starting uploadFromCDriveWithStructure.js");
console.log("LOCAL_ROOT:", LOCAL_ROOT);
console.log("CLOUD_ROOT:", CLOUD_ROOT);
console.log("MAX_SIZE_MB:", MAX_SIZE_MB);

// 🔧 make folder/file names Cloudinary-safe
function safeSegment(str) {
  return String(str)
    .normalize("NFKD")
    .replace(/[^\w\-]/g, "_") // keep letters, numbers, _, -
    .replace(/_+/g, "_") // collapse multiple _
    .replace(/^_+|_+$/g, ""); // trim _ from ends
}

function getAllFiles(dir) {
  console.log("🔎 Scanning directory:", dir);
  let files = [];
  let entries;

  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    console.error("❌ Failed to read directory:", dir);
    console.error("   →", err.message);
    return files;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getAllFiles(fullPath));
    } else if (allowedExt.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function makeUnderLimit(inputPath) {
  console.log("⚙️  Compressing:", inputPath);
  try {
    let quality = 85;
    let width = 2600;

    let buffer = await sharp(inputPath)
      .rotate()
      .jpeg({ quality })
      .toBuffer();

    while (buffer.length > MAX_SIZE_BYTES && (quality > 40 || width > 1200)) {
      if (quality > 40) quality -= 10;
      if (width > 1200) width -= 400;

      console.log(
        "  → Still too big, retry with quality:",
        quality,
        "width:",
        width
      );

      buffer = await sharp(inputPath)
        .rotate()
        .resize({ width })
        .jpeg({ quality })
        .toBuffer();
    }

    console.log(
      "  → Final compressed size:",
      (buffer.length / (1024 * 1024)).toFixed(2),
      "MB"
    );

    return buffer;
  } catch (err) {
    console.error("⚠️ Compression error, using original file:", err.message);
    return fs.readFileSync(inputPath);
  }
}

async function uploadIfMissing(filePath) {
  // relative path like "Hotel Paharganj/Interiors/.../BAR.jpg"
  let rel = path.relative(LOCAL_ROOT, filePath).replace(/\\/g, "/");

  const parts = rel.split("/");
  const fileName = parts.pop(); // "BAR.jpg"
  const rawDirs = parts; // ["Hotel Paharganj", "Interiors", "Entrance Looby, BAR & Restaurant"]

  const safeDirs = rawDirs.map(safeSegment).filter(Boolean); // sanitize each folder

  const dirPath = safeDirs.join("/"); // "Hotel_Paharganj/Interiors/Entrance_Looby_BAR_Restaurant"

  const baseName = path.parse(fileName).name; // "BAR"
  const safePublicId = safeSegment(baseName) || "image";

  let cloudFolder = CLOUD_ROOT;
  if (dirPath) {
    cloudFolder = `${CLOUD_ROOT}/${dirPath}`;
  }

  const cloudPublicId = `${cloudFolder}/${safePublicId}`;

  try {
    // 1) check if already exists
    try {
      await cloudinary.api.resource(cloudPublicId);
      console.log("⏭ Skipped (already exists):", cloudPublicId);
      return;
    } catch (err) {
      if (err.http_code && err.http_code !== 404) {
        console.error("⚠️ Error checking existing:", err.message);
      }
      // 404 -> not found: continue to upload
    }

    console.log("\n📤 Uploading:", filePath);
    console.log(" → Cloud folder:", cloudFolder);
    console.log(" → public_id:   ", safePublicId);

    let buffer = fs.readFileSync(filePath);
    const isJfifOrPng = /\.(jfif|png)$/i.test(filePath);

    if (buffer.length > MAX_SIZE_BYTES || isJfifOrPng) {
      buffer = await makeUnderLimit(filePath);
    }

    if (buffer.length > MAX_SIZE_BYTES) {
      console.error(
        "❌ Still larger than",
        MAX_SIZE_MB,
        "MB after compression. Skipping:",
        filePath,
        "| size:",
        (buffer.length / (1024 * 1024)).toFixed(2),
        "MB"
      );
      return;
    }

    await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: cloudFolder,
          public_id: safePublicId,
          resource_type: "image",
        },
        (err, result) => {
          if (err) {
            console.error("❌ Upload failed:", err.message);
            return reject(err);
          }
          console.log(
            "✅ Uploaded:",
            result.public_id,
            "| size:",
            (buffer.length / (1024 * 1024)).toFixed(2),
            "MB"
          );
          resolve(result);
        }
      );
      uploadStream.end(buffer);
    });
  } catch (err) {
    console.error("🚨 Error uploading file, skipping:", filePath);
    console.error("   →", err.message);
  }
}

async function uploadAll() {
  console.log("\n🔍 Scanning local folders...");
  const files = getAllFiles(LOCAL_ROOT);
  console.log("📁 Total images found:", files.length);

  if (!files.length) {
    console.log(
      "⚠️ No image files found. Check LOCAL_ROOT path and file extensions."
    );
    return;
  }

  for (const filePath of files) {
    await uploadIfMissing(filePath);
  }

  console.log("\n🎉 Finished uploading all images from C drive.");
}

uploadAll();

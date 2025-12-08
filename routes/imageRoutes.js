// backend/routes/imageRoutes.js
const express = require('express');
const cloudinary = require("../config/cloudinary");
const router = express.Router();

const BASE_FOLDER = 'hotels'; // 👈 change this to your real root folder

router.get('/images', async (req, res) => {
  const { folder = '' } = req.query;

  try {
    const prefix = folder
      ? `${BASE_FOLDER}/${folder.replace(/\\/g, '/')}/`
      : `${BASE_FOLDER}/`;

    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix,
      max_results: 100,
    });

    const images = result.resources.map((img) => ({
      publicId: img.public_id,
      url: img.secure_url,
    }));

    res.json({ success: true, images });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: 'Failed to fetch images' });
  }
});

module.exports = router;

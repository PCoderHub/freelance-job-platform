const express = require("express");
const router = express.Router();
const cloudinary = require("../config/cloudinaryConfig");
const upload = require("../config/multerConfig");

router.post("/profile-pic", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    const result = await cloudinary.uploader.upload_stream(
      { folder: "profile_pics" },
      (error, result) => {
        if (error) return res.status(500).json(error);
        res.json({ url: result.secure_url });
      }
    );

    if (file) {
      // convert buffer to readable stream for upload_stream
      const streamifier = require("streamifier");
      streamifier.createReadStream(file.buffer).pipe(result);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

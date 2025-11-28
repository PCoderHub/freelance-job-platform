// multerConfig.js
const multer = require("multer");

const storage = multer.memoryStorage(); // use memory storage for Cloudinary
const upload = multer({ storage });

module.exports = upload;

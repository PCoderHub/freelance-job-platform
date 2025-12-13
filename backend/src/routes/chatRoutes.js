const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getChatByJob, sendMessage } = require("../controllers/chatController");
const router = express.Router();

router.get("/job/:jobId", authMiddleware, getChatByJob);
router.post("/:chatId/message", authMiddleware, sendMessage);

module.exports = router;

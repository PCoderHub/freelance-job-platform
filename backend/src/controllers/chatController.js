const asyncHandler = require("../middleware/asyncHandler");
const Chat = require("../models/Chat");

const getChatByJob = asyncHandler(async (req, res) => {
  const chat = await Chat.findOne({ job: req.params.jobId })
    .populate("client", "name email profile clientProfile")
    .populate("freelancer", "name email profile freelancerProfile")
    .populate(
      "messages.sender",
      "name email profile clientProfile freelancerProfile"
    );

  if (!chat) {
    return res.status(404).json({ message: "Chat not found" });
  }

  if (
    req.user.id !== chat.client._id.toString() &&
    req.user.id !== chat.freelancer._id.toString()
  ) {
    return res.status(403).json({ message: "Access denied" });
  }

  res.status(200).json(chat);
});

const sendMessage = asyncHandler(async (req, res) => {
  const { text } = req.body;

  const chat = await Chat.findOne({ job: req.params.chatId });

  if (!chat) return res.status(404).json({ message: "Chat not found" });

  if (
    req.user.id !== chat.client.toString() &&
    req.user.id !== chat.freelancer.toString()
  ) {
    return res.status(403).json({ message: "Access denied" });
  }

  const message = {
    sender: req.user.id,
    text,
  };

  chat.messages.push(message);
  await chat.save();

  res.status(201).json(message);
});

module.exports = {
  getChatByJob,
  sendMessage,
};

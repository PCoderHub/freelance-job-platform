const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User");

const getAllClients = asyncHandler(async (req, res) => {
  const clients = await User.find({ role: "client" }).select("-password");
  res.status(200).json(clients);
});

const getClientById = asyncHandler(async (req, res) => {
  const client = await User.findById({
    _id: req.params.id,
    role: "client",
  }).select("-password");

  if (!client) {
    return res.status(404).json({
      message: "Client not found",
    });
  }

  res.status(200).json(client);
});

const updateClientProfile = asyncHandler(async (req, res) => {
  const client = await User.findById(req.user.id).select("-password");

  if (!client) {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  const updates = {
    companyName: req.body.companyName || client.clientProfile.companyName,
    companyWebsite:
      req.body.companyWebsite || client.clientProfile.companyWebsite,
    industry: req.body.industry || client.clientProfile.industry,
    description: req.body.description || client.clientProfile.description,
    hiringBudget: req.body.hiringBudget || client.clientProfile.hiringBudget,
  };

  client.clientProfile = updates;
  await client.save();
  res.status(200).json({
    message: "Client profile updated successfully",
    client,
  });
});

const getClientJobs = asyncHandler(async (req, res) => {});

const getClientHires = asyncHandler(async (req, res) => {});

module.exports = {
  getAllClients,
  getClientById,
  updateClientProfile,
  getClientJobs,
  getClientHires,
};

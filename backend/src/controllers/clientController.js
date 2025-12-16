const asyncHandler = require("../middleware/asyncHandler");
const Job = require("../models/Job");
const User = require("../models/User");

const Review = require("../models/Review");
const Payment = require("../models/Payment");
const Proposal = require("../models/Proposal");
const { default: mongoose } = require("mongoose");

const getAverageRating = async (userId) => {
  const result = await Review.aggregate([
    { $match: { reviewed: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: "$reviewed",
        avgRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  return result[0] || { avgRating: 0, totalReviews: 0 };
};

const getDashboardStats = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const activeJobs = await Job.countDocuments({
    client: userId,
    status: "in-progress",
  });

  const proposalsWaiting = await Proposal.countDocuments({
    client: userId,
    status: "pending",
  });

  const hires = await Job.countDocuments({
    client: userId,
    status: { $in: ["in-progress", "completed"] },
  });

  const payments = await Payment.aggregate([
    {
      $match: {
        client: new mongoose.Types.ObjectId(userId),
        status: "succeeded",
      },
    },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const recentJobs = await Job.find({ client: userId, status: { $ne: "deleted" } })
    .sort({ createdAt: -1 })
    .limit(5)
    .select("title status");

  const rating = await getAverageRating(userId);

  res.json({
    stats: {
      activeJobs,
      proposalsWaiting,
      hires,
      paymentsThisMonth: payments[0]?.total || 0,
      averageRating: rating.avgRating,
      totalReviews: rating.totalReviews,
    },
    recentJobs,
  });
});

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

const getClientJobs = asyncHandler(async (req, res) => {
  const clientId = req.user.id;

  const jobs = await Job.find({ client: clientId, status: { $ne: "deleted" } }).populate(
    "freelancer",
    "name email profile freelancerProfile.skills"
  );

  res.status(200).json(jobs);
});

const getClientHires = asyncHandler(async (req, res) => {
  const clientId = req.user.id;

  const jobs = await Job.find({
    client: clientId,
    status: { $in: ["in-progress", "completed"] },
  }).populate("freelancer", "name email profile freelancerProfile.skills");

  const freelancers = {};

  // To generate unique list of freelancers
  jobs.forEach((job) => {
    if (job.freelancer) {
      freelancers[job.freelancer._id.toString()] = job.freelancer;
    }
  });

  const freelancerResponse = Object.values(freelancers);
  res.status(200).json(freelancerResponse);
});

module.exports = {
  getDashboardStats,
  getAllClients,
  getClientById,
  updateClientProfile,
  getClientJobs,
  getClientHires,
};

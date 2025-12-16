const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User");
const Job = require("../models/Job");
const Review = require("../models/Review");
const Proposal = require("../models/Proposal");
const Payment = require("../models/Payment");

const getDashboardStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalJobs = await Job.countDocuments();
  const totalReviews = await Review.countDocuments();
  const totalPayments = await Payment.countDocuments();

  res.status(200).json({
    totalUsers,
    totalJobs,
    totalReviews,
    totalPayments,
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

const updateUserStatus = asyncHandler(async (req, res) => {
  const { isActive } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      isActive,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json({
    message: `User ${isActive ? "activated" : "deactivated"} successfully`,
    user,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  await Review.deleteMany({ user: req.params.id });
  await Job.deleteMany({ client: req.params.id });
  await Job.deleteMany({ freelancer: req.params.id });
  await Proposal.deleteMany({ freelancer: req.params.id });

  res.status(200).json({
    message: "User deleted successfully",
  });
});

const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find().populate(
    "client freelancer",
    "name email profile"
  );

  res.status(200).json(jobs);
});

const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);

  if (!job) {
    return res.status(404).json({
      message: "Job not found",
    });
  }

  await Proposal.deleteMany({ job: req.params.id });

  res.status(200).json({
    message: "Job deleted successfully",
  });
});

module.exports = {
  getDashboardStats,
  getAllUsers,
  updateUserStatus,
  deleteUser,
  getAllJobs,
  deleteJob,
};

const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User");

const getAllFreelancers = asyncHandler(async (req, res) => {
  const freelancers = await User.find({ role: "freelancer" }).select(
    "-password"
  );
  res.status(200).json(freelancers);
});

const getFreelancerById = asyncHandler(async (req, res) => {
  const freelancer = await User.findById({
    _id: req.params.id,
    role: "freelancer",
  }).select("-password");
  if (!freelancer) {
    return res.status(404).json({
      message: "Freelancer not found",
    });
  }
  res.status(200).json(freelancer);
});

const updateFreelancerProfile = asyncHandler(async (req, res) => {
  const freelancer = await User.findById(req.user.id).select("-password");

  if (!freelancer) {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  const updates = {
    skills: req.body.skills || freelancer.freelancerProfile.skills,
    hourlyRate: req.body.hourlyRate || freelancer.freelancerProfile.hourlyRate,
    experience: req.body.experience || freelancer.freelancerProfile.experience,
    portfolioLinks:
      req.body.portfolioLinks || freelancer.freelancerProfile.portfolioLinks,
    availability:
      req.body.availability || freelancer.freelancerProfile.availability,
  };

  freelancer.freelancerProfile = updates;
  await freelancer.save();
  res.status(200).json({
    message: "Freelancer profile updated successfully",
    freelancer,
  });
});

const getFreelancerJobs = asyncHandler(async (req, res) => {});

const getFreelancerProposals = asyncHandler(async (req, res) => {});

module.exports = {
  getAllFreelancers,
  getFreelancerById,
  updateFreelancerProfile,
  getFreelancerJobs,
  getFreelancerProposals,
};

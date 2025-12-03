const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/User");
const Job = require("../models/Job");
const Proposal = require("../models/Proposal");

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

const getFreelancerJobs = asyncHandler(async (req, res) => {
  const freelancerId = req.user.id;

  const hiredJobs = await Job.find({ freelancer: freelancerId }).populate(
    "client",
    "name email clientProfile"
  );

  const proposals = await Proposal.find({ freelancer: freelancerId }).select(
    "job"
  );

  const jobIds = proposals.map((proposal) => proposal.job);

  const appliedJobs = await Job.find({
    _id: { $in: jobIds },
    freelancer: { $ne: freelancerId },
  }).populate("client", "name email clientProfile");

  //const freelancerJobs = [...hiredJobs, ...appliedJobs];
  const freelancerJobs = {
    hiredJobs,
    appliedJobs,
  };

  res.status(200).json(freelancerJobs);
});

const getFreelancerProposals = asyncHandler(async (req, res) => {
  const freelancerId = req.user.id;

  const proposals = await Proposal.find({ freelancer: freelancerId }).populate({
    path: "job",
    select: "title budget status client",
    populate: { path: "client", select: "name email clientProfile" },
  });

  res.status(200).json(proposals);
});

module.exports = {
  getAllFreelancers,
  getFreelancerById,
  updateFreelancerProfile,
  getFreelancerJobs,
  getFreelancerProposals,
};

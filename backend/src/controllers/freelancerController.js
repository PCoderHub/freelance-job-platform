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

  const offeredproposals = await Proposal.find({
    freelancer: freelancerId,
    status: "offered",
  }).select("job");

  const jobIdsOffered = offeredproposals.map((proposal) => proposal.job);

  const offeredJobs = await Job.find({
    _id: { $in: jobIdsOffered },
    freelancer: { $ne: freelancerId },
  }).populate("client", "name email clientProfile");

  //const freelancerJobs = [...hiredJobs, ...appliedJobs];
  const freelancerJobs = {
    hiredJobs,
    appliedJobs,
    offeredJobs,
  };

  res.status(200).json(freelancerJobs);
});

const getFreelancerProposals = asyncHandler(async (req, res) => {
  const freelancerId = req.user.id;

  const proposals = await Proposal.find({ freelancer: freelancerId }).populate({
    path: "job",
    select:
      "title budget category duration description skillsRequired status client",
    populate: { path: "client", select: "name email clientProfile" },
  });

  res.status(200).json(proposals);
});

const acceptOffer = asyncHandler(async (req, res) => {
  const proposal = await Proposal.findById(req.params.id);
  if (!proposal) return res.status(404).json({ message: "Proposal not found" });

  // Only the freelancer can accept
  if (proposal.freelancer.toString() !== req.user.id) {
    return res.status(403).json({ message: "Access denied" });
  }

  const job = await Job.findById(proposal.job);
  if (!job) return res.status(404).json({ message: "Job not found" });

  // Accept the offer
  proposal.status = "accepted";
  await proposal.save();

  // Assign freelancer to the job
  job.freelancer = proposal.freelancer;
  job.status = "in-progress";
  await job.save();

  // Reject all other proposals for this job
  await Proposal.updateMany(
    { job: job._id, _id: { $ne: proposal._id } },
    { $set: { status: "rejected" } }
  );

  return res.status(200).json({
    message: "Offer accepted. Job is now in progress",
    job,
  });
});

const declineOffer = asyncHandler(async (req, res) => {
  const proposal = await Proposal.findById(req.params.id);
  if (!proposal) return res.status(404).json({ message: "Proposal not found" });

  // Only freelancer can decline
  if (proposal.freelancer.toString() !== req.user.id) {
    return res.status(403).json({ message: "Access denied" });
  }

  const job = await Job.findById(proposal.job);
  if (!job) return res.status(404).json({ message: "Job not found" });

  proposal.status = "declined";
  await proposal.save();

  // If declined, job goes back to open since no one is offered anymore
  job.status = "open";
  await job.save();

  return res.status(200).json({
    message: "Offer declined. Job is still open",
  });
});

module.exports = {
  getAllFreelancers,
  getFreelancerById,
  updateFreelancerProfile,
  getFreelancerJobs,
  getFreelancerProposals,
  acceptOffer,
  declineOffer,
};

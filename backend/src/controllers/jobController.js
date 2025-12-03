const Job = require("../models/Job");
const asyncHandler = require("../middleware/asyncHandler");
const Proposal = require("../models/Proposal");

const createJob = asyncHandler(async (req, res) => {
  const { title, description, skillsRequired, budget, duration, category } =
    req.body;

  const job = await Job.create({
    client: req.user.id,
    title,
    description,
    skillsRequired,
    budget,
    duration,
    category,
  });

  res.status(201).json({
    message: "Job created successfully",
    job,
  });
});

const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find().populate(
    "client",
    "name email profile clientProfile"
  );
  res.status(200).json(jobs);
});

const getFreelancerJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ status: "open" }).populate(
    "client",
    "name email profile clientProfile"
  );

  res.status(200).json(jobs);
});

const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id)
    .populate("client", "name email clientProfile")
    .populate("freelancer", "freelancerProfile");

  if (!job) {
    return res.status(404).json({
      message: "Job not found",
    });
  }

  if (job.client._id.toString() !== req.user.id) {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  res.status(200).json(job);
});

const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({
      message: "Job not found",
    });
  }

  if (job.client.toString() !== req.user.id) {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .populate("client", "clientProfile")
    .populate("freelancer", "freelancerProfile");

  res.status(200).json({
    message: "Job updated successfully",
    job: updatedJob,
  });
});

const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({
      message: "Job not found",
    });
  }

  if (job.client.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  await job.deleteOne();

  res.status(200).json({
    message: "Job deleted successfully",
  });
});

const applyToJob = asyncHandler(async (req, res) => {
  const { coverLetter, bidAmount } = req.body;
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({
      message: "Job not found",
    });
  }

  if (job.status !== "open") {
    return res.status(400).json({
      message: "Job is not open for applications",
    });
  }

  const existingApplication = await Proposal.findOne({
    job: req.params.id,
    freelancer: req.user.id,
  });

  if (existingApplication) {
    return res.status(400).json({
      message: "You have already applied to this job",
    });
  }

  const application = await Proposal.create({
    job: req.params.id,
    freelancer: req.user.id,
    coverLetter,
    bidAmount,
  });

  job.proposals.push(application._id);
  await job.save();

  res.status(201).json({
    message: "Application submitted successfully",
    application,
  });
});

const getJobProposals = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id).populate("proposals");

  if (!job) {
    return res.status(404).json({
      message: "Job not found",
    });
  }

  if (job.client.toString() !== req.user.id) {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  const proposals = await Proposal.find({ job: req.params.id }).populate(
    "freelancer",
    "name profile freelancerProfile"
  );

  res.status(200).json(proposals);
});

// const assignFreelancer = asyncHandler(async (req, res) => {
//   const { proposalId } = req.body;

//   if (!proposalId) {
//     return res.status(400).json({
//       message: "Proposal ID is required",
//     });
//   }

//   const job = await Job.findById(req.params.id);
//   if (!job) {
//     return res.status(404).json({
//       message: "Job not found",
//     });
//   }

//   if (job.client.toString() !== req.user.id) {
//     return res.status(403).json({
//       message: "Access denied",
//     });
//   }

//   const proposal = await Proposal.findById(proposalId);
//   if (!proposal) {
//     return res.status(404).json({
//       message: "Proposal not found",
//     });
//   }

//   if (proposal.job.toString() !== req.params.id) {
//     return res.status(400).json({
//       message: "Proposal does not belong to this job",
//     });
//   }

//   job.freelancer = proposal.freelancer;
//   job.status = "in-progress";
//   await job.save();

//   proposal.status = "accepted";
//   await proposal.save();

//   await Proposal.updateMany(
//     { job: req.params.id, _id: { $ne: proposalId } },
//     { $set: { status: "rejected" } }
//   );

//   res.status(200).json({
//     message: "Freelancer assigned successfully",
//     job,
//   });
// });

const offerToFreelancer = asyncHandler(async (req, res) => {
  const { proposalId } = req.body;

  if (!proposalId) {
    return res.status(400).json({ message: "Proposal ID is required" });
  }

  const job = await Job.findById(req.params.id).populate("proposals");
  if (!job) return res.status(404).json({ message: "Job not found" });

  // Check if current user owns the job
  if (job.client.toString() !== req.user.id) {
    return res.status(403).json({ message: "Access denied" });
  }

  // Fetch proposal
  const proposal = await Proposal.findById(proposalId);
  if (!proposal) return res.status(404).json({ message: "Proposal not found" });

  if (proposal.job.toString() !== req.params.id) {
    return res
      .status(400)
      .json({ message: "Proposal does not belong to this job" });
  }

  // Update selected proposal to "offered"
  proposal.status = "offered";
  await proposal.save();

  // Update job status to "offered"
  job.status = "offered";
  await job.save();

  return res.status(200).json({
    message: "Offer sent to freelancer",
    job,
    proposal,
  });
});

module.exports = {
  createJob,
  getAllJobs,
  getFreelancerJobs,
  getJobById,
  updateJob,
  deleteJob,
  applyToJob,
  getJobProposals,
  //assignFreelancer,
  offerToFreelancer,
};

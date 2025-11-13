const Job = require("../models/Job");
const asyncHandler = require("../middleware/asyncHandler");

const createJob = asyncHandler(async (req, res) => {
    const { title, description, skillsRequired, budget, duration, category } = req.body;

    const job = await Job.create({
        client: req.user.id,
        title,
        description,
        skillsRequired,
        budget,
        duration,
        category
    });

    res.status(201).json({
        message: "Job created successfully",
        job
    })
})

const getAllJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find().populate("client", "name email clientProfile");
    res.status(200).json(jobs);
})

const getJobById = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id).populate("client", "clientProfile").populate("freelancer", "freelancerProfile");

    if(!job) {
        return res.status(404).json({
            message: "Job not found"
        })
    }

    if(job.client._id.toString() !== req.user.id) {
        return res.status(403).json({
            message: "Access denied"
        })
    }

    res.status(200).json(job);
})

const updateJob = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);

    if(!job) {
        return res.status(404).json({
            message: "Job not found"
        })
    }

    if(job.client.toString() !== req.user.id) {
        return res.status(403).json({
            message: "Access denied"
        })
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    }).populate("client", "clientProfile").populate("freelancer", "freelancerProfile");

    res.status(200).json({
        message: "Job updated successfully",
        job: updatedJob
    })
})

const deleteJob = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);

    if(!job) {
        return res.status(404).json({
            message: "Job not found"
        })
    }

    if(job.client.toString() !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied"
        })
    }

    await job.deleteOne();

    res.status(200).json({
        message: "Job deleted successfully"
    })
})

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob
}
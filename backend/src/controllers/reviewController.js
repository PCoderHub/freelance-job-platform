const asyncHandler = require("../middleware/asyncHandler");
const Job = require("../models/Job");
const Review = require("../models/Review");

const createReview = asyncHandler(async (req, res) => {
  const { jobId, reviewedId, rating, comment } = req.body;

  const job = await Job.findById(jobId);

  if (!job) {
    return res.status(404).json({
      message: "Job not found",
    });
  }

  if (job.status !== "completed") {
    return res.status(400).json({
      message: "Cannot review before job completion",
    });
  }

  if (req.user.id === reviewedId) {
    return res.status(400).json({
      message: "Cannot review yourself",
    });
  }

  const existingReview = await Review.findOne({
    job: jobId,
    reviewer: req.user.id,
  });

  if (existingReview) {
    return res.status(400).json({
      message: "You have already reviewed this job",
    });
  }

  const review = await Review.create({
    job: jobId,
    reviewer: req.user.id,
    reviewed: reviewedId,
    rating,
    comment,
  });

  res.status(201).json({
    message: "Review submitted successfully",
    review,
  });
});

const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find().populate(
    "job reviewer reviewed",
    "name email profile"
  );

  res.status(200).json(reviews);
});

const updateReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id);

  if (!review) {
    return res.status(404).json({
      message: "Review not found",
    });
  }

  if (review.reviewer.toString() !== req.user.id) {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  review.rating = req.body.rating;
  review.comment = req.body.comment;

  await review.save();

  res.status(200).json({
    message: "Review updated successfully",
    review,
  });
});

const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id);

  if (!review) {
    return res.status(404).json({
      message: "Review not found",
    });
  }

  if (review.reviewer.toString() !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied",
    });
  }

  await review.deleteOne();

  res.status(200).json({
    message: "Review deleted successfully",
  });
});

const getReviews = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const reviews = await Review.find({ reviewed: id }).populate(
    "job reviewer",
    "name email profile"
  );

  res.status(200).json(reviews);
});

const getGivenReviews = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const reviews = await Review.find({ reviewer: id }).populate(
    "job reviewed",
    "title name profile"
  );

  res.status(200).json(reviews);
});

module.exports = {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
  getReviews,
  getGivenReviews,
};

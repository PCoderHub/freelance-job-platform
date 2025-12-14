const express = require("express");
const Job = require("../models/Job");
const Payment = require("../models/Payment");
const asyncHandler = require("../middleware/asyncHandler");
const authMiddleware = require("../middleware/authMiddleware");
const { payment } = require("../../../frontend/src/services/paymentServices");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

router.post(
  "/pay",
  asyncHandler(async (req, res) => {
    const { jobId } = req.body;
    const job = await Job.findById(jobId)
      .populate("freelancer")
      .populate("client");

    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.status !== "completed")
      return res.status(400).json({ message: "Job not completed" });

    const existingTx = await Payment.findOne({
      job: jobId,
      status: "succeeded",
    });

    if (existingTx) {
      return res.status(400).json({ message: "Payment already completed" });
    }

    const amount = job.budget * 100; // in cents
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      payment_method_types: ["card"],
      transfer_data: { destination: job.freelancer.stripeAccountId }, // freelancer Stripe account
    });

    const transaction = await Payment.create({
      job: job._id,
      client: job.client._id,
      freelancer: job.freelancer._id,
      amount,
      currency: "inr",
      stripePaymentId: paymentIntent.id,
      status: "pending",
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      transactionId: transaction._id,
    });
  })
);

// Confirm payment after frontend succeeds
router.post(
  "/confirm",
  asyncHandler(async (req, res) => {
    const { transactionId } = req.body;
    await Payment.findByIdAndUpdate(transactionId, { status: "succeeded" });
    res.status(200).json({ message: "Payment successful" });
  })
);

// Fetch transactions for dashboards
router.get(
  "/",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const user = req.user; // auth middleware
    let filter = {};
    if (user.role === "client") filter.client = user.id;
    else if (user.role === "freelancer") filter.freelancer = user.id;

    const transactions = await Payment.find(filter)
      .populate("job", "title")
      .populate("client", "name")
      .populate("freelancer", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(transactions);
  })
);

module.exports = router;

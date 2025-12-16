const { default: mongoose } = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    skillsRequired: {
      type: [String],
    },
    budget: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: [
        "open",
        "offered",
        "in-progress",
        "completed",
        "cancelled",
        "deleted",
      ],
      default: "open",
    },
    proposals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proposal",
      },
    ],
    milestones: [
      {
        title: String,
        dueDate: Date,
        isCompleted: {
          type: Boolean,
          default: false,
        },
        paymentAmount: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;

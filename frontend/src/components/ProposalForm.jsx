import React, { useState } from "react";
import { toast } from "react-toastify";
import { applyToJob } from "../services/jobServices";

function ProposalForm({ jobId, onClose }) {
  const [coverLetter, setCoverLetter] = useState("");
  const [bidAmount, setBidAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!coverLetter.trim() || !bidAmount) {
      toast.error("Please fill in all fields");
      return;
    }

    if (isNaN(bidAmount) || Number(bidAmount) <= 0) {
      toast.error("Bid amount must be a positive number");
      return;
    }

    try {
      const application = {
        coverLetter,
        bidAmount,
      };
      const response = await applyToJob(jobId, application);
      toast.success(response.data.message);
      console.log(response);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold text-indigo-700 mb-4">
        Submit Your Bid
      </h2>

      {/* Cover Letter */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Cover Letter
        </label>
        <textarea
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          rows={4}
          placeholder="Write your cover letter..."
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />
      </div>

      {/* Bid Amount */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Bid Amount (£)
        </label>
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          placeholder="Enter your bid"
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          required
        />
      </div>

      <button
        accessKey=""
        type="submit"
        className="w-full bg-indigo-700 text-white font-medium py-2 rounded-md hover:bg-indigo-800 transition-colors"
      >
        <span accessKey="">Submit Bid</span>
      </button>
    </form>
  );
}

export default ProposalForm;

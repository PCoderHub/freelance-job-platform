import { Rating } from "@mui/material";
import React, { useState } from "react";

function ReviewForm({ onSubmit, initialValues }) {
  const [rating, setRating] = useState(initialValues?.rating || 0);
  const [comment, setComment] = useState(initialValues?.comment || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) return alert("Please select a rating");

    onSubmit({
      rating,
      comment,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl p-6 max-w-md w-full mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>

      {/* Rating */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Rating</label>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />
      </div>

      {/* Comment */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Comment</label>
        <textarea
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
          rows="4"
          placeholder="Write your feedback..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <button
        accessKey=""
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        <span accessKey="">Submit Review</span>
      </button>
    </form>
  );
}

export default ReviewForm;

import React, { useState } from "react";
import { createJob } from "../services/jobServices";
import { toast } from "react-toastify";

function JobPostForm({ onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skillsRequired: "",
    budget: "",
    duration: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createJob({
        ...formData,
        skillsRequired: formData.skillsRequired
          .split(",")
          .map((skill) => skill.trim()),
      });
      toast.success(response.data.message);

      setFormData({
        title: "",
        description: "",
        skillsRequired: "",
        budget: "",
        duration: "",
        category: "",
      });

      onClose();
      setTimeout(() => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-4">Post a new job</h2>

      <form onSubmit={handleJobSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Job Title</label>
          <input
            type="text"
            name="title"
            className="w-full p-2 border rounded-lg"
            placeholder="e.g. Build a MERN website"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            className="w-full p-2 border rounded-lg"
            rows="4"
            placeholder="Describe what you need done..."
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Skills Required */}
        <div>
          <label className="block mb-1 font-medium">Skills Required</label>
          <input
            type="text"
            name="skillsRequired"
            className="w-full p-2 border rounded-lg"
            placeholder="e.g. React, Node.js, Tailwind, MongoDB"
            value={formData.skillsRequired}
            onChange={handleChange}
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Add comma-separated skills.
          </p>
        </div>

        {/* Duration */}
        <div>
          <label className="block mb-1 font-medium">Duration</label>
          <select
            name="duration"
            className="w-full p-2 border rounded-lg"
            value={formData.duration}
            onChange={handleChange}
            required
          >
            <option value="">Select duration</option>
            <option value="1-week">1 Week</option>
            <option value="2-weeks">2 Weeks</option>
            <option value="1-month">1 Month</option>
            <option value="3-months">3 Months</option>
            <option value="6-months">6 Months</option>
          </select>
        </div>

        {/* Budget */}
        <div>
          <label className="block mb-1 font-medium">Budget (Rs.)</label>
          <input
            type="number"
            name="budget"
            className="w-full p-2 border rounded-lg"
            placeholder="e.g. 200"
            value={formData.budget}
            onChange={handleChange}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <input
            type="text"
            name="category"
            className="w-full p-2 border rounded-lg"
            placeholder="e.g. Web Development"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit */}
        <button
          accessKey=""
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded-lg font-semibold hover:bg-indigo-700"
        >
          <span accessKey="">Post Job</span>
        </button>
      </form>
    </div>
  );
}

export default JobPostForm;

import React, { useState } from "react";
import { getJobById } from "../services/jobServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setJob } from "../features/job/jobSlice";
import Modal from "./Modal";
import JobDetails from "./JobDetails";

function JobPost({ job }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const viewJobDetails = async (id) => {
    try {
      const res = await getJobById(id);
      dispatch(setJob(res.data));
      setOpen(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="border rounded-lg p-5 my-10 shadow-sm bg-white hover:shadow-md transition">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>

      {/* Category */}
      <p className="text-sm text-gray-500">{job.category}</p>

      {/* Description
      <p className="mt-2 text-gray-700 line-clamp-2">{job.description}</p> */}

      {/* Skills */}
      <div className="mt-3 flex flex-wrap gap-2">
        {job.skillsRequired.length > 0 &&
          job.skillsRequired.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-indigo-200 text-indigo-700 rounded-md"
            >
              {skill.trim()}
            </span>
          ))}
      </div>

      {/* Budget + Duration */}
      <div className="mt-4 flex justify-between text-gray-800">
        <span className="font-semibold">£{job.budget}</span>
        <span>{job.duration}</span>
      </div>

      {/* Status */}
      <p className="mt-2 text-sm">
        <span className="font-medium">Status: </span>
        <span className="text-green-600">{job.status || "Open"}</span>
      </p>

      {/* Buttons */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => viewJobDetails(job._id)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          View
        </button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <JobDetails />
        </Modal>
        <button className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Edit
        </button>
        <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  );
}

export default JobPost;

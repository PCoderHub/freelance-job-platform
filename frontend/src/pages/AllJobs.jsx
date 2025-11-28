import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { getAllJobs } from "../services/jobServices";
import Masonry from "@mui/lab/Masonry";

function AllJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await getAllJobs();
        setJobs([...response.data]);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getJobs();
  }, []);
  return (
    <div className="max-w-6xl mx-auto p-6 mt-6 overflow-y-auto">
      <h2 className="text-3xl font-bold text-indigo-700 text-center mx-auto mb-3">
        Browse Jobs
      </h2>
      <Masonry columns={2} spacing={2}>
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </Masonry>
    </div>
  );
}

export default AllJobs;

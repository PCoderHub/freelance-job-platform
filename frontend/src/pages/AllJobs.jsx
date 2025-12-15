import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { getAllJobsForFreelancer } from "../services/jobServices";
import Masonry from "@mui/lab/Masonry";
import { useMediaQuery, useTheme } from "@mui/material";

function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isMd = useMediaQuery(theme.breakpoints.between("sm", "lg"));

  const columns = isXs ? 1 : isMd ? 2 : 3;

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await getAllJobsForFreelancer();
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
      <h2 className="text-3xl font-bold text-indigo-700 text-center mx-auto mb-10">
        Browse Jobs
      </h2>
      <Masonry columns={columns} spacing={2}>
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </Masonry>
    </div>
  );
}

export default AllJobs;

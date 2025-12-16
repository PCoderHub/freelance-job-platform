import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import JobPost from "../components/JobPost";
import Modal from "../components/Modal";
import JobPostForm from "../components/JobPostForm";
import { getClientJobs } from "../services/clientServices";
import Masonry from "@mui/lab/Masonry";
import { useMediaQuery, useTheme } from "@mui/material";

function MyJobPosts() {
  const [open, setOpen] = useState(false);
  const [clientJobs, setClientJobs] = useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const columns = isMobile ? 1 : 2;

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getClientJobs();
        setClientJobs([...res.data]);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="relative p-5 mx-auto my-3 w-4/5">
      <div className="absolute right-5">
        <button
          accessKey=""
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white py-3 px-5 rounded-md shadow-md flex justify-around font-semibold"
        >
          <IoMdAdd className="text-xl" />
          Post a requirement
        </button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <JobPostForm onClose={() => setOpen(false)} />
      </Modal>
      <div className="">
        <h2 className="my-15 font-bold text-2xl text-center text-indigo-700">
          My Job posts
        </h2>
        {clientJobs.length > 0 ? (
          <Masonry columns={columns} spacing={2}>
            {clientJobs.length > 0 &&
              clientJobs.map((job) => <JobPost key={job._id} job={job} />)}
          </Masonry>
        ) : (
          <div className="text-center text-gray-500 font-semibold text-lg">
            No job posts yet
          </div>
        )}
      </div>
    </div>
  );
}

export default MyJobPosts;

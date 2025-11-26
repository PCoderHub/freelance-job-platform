import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import JobPost from "../components/JobPost";
import Modal from "../components/Modal";
import JobPostForm from "../components/JobPostForm";
import { getClientJobs } from "../services/jobServices";

function MyJobPosts() {
  const [open, setOpen] = useState(false);
  const [clientJobs, setClientJobs] = useState([]);

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
    <div className="relative p-5 mx-auto my-5 w-4/5">
      <div className="absolute right-5">
        <button
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
      <div className="h-[75vh] overflow-y-auto ">
        <h2 className="mt-20 font-bold text-2xl text-center text-indigo-700">
          My Job posts
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {clientJobs.length > 0 &&
            clientJobs.map((job) => <JobPost key={job._id} job={job} />)}
        </div>
      </div>
    </div>
  );
}

export default MyJobPosts;

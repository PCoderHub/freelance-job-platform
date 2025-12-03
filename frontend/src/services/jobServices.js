import api from "./api";

export const createJob = (job) => api.post("/job/", job);

export const getClientJobs = () => api.get("/job/client");

export const getJobById = (id) => api.get(`/job/${id}`);

export const getAllJobs = () => api.get("/job/");

export const getAllJobsForFreelancer = () => api.get("/job/freelancer");

export const applyToJob = (id, application) =>
  api.post(`/job/${id}/apply`, application);

export const getJobProposals = (id) => api.get(`/job/${id}/proposals`);

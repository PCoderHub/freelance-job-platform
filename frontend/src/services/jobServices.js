import api from "./api";

export const createJob = (job) => api.post("/job/", job);

export const getJobById = (id) => api.get(`/job/${id}`);

export const getAllJobs = () => api.get("/job/");

export const getAllJobsForFreelancer = () => api.get("/job/freelancer");

export const updateJob = (id, job) => api.put(`/job/${id}`, job);

export const deleteJob = (id) => api.delete(`/job/${id}`);

export const applyToJob = (id, application) =>
  api.post(`/job/${id}/apply`, application);

export const getJobProposals = (id) => api.get(`/job/${id}/proposals`);

export const offerToFreelancer = (id, proposalId) =>
  api.put(`/job/${id}/offer`, { proposalId });

import api from "./api";

export const createJob = (job) => api.post("/job/", job);

export const getClientJobs = () => api.get("/job/client");

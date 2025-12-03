import api from "./api";

export const updateFreelancerProfile = (updates) =>
  api.put("/freelancer/update-profile", updates);

export const getFreelancerJobs = () => api.get("/freelancer/my-jobs");

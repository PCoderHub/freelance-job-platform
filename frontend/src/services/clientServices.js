import api from "./api";

export const getDashboardStats = () => api.get("/client/dashboard-stats");

export const updateClientProfile = (updates) =>
  api.put("/client/update-profile", updates);

export const getClientJobs = () => api.get("/client/my-jobs");

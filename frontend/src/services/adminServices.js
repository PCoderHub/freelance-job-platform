import api from "./api";

export const getDashboardStats = () => api.get("/admin/dashboard-stats");

export const getAllUsers = () => api.get("/admin/users");

export const getAllJobs = () => api.get("/admin/jobs");

export const updateUserStatus = (id, isActive) =>
  api.put(`/admin/users/${id}/status`, { isActive });

export const deleteUser = (id) => api.delete(`/admin/users/${id}`);

export const getAllReviews = () => api.get("/review/");

export const deleteJob = (id) => api.delete(`/admin/jobs/${id}`);

import api from "./api";

export const updateFreelancerProfile = (updates) =>
  api.put("/freelancer/update-profile", updates);

export const getFreelancerJobs = () => api.get("/freelancer/my-jobs");

export const getFreelancerProposals = () => api.get(`/freelancer/my-proposals`);

export const acceptOffer = (proposalId) =>
  api.put(`freelancer/proposal/${proposalId}/accept`);

export const declineOffer = (proposalId) =>
  api.put(`freelancer/proposal/${proposalId}/decline`);

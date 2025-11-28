import api from "./api";

export const updateFreelancerProfile = (updates) =>
  api.put("/freelancer/update-profile", updates);

import api from "./api";

export const registerUser = (user) => api.post("/auth/register", user);

export const loginUser = (user) => api.post("/auth/login", user);

export const logoutUser = () => {
  localStorage.removeItem("user");
  return api.get("/auth/logout");
};

export const getMyProfile = () => api.get("/auth/my-profile");

export const updateMyProfile = (updates) =>
  api.put("/auth/update-profile", updates);

import api from "./api";

export const registerUser = (user) => api.post("/auth/register", user);

export const loginUser = (user) => api.post("/auth/login", user);

export const logoutUser = () => api.post("/auth/logout");

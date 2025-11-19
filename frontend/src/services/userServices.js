import api from "./api";

export const registerUser = (user) => api.post("/auth/register", user);

import api from "./api";

export const createReview = (review) => api.post("/review/", review);

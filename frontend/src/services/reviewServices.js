import api from "./api";

export const createReview = (review) => api.post("/review/", review);

export const getReviews = (id) => api.get(`/review/${id}`);

export const getGivenReviews = (id) => api.get(`/review/given/${id}`);

export const updateReview = (id, review) => api.put(`/review/${id}`, review);

export const deleteReview = (id) => api.delete(`/review/${id}`);

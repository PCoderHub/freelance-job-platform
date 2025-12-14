import api from "./api.js";

export const payment = (jobId) => api.post("/payment/pay", { jobId });

export const confirmPayment = (transactionId) =>
  api.post("/payment/confirm", { transactionId });

export const getTransactions = () => api.get("/payment/");

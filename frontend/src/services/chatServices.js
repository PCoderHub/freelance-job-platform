import api from "./api";

export const getChatsByJob = (jobId) => api.get(`/chat/job/${jobId}`);

export const sendMessage = (chatId, text) =>
  api.post(`/chat/${chatId}/message`, { text });

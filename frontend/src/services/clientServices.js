import api from "./api";

export const updateClientProfile = (updates) =>
  api.put("/client/update-profile", updates);

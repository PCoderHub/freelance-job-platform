import api from "./api";

export const uploadProfilePic = (data) =>
  api.post("/upload/profile-pic", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

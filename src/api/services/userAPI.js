import apiClient from "../apiClient.js";

// User API endpoints
export const userAPI = {
  getAll: (params) => apiClient.get("/api/users", { params }),
  getById: (id) => apiClient.get(`/api/users/${id}`),
  update: (id, data) => apiClient.put(`/api/users/${id}`, data),
  delete: (id) => apiClient.delete(`/api/users/${id}`),
  updateAvatar: (id, avatarData) =>
    apiClient.put(`/api/users/${id}/avatar`, avatarData),

  // Profile management
  getProfile: () => apiClient.get("/api/users/profile/me"),
  updateProfile: (data) => apiClient.put("/api/users/profile", data),
};

export default userAPI;

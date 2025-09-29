import apiClient from "../apiClient.js";

// User API endpoints
export const userAPI = {
  getAll: (params) => apiClient.get("/users", { params }),
  getById: (id) => apiClient.get(`/users/${id}`),
  update: (id, data) => apiClient.put(`/users/${id}`, data),
  delete: (id) => apiClient.delete(`/users/${id}`),
  updateAvatar: (id, avatarData) =>
    apiClient.put(`/users/${id}/avatar`, avatarData),

  // Profile management
  getProfile: () => apiClient.get("/users/profile/me"),
  updateProfile: (data) => apiClient.put("/users/profile", data),
};

export default userAPI;

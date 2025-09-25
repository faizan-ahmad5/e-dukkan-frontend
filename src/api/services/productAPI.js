import apiClient from "../apiClient.js";

// Product API endpoints
export const productAPI = {
  getAll: (params) => apiClient.get("/api/products", { params }),
  getById: (id) => apiClient.get(`/api/products/${id}`),
  create: (data) => apiClient.post("/api/products", data),
  update: (id, data) => apiClient.put(`/api/products/${id}`, data),
  delete: (id) => apiClient.delete(`/api/products/${id}`),

  // Image management
  updateImages: (id, images) =>
    apiClient.put(`/api/products/${id}/images`, { images }),
  addImage: (id, imageData) =>
    apiClient.post(`/api/products/${id}/images`, imageData),
  removeImage: (id, imageUrl) =>
    apiClient.delete(
      `/api/products/${id}/images/${encodeURIComponent(imageUrl)}`
    ),
};

export default productAPI;

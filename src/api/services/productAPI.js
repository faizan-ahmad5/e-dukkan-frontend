import apiClient from "../apiClient.js";

// Product API endpoints
export const productAPI = {
  getAll: (params) => apiClient.get("/products", { params }),
  getById: (id) => apiClient.get(`/products/${id}`),
  create: (data) => apiClient.post("/products", data),
  update: (id, data) => apiClient.put(`/products/${id}`, data),
  delete: (id) => apiClient.delete(`/products/${id}`),

  // Image management
  updateImages: (id, images) =>
    apiClient.put(`/products/${id}/images`, { images }),
  addImage: (id, imageData) =>
    apiClient.post(`/products/${id}/images`, imageData),
  removeImage: (id, imageUrl) =>
    apiClient.delete(`/products/${id}/images/${encodeURIComponent(imageUrl)}`),
};

export default productAPI;

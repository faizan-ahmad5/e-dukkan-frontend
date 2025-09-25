import apiClient from "../apiClient.js";

// Order API endpoints
export const orderAPI = {
  create: (orderData) => apiClient.post("/api/orders", orderData),
  getAll: () => apiClient.get("/api/orders"), // Admin can see all, users see their own
  getUserOrders: () => apiClient.get("/api/orders/my-orders"),
  getById: (id) => apiClient.get(`/api/orders/${id}`),
  updateStatus: (id, status) =>
    apiClient.put(`/api/orders/${id}/status`, { status }),
  cancel: (id) => apiClient.put(`/api/orders/${id}/cancel`),
  getStats: () => apiClient.get("/api/orders/stats"), // Admin only
};

export default orderAPI;

import apiClient from "../apiClient.js";

// Order API endpoints
export const orderAPI = {
  // Get all orders for the user
  getOrders: (params = {}) => apiClient.get("/orders", { params }),

  // Get single order by ID
  getOrder: (id) => apiClient.get(`/orders/${id}`),

  // Create new order
  createOrder: (orderData) => apiClient.post("/orders", orderData),

  // Update order status (admin)
  updateOrderStatus: (id, status) =>
    apiClient.patch(`/orders/${id}/status`, { status }),

  // Cancel order
  cancelOrder: (id) => apiClient.patch(`/orders/${id}/cancel`),

  // Get order tracking
  trackOrder: (id) => apiClient.get(`/orders/${id}/tracking`),
};

export default orderAPI;

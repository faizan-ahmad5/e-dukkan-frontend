import apiClient from "../apiClient.js";

// Cart API endpoints
export const cartAPI = {
  getCart: () => apiClient.get("/api/cart"),
  addItem: (productId, quantity = 1) =>
    apiClient.post("/api/cart", { productId, quantity }),
  // Alternative endpoint for adding to cart
  addToCart: (productId, quantity = 1) =>
    apiClient.post("/api/cart/add", { productId, quantity }),
  updateItem: (productData) => apiClient.put("/api/cart", productData),
  removeItem: (productId) => apiClient.delete(`/api/cart/remove/${productId}`),
  clearCart: () => apiClient.delete("/api/cart/clear"),
};

export default cartAPI;

import apiClient from "../apiClient.js";

// Cart API endpoints
export const cartAPI = {
  getCart: () => apiClient.get("/cart"),
  addItem: (productId, quantity = 1) =>
    apiClient.post("/cart", { productId, quantity }),
  // Alternative endpoint for adding to cart
  addToCart: (productId, quantity = 1) =>
    apiClient.post("/cart/add", { productId, quantity }),
  updateItem: (productData) => apiClient.put("/cart", productData),
  removeItem: (productId) => apiClient.delete(`/cart/remove/${productId}`),
  clearCart: () => apiClient.delete("/cart/clear"),
};

export default cartAPI;

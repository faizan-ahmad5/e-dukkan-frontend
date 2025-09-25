import apiClient from "../apiClient.js";

// Wishlist API endpoints
export const wishlistAPI = {
  get: () => apiClient.get("/api/wishlist"),
  add: (productId) => apiClient.post("/api/wishlist", { productId }),
  // Alternative endpoint for adding to wishlist
  addToWishlist: (productId) =>
    apiClient.post("/api/wishlist/add", { productId }),
  remove: (productId) => apiClient.delete(`/api/wishlist/remove/${productId}`),
  clear: () => apiClient.delete("/api/wishlist/clear"),
  moveToCart: (productId) =>
    apiClient.post("/api/wishlist/move-to-cart", { productId }),
  getStats: () => apiClient.get("/api/wishlist/stats"),
  checkProduct: (productId) =>
    apiClient.get(`/api/wishlist/check/${productId}`),
  checkMultiple: (productIds) =>
    apiClient.post("/api/wishlist/check-multiple", { productIds }),
};

export default wishlistAPI;

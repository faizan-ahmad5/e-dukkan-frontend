import apiClient from "../apiClient.js";

// Wishlist API endpoints
export const wishlistAPI = {
  get: () => apiClient.get("/wishlist"),
  add: (productId) => apiClient.post("/wishlist", { productId }),
  // Alternative endpoint for adding to wishlist
  addToWishlist: (productId) =>
    apiClient.post("/wishlist/add", { productId }),
  remove: (productId) => apiClient.delete(`/api/wishlist/remove/${productId}`),
  clear: () => apiClient.delete("/wishlist/clear"),
  moveToCart: (productId) =>
    apiClient.post("/wishlist/move-to-cart", { productId }),
  getStats: () => apiClient.get("/wishlist/stats"),
  checkProduct: (productId) =>
    apiClient.get(`/api/wishlist/check/${productId}`),
  checkMultiple: (productIds) =>
    apiClient.post("/wishlist/check-multiple", { productIds }),
};

export default wishlistAPI;

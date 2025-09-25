import apiClient from "../apiClient.js";

// Review API endpoints
export const reviewAPI = {
  create: (reviewData) => apiClient.post("/api/reviews", reviewData),
  getByProduct: (productId) =>
    apiClient.get(`/api/reviews/product/${productId}`),
  getUserReviews: () => apiClient.get("/api/reviews/my-reviews"),
  getAll: () => apiClient.get("/api/reviews"), // Admin only
  update: (reviewId, data) => apiClient.put(`/api/reviews/${reviewId}`, data),
  delete: (reviewId) => apiClient.delete(`/api/reviews/${reviewId}`),
  moderate: (reviewId, status) =>
    apiClient.put(`/api/reviews/${reviewId}/moderate`, { status }),
  markHelpful: (reviewId) => apiClient.post(`/api/reviews/${reviewId}/helpful`),
};

export default reviewAPI;

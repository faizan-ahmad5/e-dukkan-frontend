import apiClient from "../apiClient.js";

// Review API endpoints
export const reviewAPI = {
  create: (reviewData) => apiClient.post("/reviews", reviewData),
  getByProduct: (productId) => apiClient.get(`/reviews/product/${productId}`),
  getUserReviews: () => apiClient.get("/reviews/my-reviews"),
  getAll: () => apiClient.get("/reviews"), // Admin only
  update: (reviewId, data) => apiClient.put(`/reviews/${reviewId}`, data),
  delete: (reviewId) => apiClient.delete(`/reviews/${reviewId}`),
  moderate: (reviewId, status) =>
    apiClient.put(`/reviews/${reviewId}/moderate`, { status }),
  markHelpful: (reviewId) => apiClient.post(`/reviews/${reviewId}/helpful`),
};

export default reviewAPI;

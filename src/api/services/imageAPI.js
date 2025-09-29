import apiClient from "../apiClient.js";

// Image upload API endpoints - Fixed paths to match backend routes
export const imageAPI = {
  // Product images
  uploadProductImage: (formData) =>
    apiClient.post("/images/upload/product", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  uploadProductImages: (formData) =>
    apiClient.post("/images/upload/product", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // Avatar images
  uploadAvatar: (formData) =>
    apiClient.post("/images/upload/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // Review images
  uploadReviewImage: (formData) =>
    apiClient.post("/images/upload/review", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  uploadReviewImages: (formData) =>
    apiClient.post("/images/upload/review", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // Image management - Missing endpoints added
  deleteImage: (category, filename) =>
    apiClient.delete(`/api/images/delete/${category}/${filename}`),
  getImageInfo: (category, filename) =>
    apiClient.get(`/api/images/info/${category}/${filename}`),
};

export default imageAPI;

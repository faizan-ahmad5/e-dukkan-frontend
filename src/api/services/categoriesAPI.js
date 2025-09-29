import apiClient from "../apiClient";

// Categories API service
export const categoriesAPI = {
  // Get all categories with optional filters
  getCategories: async (params = {}) => {
    try {
      const response = await apiClient.get("/categories", { params });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  },

  // Get category tree structure
  getCategoryTree: async () => {
    try {
      const response = await apiClient.get("/categories/tree");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch category tree"
      );
    }
  },

  // Get menu categories (for navigation)
  getMenuCategories: async () => {
    try {
      const response = await apiClient.get("/categories/menu");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch menu categories"
      );
    }
  },

  // Get single category by ID
  getCategoryById: async (id) => {
    try {
      const response = await apiClient.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch category"
      );
    }
  },

  // Get category by slug
  getCategoryBySlug: async (slug) => {
    try {
      const response = await apiClient.get(`/categories/slug/${slug}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch category"
      );
    }
  },

  // Get products by category
  getProductsByCategory: async (categoryId, params = {}) => {
    try {
      const response = await apiClient.get(
        `/categories/${categoryId}/products`,
        { params }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  },

  // Get main categories (parent categories only)
  getMainCategories: async () => {
    try {
      const response = await apiClient.get("/categories", {
        params: { parentOnly: true, showInMenu: true },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch main categories"
      );
    }
  },
};

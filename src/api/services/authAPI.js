import apiClient from "../apiClient.js";

// Authentication API endpoints
export const authAPI = {
  login: (credentials) => apiClient.post("/api/auth/login", credentials),
  register: (userData) => apiClient.post("/api/auth/register", userData),
  verifyEmail: (token) => apiClient.get(`/api/auth/verify-email/${token}`),
  resendVerification: (email) =>
    apiClient.post("/api/auth/resend-verification", { email }),
  forgotPassword: (email) =>
    apiClient.post("/api/auth/forgot-password", { email }),
  resetPassword: (token, password) =>
    apiClient.post(`/api/auth/reset-password/${token}`, { password }),
  // Test email functionality - supports both GET and POST
  testEmail: (data) => {
    if (data && (data.sendTestEmail || data.testEmail)) {
      return apiClient.post("/api/auth/test-email", data);
    }
    return apiClient.get("/api/auth/test-email");
  },
};

export default authAPI;

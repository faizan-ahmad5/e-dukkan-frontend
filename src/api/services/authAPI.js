import apiClient from "../apiClient.js";

// Authentication API endpoints
export const authAPI = {
  login: (credentials) => apiClient.post("/auth/login", credentials),
  register: (userData) => apiClient.post("/auth/register", userData),
  verifyEmail: (token) => apiClient.get(`/auth/verify-email/${token}`),
  resendVerification: (email) =>
    apiClient.post("/auth/resend-verification", { email }),
  forgotPassword: (email) => apiClient.post("/auth/forgot-password", { email }),
  resetPassword: (token, password) =>
    apiClient.post(`/auth/reset-password/${token}`, { password }),
  // Test email functionality - supports both GET and POST
  testEmail: (data) => {
    if (data && (data.sendTestEmail || data.testEmail)) {
      return apiClient.post("/auth/test-email", data);
    }
    return apiClient.get("/auth/test-email");
  },
};

export default authAPI;

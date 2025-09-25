import apiClient from "../apiClient.js";

// Payment API endpoints
export const paymentAPI = {
  createPayment: (paymentData) => apiClient.post("/api/payment", paymentData),
};

export default paymentAPI;

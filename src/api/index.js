// Main API exports - Centralized access to all API services
import apiClient from "./apiClient.js";

// Import all API services
import authAPI from "./services/authAPI.js";
import productAPI from "./services/productAPI.js";
import userAPI from "./services/userAPI.js";
import cartAPI from "./services/cartAPI.js";
import orderAPI from "./services/orderAPI.js";
import wishlistAPI from "./services/wishlistAPI.js";
import reviewAPI from "./services/reviewAPI.js";
import paymentAPI from "./services/paymentAPI.js";
import imageAPI from "./services/imageAPI.js";

// Export the base API client
export { apiClient };

// Export all API services
export {
  authAPI,
  productAPI,
  userAPI,
  cartAPI,
  orderAPI,
  wishlistAPI,
  reviewAPI,
  paymentAPI,
  imageAPI,
};

// Default export for convenience
export default {
  auth: authAPI,
  products: productAPI,
  users: userAPI,
  cart: cartAPI,
  orders: orderAPI,
  wishlist: wishlistAPI,
  reviews: reviewAPI,
  payments: paymentAPI,
  images: imageAPI,
};

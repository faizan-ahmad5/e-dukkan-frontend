// API Endpoint Testing Suite
import {
  authAPI,
  productAPI,
  userAPI,
  cartAPI,
  orderAPI,
  wishlistAPI,
  reviewAPI,
  paymentAPI,
  imageAPI,
} from "./index.js";

// API Endpoint Testing Class
export class APITester {
  constructor() {
    this.results = {
      auth: {},
      products: {},
      users: {},
      cart: {},
      orders: {},
      wishlist: {},
      reviews: {},
      payments: {},
      images: {},
    };
  }

  // Test Auth API endpoints
  async testAuthAPI() {
    console.log("🔐 Testing Auth API...");

    try {
      const testEmailResponse = await authAPI.testEmail();
      this.results.auth.testEmail = {
        status: "success",
        statusCode: testEmailResponse.status,
        hasData: !!testEmailResponse.data,
      };
      console.log("  ✅ testEmail - Success");
    } catch (error) {
      this.results.auth.testEmail = {
        status: "error",
        error: error.message,
        statusCode: error.response?.status,
      };
      console.log(`  ❌ testEmail - Error: ${error.message}`);
    }

    try {
      const testEmailPostResponse = await authAPI.testEmail({
        sendTestEmail: true,
      });
      this.results.auth.testEmailPost = {
        status: "success",
        statusCode: testEmailPostResponse.status,
        hasData: !!testEmailPostResponse.data,
      };
      console.log("  ✅ testEmailPost - Success");
    } catch (error) {
      this.results.auth.testEmailPost = {
        status: "error",
        error: error.message,
        statusCode: error.response?.status,
      };
      console.log(`  ❌ testEmailPost - Error: ${error.message}`);
    }
  }

  // Test Product API endpoints
  async testProductAPI() {
    console.log("�️ Testing Product API...");

    try {
      const getAllResponse = await productAPI.getAll();
      this.results.products.getAll = {
        status: "success",
        statusCode: getAllResponse.status,
        hasData: !!getAllResponse.data,
      };
      console.log("  ✅ getAll - Success");
    } catch (error) {
      this.results.products.getAll = {
        status: "error",
        error: error.message,
        statusCode: error.response?.status,
      };
      console.log(`  ❌ getAll - Error: ${error.message}`);
    }

    try {
      const getAllWithParamsResponse = await productAPI.getAll({ limit: 5 });
      this.results.products.getAllWithParams = {
        status: "success",
        statusCode: getAllWithParamsResponse.status,
        hasData: !!getAllWithParamsResponse.data,
      };
      console.log("  ✅ getAllWithParams - Success");
    } catch (error) {
      this.results.products.getAllWithParams = {
        status: "error",
        error: error.message,
        statusCode: error.response?.status,
      };
      console.log(`  ❌ getAllWithParams - Error: ${error.message}`);
    }
  }

  // Test authenticated APIs (these will likely fail without auth tokens)
  async testAuthenticatedAPIs() {
    const apis = {
      users: userAPI,
      cart: cartAPI,
      orders: orderAPI,
      wishlist: wishlistAPI,
      reviews: reviewAPI,
      payments: paymentAPI,
      images: imageAPI,
    };

    for (const [apiName, apiService] of Object.entries(apis)) {
      console.log(`🔒 Testing ${apiName} API (auth required)...`);
      this.results[apiName].note =
        "Requires authentication - endpoints available but not tested";
      this.results[apiName].availableEndpoints = Object.keys(apiService).length;
    }
  }

  // Run all tests
  async runAllTests() {
    console.log("🧪 Starting API Endpoint Tests...\n");

    const startTime = Date.now();

    await this.testAuthAPI();
    await this.testProductAPI();
    await this.testAuthenticatedAPIs();

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`\n✅ API Testing Complete in ${duration}ms`);
    return this.results;
  }

  // Get summary of test results
  getSummary() {
    const summary = {
      totalCategories: Object.keys(this.results).length,
      totalTests: 0,
      successful: 0,
      failed: 0,
      skipped: 0,
    };

    Object.values(this.results).forEach((category) => {
      Object.values(category).forEach((test) => {
        if (typeof test === "object" && test.status) {
          summary.totalTests++;
          if (test.status === "success") summary.successful++;
          else if (test.status === "error") summary.failed++;
        } else {
          summary.skipped++;
        }
      });
    });

    return summary;
  }
}

// Export test runner instance
export const apiTester = new APITester();

// Convenience method to run tests
export const testAllAPIs = () => apiTester.runAllTests();

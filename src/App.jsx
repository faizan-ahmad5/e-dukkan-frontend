import { useState, useEffect } from 'react'
import Header from './components/Header'
import './App.css'

// Import our new modular API structure
import { authAPI, productAPI } from './api/index.js'

function App() {
  const [count, setCount] = useState(0)
  const [apiStatus, setApiStatus] = useState('Testing API connection...')
  const [apiData, setApiData] = useState(null)

  // Test API connection and endpoints on mount
  useEffect(() => {
    const testAPIs = async () => {
      try {
        // Test basic connection with products API
        console.log('🔍 Testing Products API...')
        const productsResponse = await productAPI.getAll()
        
        // Test auth API
        console.log('🔍 Testing Auth API...')
        const authResponse = await authAPI.testEmail()
        
        setApiData({
          products: productsResponse.data,
          authTest: authResponse.data
        })
        setApiStatus('✅ Backend API Connected Successfully!')
        
      } catch (error) {
        setApiStatus(`❌ API Connection Failed: ${error.message}`)
        console.error('API Error:', error)
      }
    }

    testAPIs()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      {/* Main content with proper spacing for fixed header */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Hero Section */}
          <div className="text-center py-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to E-Dukaan
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Your Complete E-Commerce Solution
            </p>
            
            {/* API Status Card */}
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Backend API Status
              </h2>
              <div className={`p-4 rounded-lg ${
                apiStatus.includes('✅') 
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300'
                  : apiStatus.includes('❌')
                  ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'
                  : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
              }`}>
                <p className="font-medium">{apiStatus}</p>
              </div>
              
              {/* API Data Display */}
              {apiData && (
                <div className="mt-6 text-left">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                    API Response Data:
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
                      {JSON.stringify(apiData, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
            
            {/* Demo Counter */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                React Demo Counter
              </h3>
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setCount((count) => count - 1)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg
                           transition-colors duration-200 font-medium"
                >
                  -
                </button>
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {count}
                </span>
                <button
                  onClick={() => setCount((count) => count + 1)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg
                           transition-colors duration-200 font-medium"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Features Grid */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="text-4xl mb-4">🛒</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Shopping Cart
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Seamless shopping experience with persistent cart functionality
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="text-4xl mb-4">💳</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Secure Payments
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Integrated payment processing with multiple payment methods
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Responsive Design
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Optimized for all devices with modern UI/UX principles
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
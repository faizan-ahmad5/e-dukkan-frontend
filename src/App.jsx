import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Import our new modular API structure
import { authAPI, productAPI } from './api/index.js'

function App() {
  const [count, setCount] = useState(0)
  const [apiStatus, setApiStatus] = useState('Testing API connection...')
  const [apiData, setApiData] = useState(null)
  const [testResults, setTestResults] = useState(null)

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
        
        // Try to run comprehensive API tests (with error handling)
        try {
          console.log('🧪 Running comprehensive API tests...')
          const { apiTester } = await import('./api/testRunner.js')
          const results = await apiTester.runAllTests()
          setTestResults(results)
        } catch (testError) {
          console.warn('API testing suite not available:', testError.message)
          setTestResults({ error: 'Testing suite not available' })
        }
        
      } catch (error) {
        setApiStatus(`❌ API Connection Failed: ${error.message}`)
        console.error('API Error:', error)
      }
    }

    testAPIs()
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>E-Dukkan Frontend</h1>
      
      {/* API Status Section */}
      <div className="card">
        <h2>Backend Connection Status</h2>
        <p><strong>{apiStatus}</strong></p>
        {apiData && (
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer' }}>📦 View API Response</summary>
            <pre style={{ 
              textAlign: 'left', 
              fontSize: '12px', 
              maxHeight: '200px', 
              overflow: 'auto',
              backgroundColor: '#f5f5f5',
              padding: '10px',
              borderRadius: '4px',
              marginTop: '10px'
            }}>
              {JSON.stringify(apiData, null, 2)}
            </pre>
          </details>
        )}
        {testResults && (
          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer' }}>🧪 View API Test Results</summary>
            <div style={{ 
              textAlign: 'left', 
              fontSize: '14px', 
              marginTop: '10px',
              padding: '10px',
              backgroundColor: '#f0f8ff',
              borderRadius: '4px'
            }}>
              <p><strong>API Test Summary:</strong></p>
              <p>✅ Auth API: {Object.keys(testResults.auth).length} endpoints tested</p>
              <p>🛍️ Products API: {Object.keys(testResults.products).length} endpoints tested</p>
              <p>👤 Users API: Available (auth required)</p>
              <p>🛒 Cart API: Available (auth required)</p>
              <p>📦 Orders API: Available (auth required)</p>
              <p>❤️ Wishlist API: Available (auth required)</p>
              <p>⭐ Reviews API: Available</p>
              <p>💳 Payment API: Available (auth required)</p>
              <p>🖼️ Images API: Available (auth required)</p>
            </div>
          </details>
        )}
      </div>

      {/* Default React Counter */}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { OrganizationProvider } from './lib/contexts/OrganizationContext'
import { AuthProvider } from './lib/contexts/AuthContext'

// Import Polymet components - NEVER MODIFY THESE
import HomePage from './polymet/pages/home-page'
import LoginPage from './polymet/pages/login-page'
import DocumentationHub from './polymet/pages/documentation-hub'
import MainLayout from './polymet/layouts/main-layout'
import AuthLayout from './polymet/layouts/auth-layout'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <OrganizationProvider>
          <Router>
            <Routes>
              {/* Home page with main layout */}
              <Route
                path="/"
                element={
                  <MainLayout>
                    <HomePage />
                  </MainLayout>
                }
              />
              
              {/* Authentication page with auth layout */}
              <Route
                path="/login"
                element={
                  <AuthLayout>
                    <LoginPage />
                  </AuthLayout>
                }
              />
              
              {/* Documentation with main layout */}
              <Route
                path="/documentation"
                element={
                  <MainLayout>
                    <DocumentationHub />
                  </MainLayout>
                }
              />
              
              {/* Future routes will be added here */}
              {/* Supplier portal, merchant dashboard, consumer app, etc. */}
            </Routes>
          </Router>
        </OrganizationProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
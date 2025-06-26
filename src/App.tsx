import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { OrganizationProvider } from './lib/contexts/OrganizationContext'
import { AuthProvider } from './lib/contexts/AuthContext'

// Import Polymet components - NEVER MODIFY THESE
import HomePage from './polymet/pages/home-page'
import LoginPage from './polymet/pages/login-page'
import DocumentationHub from './polymet/pages/documentation-hub'
import AuthLayout from './polymet/layouts/auth-layout'

// Import header and footer directly for the home page
import Header from './polymet/components/header'
import Footer from './polymet/components/footer'

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
              {/* Home page without container wrapper for full-width sections */}
              <Route
                path="/"
                element={
                  <div className="min-h-screen bg-background">
                    <Header />
                    <HomePage />
                    <Footer />
                  </div>
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
              
              {/* Documentation with header/footer but no container padding */}
              <Route
                path="/documentation"
                element={
                  <div className="min-h-screen bg-background">
                    <Header />
                    <main>
                      <DocumentationHub />
                    </main>
                    <Footer />
                  </div>
                }
              />
              
              {/* Future routes will be added here */}
            </Routes>
          </Router>
        </OrganizationProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App;
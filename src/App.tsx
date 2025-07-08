import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './lib/contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { RoleBasedRouter } from './components/RoleBasedRouter'
import HomePage from './polymet/pages/home-page'
import RegisterPage from './polymet/pages/register-page'
import LoginPage from './polymet/pages/login-page'
import FeaturesPage from './polymet/pages/features-page'
import OrganizationsPage from './polymet/pages/organizations-page'
import PricingPage from './polymet/pages/pricing-page'
import AboutPage from './polymet/pages/about-page'
import ContactPage from './polymet/pages/contact-page'
import NewsPage from './polymet/pages/news-page'
import SupplierDashboard from './polymet/pages/dashboard-supplier'
import MerchantDashboard from './polymet/pages/dashboard-merchant'
import ConsumerDashboard from './polymet/pages/dashboard-consumer'
import UnauthorizedPage from './polymet/pages/unauthorized'
import Header from './polymet/components/header'

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Header />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/organizations" element={<OrganizationsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/news" element={<NewsPage />} />
          
          {/* Protected dashboard routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <RoleBasedRouter />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/dashboard/supplier" 
            element={
              <ProtectedRoute requiredRole="supplier">
                <SupplierDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/dashboard/merchant" 
            element={
              <ProtectedRoute requiredRole="merchant">
                <MerchantDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/dashboard/consumer" 
            element={
              <ProtectedRoute requiredRole="consumer">
                <ConsumerDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Error pages */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
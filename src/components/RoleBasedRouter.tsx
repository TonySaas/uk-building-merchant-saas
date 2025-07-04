import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/lib/contexts/AuthContext'
import { useRoleAccess } from '@/lib/hooks/usePermissions'

interface RoleBasedRouterProps {
  children?: React.ReactNode
}

export function RoleBasedRouter({ children }: RoleBasedRouterProps) {
  const { user, loading, profile } = useAuth()
  const { isSupplier, isMerchant, isConsumer } = useRoleAccess()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!profile) {
    return <Navigate to="/complete-profile" replace />
  }

  // Route to appropriate dashboard based on user role
  if (isSupplier()) {
    return <Navigate to="/dashboard/supplier" replace />
  }

  if (isMerchant()) {
    return <Navigate to="/dashboard/merchant" replace />
  }

  if (isConsumer()) {
    return <Navigate to="/dashboard/consumer" replace />
  }

  // Fallback if no specific role is found
  return <Navigate to="/dashboard" replace />
}
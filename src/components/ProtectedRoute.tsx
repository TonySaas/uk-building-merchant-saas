import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/lib/contexts/AuthContext'
import { usePermissions } from '@/lib/hooks/usePermissions'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermission?: string
  requiredRole?: string
  organizationId?: string
  fallbackPath?: string
}

export function ProtectedRoute({
  children,
  requiredPermission,
  requiredRole,
  organizationId,
  fallbackPath = '/login'
}: ProtectedRouteProps) {
  const { user, loading, profile } = useAuth()
  const { hasPermission, getUserRole } = usePermissions(organizationId)
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />
  }

  if (!profile) {
    return <Navigate to="/complete-profile" state={{ from: location }} replace />
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />
  }

  if (requiredRole) {
    const userRole = getUserRole()
    if (!userRole || userRole.role.name.toLowerCase() !== requiredRole.toLowerCase()) {
      return <Navigate to="/unauthorized" replace />
    }
  }

  return <>{children}</>
}
import { useAuth } from '@/lib/contexts/AuthContext'

/**
 * Hook for checking user permissions within the current or specified organization
 */
export function usePermissions(organizationId?: string) {
  const { hasPermission, currentOrganization, userRoles, getRoleForOrganization } = useAuth()

  const targetOrgId = organizationId || currentOrganization

  return {
    // Check if user has a specific permission
    hasPermission: (permission: string) => hasPermission(permission, targetOrgId),
    
    // Check multiple permissions (user must have ALL)
    hasAllPermissions: (permissions: string[]) => 
      permissions.every(permission => hasPermission(permission, targetOrgId)),
    
    // Check multiple permissions (user must have ANY)
    hasAnyPermission: (permissions: string[]) => 
      permissions.some(permission => hasPermission(permission, targetOrgId)),
    
    // Get user's role in the target organization
    getUserRole: () => targetOrgId ? getRoleForOrganization(targetOrgId) : null,
    
    // Check if user is admin in target organization
    isAdmin: () => {
      const role = targetOrgId ? getRoleForOrganization(targetOrgId) : null
      return role?.role.name === 'Admin' || role?.role.name.includes('admin')
    },
    
    // Check if user has any role in target organization
    hasAccess: () => {
      if (!targetOrgId) return false
      return userRoles.some(role => role.organization_id === targetOrgId)
    },
    
    // Current organization context
    currentOrganization: targetOrgId,
    
    // All user's roles across organizations
    userRoles
  }
}

/**
 * Hook for role-based access control
 */
export function useRoleAccess() {
  const { profile, userRoles, currentOrganization } = useAuth()

  const getCurrentRole = () => {
    if (!currentOrganization) return null
    return userRoles.find(role => role.organization_id === currentOrganization)
  }

  return {
    // User profile information
    profile,
    
    // Current role in active organization
    currentRole: getCurrentRole(),
    
    // Check if user has a specific role in any organization
    hasRole: (roleName: string, organizationId?: string) => {
      if (organizationId) {
        const role = userRoles.find(r => 
          r.organization_id === organizationId && 
          r.role.name.toLowerCase() === roleName.toLowerCase()
        )
        return !!role
      }
      
      return userRoles.some(role => 
        role.role.name.toLowerCase() === roleName.toLowerCase()
      )
    },
    
    // Check user type from profile
    isSupplier: () => profile?.role === 'supplier',
    isMerchant: () => profile?.role === 'merchant', 
    isConsumer: () => profile?.role === 'consumer',
    
    // Get organizations where user has specific role
    getOrganizationsForRole: (roleName: string) => {
      return userRoles
        .filter(role => role.role.name.toLowerCase() === roleName.toLowerCase())
        .map(role => role.organization)
    },
    
    // Get all organizations user has access to
    getAllOrganizations: () => {
      return userRoles.map(role => role.organization)
    }
  }
}

/**
 * Hook for organization management
 */
export function useOrganizationAccess() {
  const { userRoles, currentOrganization, switchOrganization } = useAuth()

  return {
    // Current active organization
    currentOrganization,
    
    // Switch to different organization
    switchOrganization,
    
    // Get all organizations user has access to
    availableOrganizations: userRoles.map(role => ({
      ...role.organization,
      userRole: role.role
    })),
    
    // Check if user can access specific organization
    canAccessOrganization: (organizationId: string) => 
      userRoles.some(role => role.organization_id === organizationId),
    
    // Get user's role in specific organization
    getRoleInOrganization: (organizationId: string) => 
      userRoles.find(role => role.organization_id === organizationId)?.role || null,
    
    // Check if user is admin in any organization
    isAdminAnywhere: () => 
      userRoles.some(role => role.role.name === 'Admin' || role.role.name.includes('admin')),
    
    // Get organizations where user is admin
    getAdminOrganizations: () => 
      userRoles
        .filter(role => role.role.name === 'Admin' || role.role.name.includes('admin'))
        .map(role => role.organization)
  }
}

// Predefined permission constants for type safety
export const PERMISSIONS = {
  // Supplier permissions
  CREATE_OFFERS: 'create_offers',
  EDIT_OFFERS: 'edit_offers',
  DELETE_OFFERS: 'delete_offers',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_PRODUCTS: 'manage_products',
  
  // Merchant permissions
  SELECT_OFFERS: 'select_offers',
  MANAGE_MERCHANT_PROFILE: 'manage_merchant_profile',
  MANAGE_LOCATIONS: 'manage_locations',
  VIEW_RESERVATIONS: 'view_reservations',
  MANAGE_STOCK_STATUS: 'manage_stock_status',
  
  // Consumer permissions
  VIEW_OFFERS: 'view_offers',
  SAVE_OFFERS: 'save_offers',
  MAKE_RESERVATIONS: 'make_reservations',
  WRITE_REVIEWS: 'write_reviews',
  FOLLOW_MERCHANTS: 'follow_merchants',
  
  // Admin permissions
  APPROVE_OFFERS: 'approve_offers',
  MANAGE_USERS: 'manage_users',
  MANAGE_ORGANIZATION: 'manage_organization'
} as const

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS]
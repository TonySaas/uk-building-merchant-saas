import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '../supabase'

interface UserProfile {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  role: string
  company_name: string | null
  phone: string | null
  created_at: string
  updated_at: string
  email_verified: boolean | null
}

interface UserOrganizationRole {
  id: string
  user_id: string
  organization_id: string
  role_id: string
  created_at: string
  organization: {
    id: string
    name: string
    type: string
  }
  role: {
    id: string
    name: string
    description: string | null
  }
}

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  profile: UserProfile | null
  userRoles: UserOrganizationRole[]
  currentOrganization: string | null
  signIn: (email: string, password: string) => Promise<{ error?: AuthError }>
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error?: AuthError }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error?: AuthError }>
  switchOrganization: (organizationId: string) => void
  refreshProfile: () => Promise<void>
  hasPermission: (permission: string, organizationId?: string) => boolean
  getRoleForOrganization: (organizationId: string) => UserOrganizationRole | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [userRoles, setUserRoles] = useState<UserOrganizationRole[]>([])
  const [currentOrganization, setCurrentOrganization] = useState<string | null>(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        loadUserProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event: any, session: Session | null) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        await loadUserProfile(session.user.id)
      } else {
        setProfile(null)
        setUserRoles([])
        setCurrentOrganization(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadUserProfile = async (userId: string) => {
    try {
      // Load user profile
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (profileError) {
        console.error('Error loading profile:', profileError)
      } else {
        setProfile(profileData)
      }

      // Load user organization roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_organization_roles')
        .select(`
          id,
          user_id,
          organization_id,
          role_id,
          created_at,
          organization:organizations(id, name, type),
          role:organization_roles(id, name, description)
        `)
        .eq('user_id', userId)

      if (rolesError) {
        console.error('Error loading user roles:', rolesError)
      } else {
        setUserRoles(rolesData || [])
        // Set default organization if none selected
        if (!currentOrganization && rolesData && rolesData.length > 0) {
          setCurrentOrganization(rolesData[0].organization_id)
        }
      }
    } catch (error) {
      console.error('Error in loadUserProfile:', error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signUp = async (email: string, password: string, metadata?: any) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })
    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    return { error }
  }

  const switchOrganization = (organizationId: string) => {
    // Check if user has access to this organization
    const hasAccess = userRoles.some(role => role.organization_id === organizationId)
    if (hasAccess) {
      setCurrentOrganization(organizationId)
      // Store in localStorage for persistence
      localStorage.setItem('currentOrganization', organizationId)
    } else {
      console.error('User does not have access to organization:', organizationId)
    }
  }

  const refreshProfile = async () => {
    if (user) {
      await loadUserProfile(user.id)
    }
  }

  const hasPermission = (permission: string, organizationId?: string): boolean => {
    const targetOrgId = organizationId || currentOrganization
    if (!targetOrgId || !user) return false

    // This would need to be enhanced to check actual permissions
    // For now, we'll use a basic role-based check
    const userRole = userRoles.find(role => role.organization_id === targetOrgId)
    if (!userRole) return false

    // Permission mapping based on role names
    const permissionMap: Record<string, string[]> = {
      'Supplier': [
        'create_offers', 'edit_offers', 'delete_offers', 'view_analytics', 'manage_products'
      ],
      'Merchant': [
        'select_offers', 'manage_merchant_profile', 'manage_locations', 'view_reservations', 'manage_stock_status'
      ],
      'Consumer': [
        'view_offers', 'save_offers', 'make_reservations', 'write_reviews', 'follow_merchants'
      ],
      'Admin': [
        'create_offers', 'edit_offers', 'delete_offers', 'approve_offers', 'manage_users',
        'manage_organization', 'view_analytics', 'manage_products', 'select_offers',
        'manage_merchant_profile', 'manage_locations', 'view_reservations', 'manage_stock_status',
        'view_offers', 'save_offers', 'make_reservations', 'write_reviews', 'follow_merchants'
      ]
    }

    const rolePermissions = permissionMap[userRole.role.name] || []
    return rolePermissions.includes(permission)
  }

  const getRoleForOrganization = (organizationId: string): UserOrganizationRole | null => {
    return userRoles.find(role => role.organization_id === organizationId) || null
  }

  // Load current organization from localStorage on mount
  useEffect(() => {
    const savedOrganization = localStorage.getItem('currentOrganization')
    if (savedOrganization && userRoles.length > 0) {
      const hasAccess = userRoles.some(role => role.organization_id === savedOrganization)
      if (hasAccess) {
        setCurrentOrganization(savedOrganization)
      }
    }
  }, [userRoles])

  const value = {
    user,
    session,
    loading,
    profile,
    userRoles,
    currentOrganization,
    signIn,
    signUp,
    signOut,
    resetPassword,
    switchOrganization,
    refreshProfile,
    hasPermission,
    getRoleForOrganization,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
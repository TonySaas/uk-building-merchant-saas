import React, { createContext, useContext, useState, useEffect } from 'react'

interface Organization {
  id: string
  name: string
  type: 'wholesaler' | 'buying_group' | 'trade_association'
  description: string
  logo_url?: string
  tagline?: string
  primary_color?: string
  secondary_color?: string
  is_active: boolean
}

interface OrganizationContextType {
  organization: Organization | null
  organizations: Organization[]
  loading: boolean
  setOrganization: (org: Organization) => void
  switchOrganization: (orgId: string) => void
  getOrganizationTheme: (orgId?: string) => {
    primary: string
    secondary: string
    accent: string
  }
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined)

// Default organizations based on the PRD
const DEFAULT_ORGANIZATIONS: Organization[] = [
  {
    id: 'toolbank',
    name: 'Toolbank',
    type: 'wholesaler',
    description: 'UK\'s leading tool wholesaler with "Keeping the Tool Trade Local" ethos',
    logo_url: '/logos/toolbank-logo.png',
    tagline: 'Keeping the Tool Trade Local',
    primary_color: '#3b82f6',
    secondary_color: '#1d4ed8',
    is_active: true,
  },
  {
    id: 'nmbs',
    name: 'NMBS',
    type: 'buying_group',
    description: 'National Merchant Buying Society - 1,250+ merchant members empowering independent merchants',
    logo_url: '/logos/nmbs-logo.png',
    tagline: 'Empowering Independent Merchants',
    primary_color: '#22c55e',
    secondary_color: '#15803d',
    is_active: true,
  },
  {
    id: 'ibc',
    name: 'IBC',
    type: 'buying_group',
    description: 'Independent Builders Merchant Buying Group - UK\'s largest builders\' merchant buying group',
    logo_url: '/logos/ibc-logo.png',
    tagline: 'UK\'s Largest Builders\' Merchant Buying Group',
    primary_color: '#a855f7',
    secondary_color: '#7c3aed',
    is_active: true,
  },
  {
    id: 'bmf',
    name: 'BMF',
    type: 'trade_association',
    description: 'Builders Merchants Federation - Trade association representing 1,020+ companies',
    logo_url: '/logos/bmf-logo.png',
    tagline: 'Representing the Building Materials Industry',
    primary_color: '#f97316',
    secondary_color: '#c2410c',
    is_active: true,
  },
]

const ORGANIZATION_THEMES = {
  toolbank: {
    primary: '#3b82f6',
    secondary: '#1d4ed8',
    accent: '#dbeafe',
  },
  nmbs: {
    primary: '#22c55e',
    secondary: '#15803d',
    accent: '#dcfce7',
  },
  ibc: {
    primary: '#a855f7',
    secondary: '#7c3aed',
    accent: '#fae8ff',
  },
  bmf: {
    primary: '#f97316',
    secondary: '#c2410c',
    accent: '#ffedd5',
  },
  default: {
    primary: '#3b82f6',
    secondary: '#1d4ed8',
    accent: '#dbeafe',
  },
}

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [organizations, _setOrganizations] = useState<Organization[]>(DEFAULT_ORGANIZATIONS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Set default organization (Toolbank)
    const defaultOrg = DEFAULT_ORGANIZATIONS.find(org => org.id === 'toolbank')
    if (defaultOrg) {
      setOrganization(defaultOrg)
      updateDocumentTheme(defaultOrg.id)
    }
    setLoading(false)
  }, [])

  const updateDocumentTheme = (orgId: string) => {
    // Update CSS custom properties for organization theming
    const root = document.documentElement
    root.setAttribute('data-organization', orgId)
    
    const theme = ORGANIZATION_THEMES[orgId as keyof typeof ORGANIZATION_THEMES] || ORGANIZATION_THEMES.default
    root.style.setProperty('--brand-primary', theme.primary)
    root.style.setProperty('--brand-secondary', theme.secondary)
    root.style.setProperty('--brand-accent', theme.accent)
  }

  const switchOrganization = (orgId: string) => {
    const org = organizations.find(o => o.id === orgId)
    if (org) {
      setOrganization(org)
      updateDocumentTheme(orgId)
      
      // Store selection in localStorage for persistence
      localStorage.setItem('selected-organization', orgId)
    }
  }

  const getOrganizationTheme = (orgId?: string) => {
    const id = orgId || organization?.id || 'default'
    return ORGANIZATION_THEMES[id as keyof typeof ORGANIZATION_THEMES] || ORGANIZATION_THEMES.default
  }

  const value = {
    organization,
    organizations,
    loading,
    setOrganization,
    switchOrganization,
    getOrganizationTheme,
  }

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  )
}

export function useOrganization() {
  const context = useContext(OrganizationContext)
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider')
  }
  return context
}
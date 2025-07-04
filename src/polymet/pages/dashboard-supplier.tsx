import React from 'react'
import { useAuth } from '@/lib/contexts/AuthContext'
import { usePermissions, PERMISSIONS } from '@/lib/hooks/usePermissions'
import { useOrganizationAccess } from '@/lib/hooks/usePermissions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUpIcon, 
  PackageIcon, 
  UsersIcon, 
  BarChart3Icon,
  PlusIcon,
  SettingsIcon
} from 'lucide-react'

export default function SupplierDashboard() {
  const { profile } = useAuth()
  const { hasPermission } = usePermissions()
  const { availableOrganizations, currentOrganization } = useOrganizationAccess()

  const stats = [
    {
      title: 'Active Offers',
      value: '24',
      change: '+12%',
      icon: PackageIcon,
      permission: PERMISSIONS.VIEW_ANALYTICS
    },
    {
      title: 'Total Merchants',
      value: '156',
      change: '+8%',
      icon: UsersIcon,
      permission: PERMISSIONS.VIEW_ANALYTICS
    },
    {
      title: 'This Month Revenue',
      value: '£45,678',
      change: '+23%',
      icon: TrendingUpIcon,
      permission: PERMISSIONS.VIEW_ANALYTICS
    },
    {
      title: 'Conversion Rate',
      value: '12.4%',
      change: '+2.1%',
      icon: BarChart3Icon,
      permission: PERMISSIONS.VIEW_ANALYTICS
    }
  ]

  const quickActions = [
    {
      title: 'Create New Offer',
      description: 'Launch a new special offer for merchants',
      icon: PlusIcon,
      permission: PERMISSIONS.CREATE_OFFERS,
      href: '/offers/create'
    },
    {
      title: 'Manage Products',
      description: 'Update your product catalog',
      icon: PackageIcon,
      permission: PERMISSIONS.MANAGE_PRODUCTS,
      href: '/products'
    },
    {
      title: 'View Analytics',
      description: 'See detailed performance metrics',
      icon: BarChart3Icon,
      permission: PERMISSIONS.VIEW_ANALYTICS,
      href: '/analytics'
    },
    {
      title: 'Account Settings',
      description: 'Manage your supplier profile',
      icon: SettingsIcon,
      permission: null,
      href: '/settings'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {profile?.first_name}!
              </h1>
              <p className="text-gray-600">
                Supplier Dashboard - {profile?.company_name}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">
                {availableOrganizations.length} Organizations
              </Badge>
              <Badge variant="secondary">
                {profile?.role}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const canView = !stat.permission || hasPermission(stat.permission)
            const Icon = stat.icon
            
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {canView ? stat.value : '---'}
                      </p>
                      {canView && (
                        <p className="text-sm text-green-600 font-medium">
                          {stat.change} from last month
                        </p>
                      )}
                    </div>
                    <Icon className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action) => {
                const canAccess = !action.permission || hasPermission(action.permission)
                const Icon = action.icon
                
                return (
                  <button
                    key={action.title}
                    disabled={!canAccess}
                    className={`p-4 rounded-lg border-2 border-dashed text-left transition-colors ${
                      canAccess
                        ? 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                        : 'border-gray-200 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <Icon className={`h-6 w-6 mb-2 ${canAccess ? 'text-blue-500' : 'text-gray-400'}`} />
                    <h3 className="font-medium text-gray-900 mb-1">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {action.description}
                    </p>
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Organization Access */}
        <Card>
          <CardHeader>
            <CardTitle>Your Organizations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableOrganizations.map((org) => (
                <div
                  key={org.id}
                  className={`p-4 rounded-lg border ${
                    org.id === currentOrganization
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{org.name}</h3>
                    <Badge variant={org.id === currentOrganization ? 'default' : 'outline'}>
                      {org.userRole.name}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {org.type?.replace('_', ' ')}
                  </p>
                  {org.id === currentOrganization && (
                    <Badge variant="secondary" className="mt-2">
                      Active
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
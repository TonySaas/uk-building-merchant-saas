import React from 'react'
import { useAuth } from '@/lib/contexts/AuthContext'
import { usePermissions, PERMISSIONS } from '@/lib/hooks/usePermissions'
import { useOrganizationAccess } from '@/lib/hooks/usePermissions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ShoppingBagIcon,
  MapPinIcon,
  StarIcon,
  TrendingUpIcon,
  EyeIcon,
  SettingsIcon,
  PlusIcon,
  UsersIcon
} from 'lucide-react'

export default function MerchantDashboard() {
  const { profile } = useAuth()
  const { hasPermission } = usePermissions()
  const { availableOrganizations, currentOrganization } = useOrganizationAccess()

  const stats = [
    {
      title: 'Selected Offers',
      value: '18',
      change: '+6',
      icon: ShoppingBagIcon,
      permission: PERMISSIONS.SELECT_OFFERS
    },
    {
      title: 'Store Locations',
      value: '3',
      change: '+1',
      icon: MapPinIcon,
      permission: PERMISSIONS.MANAGE_LOCATIONS
    },
    {
      title: 'Customer Reviews',
      value: '4.8',
      change: '+0.2',
      icon: StarIcon,
      permission: null
    },
    {
      title: 'Monthly Visitors',
      value: '2,340',
      change: '+18%',
      icon: UsersIcon,
      permission: PERMISSIONS.VIEW_RESERVATIONS
    }
  ]

  const quickActions = [
    {
      title: 'Browse New Offers',
      description: 'Discover special offers from suppliers',
      icon: EyeIcon,
      permission: PERMISSIONS.SELECT_OFFERS,
      href: '/offers/browse'
    },
    {
      title: 'Manage Locations',
      description: 'Update your store information',
      icon: MapPinIcon,
      permission: PERMISSIONS.MANAGE_LOCATIONS,
      href: '/locations'
    },
    {
      title: 'Update Stock Status',
      description: 'Manage product availability',
      icon: ShoppingBagIcon,
      permission: PERMISSIONS.MANAGE_STOCK_STATUS,
      href: '/inventory'
    },
    {
      title: 'Merchant Settings',
      description: 'Configure your merchant profile',
      icon: SettingsIcon,
      permission: PERMISSIONS.MANAGE_MERCHANT_PROFILE,
      href: '/settings'
    }
  ]

  const recentOffers = [
    {
      id: 1,
      title: '20% Off Power Tools',
      supplier: 'DeWalt UK',
      expires: '2024-07-15',
      status: 'active'
    },
    {
      id: 2,
      title: 'Bulk Screws Discount',
      supplier: 'Screwfix Pro',
      expires: '2024-07-20',
      status: 'selected'
    },
    {
      id: 3,
      title: 'Paint & Brushes Bundle',
      supplier: 'Dulux Trade',
      expires: '2024-07-25',
      status: 'pending'
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
                Merchant Dashboard - {profile?.company_name}
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
                          {stat.change} this month
                        </p>
                      )}
                    </div>
                    <Icon className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action) => {
                  const canAccess = !action.permission || hasPermission(action.permission)
                  const Icon = action.icon
                  
                  return (
                    <button
                      key={action.title}
                      disabled={!canAccess}
                      className={`p-4 rounded-lg border-2 border-dashed text-left transition-colors ${
                        canAccess
                          ? 'border-gray-300 hover:border-green-500 hover:bg-green-50'
                          : 'border-gray-200 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <Icon className={`h-6 w-6 mb-2 ${canAccess ? 'text-green-500' : 'text-gray-400'}`} />
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

          {/* Recent Offers */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Offers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOffers.map((offer) => (
                  <div key={offer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{offer.title}</h4>
                      <p className="text-sm text-gray-600">{offer.supplier}</p>
                      <p className="text-xs text-gray-500">Expires: {offer.expires}</p>
                    </div>
                    <Badge 
                      variant={
                        offer.status === 'active' ? 'default' :
                        offer.status === 'selected' ? 'secondary' : 'outline'
                      }
                    >
                      {offer.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

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
                      ? 'border-green-500 bg-green-50'
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
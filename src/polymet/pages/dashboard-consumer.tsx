import React from 'react'
import { useAuth } from '@/lib/contexts/AuthContext'
import { usePermissions, PERMISSIONS } from '@/lib/hooks/usePermissions'
import { useOrganizationAccess } from '@/lib/hooks/usePermissions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  HeartIcon,
  MapPinIcon,
  ShoppingBagIcon,
  StarIcon,
  SearchIcon,
  BookmarkIcon,
  TrendingUpIcon,
  UsersIcon
} from 'lucide-react'

export default function ConsumerDashboard() {
  const { profile } = useAuth()
  const { hasPermission } = usePermissions()
  const { availableOrganizations } = useOrganizationAccess()

  const stats = [
    {
      title: 'Saved Offers',
      value: '12',
      change: '+3',
      icon: HeartIcon,
      permission: PERMISSIONS.SAVE_OFFERS
    },
    {
      title: 'Favorite Merchants',
      value: '8',
      change: '+2',
      icon: UsersIcon,
      permission: PERMISSIONS.FOLLOW_MERCHANTS
    },
    {
      title: 'Reviews Written',
      value: '6',
      change: '+1',
      icon: StarIcon,
      permission: PERMISSIONS.WRITE_REVIEWS
    },
    {
      title: 'Money Saved',
      value: '£234',
      change: '+£45',
      icon: TrendingUpIcon,
      permission: null
    }
  ]

  const quickActions = [
    {
      title: 'Browse Offers',
      description: 'Discover special deals near you',
      icon: SearchIcon,
      permission: PERMISSIONS.VIEW_OFFERS,
      href: '/offers'
    },
    {
      title: 'Find Merchants',
      description: 'Locate merchants in your area',
      icon: MapPinIcon,
      permission: PERMISSIONS.VIEW_OFFERS,
      href: '/merchants'
    },
    {
      title: 'Saved Offers',
      description: 'View your bookmarked deals',
      icon: BookmarkIcon,
      permission: PERMISSIONS.SAVE_OFFERS,
      href: '/saved'
    },
    {
      title: 'Write Reviews',
      description: 'Share your merchant experiences',
      icon: StarIcon,
      permission: PERMISSIONS.WRITE_REVIEWS,
      href: '/reviews'
    }
  ]

  const recentOffers = [
    {
      id: 1,
      title: '15% Off All Paint',
      merchant: 'Home Depot Croydon',
      distance: '1.2 miles',
      expires: '2024-07-15',
      saved: true
    },
    {
      id: 2,
      title: 'Buy 2 Get 1 Free Tools',
      merchant: 'Screwfix Wimbledon',
      distance: '2.4 miles',
      expires: '2024-07-20',
      saved: false
    },
    {
      id: 3,
      title: '20% Off Bathroom Tiles',
      merchant: 'Wickes Kingston',
      distance: '3.1 miles',
      expires: '2024-07-25',
      saved: true
    }
  ]

  const nearbyMerchants = [
    {
      id: 1,
      name: 'Builders Express',
      type: 'Building Supplies',
      rating: 4.8,
      distance: '0.8 miles',
      offers: 5
    },
    {
      id: 2,
      name: 'Tool Station Plus',
      type: 'Tools & Equipment',
      rating: 4.6,
      distance: '1.5 miles',
      offers: 8
    },
    {
      id: 3,
      name: 'Garden & Home',
      type: 'Garden Centre',
      rating: 4.9,
      distance: '2.2 miles',
      offers: 3
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
                Discover great deals from local merchants
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline">
                {availableOrganizations.length} Networks
              </Badge>
              <Badge variant="secondary">
                Consumer
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
                    <Icon className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Quick Actions */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quickActions.map((action) => {
                  const canAccess = !action.permission || hasPermission(action.permission)
                  const Icon = action.icon
                  
                  return (
                    <button
                      key={action.title}
                      disabled={!canAccess}
                      className={`w-full p-4 rounded-lg border-2 border-dashed text-left transition-colors ${
                        canAccess
                          ? 'border-gray-300 hover:border-orange-500 hover:bg-orange-50'
                          : 'border-gray-200 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <Icon className={`h-5 w-5 mb-2 ${canAccess ? 'text-orange-500' : 'text-gray-400'}`} />
                      <h3 className="font-medium text-gray-900 mb-1 text-sm">
                        {action.title}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {action.description}
                      </p>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Offers */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Offers Near You</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOffers.map((offer) => (
                  <div key={offer.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">{offer.title}</h4>
                        {offer.saved && (
                          <HeartIcon className="h-4 w-4 text-red-500 fill-current" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{offer.merchant}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <p className="text-xs text-gray-500 flex items-center">
                          <MapPinIcon className="h-3 w-3 mr-1" />
                          {offer.distance}
                        </p>
                        <p className="text-xs text-gray-500">Expires: {offer.expires}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge variant="outline">
                        View Details
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Nearby Merchants */}
          <Card>
            <CardHeader>
              <CardTitle>Nearby Merchants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nearbyMerchants.map((merchant) => (
                  <div key={merchant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{merchant.name}</h4>
                      <p className="text-sm text-gray-600">{merchant.type}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1">
                          <StarIcon className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs text-gray-600">{merchant.rating}</span>
                        </div>
                        <p className="text-xs text-gray-500">{merchant.distance}</p>
                        <p className="text-xs text-blue-600">{merchant.offers} offers</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Organization Networks */}
          <Card>
            <CardHeader>
              <CardTitle>Your Networks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableOrganizations.map((org) => (
                  <div key={org.id} className="p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{org.name}</h3>
                      <Badge variant="outline">
                        Member
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {org.type?.replace('_', ' ')}
                    </p>
                    <p className="text-xs text-blue-600 mt-2">
                      Access exclusive offers from this network
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
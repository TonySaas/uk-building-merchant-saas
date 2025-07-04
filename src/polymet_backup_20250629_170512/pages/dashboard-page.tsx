import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import RoleBasedDashboard from '@/components/RoleBasedDashboard';
import { getUserOrganizationRoles, type UserOrganizationRole } from '@/lib/auth-functions';

export default function DashboardPage() {
  const { user, profile, signOut } = useAuth();
  const [userRoles, setUserRoles] = useState<UserOrganizationRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserRoles = async () => {
      if (user?.id) {
        try {
          const roles = await getUserOrganizationRoles(user.id);
          setUserRoles(roles);
        } catch (error) {
          console.error('Failed to load user roles:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadUserRoles();
  }, [user?.id]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please log in to access the dashboard.</p>
          <Button onClick={() => window.location.href = '/login'}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">BuildConnect Dashboard</h1>
              <p className="text-gray-600">UK Building Merchant Platform</p>
            </div>
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <RoleBasedDashboard user={user} roles={userRoles} />
    </div>
  );
}
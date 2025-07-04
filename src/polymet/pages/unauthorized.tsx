import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldXIcon, ArrowLeftIcon } from 'lucide-react'
import { useAuth } from '@/lib/contexts/AuthContext'

export default function UnauthorizedPage() {
  const { profile } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <ShieldXIcon className="mx-auto h-16 w-16 text-red-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Access Denied
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            You don't have permission to access this page
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="text-left">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Current Access Level
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                <strong>Role:</strong> {profile?.role || 'Not assigned'}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Account:</strong> {profile?.email}
              </p>
            </div>
          </div>
          
          <div className="text-left">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              What you can do:
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Contact your organization administrator to request access</li>
              <li>• Check if you're logged into the correct account</li>
              <li>• Verify your organization membership status</li>
            </ul>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            to="/dashboard"
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          
          <Link
            to="/contact"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Eye, EyeOff, Building2, ShoppingCart, User, Chrome, Github } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (data: LoginData) => void;
  onForgotPassword: () => void;
  onSocialLogin: (provider: 'google' | 'microsoft' | 'github') => void;
  isLoading?: boolean;
}

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
  organizationContext?: string;
}

const organizationOptions = [
  { id: 'toolbank', name: 'Toolbank', color: 'bg-blue-600' },
  { id: 'nmbs', name: 'NMBS', color: 'bg-green-600' },
  { id: 'ibc', name: 'BMN', color: 'bg-purple-600' },
  { id: 'bmf', name: 'BMF', color: 'bg-orange-600' },
  { id: 'independent', name: 'Independent', color: 'bg-gray-600' }
];

export default function LoginForm({
  onSubmit,
  onForgotPassword,
  onSocialLogin,
  isLoading = false
}: LoginFormProps) {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
    rememberMe: false,
    organizationContext: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const updateFormData = (field: keyof LoginData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectOrgContext = (orgId: string) => {
    const currentContext = formData.organizationContext;
    updateFormData('organizationContext', currentContext === orgId ? '' : orgId);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
        <p className="text-gray-400">Sign in to your BuildConnect account</p>
      </div>

      {/* Organization Context Selection */}
      <div className="mb-6">
        <Label className="block text-sm font-medium text-gray-300 mb-3">
          Organization Context (Optional)
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {organizationOptions.map((org) => {
            const isSelected = formData.organizationContext === org.id;
            return (
              <button
                key={org.id}
                type="button"
                onClick={() => selectOrgContext(org.id)}
                className={`p-2 rounded-md text-sm font-medium transition-all ${
                  isSelected
                    ? `${org.color} text-white`
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {org.name}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Select an organization to see relevant content and features
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <Label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </Label>
          <div className="relative">
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              className="w-full px-3 py-2 pl-10 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your email address"
              autoComplete="email"
            />
            <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          </div>
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div>
          <Label className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </Label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => updateFormData('password', e.target.value)}
              className="w-full px-3 py-2 pr-10 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              checked={formData.rememberMe}
              onCheckedChange={(checked) => updateFormData('rememberMe', checked)}
            />
            <Label htmlFor="rememberMe" className="text-sm text-gray-300">
              Remember me
            </Label>
          </div>
          
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Forgot password?
          </button>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
          </div>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3">
        <Button
          type="button"
          onClick={() => onSocialLogin('google')}
          variant="outline"
          className="w-full flex items-center justify-center px-4 py-2 border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700"
        >
          <Chrome className="w-5 h-5 mr-2" />
          Continue with Google
        </Button>
        
        <Button
          type="button"
          onClick={() => onSocialLogin('microsoft')}
          variant="outline"
          className="w-full flex items-center justify-center px-4 py-2 border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700"
        >
          <div className="w-5 h-5 mr-2 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">M</span>
          </div>
          Continue with Microsoft
        </Button>
        
        <Button
          type="button"
          onClick={() => onSocialLogin('github')}
          variant="outline"
          className="w-full flex items-center justify-center px-4 py-2 border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700"
        >
          <Github className="w-5 h-5 mr-2" />
          Continue with GitHub
        </Button>
      </div>

      {/* Quick Access for Different User Types */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <p className="text-sm text-gray-400 mb-4 text-center">Quick access for:</p>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-3 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer transition-colors">
            <Building2 className="w-6 h-6 text-blue-400 mx-auto mb-1" />
            <p className="text-xs text-gray-300">Suppliers</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer transition-colors">
            <ShoppingCart className="w-6 h-6 text-green-400 mx-auto mb-1" />
            <p className="text-xs text-gray-300">Merchants</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer transition-colors">
            <User className="w-6 h-6 text-purple-400 mx-auto mb-1" />
            <p className="text-xs text-gray-300">Consumers</p>
          </div>
        </div>
      </div>
    </div>
  );
}
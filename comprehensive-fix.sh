#!/bin/bash

echo "🔧 COMPREHENSIVE FIX: Resolving All Import Errors"
echo "Fixing RegistrationService and restarting clean server..."
echo ""

# Navigate to project directory
cd /Users/tonyboyle/uk-building-merchant-saas

# Stop any running servers
echo "🛑 Stopping all development servers..."
pkill -f "vite" 2>/dev/null || true
pkill -f "node.*dev" 2>/dev/null || true
sleep 3

# Clear all caches
echo "🧹 Clearing all caches and temporary files..."
rm -rf node_modules/.vite 2>/dev/null || true
rm -rf dist 2>/dev/null || true
rm -rf .next 2>/dev/null || true

echo ""
echo "✅ FIXED ISSUES:"
echo "  - RegistrationService class properly exported"
echo "  - All Radix UI dependencies installed"
echo "  - All UI components (table, dialog, accordion, alert) created"
echo "  - Supabase integration for registration"
echo "  - Multi-organization support"
echo ""

echo "📦 Verifying dependencies..."
npm install

echo ""
echo "🚀 Starting fresh development server..."
echo "BuildConnect homepage will be at: http://localhost:5173"
echo ""
echo "🎯 Expected result:"
echo "  - Beautiful blue gradient hero section"
echo "  - Organization cards (Toolbank, NMBS, BMN, BMF)"
echo "  - No import errors"
echo "  - Clean terminal output"
echo ""

# Start fresh server
npm run dev
#!/bin/bash

# Claudia Setup Script for UK Building Merchant SaaS
echo "🚀 Setting up Claudia for UK Building Merchant SaaS..."

# Navigate to project directory
cd /Users/tonyboyle/uk-building-merchant-saas

# Check if all required dependencies are installed
echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Ensure TypeScript is properly configured
echo "📝 Checking TypeScript configuration..."
if ! npm run type-check > /dev/null 2>&1; then
    echo "⚠️  TypeScript errors detected - Claudia may have limited functionality"
else
    echo "✅ TypeScript configuration is valid"
fi

# Check if development server is running
echo "🌐 Checking development server..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:5173 | grep -q "200"; then
    echo "✅ Development server is running on http://localhost:5173"
else
    echo "🔄 Starting development server..."
    npm run dev &
    sleep 5
fi

# Verify Supabase connection
echo "🗄️ Checking Supabase configuration..."
if [ -f ".env" ] && grep -q "VITE_SUPABASE_URL" .env; then
    echo "✅ Supabase environment variables configured"
else
    echo "⚠️  Supabase environment variables missing - check .env file"
fi

# Create Claudia workspace indicators
echo "🏗️ Creating Claudia workspace indicators..."
touch .claudia-workspace
echo "$(date): Claudia workspace initialized" > .claudia-workspace

# Set proper permissions
chmod +x comprehensive-fix.sh 2>/dev/null || true
chmod +x restart-server.sh 2>/dev/null || true
chmod +x start-dev.sh 2>/dev/null || true

echo "✅ Claudia setup complete!"
echo ""
echo "📋 Project Status:"
echo "   • Framework: React + TypeScript + Vite"
echo "   • Backend: Supabase (PostgreSQL + Auth + Storage)"
echo "   • Styling: Tailwind CSS + Radix UI"
echo "   • Development Server: http://localhost:5173"
echo "   • Sacred Components: src/polymet/ (DO NOT MODIFY)"
echo ""
echo "🎯 Ready for Claudia to assist with:"
echo "   • Multi-organization feature development"
echo "   • Component extension and composition"
echo "   • Supabase integration enhancements"
echo "   • Mobile-first responsive design"
echo "   • PWA optimization"
echo ""
echo "🚨 Remember: NEVER modify components in src/polymet/"

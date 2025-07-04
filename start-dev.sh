#!/bin/bash

echo "🚀 Starting UK Building Merchant SaaS Development Server"
echo "This will start the homepage that matches your design!"
echo ""

# Navigate to project directory
cd /Users/tonyboyle/uk-building-merchant-saas

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "🎯 Starting development server..."
echo "Your beautiful homepage will be available at: http://localhost:5173"
echo ""
echo "✨ The homepage includes:"
echo "  - Toolbank, NMBS, BMN, BMF organization cards"
echo "  - Beautiful hero section with BuildConnect branding"
echo "  - Organization selection interface"
echo "  - Supplier and merchant selection components"
echo ""
echo "🚨 Remember: This uses the existing Polymet components"
echo "   NEVER modify the components in /src/polymet/"
echo ""

# Start the development server
npm run dev
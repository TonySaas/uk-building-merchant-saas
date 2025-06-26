#!/bin/bash

echo "🔄 Restarting BuildConnect Development Server"
echo "All dependencies are now installed!"
echo ""

# Navigate to project directory
cd /Users/tonyboyle/uk-building-merchant-saas

# Kill existing server
echo "🛑 Stopping existing server..."
pkill -f "vite.*dev" 2>/dev/null || true
sleep 2

# Clear any cached modules
echo "🧹 Clearing Vite cache..."
rm -rf node_modules/.vite 2>/dev/null || true

echo ""
echo "✅ Fixed Issues:"
echo "  - Installed @radix-ui/react-dialog"
echo "  - Installed @radix-ui/react-accordion" 
echo "  - All UI components now available"
echo ""

echo "🚀 Starting fresh development server..."
echo "Homepage will be available at: http://localhost:5173"
echo ""

# Start fresh server
npm run dev
#!/bin/bash

echo "🔧 Fixing Missing UI Components for BuildConnect Homepage"
echo "Installing missing dependencies and restarting development server..."
echo ""

# Navigate to project directory
cd /Users/tonyboyle/uk-building-merchant-saas

# Stop any running dev servers
echo "🛑 Stopping existing development servers..."
pkill -f "vite.*dev" 2>/dev/null || true
sleep 2

# Install new dependencies
echo "📦 Installing missing Radix UI dependencies..."
npm install @radix-ui/react-accordion@^1.1.2 @radix-ui/react-dialog@^1.0.5

echo ""
echo "✅ All missing UI components have been created:"
echo "  - Table component"
echo "  - Dialog component" 
echo "  - Accordion component"
echo "  - Alert component"
echo ""

echo "✅ Dependencies added:"
echo "  - @radix-ui/react-accordion"
echo "  - @radix-ui/react-dialog"
echo ""

echo "🎯 Starting development server..."
echo "Your beautiful BuildConnect homepage will be at: http://localhost:5173"
echo ""

# Start the development server
npm run dev
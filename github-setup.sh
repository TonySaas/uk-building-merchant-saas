#!/bin/bash

# GitHub Setup Script for UK Building Merchant SaaS
# Run this script to push your project to GitHub

echo "🚀 Setting up GitHub repository for UK Building Merchant SaaS"
echo "Repository: https://github.com/TonySaas/uk-building-merchant-saas"
echo ""

# Navigate to project directory
cd /Users/tonyboyle/uk-building-merchant-saas

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in the correct project directory"
    echo "Please run this script from the uk-building-merchant-saas folder"
    exit 1
fi

echo "📁 Current directory: $(pwd)"
echo ""

# Show current git status
echo "📊 Current Git Status:"
git status --short
echo ""

# Show current remote
echo "🔗 Current Remote:"
git remote -v
echo ""

# Push to GitHub (this will prompt for authentication)
echo "🚀 Pushing to GitHub..."
echo "You may be prompted to enter your GitHub username and password/token"
echo ""

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Success! Your project has been pushed to GitHub"
    echo "🌐 View it at: https://github.com/TonySaas/uk-building-merchant-saas"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Visit your repository on GitHub"
    echo "2. Set up Supabase and add credentials to .env.local"
    echo "3. Open the project in Windsurf for Claude Code development"
    echo "4. Follow the rules in /docs/claude-code-rules.md"
else
    echo ""
    echo "❌ Push failed. You may need to:"
    echo "1. Configure Git authentication:"
    echo "   git config --global user.name 'Your Name'"
    echo "   git config --global user.email 'your.email@example.com'"
    echo ""
    echo "2. Use GitHub CLI (if installed):"
    echo "   gh auth login"
    echo ""
    echo "3. Or use a Personal Access Token:"
    echo "   https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
fi
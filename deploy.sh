#!/bin/bash

# LaunchOS Frontend Deployment Script
echo "🚀 Starting deployment process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run type checking
echo "🔍 Running type check..."
npm run type-check
if [ $? -ne 0 ]; then
    echo "❌ Type check failed. Please fix the errors before deploying."
    exit 1
fi

# Run linting
echo "🧹 Running linting..."
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Linting failed. Please fix the errors before deploying."
    exit 1
fi

# Build the project
echo "🏗️ Building project..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors before deploying."
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📁 Build output is in the 'dist' folder"
echo ""
echo "🚀 To deploy to Vercel:"
echo "   1. Install Vercel CLI: npm i -g vercel"
echo "   2. Run: vercel --prod"
echo ""
echo "🌐 Or connect your GitHub repo to Vercel for automatic deployments!" 
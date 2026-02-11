#!/bin/bash

# Deploy script for Takaleed to Railway
# Usage: ./deploy-railway.sh

echo "🚀 Deploying Takaleed to Railway..."

# Check if railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

# Check login status
if ! railway login --whoami &> /dev/null; then
    echo "🔐 Please login to Railway:"
    railway login
fi

# Create or get project
railway init --name takaleed-morocco

# Deploy
railway up --detach

echo "✅ Takaleed deployed!"
echo "🌐 Your app will be available at the Railway URL"

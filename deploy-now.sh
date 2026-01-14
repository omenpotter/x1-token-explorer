#!/bin/bash

echo "╔════════════════════════════════════════════════════════╗"
echo "║   X1 TOKEN EXPLORER - INSTANT DEPLOYMENT               ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - X1 Token Explorer"
fi

echo ""
echo "Choose deployment option:"
echo ""
echo "1. 🚀 Deploy to Vercel (Instant, FREE)"
echo "2. 🌐 Deploy to Netlify (Instant, FREE)"
echo "3. 📱 Deploy to GitHub Pages"
echo "4. 📦 Create deployment package"
echo ""

read -p "Enter option (1-4): " option

case $option in
    1)
        echo ""
        echo "🚀 Deploying to Vercel..."
        echo ""
        if ! command -v vercel &> /dev/null; then
            echo "Installing Vercel CLI..."
            npm install -g vercel
        fi
        npm run build
        vercel --prod
        ;;
    2)
        echo ""
        echo "🌐 Deploying to Netlify..."
        echo ""
        if ! command -v netlify &> /dev/null; then
            echo "Installing Netlify CLI..."
            npm install -g netlify-cli
        fi
        npm run build
        netlify deploy --prod --dir=build
        ;;
    3)
        echo ""
        echo "📱 Deploying to GitHub Pages..."
        npm install --save-dev gh-pages
        npm run build
        npx gh-pages -d build
        ;;
    4)
        echo ""
        echo "📦 Creating deployment package..."
        npm run build
        cd build
        zip -r ../x1-explorer-deployment.zip .
        cd ..
        echo "✅ Created: x1-explorer-deployment.zip"
        ;;
esac

echo ""
echo "✅ Deployment complete!"

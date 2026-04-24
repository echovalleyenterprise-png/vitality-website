#!/bin/bash
# Vitality Wellness — Start Public Website
# Double-click this file to install dependencies and launch the dev server

cd "$(dirname "$0")"

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║     Vitality Wellness — Public Website       ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

# Create .env if it doesn't exist
if [ ! -f .env ]; then
  echo "→ Creating .env from .env.example..."
  cp .env.example .env
  echo "  ✓ .env created (edit it to add your CRM URL)"
fi

# Install dependencies if needed
if [ ! -d node_modules ]; then
  echo "→ Installing dependencies (first run — takes ~1 minute)..."
  npm install
  echo "  ✓ Dependencies installed"
else
  echo "→ Dependencies already installed"
fi

echo ""
echo "→ Starting development server on http://localhost:5174"
echo "  (Make sure the CRM server is also running on port 3001)"
echo ""
echo "  Press Ctrl+C to stop"
echo ""

npm run dev

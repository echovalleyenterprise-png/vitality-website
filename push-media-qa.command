#!/bin/bash
cd "$(dirname "$0")"

echo "→ Configuring git..."
git config user.email "viandrewp@gmail.com"
git config user.name "Andrew"

echo "→ Staging changes..."
git add vercel.json src/pages/Home.jsx src/pages/Contact.jsx src/pages/GiftCards.jsx

echo "→ Committing..."
git commit -m "feat: add stock media, photo headers, and fix production API proxy

- Add video hero background (Pixabay CDN) to Home page
- Add photo parallax strip between Featured Drips and Why Vitality
- Add background photo to Contact page header
- Add background photo to Gift Cards page header
- Create vercel.json with API rewrite proxy to CRM backend
  (fixes /api/public/* calls 404ing on production Vercel site)"

echo "→ Pushing to GitHub..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/echovalleyenterprise-png/vitality-website.git
git push -u origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Pushed! Vercel will auto-deploy in ~30 seconds."
  echo "   Live site: https://vitality-website-sepia.vercel.app"
else
  echo "❌ Push failed."
fi

echo ""
read -p "Press Enter to close..."

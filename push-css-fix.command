#!/bin/bash
cd "$(dirname "$0")"

echo "→ Configuring git..."
git config user.email "viandrewp@gmail.com"
git config user.name "Andrew"

echo "→ Staging changes..."
git add src/index.css src/components/Navbar.jsx src/pages/Home.jsx

echo "→ Committing..."
git commit -m "feat: new editorial hero, fix all Tailwind @apply CSS errors

- New left-aligned hero: stacked headline, script accent, V watermark
- Stats strip at hero bottom (500+ clients, 7 days, etc.)
- Fixed all Tailwind @apply pseudo-class errors (hover/focus with custom colors)
- Updated Navbar CRM URL fallback to vitality-crm.vercel.app"

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

#!/bin/bash
cd "$(dirname "$0")"

echo "→ Adding GitHub remote..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/echovalleyenterprise-png/vitality-website.git

echo "→ Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Pushed! Opening Vercel to deploy..."
  open "https://vercel.com/new/git/external?repository-url=https://github.com/echovalleyenterprise-png/vitality-website"
else
  echo "❌ Push failed — you may need to authenticate with GitHub first."
fi

echo ""
read -p "Press Enter to close..."

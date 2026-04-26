#!/bin/bash
cd "$(dirname "$0")"

# Remove stale lock if present
rm -f .git/index.lock .git/HEAD.lock .git/refs/remotes/origin/main.lock

echo "→ Staging all changes..."
git config user.email "echovalleyenterprise@gmail.com"
git config user.name "Vitality Deploy"
git add -A

echo "→ Committing..."
git commit -m "fix: show Consult instead of \$0 for consultation-required services in booking" --allow-empty

echo "→ Setting remote..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/echovalleyenterprise-png/vitality-website.git

echo "→ Pushing to GitHub (Vercel will auto-deploy)..."
git push -u origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Pushed! Vercel is now deploying..."
  open "https://vercel.com/echovalleyenterprise-2007s-projects/vitality-website"
else
  echo ""
  echo "❌ Push failed — you may need to authenticate with GitHub first."
  echo "   Try running: git push -u origin main"
fi

echo ""
read -p "Press Enter to close..."

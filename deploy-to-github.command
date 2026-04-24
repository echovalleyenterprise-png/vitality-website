#!/bin/bash
# Full deploy: commit everything and push to GitHub
cd "$(dirname "$0")"

echo "→ Clearing any stale git locks..."
find .git -name "*.lock" -delete 2>/dev/null

echo "→ Configuring git identity..."
git config user.email "viandrewp@gmail.com"
git config user.name "Andrew"

echo "→ Staging all files..."
git add .

echo "→ Committing..."
git commit -m "feat: full website redesign — black/gold/grey theme

- New black, gold & grey color scheme
- Real service menu: 6 infusion drips with pricing
- Signature therapy packages with features and pricing
- Additional services, HydraFacials, Microneedling, GLP-1 etc.
- Real About Us copy from brochure
- New client promo banner: 20% off, code Vitalitymedspa
- @vitalitywellnessmedspa social links"

echo ""
echo "✅ Committed!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " NOW: Create a GitHub repo, then paste your remote URL below"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo " 1. Go to: https://github.com/new"
echo " 2. Name it: vitality-website"
echo " 3. Make it Private or Public (your choice)"
echo " 4. Do NOT initialize with README"
echo " 5. Copy the HTTPS URL shown on the next page"
echo ""
read -p "Paste your GitHub repo URL here and press Enter: " REPO_URL

if [ -z "$REPO_URL" ]; then
  echo "❌ No URL entered. Run this script again after creating the repo."
  read -p "Press Enter to close..."
  exit 1
fi

echo ""
echo "→ Adding remote origin..."
git remote add origin "$REPO_URL"

echo "→ Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Pushed to GitHub!"
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo " NEXT: Deploy to Vercel"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo " 1. Go to: https://vercel.com/new"
  echo " 2. Import your vitality-website repo"
  echo " 3. Framework: Vite"
  echo " 4. Click Deploy — done!"
  echo ""
  open "https://vercel.com/new"
else
  echo "❌ Push failed. Check the URL and try again."
fi

echo ""
read -p "Press Enter to close..."

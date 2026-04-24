#!/bin/bash
# Initialize git repo and commit all website files
cd "$(dirname "$0")"

echo "→ Initializing git repository..."
git init
git checkout -b main

echo "→ Staging all files..."
git add .

echo "→ Committing..."
git commit -m "feat: full website redesign — black/gold/grey theme

- New black, gold & grey color scheme (replaces warm brown)
- Real service menu from brochure: 6 infusion drips with pricing
- Signature therapy packages with features and pricing
- Additional services section (HydraFacials, Microneedling, GLP-1, etc.)
- Real About Us copy from brochure
- New client promo banner: 20% off, code Vitalitymedspa
- Instagram handle @vitalitywellnessmedspa in footer/home
- Premium card design with hover effects
- Testimonials with star ratings
- Location/hours strip on home page
- Improved Navbar with black frosted glass scroll effect"

echo ""
echo "✅ Repository initialized and committed!"
echo ""
echo "NEXT STEPS TO DEPLOY:"
echo "1. Go to github.com → New Repository → name it 'vitality-website'"
echo "2. Copy the remote URL (e.g. https://github.com/YOUR-USER/vitality-website.git)"
echo "3. Run these two commands in Terminal:"
echo "   git remote add origin <YOUR-REPO-URL>"
echo "   git push -u origin main"
echo "4. Connect the repo to Vercel at vercel.com → New Project"
echo ""
read -p "Press Enter to close..."

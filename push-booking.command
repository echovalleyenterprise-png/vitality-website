#!/bin/bash
cd "$(dirname "$0")"

echo "→ Configuring git..."
git config user.email "viandrewp@gmail.com"
git config user.name "Andrew"

echo "→ Staging changes..."
git add src/pages/Booking.jsx

echo "→ Committing..."
git commit -m "feat: redesign booking flow for smooth CRM-integrated experience

- Add photo header (consistent with all other pages)
- Add persistent booking summary bar (shows service/provider/date across steps)
- Add 'No Preference / Any Provider' option at Step 1
- Group services by category (IV Infusion, Signature Package, etc.)
- Better loading skeleton and empty states with phone fallback
- Improved slot grid (3→5 cols on desktop)
- Auth step: cleaner tab UI with helpful placeholder text
- Confirm screen: polished success card with full appointment details
- Phone fallback footer: 'Prefer to book by phone? Call us...'
- Resolve 'any provider' to first real provider at booking time"

echo "→ Pushing to GitHub..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/echovalleyenterprise-png/vitality-website.git
git push -u origin main

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Pushed! Vercel will auto-deploy in ~30 seconds."
  echo "   Live site: https://vitality-website-sepia.vercel.app/booking"
else
  echo "❌ Push failed."
fi

echo ""
read -p "Press Enter to close..."

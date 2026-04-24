import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-brand-black border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div className="md:col-span-1">
            <Logo size="md" />
            <p className="font-body text-sm text-brand-grey mt-5 leading-relaxed">
              Where modern wellness meets intentional care. Look well. Feel well. Live well.
            </p>
            {/* Social */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com/vitalitywellnessmedspa"
                target="_blank"
                rel="noreferrer"
                className="text-brand-grey hover:text-brand-gold transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com/vitalitywellnessmedspa"
                target="_blank"
                rel="noreferrer"
                className="text-brand-grey hover:text-brand-gold transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase text-brand-gold mb-5">Infusion Services</h4>
            <ul className="space-y-2.5">
              {['Focus Flow', 'Ignite Vitality', 'Resilience Drip', 'Glow Theory', 'Hydra Luxe', 'Renewal Therapy'].map(s => (
                <li key={s}>
                  <Link to="/services" className="font-body text-sm text-brand-grey hover:text-brand-cream transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase text-brand-gold mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/booking',      label: 'Book an Appointment' },
                { to: '/services',     label: 'Our Services' },
                { to: '/gift-cards',   label: 'Purchase Gift Cards' },
                { to: '/portal/login', label: 'Patient Portal' },
                { to: '/about',        label: 'About Us' },
                { to: '/contact',      label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="font-body text-sm text-brand-grey hover:text-brand-cream transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs tracking-widest uppercase text-brand-gold mb-5">Contact</h4>
            <address className="not-italic space-y-3">
              <p className="font-body text-sm text-brand-grey leading-relaxed">
                501 N. Dixie Hwy<br />Hallandale Beach, FL 33039
              </p>
              <a href="tel:+15614923641" className="block font-body text-sm text-brand-grey hover:text-brand-cream transition-colors">
                (561) 492-3641
              </a>
              <a href="mailto:info@vitalitywellmedspa.com" className="block font-body text-sm text-brand-grey hover:text-brand-cream transition-colors">
                info@vitalitywellmedspa.com
              </a>
            </address>
            <div className="mt-5">
              <h5 className="font-body text-xs tracking-widest uppercase text-brand-gold/60 mb-2">Hours</h5>
              <p className="font-body text-xs text-brand-grey leading-relaxed">
                Mon–Fri: 8am – 8pm<br />
                Saturday: 9am – 7pm<br />
                Sunday: 9am – 8pm
              </p>
            </div>
            <Link to="/booking" className="btn-gold mt-6 text-xs px-6 py-2.5 inline-flex">
              Book Now
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-brand-grey/40">
            © {year} Vitality Wellness MedSpa. All rights reserved.
          </p>
          <p className="font-body text-xs text-brand-grey/30">
            501 N. Dixie Hwy, Hallandale Beach, FL 33039
          </p>
        </div>
      </div>
    </footer>
  );
}

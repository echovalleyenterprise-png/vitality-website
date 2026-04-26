import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { usePatientAuth } from '../context/PatientAuthContext';

const CRM_URL = import.meta.env.VITE_CRM_URL || 'https://vitality-crm.vercel.app';

const navLinks = [
  { to: '/',         label: 'Home'     },
  { to: '/services', label: 'Services' },
  { to: '/booking',  label: 'Book Now' },
  { to: '/gift-cards', label: 'Gift Cards' },
  { to: '/about',    label: 'About'    },
  { to: '/contact',  label: 'Contact'  },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const { patient, logout, isAuthenticated } = usePatientAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
      ${scrolled ? 'bg-brand-black/95 backdrop-blur-sm shadow-lg shadow-black/50 py-3 border-b border-white/5' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0" onClick={() => setMenuOpen(false)}>
          <Logo size="sm" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `font-body text-xs tracking-widest uppercase transition-colors duration-200
                 ${isActive ? 'text-brand-gold' : 'text-brand-cream/70 hover:text-brand-gold'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/portal" className="font-body text-xs tracking-widest uppercase text-brand-cream/70 hover:text-brand-gold transition-colors">
                My Portal
              </Link>
              <button onClick={handleLogout} className="font-body text-xs tracking-widest uppercase text-brand-cream/40 hover:text-brand-cream/70 transition-colors">
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/portal/login" className="font-body text-xs tracking-widest uppercase text-brand-cream/70 hover:text-brand-gold transition-colors">
              Patient Login
            </Link>
          )}

          {/* Staff CRM link */}
          <a
            href={CRM_URL}
            target="_blank"
            rel="noreferrer"
            className="font-body text-xs tracking-widest uppercase text-brand-gold/50 hover:text-brand-gold/80 transition-colors border-l border-brand-gold/20 pl-4"
          >
            Staff ↗
          </a>

          <Link to="/booking" className="btn-gold text-xs px-6 py-2">
            Book Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-brand-gold p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-0.5 bg-brand-gold transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`w-6 h-0.5 bg-brand-gold mt-1.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-brand-gold mt-1.5 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-screen py-4' : 'max-h-0'} bg-brand-black/97 backdrop-blur-sm border-t border-white/5`}>
        <div className="px-6 flex flex-col gap-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `font-body text-sm tracking-widest uppercase py-2 border-b border-brand-gold/10
                 ${isActive ? 'text-brand-gold' : 'text-brand-cream/70'}`
              }
            >
              {label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <>
              <Link to="/portal" onClick={() => setMenuOpen(false)} className="font-body text-sm tracking-widest uppercase py-2 text-brand-cream/70 border-b border-brand-gold/10">My Portal</Link>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="font-body text-sm tracking-widest uppercase py-2 text-left text-brand-cream/40 border-b border-brand-gold/10">Sign Out</button>
            </>
          ) : (
            <Link to="/portal/login" onClick={() => setMenuOpen(false)} className="font-body text-sm tracking-widest uppercase py-2 text-brand-cream/70 border-b border-brand-gold/10">Patient Login</Link>
          )}
          <a href={CRM_URL} target="_blank" rel="noreferrer" className="font-body text-sm tracking-widest uppercase py-2 text-brand-gold/50">Staff Portal ↗</a>
        </div>
      </div>
    </nav>
  );
}

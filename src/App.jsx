import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar  from './components/Navbar';
import Footer  from './components/Footer';
import { usePatientAuth } from './context/PatientAuthContext';

// Pages
import Home      from './pages/Home';
import Services  from './pages/Services';
import Booking   from './pages/Booking';
import GiftCards from './pages/GiftCards';
import About     from './pages/About';
import Contact   from './pages/Contact';

// Patient portal
import PortalLogin    from './pages/portal/Login';
import PortalRegister from './pages/portal/Register';
import PortalDashboard from './pages/portal/Dashboard';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Protect portal routes
function PortalGuard({ children }) {
  const { isAuthenticated } = usePatientAuth();
  return isAuthenticated ? children : <Navigate to="/portal/login" replace />;
}

// Hide navbar on full-screen portal auth pages
const FULLSCREEN_PATHS = ['/portal/login', '/portal/register'];

function Layout() {
  const { pathname } = useLocation();
  const isFullscreen = FULLSCREEN_PATHS.includes(pathname);
  return (
    <>
      <ScrollToTop />
      {!isFullscreen && <Navbar />}
      <main>
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/services"   element={<Services />} />
          <Route path="/booking"    element={<Booking />} />
          <Route path="/gift-cards" element={<GiftCards />} />
          <Route path="/about"      element={<About />} />
          <Route path="/contact"    element={<Contact />} />

          {/* Patient portal */}
          <Route path="/portal/login"    element={<PortalLogin />} />
          <Route path="/portal/register" element={<PortalRegister />} />
          <Route path="/portal" element={
            <PortalGuard><PortalDashboard /></PortalGuard>
          } />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isFullscreen && <Footer />}
    </>
  );
}

export default function App() {
  return <Layout />;
}

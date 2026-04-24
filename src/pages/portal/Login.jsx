import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginPatient } from '../../services/api';
import { usePatientAuth } from '../../context/PatientAuthContext';
import Logo from '../../components/Logo';

export default function PortalLogin() {
  const [form, setForm]       = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const { login }             = usePatientAuth();
  const navigate              = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await loginPatient(form);
      login(res.data.token, res.data.patient);
      navigate('/portal');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-brand-brown">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/">
            <Logo size="md" />
          </Link>
          <p className="font-body text-xs tracking-widest uppercase text-brand-gold mt-6 mb-2">Patient Portal</p>
          <h1 className="font-sans text-2xl text-brand-cream">Sign In</h1>
          <div className="gold-divider" />
        </div>

        <div className="card-dark">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-gold">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                required
                autoComplete="email"
                className="input-dark"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="label-gold">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                required
                autoComplete="current-password"
                className="input-dark"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="font-body text-sm text-red-400">{error}</p>}
            <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-50 mt-2">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="border-t border-brand-gold/10 mt-6 pt-6 text-center">
            <p className="font-body text-sm text-brand-cream/40">
              Don't have an account?{' '}
              <Link to="/portal/register" className="text-brand-gold hover:text-brand-gold/80 transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-6">
          <Link to="/" className="font-body text-xs text-brand-cream/30 hover:text-brand-cream/60 transition-colors">← Back to website</Link>
        </p>
      </div>
    </div>
  );
}

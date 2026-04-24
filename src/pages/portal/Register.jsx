import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerPatient } from '../../services/api';
import { usePatientAuth } from '../../context/PatientAuthContext';
import Logo from '../../components/Logo';

export default function PortalRegister() {
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', phone: '', date_of_birth: '', password: '', confirm_password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const { login }             = usePatientAuth();
  const navigate              = useNavigate();

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm_password) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const { confirm_password, ...payload } = form;
      const res = await registerPatient(payload);
      login(res.data.token, res.data.patient);
      navigate('/portal');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 bg-brand-brown">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link to="/">
            <Logo size="md" />
          </Link>
          <p className="font-body text-xs tracking-widest uppercase text-brand-gold mt-6 mb-2">Patient Portal</p>
          <h1 className="font-sans text-2xl text-brand-cream">Create Your Account</h1>
          <div className="gold-divider" />
        </div>

        <div className="card-dark">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-gold">First Name *</label>
                <input name="first_name" value={form.first_name} onChange={handleChange} required className="input-dark" />
              </div>
              <div>
                <label className="label-gold">Last Name *</label>
                <input name="last_name" value={form.last_name} onChange={handleChange} required className="input-dark" />
              </div>
            </div>
            <div>
              <label className="label-gold">Email Address *</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required className="input-dark" placeholder="your@email.com" />
            </div>
            <div>
              <label className="label-gold">Phone Number</label>
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} className="input-dark" placeholder="(555) 000-0000" />
            </div>
            <div>
              <label className="label-gold">Date of Birth</label>
              <input name="date_of_birth" type="date" value={form.date_of_birth} onChange={handleChange} className="input-dark" />
            </div>
            <div>
              <label className="label-gold">Password * (min. 8 characters)</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} required minLength={8} className="input-dark" />
            </div>
            <div>
              <label className="label-gold">Confirm Password *</label>
              <input name="confirm_password" type="password" value={form.confirm_password} onChange={handleChange} required className="input-dark" />
            </div>
            {error && <p className="font-body text-sm text-red-400">{error}</p>}
            <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-50">
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <div className="border-t border-brand-gold/10 mt-6 pt-6 text-center">
            <p className="font-body text-sm text-brand-cream/40">
              Already have an account?{' '}
              <Link to="/portal/login" className="text-brand-gold hover:text-brand-gold/80 transition-colors">Sign in</Link>
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

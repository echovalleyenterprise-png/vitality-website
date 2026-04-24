import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getServices, getProviders, getAvailability, bookAppointment, registerPatient, loginPatient } from '../services/api';
import { usePatientAuth } from '../context/PatientAuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const STEPS = ['Service', 'Provider', 'Date & Time', 'Your Info', 'Confirm'];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-12">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-body font-medium border transition-colors
              ${i < current  ? 'bg-brand-gold border-brand-gold text-brand-brown' : ''}
              ${i === current ? 'border-brand-gold text-brand-gold' : ''}
              ${i > current  ? 'border-brand-gold/20 text-brand-cream/30' : ''}`}>
              {i < current ? '✓' : i + 1}
            </div>
            <span className={`font-body text-xs mt-1 tracking-wider hidden sm:block
              ${i === current ? 'text-brand-gold' : 'text-brand-cream/30'}`}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-8 sm:w-12 h-px mx-1 transition-colors ${i < current ? 'bg-brand-gold' : 'bg-brand-gold/15'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Booking() {
  const [searchParams] = useSearchParams();
  const { patient, login, isAuthenticated } = usePatientAuth();

  const [step, setStep]           = useState(0);
  const [services, setServices]   = useState([]);
  const [providers, setProviders] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');

  // Selections
  const [selectedService,  setSelectedService]  = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedDate,     setSelectedDate]     = useState('');
  const [selectedSlot,     setSelectedSlot]     = useState(null);
  const [notes,            setNotes]            = useState('');

  // Auth form
  const [authMode, setAuthMode]   = useState('login'); // 'login' | 'register'
  const [authForm, setAuthForm]   = useState({ email: '', password: '', first_name: '', last_name: '', phone: '' });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Confirmation
  const [confirmed, setConfirmed] = useState(null);

  // Prefill service from query param
  useEffect(() => {
    const preselect = searchParams.get('service');
    getServices()
      .then((res) => {
        setServices(res.data);
        if (preselect) {
          const found = res.data.find((s) => s.id === preselect);
          if (found) { setSelectedService(found); setStep(1); }
        }
      })
      .catch(() => {});
    getProviders()
      .then((res) => setProviders(res.data))
      .catch(() => {});
  }, []);

  // Load availability when date/provider/service change
  useEffect(() => {
    if (!selectedDate || !selectedProvider || !selectedService) return;
    setLoading(true);
    setAvailability([]);
    getAvailability({ provider_id: selectedProvider.id, service_id: selectedService.id, date: selectedDate })
      .then((res) => setAvailability(res.data.slots || []))
      .catch(() => setError('Could not load availability. Please try another date.'))
      .finally(() => setLoading(false));
  }, [selectedDate, selectedProvider, selectedService]);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      let res;
      if (authMode === 'login') {
        res = await loginPatient({ email: authForm.email, password: authForm.password });
      } else {
        res = await registerPatient(authForm);
      }
      login(res.data.token, res.data.patient);
      setStep(4);
    } catch (err) {
      setAuthError(err.response?.data?.error || 'Authentication failed. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleBook = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await bookAppointment({
        service_id:  selectedService.id,
        provider_id: selectedProvider.id,
        start_time:  selectedSlot.start_time,
        notes,
      });
      setConfirmed(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed. Please try again or call us.');
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];

  if (confirmed) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center px-6">
        <div className="card-dark max-w-md w-full text-center py-12 border-brand-gold/40">
          <div className="text-4xl text-brand-gold mb-4">✦</div>
          <h2 className="font-sans text-2xl text-brand-cream mb-2">Appointment Requested!</h2>
          <div className="gold-divider" />
          <p className="font-body text-sm text-brand-cream/60 mb-6 leading-relaxed">
            {confirmed.message}
          </p>
          <div className="bg-brand-brown rounded p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between">
              <span className="font-body text-xs text-brand-cream/40">Service</span>
              <span className="font-body text-sm text-brand-cream">{selectedService?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-body text-xs text-brand-cream/40">Provider</span>
              <span className="font-body text-sm text-brand-cream">{selectedProvider?.first_name} {selectedProvider?.last_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-body text-xs text-brand-cream/40">Date & Time</span>
              <span className="font-body text-sm text-brand-cream">
                {new Date(selectedSlot.start_time).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at {selectedSlot.display}
              </span>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <Link to="/portal" className="btn-gold text-xs px-6 py-2">My Appointments</Link>
            <Link to="/" className="btn-outline-gold text-xs px-6 py-2">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-brand-brown">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-brand-gold mb-2">Reserve Your Visit</p>
          <h1 className="section-title">Book an Appointment</h1>
          <div className="gold-divider" />
        </div>

        <StepIndicator current={step} />

        {/* ── STEP 0: Choose Service ── */}
        {step === 0 && (
          <div>
            <h2 className="font-sans text-xl text-brand-cream mb-6">Select a Service</h2>
            {services.length === 0 && <LoadingSpinner />}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((svc) => (
                <button
                  key={svc.id}
                  onClick={() => { setSelectedService(svc); setStep(1); }}
                  className={`card-dark text-left hover:border-brand-gold/50 transition-colors group
                    ${selectedService?.id === svc.id ? 'border-brand-gold' : ''}`}
                >
                  <h3 className="font-sans text-lg text-brand-cream mb-1 group-hover:text-brand-gold transition-colors">{svc.name}</h3>
                  <p className="font-body text-xs text-brand-cream/40 mb-2">{svc.duration_minutes} min</p>
                  {svc.description && <p className="font-body text-sm text-brand-cream/50 text-sm leading-relaxed line-clamp-2">{svc.description}</p>}
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-brand-gold/10">
                    <span className="font-body text-sm text-brand-gold">{svc.price ? `$${Number(svc.price).toFixed(0)}` : 'Consultation'}</span>
                    <span className="text-brand-gold text-xs">Select →</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 1: Choose Provider ── */}
        {step === 1 && (
          <div>
            <h2 className="font-sans text-xl text-brand-cream mb-2">Choose Your Provider</h2>
            <p className="font-body text-sm text-brand-cream/50 mb-6">For: <strong className="text-brand-gold">{selectedService?.name}</strong></p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {providers.length === 0 && <LoadingSpinner />}
              {providers.map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setSelectedProvider(p); setStep(2); }}
                  className={`card-dark text-center hover:border-brand-gold/50 transition-colors
                    ${selectedProvider?.id === p.id ? 'border-brand-gold' : ''}`}
                >
                  <div className="w-16 h-16 rounded-full border-2 border-brand-gold/30 bg-brand-brown flex items-center justify-center mx-auto mb-3">
                    <span className="font-script text-2xl text-brand-gold">{p.first_name[0]}</span>
                  </div>
                  <h3 className="font-sans text-lg text-brand-cream">{p.first_name} {p.last_name}</h3>
                  {p.credentials && <p className="font-body text-xs text-brand-cream/40 mt-1">{p.credentials}</p>}
                  <p className="font-body text-xs text-brand-gold/60 mt-1 capitalize">{p.role?.replace('_', ' ')}</p>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(0)} className="font-body text-xs text-brand-cream/40 hover:text-brand-cream/70 transition-colors">← Back</button>
          </div>
        )}

        {/* ── STEP 2: Date & Time ── */}
        {step === 2 && (
          <div>
            <h2 className="font-sans text-xl text-brand-cream mb-2">Select a Date & Time</h2>
            <p className="font-body text-sm text-brand-cream/50 mb-6">
              Provider: <strong className="text-brand-gold">{selectedProvider?.first_name} {selectedProvider?.last_name}</strong>
            </p>
            <div className="mb-6">
              <label className="label-gold">Choose a Date</label>
              <input
                type="date"
                min={minDateStr}
                value={selectedDate}
                onChange={(e) => { setSelectedDate(e.target.value); setSelectedSlot(null); }}
                className="input-dark max-w-xs"
              />
            </div>
            {selectedDate && (
              <>
                {loading && <LoadingSpinner text="Loading availability" />}
                {!loading && availability.length === 0 && (
                  <p className="font-body text-sm text-brand-cream/40 py-4">No availability on this date. Please try another day.</p>
                )}
                {!loading && availability.length > 0 && (
                  <div>
                    <p className="label-gold mb-3">Available Times</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {availability.map((slot) => (
                        <button
                          key={slot.start_time}
                          onClick={() => setSelectedSlot(slot)}
                          className={`font-body text-sm py-2 px-3 rounded border transition-colors
                            ${selectedSlot?.start_time === slot.start_time
                              ? 'bg-brand-gold text-brand-brown border-brand-gold'
                              : 'border-brand-gold/20 text-brand-cream/60 hover:border-brand-gold/60 hover:text-brand-cream'}`}
                        >
                          {slot.display}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
            {error && <p className="font-body text-sm text-red-400 mt-3">{error}</p>}
            <div className="flex gap-4 mt-8">
              <button onClick={() => setStep(1)} className="font-body text-xs text-brand-cream/40 hover:text-brand-cream/70 transition-colors">← Back</button>
              {selectedSlot && (
                <button onClick={() => setStep(3)} className="btn-gold text-xs px-6 py-2">Continue →</button>
              )}
            </div>
          </div>
        )}

        {/* ── STEP 3: Patient Info / Login ── */}
        {step === 3 && (
          <div>
            {isAuthenticated ? (
              <div>
                <h2 className="font-sans text-xl text-brand-cream mb-4">Logged in as {patient?.first_name} {patient?.last_name}</h2>
                <div className="mb-4">
                  <label className="label-gold">Special Notes (optional)</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="input-dark resize-none" placeholder="Any allergies, sensitivities, or requests…" />
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(2)} className="font-body text-xs text-brand-cream/40 hover:text-brand-cream/70 transition-colors">← Back</button>
                  <button onClick={() => setStep(4)} className="btn-gold text-xs px-6 py-2">Review & Confirm →</button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="font-sans text-xl text-brand-cream mb-2">{authMode === 'login' ? 'Sign In to Your Account' : 'Create an Account'}</h2>
                <div className="flex gap-4 mb-6">
                  <button onClick={() => setAuthMode('login')} className={`font-body text-xs tracking-widest uppercase pb-1 border-b transition-colors ${authMode === 'login' ? 'border-brand-gold text-brand-gold' : 'border-transparent text-brand-cream/40'}`}>Sign In</button>
                  <button onClick={() => setAuthMode('register')} className={`font-body text-xs tracking-widest uppercase pb-1 border-b transition-colors ${authMode === 'register' ? 'border-brand-gold text-brand-gold' : 'border-transparent text-brand-cream/40'}`}>New Patient</button>
                </div>
                <form onSubmit={handleAuthSubmit} className="space-y-4 max-w-sm">
                  {authMode === 'register' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label-gold">First Name *</label>
                        <input value={authForm.first_name} onChange={(e) => setAuthForm(f => ({ ...f, first_name: e.target.value }))} required className="input-dark" />
                      </div>
                      <div>
                        <label className="label-gold">Last Name *</label>
                        <input value={authForm.last_name} onChange={(e) => setAuthForm(f => ({ ...f, last_name: e.target.value }))} required className="input-dark" />
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="label-gold">Email *</label>
                    <input type="email" value={authForm.email} onChange={(e) => setAuthForm(f => ({ ...f, email: e.target.value }))} required className="input-dark" />
                  </div>
                  {authMode === 'register' && (
                    <div>
                      <label className="label-gold">Phone</label>
                      <input type="tel" value={authForm.phone} onChange={(e) => setAuthForm(f => ({ ...f, phone: e.target.value }))} className="input-dark" />
                    </div>
                  )}
                  <div>
                    <label className="label-gold">Password *</label>
                    <input type="password" value={authForm.password} onChange={(e) => setAuthForm(f => ({ ...f, password: e.target.value }))} required minLength={8} className="input-dark" />
                  </div>
                  {authError && <p className="font-body text-sm text-red-400">{authError}</p>}
                  <button type="submit" disabled={authLoading} className="btn-gold w-full disabled:opacity-50">
                    {authLoading ? 'Please wait…' : authMode === 'login' ? 'Sign In' : 'Create Account'}
                  </button>
                </form>
                <button onClick={() => setStep(2)} className="font-body text-xs text-brand-cream/40 hover:text-brand-cream/70 transition-colors mt-6 block">← Back</button>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 4: Confirm ── */}
        {step === 4 && (
          <div>
            <h2 className="font-sans text-xl text-brand-cream mb-6">Review Your Appointment</h2>
            <div className="card-dark mb-6 space-y-4">
              {[
                { label: 'Service',   value: selectedService?.name },
                { label: 'Provider',  value: `${selectedProvider?.first_name} ${selectedProvider?.last_name}${selectedProvider?.credentials ? `, ${selectedProvider.credentials}` : ''}` },
                { label: 'Date',      value: new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) },
                { label: 'Time',      value: selectedSlot?.display },
                { label: 'Duration',  value: `${selectedService?.duration_minutes} minutes` },
                { label: 'Price',     value: selectedService?.price ? `$${Number(selectedService.price).toFixed(2)}` : 'Consultation' },
                { label: 'Client',    value: `${patient?.first_name} ${patient?.last_name}` },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between border-b border-brand-gold/10 pb-3 last:border-0 last:pb-0">
                  <span className="font-body text-xs text-brand-cream/40 uppercase tracking-widest">{label}</span>
                  <span className="font-body text-sm text-brand-cream">{value}</span>
                </div>
              ))}
              {notes && (
                <div className="border-t border-brand-gold/10 pt-3">
                  <span className="font-body text-xs text-brand-cream/40 uppercase tracking-widest block mb-1">Notes</span>
                  <span className="font-body text-sm text-brand-cream/60">{notes}</span>
                </div>
              )}
            </div>
            {error && <p className="font-body text-sm text-red-400 mb-4">{error}</p>}
            <div className="flex gap-4">
              <button onClick={() => setStep(3)} className="font-body text-xs text-brand-cream/40 hover:text-brand-cream/70 transition-colors">← Back</button>
              <button onClick={handleBook} disabled={loading} className="btn-gold disabled:opacity-50">
                {loading ? 'Booking…' : 'Confirm Appointment'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

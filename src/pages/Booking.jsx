import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getServices, getProviders, getAvailability, bookAppointment, registerPatient, loginPatient } from '../services/api';
import { usePatientAuth } from '../context/PatientAuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const STEPS = ['Service', 'Provider', 'Date & Time', 'Your Info', 'Confirm'];

/* ── Step indicator ── */
function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-body font-medium border transition-all duration-300
              ${i < current  ? 'bg-brand-gold border-brand-gold text-brand-brown' : ''}
              ${i === current ? 'border-brand-gold text-brand-gold' : ''}
              ${i > current  ? 'border-brand-gold/20 text-brand-cream/30' : ''}`}>
              {i < current ? '✓' : i + 1}
            </div>
            <span className={`font-body text-xs mt-1 tracking-wider hidden sm:block transition-colors duration-300
              ${i === current ? 'text-brand-gold' : 'text-brand-cream/30'}`}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-8 sm:w-12 h-px mx-1 transition-colors duration-500 ${i < current ? 'bg-brand-gold' : 'bg-brand-gold/15'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Booking summary bar (shown after step 0) ── */
function BookingSummary({ service, provider, date, slot }) {
  if (!service) return null;
  const dateLabel = date
    ? new Date(date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : null;
  return (
    <div className="mb-8 p-4 border border-brand-gold/20 rounded" style={{ background: 'rgba(201,168,76,0.04)' }}>
      <div className="flex flex-wrap gap-x-6 gap-y-2 items-center">
        <div>
          <span className="font-body text-xs text-brand-gold/60 uppercase tracking-widest block">Service</span>
          <span className="font-sans text-sm text-brand-cream">{service.name}</span>
          {service.price && <span className="font-body text-xs text-brand-gold ml-2">${Number(service.price).toFixed(0)}</span>}
        </div>
        {provider && (
          <>
            <div className="hidden sm:block w-px h-8 bg-brand-gold/15" />
            <div>
              <span className="font-body text-xs text-brand-gold/60 uppercase tracking-widest block">Provider</span>
              <span className="font-sans text-sm text-brand-cream">
                {provider.id === 'any' ? 'Any Available' : `${provider.first_name} ${provider.last_name}`}
              </span>
            </div>
          </>
        )}
        {dateLabel && (
          <>
            <div className="hidden sm:block w-px h-8 bg-brand-gold/15" />
            <div>
              <span className="font-body text-xs text-brand-gold/60 uppercase tracking-widest block">Date</span>
              <span className="font-sans text-sm text-brand-cream">{dateLabel}{slot ? ` · ${slot.display}` : ''}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Category label map ── */
const CATEGORY_ORDER = ['IV Infusion', 'Signature Package', 'Aesthetic', 'Weight Management', 'Wellness'];
const CATEGORY_LABELS = {
  'IV Infusion': 'IV Infusion Drips',
  'Signature Package': 'Signature Therapy Packages',
  'Aesthetic': 'Aesthetic Treatments',
  'Weight Management': 'Weight Management',
  'Wellness': 'Wellness Services',
};

export default function Booking() {
  const [searchParams] = useSearchParams();
  const { patient, login, isAuthenticated } = usePatientAuth();

  const [step, setStep]             = useState(0);
  const [services, setServices]     = useState([]);
  const [providers, setProviders]   = useState([]);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading]       = useState(false);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [providersLoading, setProvidersLoading] = useState(true);
  const [error, setError]           = useState('');

  // Selections
  const [selectedService,  setSelectedService]  = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedDate,     setSelectedDate]     = useState('');
  const [selectedSlot,     setSelectedSlot]     = useState(null);
  const [notes,            setNotes]            = useState('');

  // Auth form
  const [authMode, setAuthMode]     = useState('login');
  const [authForm, setAuthForm]     = useState({ email: '', password: '', first_name: '', last_name: '', phone: '' });
  const [authError, setAuthError]   = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Confirmation
  const [confirmed, setConfirmed]   = useState(null);

  /* ── Load services + providers on mount ── */
  useEffect(() => {
    setServicesLoading(true);
    getServices()
      .then((res) => {
        setServices(res.data);
        const preselect = searchParams.get('service');
        if (preselect) {
          const found = res.data.find((s) => s.id === preselect || s.name.toLowerCase().replace(/\s+/g, '-') === preselect);
          if (found) { setSelectedService(found); setStep(1); }
        }
      })
      .catch(() => {})
      .finally(() => setServicesLoading(false));

    setProvidersLoading(true);
    getProviders()
      .then((res) => setProviders(res.data))
      .catch(() => {})
      .finally(() => setProvidersLoading(false));
  }, []);

  /* ── Load availability ── */
  useEffect(() => {
    if (!selectedDate || !selectedService) return;

    // If "any provider" — pick the first real provider for availability
    const providerId = selectedProvider?.id === 'any'
      ? providers[0]?.id
      : selectedProvider?.id;
    if (!providerId) return;

    setLoading(true);
    setAvailability([]);
    setError('');
    getAvailability({ provider_id: providerId, service_id: selectedService.id, date: selectedDate })
      .then((res) => setAvailability(res.data.slots || []))
      .catch(() => setError('Could not load availability. Please try another date.'))
      .finally(() => setLoading(false));
  }, [selectedDate, selectedProvider, selectedService, providers]);

  /* ── Auth submit ── */
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

  /* ── Book appointment ── */
  const handleBook = async () => {
    setLoading(true);
    setError('');
    try {
      // Resolve provider: if "any", use the first real provider
      const providerId = selectedProvider?.id === 'any'
        ? providers[0]?.id
        : selectedProvider?.id;

      const res = await bookAppointment({
        service_id:  selectedService.id,
        provider_id: providerId,
        start_time:  selectedSlot.start_time,
        notes,
      });
      setConfirmed(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed. Please try again or call us at (561) 492-3641.');
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];

  /* ── Group services by category ── */
  const servicesByCategory = services.reduce((acc, svc) => {
    const cat = svc.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(svc);
    return acc;
  }, {});
  const orderedCategories = [
    ...CATEGORY_ORDER.filter(c => servicesByCategory[c]),
    ...Object.keys(servicesByCategory).filter(c => !CATEGORY_ORDER.includes(c)),
  ];

  /* ── Confirmed screen ── */
  if (confirmed) {
    return (
      <div className="pt-24 min-h-screen bg-brand-brown flex items-center justify-center px-6 py-16">
        <div className="max-w-md w-full text-center">
          <div className="card-dark border-brand-gold/40 py-14 px-10">
            <div className="w-16 h-16 rounded-full border border-brand-gold/40 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl text-brand-gold">✦</span>
            </div>
            <h2 className="font-sans text-3xl text-brand-cream mb-1">You're Booked!</h2>
            <p className="font-body text-xs tracking-widest uppercase text-brand-gold/60 mb-4">Appointment Requested</p>
            <div className="gold-divider" />
            <p className="font-body text-sm text-brand-cream/60 mb-8 leading-relaxed">{confirmed.message}</p>

            <div className="bg-brand-brown rounded p-5 mb-8 text-left space-y-3">
              {[
                { label: 'Service',    value: selectedService?.name },
                { label: 'Provider',   value: selectedProvider?.id === 'any'
                    ? 'Staff will be assigned'
                    : `${selectedProvider?.first_name} ${selectedProvider?.last_name}` },
                { label: 'Date',       value: new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) },
                { label: 'Time',       value: selectedSlot?.display },
                { label: 'Price',      value: selectedService?.price ? `$${Number(selectedService.price).toFixed(2)}` : 'Consultation' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="font-body text-xs text-brand-cream/40 uppercase tracking-widest">{label}</span>
                  <span className="font-body text-sm text-brand-cream">{value}</span>
                </div>
              ))}
            </div>

            <p className="font-body text-xs text-brand-cream/40 mb-6">
              We'll confirm your appointment by phone or email within 2 hours.
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/portal" className="btn-gold text-xs px-6 py-2.5">View My Appointments</Link>
              <Link to="/" className="btn-outline-gold text-xs px-6 py-2.5">Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">

      {/* ── PAGE HEADER ── */}
      <section className="relative pt-24 pb-16 text-center overflow-hidden" style={{ background: '#080808' }}>
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.15, objectPosition: 'center 40%' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.6) 0%, rgba(8,8,8,0.3) 50%, rgba(8,8,8,0.85) 100%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <p className="overline">Reserve Your Visit</p>
          <h1 className="section-title">Book an Appointment</h1>
          <div className="gold-divider" />
          <p className="font-sans text-lg text-brand-grey font-light leading-relaxed">
            Choose your service, provider, and preferred time — we'll take care of the rest.
          </p>
        </div>
      </section>

      {/* ── BOOKING FLOW ── */}
      <div className="bg-brand-brown min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-14">

          <StepIndicator current={step} />
          <BookingSummary
            service={selectedService}
            provider={selectedProvider}
            date={selectedDate}
            slot={selectedSlot}
          />

          {/* ── STEP 0: Choose Service ── */}
          {step === 0 && (
            <div>
              <h2 className="font-sans text-2xl text-brand-cream mb-2">What brings you in?</h2>
              <p className="font-body text-sm text-brand-cream/50 mb-8">Select the service you'd like to book.</p>

              {servicesLoading && (
                <div className="py-16 text-center">
                  <LoadingSpinner />
                  <p className="font-body text-sm text-brand-cream/40 mt-4">Loading services…</p>
                </div>
              )}

              {!servicesLoading && services.length === 0 && (
                <div className="card-dark text-center py-12 border-brand-gold/20">
                  <p className="font-sans text-xl text-brand-cream mb-2">Services unavailable</p>
                  <p className="font-body text-sm text-brand-cream/50 mb-6">We couldn't load our service list right now.</p>
                  <a href="tel:+15614923641" className="btn-gold text-xs px-6 py-2.5">Call to Book: (561) 492-3641</a>
                </div>
              )}

              {orderedCategories.map((cat) => (
                <div key={cat} className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="font-body text-xs tracking-widest uppercase text-brand-gold/70">{CATEGORY_LABELS[cat] || cat}</h3>
                    <div className="flex-1 h-px bg-brand-gold/10" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {servicesByCategory[cat].map((svc) => (
                      <button
                        key={svc.id}
                        onClick={() => { setSelectedService(svc); setStep(1); }}
                        className="card-dark text-left group hover:border-brand-gold/50 transition-all duration-200"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-sans text-lg text-brand-cream group-hover:text-brand-gold transition-colors leading-tight">{svc.name}</h4>
                          {svc.price
                            ? <span className="price-tag text-base ml-2 shrink-0">${Number(svc.price).toFixed(0)}</span>
                            : <span className="font-body text-xs text-brand-gold/60 ml-2 shrink-0 mt-1">Consult</span>
                          }
                        </div>
                        <p className="font-body text-xs text-brand-gold/50 mb-2">{svc.duration_minutes} min session</p>
                        {svc.description && (
                          <p className="font-body text-sm text-brand-cream/40 leading-relaxed line-clamp-2">{svc.description.split(' — ')[0]}</p>
                        )}
                        <div className="flex items-center gap-1 mt-3 text-brand-gold/0 group-hover:text-brand-gold/60 transition-colors">
                          <span className="font-body text-xs tracking-widest uppercase">Select</span>
                          <span className="text-sm">→</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── STEP 1: Choose Provider ── */}
          {step === 1 && (
            <div>
              <h2 className="font-sans text-2xl text-brand-cream mb-2">Choose your provider</h2>
              <p className="font-body text-sm text-brand-cream/50 mb-8">
                For: <strong className="text-brand-gold">{selectedService?.name}</strong>
              </p>

              {providersLoading && (
                <div className="py-10 text-center">
                  <LoadingSpinner />
                </div>
              )}

              {!providersLoading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* Any Provider option */}
                  <button
                    onClick={() => { setSelectedProvider({ id: 'any' }); setStep(2); }}
                    className={`card-dark text-center py-6 hover:border-brand-gold/50 transition-all group
                      ${selectedProvider?.id === 'any' ? 'border-brand-gold' : ''}`}
                  >
                    <div className="w-14 h-14 rounded-full border border-dashed border-brand-gold/30 flex items-center justify-center mx-auto mb-3 group-hover:border-brand-gold/60 transition-colors">
                      <span className="text-xl text-brand-gold/50">✦</span>
                    </div>
                    <h3 className="font-sans text-lg text-brand-cream">No Preference</h3>
                    <p className="font-body text-xs text-brand-cream/40 mt-1">Any available provider</p>
                  </button>

                  {providers.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => { setSelectedProvider(p); setStep(2); }}
                      className={`card-dark text-center py-6 hover:border-brand-gold/50 transition-all
                        ${selectedProvider?.id === p.id ? 'border-brand-gold' : ''}`}
                    >
                      <div className="w-14 h-14 rounded-full border-2 border-brand-gold/30 bg-brand-brown flex items-center justify-center mx-auto mb-3">
                        <span className="font-script text-2xl text-brand-gold">{p.first_name[0]}</span>
                      </div>
                      <h3 className="font-sans text-lg text-brand-cream">{p.first_name} {p.last_name}</h3>
                      {p.credentials && <p className="font-body text-xs text-brand-gold/60 mt-1">{p.credentials}</p>}
                      <p className="font-body text-xs text-brand-cream/30 mt-0.5 capitalize">{p.role?.replace('_', ' ')}</p>
                    </button>
                  ))}
                </div>
              )}

              <button onClick={() => setStep(0)} className="font-body text-xs text-brand-cream/40 hover:text-brand-cream/70 transition-colors">← Back</button>
            </div>
          )}

          {/* ── STEP 2: Date & Time ── */}
          {step === 2 && (
            <div>
              <h2 className="font-sans text-2xl text-brand-cream mb-2">When works for you?</h2>
              <p className="font-body text-sm text-brand-cream/50 mb-8">
                Pick a date to see available times. We're open 7 days a week.
              </p>

              <div className="mb-8">
                <label className="label-gold">Select a Date</label>
                <input
                  type="date"
                  min={minDateStr}
                  value={selectedDate}
                  onChange={(e) => { setSelectedDate(e.target.value); setSelectedSlot(null); setAvailability([]); setError(''); }}
                  className="input-dark max-w-xs"
                />
                <p className="font-body text-xs text-brand-cream/30 mt-2">
                  Mon–Fri: 8am–8pm &nbsp;·&nbsp; Sat: 9am–7pm &nbsp;·&nbsp; Sun: 9am–8pm
                </p>
              </div>

              {selectedDate && (
                <div>
                  {loading && (
                    <div className="py-8">
                      <LoadingSpinner />
                      <p className="font-body text-sm text-brand-cream/40 text-center mt-3">Checking availability…</p>
                    </div>
                  )}

                  {!loading && error && (
                    <div className="card-dark border-red-500/20 mb-6">
                      <p className="font-body text-sm text-red-400">{error}</p>
                    </div>
                  )}

                  {!loading && !error && availability.length === 0 && (
                    <div className="card-dark text-center py-10 border-brand-gold/10 mb-6">
                      <p className="font-sans text-lg text-brand-cream/60 mb-1">No availability on this date</p>
                      <p className="font-body text-sm text-brand-cream/30">Try a different date or call us at (561) 492-3641.</p>
                    </div>
                  )}

                  {!loading && availability.length > 0 && (
                    <div className="mb-6">
                      <p className="label-gold mb-3">Available Times — {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {availability.map((slot) => (
                          <button
                            key={slot.start_time}
                            onClick={() => setSelectedSlot(slot)}
                            className={`font-body text-sm py-2.5 px-2 rounded border transition-all duration-150 text-center
                              ${selectedSlot?.start_time === slot.start_time
                                ? 'bg-brand-gold text-brand-brown border-brand-gold font-medium'
                                : 'border-brand-gold/20 text-brand-cream/60 hover:border-brand-gold/50 hover:text-brand-cream'}`}
                          >
                            {slot.display}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center gap-5 mt-6">
                <button onClick={() => { setStep(1); setSelectedDate(''); setSelectedSlot(null); setAvailability([]); }} className="font-body text-xs text-brand-cream/40 hover:text-brand-cream/70 transition-colors">← Back</button>
                {selectedSlot && (
                  <button onClick={() => setStep(3)} className="btn-gold text-xs px-8 py-2.5">Continue →</button>
                )}
              </div>
            </div>
          )}

          {/* ── STEP 3: Patient Info / Auth ── */}
          {step === 3 && (
            <div>
              {isAuthenticated ? (
                <div>
                  <h2 className="font-sans text-2xl text-brand-cream mb-2">Almost there</h2>
                  <p className="font-body text-sm text-brand-cream/50 mb-6">
                    Booking as <strong className="text-brand-gold">{patient?.first_name} {patient?.last_name}</strong>. Not you? <Link to="/portal/login" className="text-brand-gold/70 hover:text-brand-gold underline underline-offset-2">Switch account</Link>
                  </p>
                  <div className="mb-6 max-w-sm">
                    <label className="label-gold">Special Requests / Notes <span className="text-brand-cream/20">(optional)</span></label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="input-dark resize-none"
                      placeholder="Allergies, sensitivities, or anything we should know…"
                    />
                  </div>
                  <div className="flex items-center gap-5">
                    <button onClick={() => setStep(2)} className="font-body text-xs text-brand-cream/40 hover:text-brand-cream/70 transition-colors">← Back</button>
                    <button onClick={() => setStep(4)} className="btn-gold text-xs px-8 py-2.5">Review & Confirm →</button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="font-sans text-2xl text-brand-cream mb-2">Sign in to confirm</h2>
                  <p className="font-body text-sm text-brand-cream/50 mb-6">We need your account to save your booking and send reminders.</p>

                  <div className="flex gap-1 mb-6 border-b border-white/5">
                    {['login', 'register'].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => { setAuthMode(mode); setAuthError(''); }}
                        className={`font-body text-xs tracking-widest uppercase px-4 pb-3 border-b-2 transition-colors -mb-px
                          ${authMode === mode ? 'border-brand-gold text-brand-gold' : 'border-transparent text-brand-cream/40 hover:text-brand-cream/60'}`}
                      >
                        {mode === 'login' ? 'Sign In' : 'New Patient'}
                      </button>
                    ))}
                  </div>

                  <form onSubmit={handleAuthSubmit} className="space-y-4 max-w-sm">
                    {authMode === 'register' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="label-gold">First Name *</label>
                          <input value={authForm.first_name} onChange={(e) => setAuthForm(f => ({ ...f, first_name: e.target.value }))} required className="input-dark" placeholder="Jane" />
                        </div>
                        <div>
                          <label className="label-gold">Last Name *</label>
                          <input value={authForm.last_name} onChange={(e) => setAuthForm(f => ({ ...f, last_name: e.target.value }))} required className="input-dark" placeholder="Smith" />
                        </div>
                      </div>
                    )}
                    <div>
                      <label className="label-gold">Email *</label>
                      <input type="email" value={authForm.email} onChange={(e) => setAuthForm(f => ({ ...f, email: e.target.value }))} required className="input-dark" placeholder="you@email.com" />
                    </div>
                    {authMode === 'register' && (
                      <div>
                        <label className="label-gold">Phone</label>
                        <input type="tel" value={authForm.phone} onChange={(e) => setAuthForm(f => ({ ...f, phone: e.target.value }))} className="input-dark" placeholder="(555) 000-0000" />
                      </div>
                    )}
                    <div>
                      <label className="label-gold">Password *</label>
                      <input type="password" value={authForm.password} onChange={(e) => setAuthForm(f => ({ ...f, password: e.target.value }))} required minLength={8} className="input-dark" placeholder={authMode === 'register' ? 'Min. 8 characters' : '••••••••'} />
                    </div>

                    {authError && (
                      <div className="rounded border border-red-500/20 bg-red-500/5 px-4 py-3">
                        <p className="font-body text-sm text-red-400">{authError}</p>
                      </div>
                    )}

                    <button type="submit" disabled={authLoading} className="btn-gold w-full disabled:opacity-50">
                      {authLoading ? 'Please wait…' : authMode === 'login' ? 'Sign In & Continue' : 'Create Account & Continue'}
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
              <h2 className="font-sans text-2xl text-brand-cream mb-2">Review your appointment</h2>
              <p className="font-body text-sm text-brand-cream/50 mb-8">Everything look right? Confirm to complete your booking.</p>

              <div className="card-dark mb-6 space-y-0 divide-y divide-brand-gold/10">
                {[
                  { label: 'Service',   value: selectedService?.name },
                  { label: 'Category',  value: selectedService?.category },
                  { label: 'Provider',  value: selectedProvider?.id === 'any'
                      ? 'Any Available (staff assigned)'
                      : `${selectedProvider?.first_name} ${selectedProvider?.last_name}${selectedProvider?.credentials ? ` · ${selectedProvider.credentials}` : ''}` },
                  { label: 'Date',      value: new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) },
                  { label: 'Time',      value: selectedSlot?.display },
                  { label: 'Duration',  value: `${selectedService?.duration_minutes} minutes` },
                  { label: 'Price',     value: selectedService?.price ? `$${Number(selectedService.price).toFixed(2)}` : 'Consultation required' },
                  { label: 'Client',    value: `${patient?.first_name} ${patient?.last_name}` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-3 first:pt-0 last:pb-0">
                    <span className="font-body text-xs text-brand-cream/40 uppercase tracking-widest">{label}</span>
                    <span className="font-body text-sm text-brand-cream text-right max-w-xs">{value}</span>
                  </div>
                ))}
                {notes && (
                  <div className="py-3">
                    <span className="font-body text-xs text-brand-cream/40 uppercase tracking-widest block mb-1">Notes</span>
                    <span className="font-body text-sm text-brand-cream/60">{notes}</span>
                  </div>
                )}
              </div>

              <p className="font-body text-xs text-brand-cream/30 mb-6 leading-relaxed">
                By confirming, you agree to our cancellation policy. We'll contact you to confirm within 2 hours.
              </p>

              {error && (
                <div className="rounded border border-red-500/20 bg-red-500/5 px-4 py-3 mb-4">
                  <p className="font-body text-sm text-red-400">{error}</p>
                </div>
              )}

              <div className="flex items-center gap-5">
                <button onClick={() => setStep(3)} className="font-body text-xs text-brand-cream/40 hover:text-brand-cream/70 transition-colors">← Back</button>
                <button onClick={handleBook} disabled={loading} className="btn-gold disabled:opacity-50 px-10">
                  {loading ? 'Confirming…' : 'Confirm Appointment'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── Need help? ── */}
      <section className="py-10 bg-brand-brown-light border-t border-white/5 text-center">
        <p className="font-body text-sm text-brand-cream/40">
          Prefer to book by phone? Call us at{' '}
          <a href="tel:+15614923641" className="text-brand-gold hover:text-brand-gold/80 transition-colors">(561) 492-3641</a>
          {' '} — we're available 7 days a week.
        </p>
      </section>

    </div>
  );
}

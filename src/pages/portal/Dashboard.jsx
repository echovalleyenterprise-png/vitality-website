import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMyAppointments, cancelMyAppointment } from '../../services/api';
import { usePatientAuth } from '../../context/PatientAuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const statusColors = {
  pending:    'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  confirmed:  'text-green-400 bg-green-400/10 border-green-400/30',
  checked_in: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  completed:  'text-brand-cream/40 bg-brand-cream/5 border-brand-cream/20',
  cancelled:  'text-red-400/60 bg-red-400/5 border-red-400/20',
  no_show:    'text-red-400/40 bg-red-400/5 border-red-400/10',
};

export default function PatientDashboard() {
  const { patient, logout } = usePatientAuth();
  const navigate            = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [activeTab, setActiveTab]       = useState('upcoming');

  useEffect(() => {
    getMyAppointments()
      .then((res) => setAppointments(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return;
    setCancellingId(id);
    try {
      await cancelMyAppointment(id, 'Cancelled by patient via portal');
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a))
      );
    } catch {
      alert('Unable to cancel. Please call us at (561) 492-3641.');
    } finally {
      setCancellingId(null);
    }
  };

  const handleLogout = () => { logout(); navigate('/'); };

  const now = new Date();
  const upcoming = appointments.filter(a => new Date(a.start_time) >= now && !['cancelled', 'no_show'].includes(a.status));
  const past     = appointments.filter(a => new Date(a.start_time) < now || ['cancelled', 'completed', 'no_show'].includes(a.status));
  const displayed = activeTab === 'upcoming' ? upcoming : past;

  return (
    <div className="pt-24 min-h-screen bg-brand-brown">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="font-body text-xs tracking-widest uppercase text-brand-gold mb-1">Welcome back</p>
            <h1 className="font-sans text-3xl text-brand-cream">{patient?.first_name} {patient?.last_name}</h1>
          </div>
          <div className="flex gap-3 items-center">
            <Link to="/booking" className="btn-gold text-xs px-5 py-2">Book Again</Link>
            <button onClick={handleLogout} className="font-body text-xs text-brand-cream/30 hover:text-brand-cream/60 transition-colors">Sign Out</button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Loyalty Points', value: patient?.loyalty_points ?? 0, icon: '◆' },
            { label: 'Total Visits',   value: past.filter(a => a.status === 'completed').length, icon: '✓' },
            { label: 'Upcoming',       value: upcoming.length, icon: '◷' },
            { label: 'Member Since',   value: patient?.created_at ? new Date(patient.created_at).getFullYear() : '—', icon: '✦' },
          ].map(({ label, value, icon }) => (
            <div key={label} className="card-dark text-center">
              <div className="text-brand-gold text-lg mb-1">{icon}</div>
              <div className="font-sans text-2xl text-brand-cream">{value}</div>
              <div className="font-body text-xs text-brand-cream/40 mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-brand-gold/10 mb-6">
          {['upcoming', 'past'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-body text-xs tracking-widest uppercase pb-3 border-b-2 transition-colors
                ${activeTab === tab ? 'border-brand-gold text-brand-gold' : 'border-transparent text-brand-cream/40 hover:text-brand-cream/70'}`}
            >
              {tab === 'upcoming' ? `Upcoming (${upcoming.length})` : `Past (${past.length})`}
            </button>
          ))}
        </div>

        {loading ? (
          <LoadingSpinner text="Loading appointments" />
        ) : displayed.length === 0 ? (
          <div className="card-dark text-center py-12">
            <p className="font-body text-sm text-brand-cream/40 mb-4">
              {activeTab === 'upcoming' ? 'No upcoming appointments.' : 'No past appointments.'}
            </p>
            {activeTab === 'upcoming' && (
              <Link to="/booking" className="btn-gold text-xs px-6 py-2">Book Now</Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {displayed.map((appt) => {
              const start  = new Date(appt.start_time);
              const canCancel = ['pending', 'confirmed'].includes(appt.status) && start > now;
              return (
                <div key={appt.id} className="card-dark hover:border-brand-gold/30 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-sans text-lg text-brand-cream">{appt.service_name}</h3>
                        <span className={`font-body text-xs px-2 py-0.5 rounded border capitalize ${statusColors[appt.status] || 'text-brand-cream/40'}`}>
                          {appt.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs font-body text-brand-cream/40">
                        <span>
                          📅 {start.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                          {' '}at{' '}
                          {start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York' })}
                        </span>
                        <span>◷ {appt.duration_minutes} min</span>
                        <span>👤 {appt.provider_first} {appt.provider_last}{appt.credentials ? `, ${appt.credentials}` : ''}</span>
                        {appt.price && <span className="text-brand-gold">${Number(appt.price).toFixed(0)}</span>}
                      </div>
                      {appt.notes && (
                        <p className="font-body text-xs text-brand-cream/30 mt-2 italic">"{appt.notes}"</p>
                      )}
                    </div>
                    {canCancel && (
                      <button
                        onClick={() => handleCancel(appt.id)}
                        disabled={cancellingId === appt.id}
                        className="font-body text-xs text-red-400/60 hover:text-red-400 transition-colors whitespace-nowrap disabled:opacity-40"
                      >
                        {cancellingId === appt.id ? 'Cancelling…' : 'Cancel'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

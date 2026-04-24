import { useState } from 'react';
import { submitContact } from '../services/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await submitContact(form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="py-16 bg-brand-brown text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-brand-gold mb-2">Get in Touch</p>
          <h1 className="section-title">Contact Us</h1>
          <div className="gold-divider" />
          <p className="font-sans text-lg text-brand-cream/60 font-light">
            We'd love to hear from you. Reach out to schedule a consultation or ask us anything.
          </p>
        </div>
      </section>

      <section className="py-16 bg-brand-brown-light">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">

          {/* Contact form */}
          <div>
            <h2 className="font-sans text-2xl text-brand-cream mb-6">Send a Message</h2>
            {success ? (
              <div className="card-dark border-brand-gold/40 text-center py-12">
                <div className="text-3xl text-brand-gold mb-4">✦</div>
                <h3 className="font-sans text-xl text-brand-cream mb-2">Message Sent!</h3>
                <p className="font-body text-sm text-brand-cream/60">Thank you for reaching out. We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-gold">Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required className="input-dark" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="label-gold">Phone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} className="input-dark" placeholder="(555) 000-0000" />
                  </div>
                </div>
                <div>
                  <label className="label-gold">Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required className="input-dark" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="label-gold">Subject</label>
                  <select name="subject" value={form.subject} onChange={handleChange} className="input-dark">
                    <option value="">Select a topic</option>
                    <option>General Inquiry</option>
                    <option>Appointment Question</option>
                    <option>Services & Pricing</option>
                    <option>Membership Information</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="label-gold">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={5} className="input-dark resize-none" placeholder="How can we help you?" />
                </div>
                {error && <p className="font-body text-sm text-red-400">{error}</p>}
                <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-50">
                  {loading ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-body text-xs tracking-widest uppercase text-brand-gold mb-3">Address</h3>
              <p className="font-body text-base text-brand-cream/70 leading-relaxed">
                501 N. Dixie Hwy<br />
                Hallandale Beach, FL 33039
              </p>
            </div>
            <div>
              <h3 className="font-body text-xs tracking-widest uppercase text-brand-gold mb-3">Phone</h3>
              <a href="tel:+15614923641" className="font-body text-base text-brand-cream/70 hover:text-brand-cream transition-colors">
                (561) 492-3641
              </a>
            </div>
            <div>
              <h3 className="font-body text-xs tracking-widest uppercase text-brand-gold mb-3">Email</h3>
              <a href="mailto:info@vitalitywellmedspa.com" className="font-body text-base text-brand-cream/70 hover:text-brand-cream transition-colors">
                info@vitalitywellmedspa.com
              </a>
            </div>
            <div>
              <h3 className="font-body text-xs tracking-widest uppercase text-brand-gold mb-3">Hours</h3>
              <div className="space-y-1">
                {[
                  { days: 'Monday – Friday', hours: '8:00 AM – 8:00 PM' },
                  { days: 'Saturday',        hours: '9:00 AM – 7:00 PM' },
                  { days: 'Sunday',          hours: '9:00 AM – 8:00 PM' },
                ].map(({ days, hours }) => (
                  <div key={days} className="flex justify-between">
                    <span className="font-body text-sm text-brand-cream/60">{days}</span>
                    <span className="font-body text-sm text-brand-cream/40">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded border border-brand-gold/20 overflow-hidden h-48 bg-brand-brown flex items-center justify-center">
              <a
                href="https://maps.google.com/?q=501+N.+Dixie+Hwy+Hallandale+Beach+FL+33039"
                target="_blank"
                rel="noreferrer"
                className="text-center"
              >
                <p className="font-body text-xs tracking-widest uppercase text-brand-gold/60 mb-2">View on Map</p>
                <p className="font-body text-sm text-brand-cream/40">501 N. Dixie Hwy, Hallandale Beach</p>
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

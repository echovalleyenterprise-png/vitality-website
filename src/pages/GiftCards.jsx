import { useState } from 'react';
import { Link } from 'react-router-dom';
import { purchaseGiftCard } from '../services/api';

const AMOUNTS = [50, 100, 150, 200, 250, 500];

export default function GiftCards() {
  const [step, setStep]         = useState(0); // 0=select, 1=details, 2=success
  const [amount, setAmount]     = useState(null);
  const [form, setForm]         = useState({ recipient_name: '', recipient_email: '', sender_name: '', message: '' });
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [giftCard, setGiftCard] = useState(null);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handlePurchase = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await purchaseGiftCard({ amount, ...form });
      setGiftCard(res.data.gift_card);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || 'Purchase failed. Please try again or call us.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-brand-brown">
      {/* Header */}
      <section className="relative py-28 text-center overflow-hidden" style={{ background: '#080808' }}>
        <img
          src="https://images.unsplash.com/photo-1512909006721-3d6018887383?w=1920&q=80"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.18 }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.5) 0%, rgba(8,8,8,0.3) 50%, rgba(8,8,8,0.7) 100%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-brand-gold mb-2">The Perfect Gift</p>
          <h1 className="section-title">Gift Cards</h1>
          <div className="gold-divider" />
          <p className="font-sans text-lg text-brand-cream/60 font-light">
            Give the gift of wellness. Vitality gift cards are perfect for any occasion.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-2xl mx-auto px-6">

          {/* Success */}
          {step === 2 && giftCard && (
            <div className="card-dark text-center py-12 border-brand-gold/40">
              <div className="text-4xl text-brand-gold mb-4">✦</div>
              <h2 className="font-sans text-2xl text-brand-cream mb-2">Gift Card Purchased!</h2>
              <div className="gold-divider" />
              <div className="bg-brand-brown rounded-lg p-6 mb-6 border border-brand-gold/20 max-w-xs mx-auto">
                <p className="font-body text-xs tracking-widest uppercase text-brand-gold/60 mb-3">Gift Card Code</p>
                <p className="font-script text-3xl text-brand-gold mb-2">{giftCard.code}</p>
                <p className="font-body text-sm text-brand-cream/60">Value: <strong className="text-brand-cream">${Number(amount).toFixed(0)}</strong></p>
                <p className="font-body text-sm text-brand-cream/60 mt-1">For: <strong className="text-brand-cream">{giftCard.recipient_name}</strong></p>
              </div>
              <p className="font-body text-sm text-brand-cream/50 mb-6 max-w-sm mx-auto">
                Please save or print this code. The recipient can redeem it at any Vitality Wellness MedSpa appointment.
              </p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => window.print()} className="btn-outline-gold text-xs px-5 py-2">Print / Save</button>
                <Link to="/" className="btn-gold text-xs px-5 py-2">Back to Home</Link>
              </div>
            </div>
          )}

          {/* Step 0: Amount */}
          {step === 0 && (
            <div>
              <h2 className="font-sans text-xl text-brand-cream mb-6">Select an Amount</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt)}
                    className={`card-dark text-center py-8 text-2xl font-script transition-colors hover:border-brand-gold/60
                      ${amount === amt ? 'border-brand-gold text-brand-gold' : 'text-brand-cream/60'}`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
              <button
                disabled={!amount}
                onClick={() => setStep(1)}
                className="btn-gold w-full disabled:opacity-40"
              >
                Continue →
              </button>
            </div>
          )}

          {/* Step 1: Recipient details */}
          {step === 1 && (
            <div>
              <button onClick={() => setStep(0)} className="font-body text-xs text-brand-cream/40 hover:text-brand-cream/70 transition-colors mb-6 block">← Change Amount</button>
              <h2 className="font-sans text-xl text-brand-cream mb-2">Gift Card Details</h2>
              <p className="font-body text-sm text-brand-cream/50 mb-6">
                Amount: <strong className="text-brand-gold text-base">${amount}</strong>
              </p>
              <form onSubmit={handlePurchase} className="space-y-4">
                <div>
                  <label className="label-gold">Recipient Name *</label>
                  <input name="recipient_name" value={form.recipient_name} onChange={handleChange} required className="input-dark" placeholder="Who is this for?" />
                </div>
                <div>
                  <label className="label-gold">Recipient Email</label>
                  <input name="recipient_email" type="email" value={form.recipient_email} onChange={handleChange} className="input-dark" placeholder="Their email (optional)" />
                </div>
                <div>
                  <label className="label-gold">Your Name</label>
                  <input name="sender_name" value={form.sender_name} onChange={handleChange} className="input-dark" placeholder="From (optional)" />
                </div>
                <div>
                  <label className="label-gold">Personal Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={3} className="input-dark resize-none" placeholder="Write a message for the recipient…" />
                </div>

                {/* Payment placeholder */}
                <div className="card-dark border-brand-gold/30">
                  <p className="label-gold mb-2">Payment</p>
                  <div className="bg-brand-brown rounded p-4 text-center">
                    <p className="font-body text-sm text-brand-cream/40">
                      Stripe payment integration connects here.
                    </p>
                    <p className="font-body text-xs text-brand-cream/30 mt-1">
                      Add your Stripe publishable key to <code className="text-brand-gold">.env</code> to enable live payments.
                    </p>
                  </div>
                </div>

                {error && <p className="font-body text-sm text-red-400">{error}</p>}
                <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-50">
                  {loading ? 'Processing…' : `Purchase $${amount} Gift Card`}
                </button>
              </form>
            </div>
          )}

        </div>
      </section>

      {/* Info banner */}
      <section className="py-12 bg-brand-brown-light border-t border-brand-gold/10">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: '◇', title: 'Never Expires', desc: 'Vitality gift cards have no expiration date.' },
            { icon: '✦', title: 'Any Service',    desc: 'Redeemable on any treatment or package.' },
            { icon: '◉', title: 'Easy Booking',   desc: 'Recipients book online or by phone.' },
          ].map(({ icon, title, desc }) => (
            <div key={title}>
              <div className="text-2xl text-brand-gold mb-3">{icon}</div>
              <h3 className="font-sans text-lg text-brand-cream mb-2">{title}</h3>
              <p className="font-body text-sm text-brand-cream/50">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

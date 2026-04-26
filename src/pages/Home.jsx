import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { getServices } from '../services/api';

const whyItems = [
  {
    icon: '◈',
    title: 'Licensed Medical Professionals',
    desc: 'Every service is thoughtfully curated and administered by licensed medical professionals who prioritize safety, comfort, and individualized care.',
  },
  {
    icon: '◇',
    title: 'Personalized Treatment Plans',
    desc: 'We take the time to understand your needs, lifestyle, and goals — creating customized plans that support long-term vitality and whole-body balance.',
  },
  {
    icon: '✦',
    title: 'Science-Backed Treatments',
    desc: 'Our approach blends science-backed treatments with a calm, elevated experience — modern wellness meets intentional care.',
  },
  {
    icon: '◉',
    title: 'Results-Driven Therapies',
    desc: 'Designed to support the body from the inside out — whether restoring energy, supporting immunity, enhancing beauty, or optimizing overall wellness.',
  },
];

const featuredDrips = [
  {
    name: 'Glow Theory',
    subtitle: 'Luminous Within',
    price: 225,
    icon: '✦',
    desc: 'Supports healthy skin, hair, and nails. Promotes natural radiance from within.',
  },
  {
    name: 'Hydra Luxe',
    subtitle: 'The Compass',
    price: 225,
    icon: '◇',
    desc: 'Restores hydration and electrolyte balance. Ideal for dehydration, travel, or workouts.',
  },
  {
    name: 'Focus Flow',
    subtitle: 'Neuro Clarity',
    price: 175,
    icon: '◈',
    desc: 'Supports focus and mental sharpness. Helps combat brain fog and fatigue.',
  },
];

const testimonials = [
  {
    name: 'Maria G.',
    text: 'Absolutely transformed my confidence. The staff made me feel so comfortable and the results were beyond what I expected.',
    service: 'IV Infusion Therapy',
  },
  {
    name: 'Jasmine R.',
    text: 'My drip session left me feeling energized for days. The team is professional, knowledgeable, and so warm. I will be back every month.',
    service: 'Ignite Vitality Drip',
  },
  {
    name: 'Priya S.',
    text: 'Best HydraFacial I have ever had. My skin has never looked this good. I am officially a loyal client for life.',
    service: 'HydraFacial',
  },
];

function EmailSignup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    // Store in localStorage as a simple contact list (no backend needed)
    try {
      const existing = JSON.parse(localStorage.getItem('vitality_subscribers') || '[]');
      const already = existing.find(s => s.email === email);
      if (!already) {
        existing.push({ name, email, date: new Date().toISOString() });
        localStorage.setItem('vitality_subscribers', JSON.stringify(existing));
      }
      setStatus('success');
      setEmail('');
      setName('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2A1A0F 0%, #1a0e06 100%)' }}>
      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }} />
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="font-body text-xs tracking-widest uppercase mb-3" style={{ color: '#C9A96E' }}>Exclusive Offers</p>
        <h2 className="font-display text-3xl md:text-4xl mb-4" style={{ color: '#F5EDD8', fontWeight: 'normal' }}>
          Be the First to Know
        </h2>
        <p className="font-body text-sm leading-relaxed mb-8" style={{ color: '#C0B090' }}>
          Join our wellness community for exclusive packages, seasonal offers, and priority booking — starting with our Mother's Day collection.
        </p>

        {status === 'success' ? (
          <div className="py-6">
            <p className="font-display text-xl mb-2" style={{ color: '#C9A96E' }}>You're on the list 💛</p>
            <p className="font-body text-sm" style={{ color: '#C0B090' }}>Watch for exclusive offers from Vitality Wellness MedSpa.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="text"
              placeholder="First name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="flex-none sm:w-32 px-4 py-3 text-sm font-body outline-none"
              style={{ background: '#0E0E0E', border: '1px solid #3a2a1a', color: '#D4C5A0' }}
            />
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 text-sm font-body outline-none"
              style={{ background: '#0E0E0E', border: '1px solid #3a2a1a', color: '#D4C5A0' }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 text-xs tracking-widest uppercase font-body font-bold transition-opacity hover:opacity-80"
              style={{ background: '#C9A96E', color: '#1a0e06', whiteSpace: 'nowrap' }}
            >
              {status === 'loading' ? '...' : 'Join the List'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-3 text-xs font-body" style={{ color: '#C9A96E' }}>Something went wrong — please try again.</p>
        )}
        <p className="mt-4 text-xs font-body" style={{ color: '#5a4a3a' }}>No spam. Unsubscribe anytime.</p>
      </div>
      {/* Gold bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }} />
    </section>
  );
}

export default function Home() {
  const [featuredServices, setFeaturedServices] = useState([]);

  useEffect(() => {
    getServices()
      .then((res) => setFeaturedServices(res.data.slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <div className="overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative h-screen flex flex-col bg-brand-black overflow-hidden" style={{ minHeight: '680px' }}>

        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.35 }}
        >
          <source src="https://cdn.pixabay.com/video/2023/10/06/183735-872033751_large.mp4" type="video/mp4" />
          <source src="https://cdn.pixabay.com/video/2015/09/06/701-138504820_large.mp4" type="video/mp4" />
        </video>
        {/* Dark gradient overlay so text stays crisp */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(105deg, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.70) 50%, rgba(8,8,8,0.40) 100%)' }}
        />

        {/* Giant "V" watermark — right side */}
        <div className="absolute right-[-4rem] top-0 bottom-0 flex items-center pointer-events-none select-none overflow-hidden">
          <span
            className="font-script leading-none"
            style={{ fontSize: 'clamp(480px, 55vw, 900px)', color: 'rgba(201,168,76,0.04)' }}
          >
            V
          </span>
        </div>

        {/* Thin vertical accent line */}
        <div className="absolute left-0 md:left-16 top-0 h-full w-px bg-gradient-to-b from-transparent via-brand-gold/20 to-transparent" />

        {/* Top horizontal rule */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/25 to-transparent" />

        {/* Main content — left-aligned, vertically centered */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-8 md:px-20 pt-28 pb-10">

            {/* Overline */}
            <p className="font-body text-xs tracking-[0.5em] uppercase text-brand-gold/60 mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-brand-gold/40 inline-block" />
              Hallandale Beach, FL · IV Therapy & Aesthetic Wellness
            </p>

            {/* Script accent */}
            <p className="font-script text-4xl md:text-5xl text-brand-gold/50 mb-3 leading-none">
              Vitality Wellness MedSpa
            </p>

            {/* Main headline — stacked, large */}
            <h1 className="font-sans font-light leading-[0.92] tracking-tight mb-10" style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}>
              <span className="block text-brand-cream/90">Look Well.</span>
              <span className="block text-brand-cream/70">Feel Well.</span>
              <span
                className="block bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #C9A84C 0%, #E4C97A 50%, #C9A84C 100%)' }}
              >
                Live Well.
              </span>
            </h1>

            {/* Gold rule */}
            <div className="w-20 h-px mb-8" style={{ background: 'linear-gradient(90deg, #C9A84C, #E4C97A)' }} />

            {/* Body */}
            <p className="font-body text-base md:text-lg text-brand-grey/80 mb-12 max-w-lg leading-relaxed">
              Where modern wellness meets intentional care — personalized,
              results-driven therapies designed to support your body from the inside out.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Link to="/booking" className="btn-gold">Book Appointment</Link>
              <Link
                to="/services"
                className="font-body text-xs tracking-[0.3em] uppercase text-brand-cream/50 hover:text-brand-gold transition-colors duration-200 flex items-center gap-2"
              >
                Explore Services <span className="text-brand-gold text-base">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats strip pinned to bottom */}
        <div className="relative z-10 border-t border-white/5" style={{ background: '#0E0E0E' }}>
          <div className="max-w-7xl mx-auto px-8 md:px-20 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '500+', label: 'Clients Served' },
              { value: '7', label: 'Days a Week' },
              { value: '6+', label: 'Treatments' },
              { value: '100%', label: 'Licensed Staff' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-4">
                {i > 0 && <div className="hidden md:block w-px h-8 bg-brand-gold/15 flex-shrink-0" />}
                <div>
                  <div
                    className="font-sans text-2xl leading-none bg-clip-text text-transparent"
                    style={{ backgroundImage: 'linear-gradient(135deg, #C9A84C 0%, #E4C97A 100%)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="font-body text-xs tracking-widest uppercase text-brand-grey/60 mt-1">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROMO BANNER ── */}
      <section className="py-5 bg-gold-gradient text-brand-black">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
          <span className="font-body text-xs tracking-[0.3em] uppercase font-bold">New Client Offer</span>
          <span className="hidden sm:block text-brand-black/40">|</span>
          <span className="font-sans text-sm font-light">Book your first session and receive an exclusive 20% discount</span>
          <span className="hidden sm:block text-brand-black/40">|</span>
          <span className="font-body text-xs font-bold tracking-widest uppercase">Use Code: Vitalitymedspa</span>
          <Link to="/booking" className="sm:ml-4 bg-brand-black text-brand-gold font-body text-xs tracking-widest uppercase px-5 py-2 hover:bg-brand-brown-light transition-colors whitespace-nowrap">
            Book Now →
          </Link>
        </div>
      </section>

      {/* ── FEATURED INFUSIONS ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#0E0E0E' }}>
        {/* Subtle background image */}
        <div className="absolute inset-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=60"
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.07 }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <p className="overline">IV Infusion Therapy</p>
          <h2 className="section-title">Signature Drips</h2>
          <div className="gold-divider" />
          <p className="section-subtitle max-w-2xl mx-auto">
            Science-backed infusions administered by licensed professionals — designed to restore, energize, and revitalize.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {featuredDrips.map((drip) => (
              <div key={drip.name} className="card-service text-left group">
                <div className="text-brand-gold text-xl mb-5">{drip.icon}</div>
                <div className="mb-1">
                  <h3 className="font-sans text-2xl text-brand-cream">{drip.name}</h3>
                  <p className="font-body text-xs tracking-widest uppercase text-brand-gold/70 mt-0.5">{drip.subtitle}</p>
                </div>
                <div className="w-8 h-px bg-gold-gradient my-4" />
                <p className="font-body text-sm text-brand-grey leading-relaxed flex-1">{drip.desc}</p>
                <div className="flex items-end justify-between mt-6 pt-4 border-t border-white/5">
                  <div>
                    <span className="price-tag">${drip.price}</span>
                    <span className="price-label ml-1">/ session</span>
                  </div>
                  <Link to="/booking" className="font-body text-xs tracking-widest uppercase text-brand-gold hover:text-brand-gold-light transition-colors">
                    Book →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link to="/services" className="btn-outline-gold">View All Services & Pricing</Link>
          </div>
        </div>
      </section>

      {/* ── PHOTO STRIP ── */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80"
          alt="Vitality Wellness — premium care"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.55) 60%, rgba(8,8,8,0.35) 100%)' }} />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-8 md:px-20">
            <p className="font-script text-5xl md:text-7xl leading-tight" style={{ color: 'rgba(201,168,76,0.75)' }}>
              Wellness from<br />the inside out.
            </p>
            <div className="w-16 h-px mt-4" style={{ background: 'linear-gradient(90deg, #C9A84C, transparent)' }} />
          </div>
        </div>
      </section>

      {/* ── WHY VITALITY ── */}
      <section className="py-24 bg-brand-brown-light">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="overline">Why Choose Us</p>
          <h2 className="section-title">The Vitality Difference</h2>
          <div className="gold-divider" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {whyItems.map((d) => (
              <div key={d.title} className="text-center group">
                <div className="w-14 h-14 rounded-full border border-brand-gold/20 flex items-center justify-center mx-auto mb-5 group-hover:border-brand-gold/50 transition-colors">
                  <span className="text-xl text-brand-gold">{d.icon}</span>
                </div>
                <h3 className="font-sans text-lg text-brand-cream mb-3">{d.title}</h3>
                <p className="font-body text-sm text-brand-grey leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES OVERVIEW STRIP ── */}
      <section className="py-20 bg-brand-brown">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="overline">Everything We Offer</p>
            <h2 className="section-title">Our Treatment Menu</h2>
            <div className="gold-divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Infusion Services */}
            <div className="relative overflow-hidden group" style={{ minHeight: '480px' }}>
              <img
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80"
                alt="IV Infusion Therapy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(8,8,8,0.25) 0%, rgba(8,8,8,0.88) 55%, rgba(8,8,8,0.97) 100%)' }} />
              <div className="absolute inset-0 border border-brand-gold/20 group-hover:border-brand-gold/50 transition-colors duration-300" />
              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                <div className="text-brand-gold text-2xl mb-4">◉</div>
                <h3 className="font-sans text-2xl text-brand-cream mb-2">Infusion Services</h3>
                <div className="w-8 h-px bg-gold-gradient mb-4" />
                <ul className="space-y-2 mb-6">
                  {['Focus Flow – Neuro Clarity', 'Ignite Vitality – Rise & Radiate', 'Resilience Drip – Immune Shield', 'Glow Theory – Luminous Within', 'Hydra Luxe – The Compass', 'Renewal Therapy – Full Reset'].map(s => (
                    <li key={s} className="feature-item">
                      <span className="feature-dot" />
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="font-body text-xs text-brand-gold/70">Starting at $175 / session</p>
              </div>
            </div>

            {/* Signature Packages */}
            <div className="relative overflow-hidden group" style={{ minHeight: '480px' }}>
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80"
                alt="Signature Wellness Packages"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(8,8,8,0.25) 0%, rgba(8,8,8,0.88) 55%, rgba(8,8,8,0.97) 100%)' }} />
              <div className="absolute inset-0 border border-brand-gold/20 group-hover:border-brand-gold/50 transition-colors duration-300" />
              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                <div className="text-brand-gold text-2xl mb-4">✦</div>
                <h3 className="font-sans text-2xl text-brand-cream mb-2">Signature Packages</h3>
                <div className="w-8 h-px bg-gold-gradient mb-4" />
                <ul className="space-y-2 mb-6">
                  {['Signature Vitality – Immunity', 'Optimal Recovery – Performance', 'Comfort Reset – Physical Restoration'].map(s => (
                    <li key={s} className="feature-item">
                      <span className="feature-dot" />
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="font-body text-xs text-brand-gold/70">Starting at $225 / session</p>
              </div>
            </div>

            {/* Additional Services */}
            <div className="relative overflow-hidden group" style={{ minHeight: '480px' }}>
              <img
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80"
                alt="Aesthetic & Skin Services"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(8,8,8,0.25) 0%, rgba(8,8,8,0.88) 55%, rgba(8,8,8,0.97) 100%)' }} />
              <div className="absolute inset-0 border border-brand-gold/20 group-hover:border-brand-gold/50 transition-colors duration-300" />
              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                <div className="text-brand-gold text-2xl mb-4">◇</div>
                <h3 className="font-sans text-2xl text-brand-cream mb-2">Additional Services</h3>
                <div className="w-8 h-px bg-gold-gradient mb-4" />
                <ul className="space-y-2 mb-6">
                  {['HydraFacials', 'Microneedling', 'GLP-1 Medications', 'Weight Loss Solutions', 'Nutritional Education', 'Advanced Skin Services'].map(s => (
                    <li key={s} className="feature-item">
                      <span className="feature-dot" />
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="font-body text-xs text-brand-gold/70">Consultation required</p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link to="/services" className="btn-outline-gold">View Full Treatment Menu</Link>
          </div>
        </div>
      </section>

      {/* ── PHOTO GRID ── */}
      <section className="grid grid-cols-2 md:grid-cols-4 h-64 md:h-80">
        {[
          { src: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80', alt: 'Luxury spa treatment' },
          { src: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=600&q=80', alt: 'Wellness therapy' },
          { src: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80', alt: 'Skincare treatment' },
          { src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80', alt: 'Medical aesthetics' },
        ].map((img, i) => (
          <div key={i} className="relative overflow-hidden group">
            <img
              src={img.src}
              alt={img.alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-brand-black/40 group-hover:bg-brand-black/20 transition-colors duration-300" />
          </div>
        ))}
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 bg-brand-brown-light relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
          <span className="font-script text-[22rem] text-brand-gold leading-none select-none">V</span>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <p className="overline">Ready to Start?</p>
          <h2 className="section-title">Begin Your Journey</h2>
          <div className="gold-divider" />
          <p className="font-body text-base text-brand-grey mb-10 leading-relaxed max-w-xl mx-auto">
            Ready to look and feel your best? Book a consultation with one of our licensed practitioners today. Wellness should feel empowering, restorative, and accessible.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/booking" className="btn-gold">Book an Appointment</Link>
            <Link to="/gift-cards" className="btn-outline-gold">Send a Gift Card</Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-brand-brown">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="overline">Client Stories</p>
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="gold-divider" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {testimonials.map((t) => (
              <div key={t.name} className="card-service text-left">
                <div className="text-brand-gold text-4xl font-sans leading-none mb-4 opacity-40">"</div>
                <p className="font-sans text-lg text-brand-cream/80 font-light leading-relaxed mb-6 italic">{t.text}</p>
                <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                  <div>
                    <p className="font-body text-sm text-brand-gold font-medium">{t.name}</p>
                    <p className="font-body text-xs text-brand-grey mt-0.5">{t.service}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-brand-gold text-xs">★</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM CTA ── */}
      <section className="py-12 bg-brand-brown-light border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-body text-xs tracking-[0.4em] uppercase text-brand-grey mb-3">Follow Our Journey</p>
          <a
            href="https://instagram.com/vitalitywellnessmedspa"
            target="_blank"
            rel="noreferrer"
            className="font-sans text-3xl text-brand-gold hover:text-brand-gold-light transition-colors"
          >
            @vitalitywellnessmedspa
          </a>
        </div>
      </section>

      {/* ── EMAIL SIGNUP ── */}
      <EmailSignup />

      {/* ── LOCATION / HOURS STRIP ── */}
      <section className="py-14 bg-brand-brown border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="font-body text-xs tracking-widest uppercase text-brand-gold mb-3">Location</p>
              <p className="font-body text-sm text-brand-grey leading-relaxed">
                501 N. Dixie Hwy<br />Hallandale Beach, FL 33039
              </p>
            </div>
            <div>
              <p className="font-body text-xs tracking-widest uppercase text-brand-gold mb-3">Hours</p>
              <p className="font-body text-sm text-brand-grey leading-relaxed">
                Mon–Fri: 8am – 8pm<br />
                Sat: 9am – 7pm &nbsp;·&nbsp; Sun: 9am – 8pm
              </p>
            </div>
            <div>
              <p className="font-body text-xs tracking-widest uppercase text-brand-gold mb-3">Contact</p>
              <a href="tel:+15614923641" className="block font-body text-sm text-brand-grey hover:text-brand-cream transition-colors">(561) 492-3641</a>
              <a href="mailto:info@vitalitywellmedspa.com" className="block font-body text-sm text-brand-grey hover:text-brand-cream transition-colors mt-1">info@vitalitywellmedspa.com</a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

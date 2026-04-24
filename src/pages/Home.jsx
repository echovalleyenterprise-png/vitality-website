import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
      <section className="relative min-h-screen flex items-center justify-center bg-brand-black">
        {/* Decorative rings */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-brand-gold/8" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-brand-gold/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full border border-brand-gold/3" />
          {/* Subtle corner accents */}
          <div className="absolute top-16 left-16 w-16 h-16 border-t border-l border-brand-gold/20" />
          <div className="absolute top-16 right-16 w-16 h-16 border-t border-r border-brand-gold/20" />
          <div className="absolute bottom-16 left-16 w-16 h-16 border-b border-l border-brand-gold/20" />
          <div className="absolute bottom-16 right-16 w-16 h-16 border-b border-r border-brand-gold/20" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24">
          <p className="overline mb-6">Hallandale Beach, FL</p>

          <h1 className="font-script text-8xl md:text-[10rem] bg-gold-gradient bg-clip-text text-transparent leading-none mb-2">
            Vitality
          </h1>
          <p className="font-body text-xs tracking-[0.6em] uppercase text-brand-grey mb-10">
            Wellness MedSpa
          </p>

          <div className="gold-divider" />

          <p className="font-sans text-2xl md:text-4xl text-brand-cream font-light tracking-wide mb-4">
            Look well. Feel well. Live well.
          </p>
          <p className="font-body text-base text-brand-grey mb-12 max-w-xl mx-auto leading-relaxed">
            Where modern wellness meets intentional care — personalized, results-driven therapies designed to support your body from the inside out.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/booking" className="btn-gold">Book Your Appointment</Link>
            <Link to="/services" className="btn-outline-gold">Explore Services</Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-10 bg-gold-gradient" />
          <p className="font-body text-xs tracking-widest uppercase text-brand-gold/40">Scroll</p>
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
      <section className="py-24 bg-brand-brown">
        <div className="max-w-7xl mx-auto px-6 text-center">
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
            <div className="card-dark border border-brand-gold/20 p-8">
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

            {/* Signature Packages */}
            <div className="card-dark border border-brand-gold/20 p-8">
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

            {/* Additional Services */}
            <div className="card-dark border border-brand-gold/20 p-8">
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

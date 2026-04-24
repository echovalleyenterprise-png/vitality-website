import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../services/api';

/* ── Static service data from brochure ── */
const infusionServices = [
  {
    id: 'focus-flow',
    name: 'Focus Flow',
    subtitle: 'Neuro Clarity',
    price: 175,
    icon: '◈',
    features: [
      'Supports focus and mental sharpness',
      'Helps combat brain fog and fatigue',
      'Designed for productivity and cognitive balance',
    ],
  },
  {
    id: 'ignite-vitality',
    name: 'Ignite Vitality',
    subtitle: 'Rise & Radiate',
    price: 175,
    icon: '◉',
    features: [
      'Helps boost energy and vitality',
      'Supports alertness without jitters',
      'Ideal for busy days or low-energy moments',
    ],
  },
  {
    id: 'resilience-drip',
    name: 'Resilience Drip',
    subtitle: 'Immune Shield',
    price: 190,
    icon: '◇',
    features: [
      'Supports immune defense and resilience',
      'Helps the body respond to stress and travel',
      'Ideal for seasonal or lifestyle support',
    ],
  },
  {
    id: 'glow-theory',
    name: 'Glow Theory',
    subtitle: 'Luminous Within',
    price: 225,
    icon: '✦',
    features: [
      'Supports healthy skin, hair, and nails',
      'Promotes natural radiance from within',
      'Designed to enhance beauty and glow',
    ],
  },
  {
    id: 'hydra-luxe',
    name: 'Hydra Luxe',
    subtitle: 'The Compass',
    price: 225,
    icon: '◆',
    features: [
      'Restores hydration and electrolyte balance',
      'Supports cellular function and recovery',
      'Ideal for dehydration, travel, or workouts',
    ],
  },
  {
    id: 'renewal-therapy',
    name: 'Renewal Therapy',
    subtitle: 'Full Reset',
    price: 225,
    icon: '❋',
    features: [
      'Supports detox pathways and cellular renewal',
      'Helps restore balance and overall vitality',
      'Ideal for recovery after stress or overindulgence',
    ],
  },
];

const signaturePackages = [
  {
    id: 'sig-vitality',
    name: 'Signature Vitality',
    subtitle: 'Immunity',
    price: 250,
    icon: '◈',
    highlight: false,
    features: [
      'Supports daily energy and overall wellness',
      'Helps maintain immune and nutrient balance',
      'Ideal for routine health optimization',
    ],
  },
  {
    id: 'optimal-recovery',
    name: 'Optimal Recovery',
    subtitle: 'Performance Recovery',
    price: 225,
    icon: '◉',
    highlight: true,
    features: [
      'Aids muscle recovery and physical performance',
      'Supports endurance and post-activity repair',
      'Designed for active, high-demand lifestyles',
    ],
  },
  {
    id: 'comfort-reset',
    name: 'Comfort Reset',
    subtitle: 'Physical Restoration',
    price: 250,
    icon: '◇',
    highlight: false,
    features: [
      'Helps ease tension and physical discomfort',
      'Promotes relaxation and nervous system balance',
      'Supports overall comfort and recovery',
    ],
  },
];

const additionalServices = [
  { name: 'HydraFacials',          icon: '◇', desc: 'Advanced skin resurfacing that cleanses, exfoliates, and hydrates for a radiant complexion.' },
  { name: 'Microneedling',         icon: '◈', desc: 'Stimulates collagen production to smooth texture, reduce scars, and rejuvenate skin tone.' },
  { name: 'GLP-1 Medications',     icon: '◉', desc: 'Medically supervised GLP-1 therapy for blood sugar regulation and sustainable weight management.' },
  { name: 'Weight Loss Solutions', icon: '✦', desc: 'Comprehensive, medically supervised weight management programs tailored to your body and goals.' },
  { name: 'Nutritional Education', icon: '◆', desc: 'Personalized guidance on nutrition to complement your wellness treatments and support long-term health.' },
  { name: 'Advanced Skin Services',icon: '❋', desc: 'Medical-grade skin treatments targeting your unique concerns — from pigmentation to anti-aging.' },
];

export default function Services() {
  const [apiServices, setApiServices] = useState([]);

  useEffect(() => {
    getServices()
      .then((res) => setApiServices(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="pt-24">

      {/* ── PAGE HEADER ── */}
      <section className="py-20 bg-brand-black text-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
          <span className="font-script text-[18rem] text-brand-gold leading-none select-none">V</span>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <p className="overline">What We Offer</p>
          <h1 className="section-title">Our Services</h1>
          <div className="gold-divider" />
          <p className="font-sans text-lg text-brand-grey font-light leading-relaxed">
            Personalized, results-driven therapies administered by licensed medical professionals. Every treatment plan is designed around your unique goals.
          </p>
        </div>
      </section>

      {/* ── INFUSION SERVICES ── */}
      <section className="py-20 bg-brand-brown">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-5 mb-12">
            <span className="text-3xl text-brand-gold">◉</span>
            <div>
              <h2 className="font-sans text-4xl text-brand-cream">Infusion Services</h2>
              <p className="font-body text-xs tracking-widest uppercase text-brand-gold/60 mt-1">IV Drip Therapy</p>
            </div>
            <div className="flex-1 h-px bg-white/5 ml-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {infusionServices.map((svc) => (
              <div key={svc.id} className="card-service group">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xl text-brand-gold">{svc.icon}</span>
                  <div className="text-right">
                    <span className="price-tag">${svc.price}</span>
                    <span className="price-label ml-1">/ session</span>
                  </div>
                </div>
                <h3 className="font-sans text-xl text-brand-cream">{svc.name}</h3>
                <p className="font-body text-xs tracking-widest uppercase text-brand-gold/60 mb-4">{svc.subtitle}</p>
                <div className="w-8 h-px bg-gold-gradient mb-4" />
                <ul className="space-y-2.5 flex-1">
                  {svc.features.map((f) => (
                    <li key={f} className="feature-item">
                      <span className="feature-dot" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to={`/booking`} className="btn-outline-gold mt-6 text-xs py-2 w-full text-center">
                  Book This Drip
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIGNATURE PACKAGES ── */}
      <section className="py-20 bg-brand-brown-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-5 mb-12">
            <span className="text-3xl text-brand-gold">✦</span>
            <div>
              <h2 className="font-sans text-4xl text-brand-cream">Signature Therapy Packages</h2>
              <p className="font-body text-xs tracking-widest uppercase text-brand-gold/60 mt-1">Premium Wellness Programs</p>
            </div>
            <div className="flex-1 h-px bg-white/5 ml-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {signaturePackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`card-service group relative ${pkg.highlight ? 'border border-brand-gold/40 ring-1 ring-brand-gold/20' : ''}`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gold-gradient text-brand-black font-body text-xs tracking-widest uppercase px-4 py-1 rounded-full font-semibold whitespace-nowrap">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xl text-brand-gold">{pkg.icon}</span>
                  <div className="text-right">
                    <span className="price-tag">${pkg.price}</span>
                    <span className="price-label ml-1">/ session</span>
                  </div>
                </div>
                <h3 className="font-sans text-xl text-brand-cream">{pkg.name}</h3>
                <p className="font-body text-xs tracking-widest uppercase text-brand-gold/60 mb-4">{pkg.subtitle}</p>
                <div className="w-8 h-px bg-gold-gradient mb-4" />
                <ul className="space-y-2.5 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="feature-item">
                      <span className="feature-dot" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/booking" className={`mt-6 text-xs py-2 w-full text-center ${pkg.highlight ? 'btn-gold' : 'btn-outline-gold'}`}>
                  Book Package
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADDITIONAL SERVICES ── */}
      <section className="py-20 bg-brand-brown">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-5 mb-12">
            <span className="text-3xl text-brand-gold">◇</span>
            <div>
              <h2 className="font-sans text-4xl text-brand-cream">Additional Services</h2>
              <p className="font-body text-xs tracking-widest uppercase text-brand-gold/60 mt-1">Aesthetic & Wellness Treatments</p>
            </div>
            <div className="flex-1 h-px bg-white/5 ml-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {additionalServices.map((svc) => (
              <div key={svc.name} className="card-service group">
                <div className="text-brand-gold text-lg mb-4">{svc.icon}</div>
                <h3 className="font-sans text-xl text-brand-cream mb-2">{svc.name}</h3>
                <div className="w-8 h-px bg-gold-gradient mb-4" />
                <p className="font-body text-sm text-brand-grey leading-relaxed flex-1">{svc.desc}</p>
                <Link to="/contact" className="btn-outline-gold mt-6 text-xs py-2 w-full text-center">
                  Request Consultation
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-brand-brown-light text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="overline">Not Sure Where to Start?</p>
          <h2 className="font-sans text-3xl text-brand-cream mb-4">Let Us Create Your Plan</h2>
          <div className="gold-divider" />
          <p className="font-body text-sm text-brand-grey mb-8 leading-relaxed">
            Wellness is not one-size-fits-all. Schedule a complimentary consultation and we will build a customized treatment plan tailored specifically to your goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="btn-gold">Request a Consultation</Link>
            <Link to="/booking" className="btn-outline-gold">Book Directly</Link>
          </div>
        </div>
      </section>

    </div>
  );
}

import { Link } from 'react-router-dom';

const values = [
  { icon: '◈', title: 'Safety First',       desc: 'Every service is administered by licensed medical professionals in a safe, clinical environment.' },
  { icon: '◇', title: 'Individualized Care', desc: 'No two clients are the same. We build customized plans around your unique needs and goals.' },
  { icon: '✦', title: 'Science-Backed',      desc: 'Our treatments are rooted in evidence-based medicine and modern wellness science.' },
  { icon: '◉', title: 'Ongoing Support',     desc: 'From your first visit to your ongoing care — expertise, transparency, and commitment to excellence.' },
];

const stats = [
  { number: '500+', label: 'Clients Served' },
  { number: '7',    label: 'Days a Week' },
  { number: '6+',   label: 'Treatments Offered' },
  { number: '100%', label: 'Licensed Professionals' },
];

export default function About() {
  return (
    <div className="pt-24">

      {/* ── HERO ── */}
      <section className="py-24 bg-brand-black text-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 left-16 w-16 h-16 border-t border-l border-brand-gold/15" />
          <div className="absolute top-16 right-16 w-16 h-16 border-t border-r border-brand-gold/15" />
          <div className="absolute bottom-16 left-16 w-16 h-16 border-b border-l border-brand-gold/15" />
          <div className="absolute bottom-16 right-16 w-16 h-16 border-b border-r border-brand-gold/15" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <p className="overline">Our Story</p>
          <h1 className="section-title">About Vitality Wellness MedSpa</h1>
          <div className="gold-divider" />
          <p className="font-sans text-xl text-brand-grey font-light leading-relaxed">
            Where modern wellness meets intentional care — dedicated to helping our clients feel energized, balanced, and confident.
          </p>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-24 bg-brand-brown">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="overline mb-4">Our Mission</p>
            <h2 className="font-sans text-4xl text-brand-cream mb-6 leading-tight">
              Wellness From the<br />Inside Out
            </h2>
            <div className="gold-divider-left" />
            <p className="font-body text-base text-brand-grey leading-relaxed mb-5">
              Vitality Wellness MedSpa is where modern wellness meets intentional care. We are dedicated to helping our clients feel energized, balanced, and confident through personalized, results-driven therapies designed to support the body from the inside out.
            </p>
            <p className="font-body text-base text-brand-grey leading-relaxed mb-5">
              Our approach blends science-backed treatments with a calm, elevated experience. Every service is thoughtfully curated and administered by licensed medical professionals who prioritize safety, comfort, and individualized care.
            </p>
            <p className="font-body text-base text-brand-grey leading-relaxed">
              Whether you are focused on restoring energy, supporting immunity, enhancing beauty, or optimizing overall wellness, our goal is to meet you exactly where you are.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ number, label }) => (
              <div key={label} className="card-service text-center py-8">
                <p className="font-script text-5xl text-brand-gold mb-2">{number}</p>
                <p className="font-body text-xs tracking-widest uppercase text-brand-grey">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="py-24 bg-brand-brown-light">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Decorative side panel */}
          <div className="relative hidden md:block">
            <div className="border border-brand-gold/20 p-12 relative">
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-brand-gold -translate-x-2 -translate-y-2" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-brand-gold translate-x-2 translate-y-2" />
              <p className="font-script text-5xl text-brand-gold/20 leading-tight text-center">
                "Wellness is not one size fits all."
              </p>
            </div>
          </div>

          <div>
            <p className="overline mb-4">Our Philosophy</p>
            <h2 className="font-sans text-4xl text-brand-cream mb-6">A Personalized Approach</h2>
            <div className="gold-divider-left" />
            <p className="font-body text-base text-brand-grey leading-relaxed mb-5">
              At Vitality, wellness is not one size fits all. We take the time to understand your needs, lifestyle, and goals, creating customized treatment plans that support long-term vitality and whole-body balance.
            </p>
            <p className="font-body text-base text-brand-grey leading-relaxed mb-5">
              From your first visit to your ongoing care, you can expect expertise, transparency, and a commitment to excellence. We believe wellness should feel empowering, restorative, and accessible.
            </p>
            <p className="font-body text-lg text-brand-cream/80 font-sans font-light leading-relaxed">
              Vitality Wellness MedSpa exists to help you <span className="text-brand-gold">look well</span>, <span className="text-brand-gold">feel well</span>, and <span className="text-brand-gold">live well</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24 bg-brand-brown text-center">
        <div className="max-w-6xl mx-auto px-6">
          <p className="overline">What We Stand For</p>
          <h2 className="section-title">Our Core Values</h2>
          <div className="gold-divider" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {values.map((v) => (
              <div key={v.title} className="card-service text-center py-10 group">
                <div className="w-14 h-14 rounded-full border border-brand-gold/20 flex items-center justify-center mx-auto mb-5 group-hover:border-brand-gold/50 transition-colors">
                  <span className="text-xl text-brand-gold">{v.icon}</span>
                </div>
                <h3 className="font-sans text-lg text-brand-cream mb-3">{v.title}</h3>
                <div className="w-6 h-px bg-gold-gradient mx-auto mb-3" />
                <p className="font-body text-sm text-brand-grey leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM PLACEHOLDER ── */}
      <section className="py-24 bg-brand-brown-light text-center">
        <div className="max-w-6xl mx-auto px-6">
          <p className="overline">Our Experts</p>
          <h2 className="section-title">Licensed Professionals</h2>
          <div className="gold-divider" />
          <p className="font-body text-base text-brand-grey max-w-2xl mx-auto mb-12 leading-relaxed">
            Every service at Vitality is administered by licensed medical professionals who prioritize your safety, comfort, and individual care. Our team brings years of specialized experience in wellness medicine.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Medical Director', cred: 'Board-Certified',         desc: 'Specialized in aesthetic medicine and regenerative wellness with years of clinical expertise.' },
              { title: 'Infusion Specialists', cred: 'RN / NP Certified',   desc: 'Trained in advanced IV therapy protocols, infusion safety, and personalized wellness treatments.' },
              { title: 'Wellness Consultants', cred: 'Patient Coordinators', desc: 'Dedicated to guiding you through your wellness journey from first consultation to follow-up care.' },
            ].map((m) => (
              <div key={m.title} className="card-service text-center py-10">
                <div className="w-20 h-20 rounded-full border border-brand-gold/30 bg-brand-brown flex items-center justify-center mx-auto mb-5">
                  <span className="font-script text-3xl text-brand-gold">V</span>
                </div>
                <h3 className="font-sans text-xl text-brand-cream mb-1">{m.title}</h3>
                <p className="font-body text-xs tracking-widest uppercase text-brand-gold/70 mb-1">{m.cred}</p>
                <div className="w-8 h-px bg-gold-gradient mx-auto my-3" />
                <p className="font-body text-sm text-brand-grey leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-brand-brown text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="overline">Ready to Begin?</p>
          <h2 className="font-sans text-3xl text-brand-cream mb-4">Experience the Difference</h2>
          <div className="gold-divider" />
          <p className="font-body text-sm text-brand-grey mb-8 leading-relaxed">
            Book a consultation with our team today. We will take the time to understand your goals and create a personalized wellness plan just for you.
          </p>
          <Link to="/booking" className="btn-gold">Book a Consultation</Link>
        </div>
      </section>

    </div>
  );
}

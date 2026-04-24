export default function Logo({ size = 'md' }) {
  const sizes = {
    sm: { script: 'text-3xl', caps: 'text-[9px]', gap: 'gap-1' },
    md: { script: 'text-4xl', caps: 'text-[10px]', gap: 'gap-1' },
    lg: { script: 'text-5xl', caps: 'text-xs', gap: 'gap-2' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className={`flex flex-col items-center ${s.gap}`}>
      {/* Leaf flourish SVG */}
      <svg width="40" height="18" viewBox="0 0 40 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 17 C14 12, 2 8, 1 2 C8 4, 16 10, 20 17Z" fill="url(#gf)" opacity="0.9"/>
        <path d="M20 17 C26 12, 38 8, 39 2 C32 4, 24 10, 20 17Z" fill="url(#gf)" opacity="0.9"/>
        <defs>
          <linearGradient id="gf" x1="0" y1="0" x2="40" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C9A84C"/>
            <stop offset="50%" stopColor="#E4C97A"/>
            <stop offset="100%" stopColor="#C9A84C"/>
          </linearGradient>
        </defs>
      </svg>
      <span className={`font-script bg-gold-gradient bg-clip-text text-transparent ${s.script} leading-none`}>
        Vitality
      </span>
      <span className={`font-body tracking-[0.3em] text-brand-cream/80 uppercase ${s.caps}`}>
        Wellness MedSpa
      </span>
    </div>
  );
}

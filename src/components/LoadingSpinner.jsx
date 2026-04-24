export default function LoadingSpinner({ size = 'md', text = '' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div className={`${sizes[size]} border-2 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin`} />
      {text && <p className="font-body text-xs tracking-widest uppercase text-brand-gold/60">{text}</p>}
    </div>
  );
}

function PromoModal({ promo, theme, onClose }) {
  const [progress, setProgress] = React.useState(0);
  const PROGRESS_MS = 8000;

  React.useEffect(() => {
    document.body.classList.add('locked');
    const esc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', esc);
    return () => {
      document.body.classList.remove('locked');
      window.removeEventListener('keydown', esc);
    };
  }, [onClose]);

  React.useEffect(() => {
    setProgress(0);
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / PROGRESS_MS);
      setProgress(p);
      if (p >= 1) onClose();
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [promo.id, onClose]);

  if (!promo) return null;
  const waHref = buildWhatsAppUrl(promo.waMessage || 'Hola GLOWD! Quiero info.');

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
      <button onClick={onClose} className="absolute top-5 right-5 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 inline-flex items-center justify-center text-white z-10">
        <Icon.Close className="w-4 h-4"/>
      </button>

      <div className="relative w-full max-w-[420px] aspect-[9/16] rounded-3xl overflow-hidden text-white bg-black">
        {/* Subtle radial gradient backdrop */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 70% at 50% 0%, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 60%), linear-gradient(180deg, #0c0c0c 0%, #000 100%)' }}/>

        {/* Progress bar */}
        <div className="absolute top-3 left-3 right-3 flex gap-1 z-10">
          <div className="flex-1 h-[2.5px] bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white transition-[width] duration-100" style={{ width: `${progress * 100}%` }}/>
          </div>
        </div>

        {/* Tap zones */}
        <button onClick={onClose} className="absolute left-0 top-0 bottom-0 w-1/3 z-[5]" aria-label="Cerrar"/>
        <button onClick={onClose} className="absolute right-0 top-0 bottom-0 w-1/3 z-[5]" aria-label="Cerrar"/>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col px-7 pt-14 pb-24">
          <div className="font-display font-extrabold text-center tracking-tightest text-[40px] leading-[0.95]">
            {promo.title}
          </div>
          <div className="mx-auto mt-3 mb-5 h-px w-12 bg-white/40"/>
          <ul className="flex-1 flex flex-col justify-center gap-4 text-center">
            {promo.bullets.map((b, i) => (
              <li key={i} className="text-[14px] leading-snug font-medium tracking-tight">
                {b.icon && <span className="mr-1">{b.icon}</span>}
                {b.text}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-center">
            <div className="h-14 w-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
              <img src="assets/logo-white.png" alt="GLOWD" className="w-9 h-9 object-contain"/>
            </div>
          </div>
        </div>

        {/* CTA */}
        <a href={waHref} target="_blank" rel="noreferrer"
          className="absolute bottom-5 left-4 right-4 h-11 rounded-full bg-white text-black inline-flex items-center justify-center text-[13px] font-medium gap-2 z-10">
          <Icon.Whatsapp className="w-4 h-4"/> Cotizar mi iPhone
        </a>
      </div>
    </div>
  );
}

window.PromoModal = PromoModal;

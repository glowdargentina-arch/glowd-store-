function StoryModal({ story, theme, onClose, allStories, photos }) {
  const dark = theme === 'dark';
  const [idx, setIdx] = React.useState(() => allStories.findIndex(s => s.id === story.id));
  const base = allStories[idx];
  const current = base ? { ...base, photo: (photos && photos[`story-${base.id}`]) || base.photo || null } : null;
  const [progress, setProgress] = React.useState(0);
  const PROGRESS_MS = 6000;

  React.useEffect(() => {
    document.body.classList.add('locked');
    const esc = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', esc);
    return () => { document.body.classList.remove('locked'); window.removeEventListener('keydown', esc); };
  }, []);

  React.useEffect(() => {
    setProgress(0);
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / PROGRESS_MS);
      setProgress(p);
      if (p >= 1) {
        if (idx < allStories.length - 1) setIdx(idx + 1);
        else onClose();
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [idx]);

  const next = () => setIdx(i => Math.min(allStories.length - 1, i + 1));
  const prev = () => setIdx(i => Math.max(0, i - 1));

  if (!current) return null;

  const tones = {
    g1:'#3a3a3a', g2:'#4a4a4a', g3:'#5a5a5a', g4:'#2c2c2c', g5:'#6a6a6a', g6:'#1a1a1a',
    g7:'#3f3f3f', g8:'#2a2a2a', g9:'#555555', g10:'#444444', g11:'#666666', g12:'#383838',
    g13:'#4b4b4b', g14:'#2f2f2f'
  };
  const bgColor = tones[current.tone] || '#222';
  const initials = current.name.split(' ').map(w => w[0]).join('').slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
      <button onClick={onClose} className="absolute top-5 right-5 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 inline-flex items-center justify-center text-white z-10">
        <Icon.Close className="w-4 h-4"/>
      </button>

      <div className="relative w-full max-w-[420px] aspect-[9/16] rounded-3xl overflow-hidden text-white"
           style={{ background: `linear-gradient(170deg, ${bgColor} 0%, #050505 100%)` }}>
        {current.photo ? (
          <>
            <img src={current.photo} alt={current.name} className="absolute inset-0 w-full h-full object-cover"/>
            {/* Subtle vignette at top/bottom only so header + CTA stay legible */}
            <div className="absolute inset-x-0 top-0 h-32" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0))' }}/>
            <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.65), rgba(0,0,0,0))' }}/>
          </>
        ) : (
          <div className="absolute inset-0 stripe-placeholder opacity-50"/>
        )}

        {/* Progress bars */}
        <div className="absolute top-3 left-3 right-3 flex gap-1 z-10">
          {allStories.map((_, i) => (
            <div key={i} className="flex-1 h-[2.5px] bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white transition-[width] duration-100" style={{
                width: i < idx ? '100%' : i === idx ? `${progress * 100}%` : '0%'
              }}/>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-7 left-4 right-4 flex items-center gap-3 z-10">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-white/15 flex items-center justify-center font-display font-bold text-sm tracking-tighter">
            {current.photo
              ? <img src={current.photo} alt="" className="w-full h-full object-cover"/>
              : initials}
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-medium truncate">{current.name}</div>
            <div className="text-[10px] opacity-70 font-mono">{current.city} · {current.model}</div>
          </div>
        </div>

        {/* Tap zones */}
        <button onClick={prev} className="absolute left-0 top-0 bottom-0 w-1/3 z-[5]" aria-label="Anterior"/>
        <button onClick={next} className="absolute right-0 top-0 bottom-0 w-1/3 z-[5]" aria-label="Siguiente"/>

        {/* Content — quote (only when there's no photo) */}
        {!current.photo && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
            <div className="font-serif italic text-6xl opacity-30 mb-4">"</div>
            <blockquote className="font-display text-[22px] md:text-[26px] leading-snug tracking-tight">
              {current.quote}
            </blockquote>
            <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] opacity-70">
              Cliente verificado · GLOWD
            </div>
          </div>
        )}

        {/* CTA at bottom */}
        <a
          href={`https://wa.me/5493425174996?text=${encodeURIComponent('Hola, vi los testimonios y quiero consultar.')}`}
          target="_blank" rel="noreferrer"
          className="absolute bottom-5 left-4 right-4 h-11 rounded-full bg-white text-black inline-flex items-center justify-center text-[13px] font-medium gap-2 z-10">
          <Icon.Whatsapp className="w-4 h-4"/> Quiero el mío
        </a>
      </div>
    </div>
  );
}

window.StoryModal = StoryModal;

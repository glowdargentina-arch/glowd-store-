function Highlights({ theme, style, onOpenStory, onOpenPromo, editPhotos, photos: photosProp }) {
  const dark = theme === 'dark';
  const scrollerRef = React.useRef(null);
  const [photosLocal, setPhotosLocal] = React.useState({});
  const [bump, setBump] = React.useState(0);
  const photos = photosProp || photosLocal;

  // If parent doesn't pass photos, fetch our own copy.
  React.useEffect(() => {
    if (photosProp) return;
    let cancelled = false;
    fetch('.image-slots.state.json', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : {})
      .then(j => {
        if (cancelled || !j) return;
        const out = {};
        Object.keys(j).forEach(k => {
          const v = j[k];
          const u = typeof v === 'string' ? v : v && v.u;
          if (u && /^data:image\//i.test(u)) out[k] = u;
        });
        setPhotosLocal(out);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [editPhotos, bump, photosProp]);

  // Re-fetch sidecar when the user drops/clears a slot in edit mode.
  React.useEffect(() => {
    if (!editPhotos) return;
    const onChange = () => setTimeout(() => setBump(b => b + 1), 250);
    document.addEventListener('image-slot-change', onChange);
    // Some host setups fire a simple storage-style event; also listen on focus.
    window.addEventListener('focus', onChange);
    return () => {
      document.removeEventListener('image-slot-change', onChange);
      window.removeEventListener('focus', onChange);
    };
  }, [editPhotos]);

  const scroll = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <section className="relative py-10 md:py-16">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between mb-6 md:mb-10">
          <div>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] opacity-60">
              <LogoMark theme={theme} className="h-4 w-4 opacity-90"/>
              Historias
            </div>
            <h2 className="mt-2 font-display font-extrabold text-3xl md:text-5xl tracking-tightest">
              Clientes GLOWD
            </h2>
            <p className="mt-3 opacity-65 text-[14px] max-w-md">
              {editPhotos
                ? 'Modo edición — arrastrá una foto sobre cada círculo. Se guarda sola.'
                : 'Fotos de clientes con su iPhone GLOWD.'}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => scroll(-1)} className={"h-10 w-10 rounded-full inline-flex items-center justify-center border " +
              (dark ? 'border-white/15 hover:bg-white/5' : 'border-black/15 hover:bg-black/5')} aria-label="Anterior">
              <Icon.Arrow className="w-4 h-4 rotate-180"/>
            </button>
            <button onClick={() => scroll(1)} className={"h-10 w-10 rounded-full inline-flex items-center justify-center border " +
              (dark ? 'border-white/15 hover:bg-white/5' : 'border-black/15 hover:bg-black/5')} aria-label="Siguiente">
              <Icon.Arrow className="w-4 h-4"/>
            </button>
          </div>
        </div>

        {editPhotos && (
          <div className={"mb-6 p-3 rounded-2xl border text-[12px] inline-flex items-center gap-3 " +
            (dark ? 'border-white/15 bg-white/5' : 'border-black/15 bg-black/5')}>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">Modo edición</span>
            <span className="opacity-80">Arrastrá fotos a los círculos · click para elegir un archivo · doble click para reencuadrar</span>
          </div>
        )}

        <div className="relative">
          <div ref={scrollerRef} className="flex gap-5 md:gap-7 overflow-x-auto pb-4 snap-x snap-mandatory scroll-px-6"
               style={{ scrollbarWidth: 'none' }}>
            <style>{`.ig-scroller::-webkit-scrollbar{display:none}`}</style>
            {/* Promo highlights first (Plan Canje, etc.) */}
            {PROMOS && PROMOS.map((p) => (
              <div key={'promo-' + p.id} className="shrink-0 snap-start text-center" style={{ width: 'clamp(96px, 14vw, 132px)' }}>
                <button onClick={() => onOpenPromo && onOpenPromo(p)} className="group block w-full">
                  <PromoAvatar promo={p} theme={theme}/>
                </button>
                <div className="mt-3 text-[12px] md:text-[13px] tracking-tight">
                  <div className="opacity-90 font-medium truncate">{p.label}</div>
                  <div className="opacity-50 text-[11px] truncate">Cotizar</div>
                </div>
              </div>
            ))}
            {STORIES.map((s) => (
              <div key={s.id} className="shrink-0 snap-start text-center" style={{ width: 'clamp(96px, 14vw, 132px)' }}>
                {editPhotos ? (
                  <HighlightEditAvatar story={s} theme={theme}/>
                ) : (
                  <button
                    onClick={() => onOpenStory({ ...s, photo: photos[`story-${s.id}`] || null })}
                    className="group block w-full">
                    <HighlightAvatar story={s} theme={theme} style={style} photo={photos[`story-${s.id}`] || null}/>
                  </button>
                )}
                <div className="mt-3 text-[12px] md:text-[13px] tracking-tight">
                  <div className="opacity-90 font-medium truncate">{s.name}</div>
                  <div className="opacity-50 text-[11px] truncate">{s.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const TONE_GRADIENTS = {
  g1:  { from: '#3a3a3a', to: '#0a0a0a', glyph: 'CR' },
  g2:  { from: '#4a4a4a', to: '#1a1a1a', glyph: 'ML' },
  g3:  { from: '#5a5a5a', to: '#0a0a0a', glyph: 'FP' },
  g4:  { from: '#2c2c2c', to: '#5a5a5a', glyph: 'TA' },
  g5:  { from: '#6a6a6a', to: '#222',    glyph: 'LF' },
  g6:  { from: '#1a1a1a', to: '#444',    glyph: 'NV' },
  g7:  { from: '#3f3f3f', to: '#111',    glyph: 'SM' },
  g8:  { from: '#2a2a2a', to: '#666',    glyph: 'FG' },
  g9:  { from: '#555',    to: '#0a0a0a', glyph: 'AC' },
  g10: { from: '#444',    to: '#1a1a1a', glyph: 'IB' },
  g11: { from: '#666',    to: '#2a2a2a', glyph: 'RS' },
  g12: { from: '#383838', to: '#0a0a0a', glyph: 'JP' },
  g13: { from: '#4b4b4b', to: '#111',    glyph: '13' },
  g14: { from: '#2f2f2f', to: '#555',    glyph: '14' }
};

function HighlightAvatar({ story, theme, style, photo }) {
  const dark = theme === 'dark';
  const t = TONE_GRADIENTS[story.tone] || TONE_GRADIENTS.g1;
  const useRing = style !== 'flat';

  return (
    <div className="relative inline-block transition-transform duration-300 group-hover:scale-[1.03] group-active:scale-95">
      <div className={"p-[2.5px] rounded-full " + (useRing ? 'ig-ring' : (dark ? 'bg-white/20' : 'bg-black/20'))}>
        <div className={"p-[3px] rounded-full " + (dark ? 'bg-ink-900' : 'bg-white')}>
          <div className="relative rounded-full overflow-hidden" style={{ width: 'clamp(78px, 11vw, 108px)', height: 'clamp(78px, 11vw, 108px)' }}>
            {photo ? (
              <img src={photo} alt={story.name} className="absolute inset-0 w-full h-full object-cover" draggable="false"/>
            ) : (
              <>
                <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${t.from} 0%, ${t.to} 100%)` }}/>
                <div className="absolute inset-0 stripe-placeholder opacity-50"/>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display font-bold text-white/85 tracking-tighter text-2xl md:text-3xl">{t.glyph}</span>
                </div>
              </>
            )}
            <div className={"absolute bottom-1 right-1 px-1.5 py-[2px] rounded-full text-[8px] tracking-wider font-mono " +
              (dark ? 'bg-ink-900/80 text-white/80' : 'bg-white/85 text-black/70') }>
              {story.model.replace('iPhone ', '')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HighlightEditAvatar({ story, theme }) {
  const dark = theme === 'dark';
  const ref = React.useRef(null);
  // Attribute-set the placeholder + id so the web component picks it up.
  React.useEffect(() => {
    if (!ref.current) return;
    ref.current.setAttribute('id', `story-${story.id}`);
    ref.current.setAttribute('shape', 'circle');
    ref.current.setAttribute('placeholder', story.name);
    // Force hi-res encoding (~1200px) so the photo stays sharp when the
    // user clicks the avatar and the story opens fullscreen.
    ref.current.setAttribute('encode-width', '900');
  }, [story.id, story.name]);
  return (
    <div className={"p-[2.5px] rounded-full inline-block ig-ring"}>
      <div className={"p-[3px] rounded-full " + (dark ? 'bg-ink-900' : 'bg-white')}>
        <image-slot
          ref={ref}
          style={{
            display: 'block',
            width: 'clamp(78px, 11vw, 108px)',
            height: 'clamp(78px, 11vw, 108px)',
            borderRadius: '9999px'
          }}
        ></image-slot>
      </div>
    </div>
  );
}

function PromoAvatar({ promo, theme }) {
  const dark = theme === 'dark';
  return (
    <div className="relative inline-block transition-transform duration-300 group-hover:scale-[1.03] group-active:scale-95">
      <div className="p-[2.5px] rounded-full ig-ring-promo">
        <div className={"p-[3px] rounded-full " + (dark ? 'bg-ink-900' : 'bg-white')}>
          <div className="relative rounded-full overflow-hidden flex items-center justify-center bg-black"
               style={{ width: 'clamp(78px, 11vw, 108px)', height: 'clamp(78px, 11vw, 108px)' }}>
            <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.12), rgba(0,0,0,0) 60%)' }}/>
            <div className="relative text-center text-white">
              <div className="font-display font-extrabold tracking-tightest text-[13px] leading-[0.9]">PLAN</div>
              <div className="font-display font-extrabold tracking-tightest text-[13px] leading-[0.9]">CANJE</div>
              <div className="mt-1.5 text-[14px]">↻</div>
            </div>
          </div>
        </div>
      </div>
      <style>{`.ig-ring-promo{background:linear-gradient(135deg,#fff 0%,#cfcfcf 35%,#7a7a7a 65%,#fff 100%);}`}</style>
    </div>
  );
}

window.Highlights = Highlights;

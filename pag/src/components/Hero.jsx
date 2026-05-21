function Hero({ theme, layout, onCta, onScrollTo }) {
  const dark = theme === 'dark';

  // Reveal on mount
  const ref = React.useRef(null);
  React.useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') || [];
    requestAnimationFrame(() => {
      els.forEach((el, i) => {
        setTimeout(() => el.classList.add('in'), 80 + i * 90);
      });
    });
  }, [layout]);

  return (
    <section ref={ref} id="top" className="relative pt-28 md:pt-36 pb-8 md:pb-14 overflow-hidden">
      {/* Background grain / subtle radial */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className={"absolute inset-0 " +
          (dark
            ? 'bg-[radial-gradient(80%_50%_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]'
            : 'bg-[radial-gradient(80%_50%_at_50%_0%,rgba(0,0,0,0.04),transparent_60%)]')}/>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Eyebrow */}
        <div className="reveal flex items-center gap-3 mb-8 md:mb-10">
          <span className="inline-block w-8 h-px bg-current opacity-30"/>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-60">
            Nuevos · Reacondicionados · Garantía
          </span>
        </div>

        {layout === 'editorial' && (
          <EditorialLayout theme={theme} onCta={onCta} onScrollTo={onScrollTo}/>
        )}
        {layout === 'classic' && (
          <ClassicLayout theme={theme} onCta={onCta} onScrollTo={onScrollTo}/>
        )}
        {layout === 'split' && (
          <SplitLayout theme={theme} onCta={onCta} onScrollTo={onScrollTo}/>
        )}

        {/* Bottom marquee of model names */}
        <div className="reveal relative mt-16 md:mt-24 overflow-hidden">
          <div className={"absolute inset-y-0 left-0 w-24 z-10 pointer-events-none bg-gradient-to-r " +
            (dark ? 'from-ink-900 to-transparent' : 'from-white to-transparent')}/>
          <div className={"absolute inset-y-0 right-0 w-24 z-10 pointer-events-none bg-gradient-to-l " +
            (dark ? 'from-ink-900 to-transparent' : 'from-white to-transparent')}/>
          <div className="flex marquee-track gap-12 whitespace-nowrap">
            {[...Array(2)].map((_, repeat) => (
              <div key={repeat} className="flex items-center gap-12">
                {['iPhone 17 Pro Max', 'iPhone 17', 'iPhone 16 · Apple Intelligence', 'iPhone 15 · USB-C', 'iPhone 14 Pro · Dynamic Island', 'iPhone 13 · A15 Bionic', 'Garantía 12 meses', 'Envíos a todo el país'].map((t, i) => (
                  <span key={i} className="font-display text-3xl md:text-5xl font-bold tracking-tighter opacity-25">
                    {t}<span className="mx-6 opacity-30">/</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Editorial: huge type, device center-right ----
function EditorialLayout({ theme, onCta, onScrollTo }) {
  return (
    <div className="grid grid-cols-12 gap-6 items-start">
      <div className="col-span-12 md:col-span-7 relative z-10">
        <h1 className="reveal font-display font-extrabold leading-[0.86] tracking-tightest text-[68px] sm:text-[92px] md:text-[140px] xl:text-[170px]">
          iPhone<br/>
          <span className="italic font-serif font-normal tracking-tight">como debería ser</span><br/>
          <span className="opacity-50">comprado.</span>
        </h1>
        <div className="reveal mt-8 md:mt-10 max-w-md text-[15px] md:text-[17px] leading-relaxed opacity-75">
          Equipos nuevos y reacondicionados, revisados pieza por pieza.
          Precios en dólares, garantía escrita, envío a todo el país.
        </div>
        <div className="reveal mt-8 flex flex-wrap items-center gap-3">
          <button onClick={onCta} className={"group inline-flex items-center gap-2 px-6 h-12 rounded-full text-[14px] font-medium transition-all " +
            (theme === 'dark'
              ? 'bg-white text-black hover:bg-ink-100'
              : 'bg-black text-white hover:bg-ink-700')}>
            Ver catálogo
            <Icon.Arrow className="w-4 h-4 transition-transform group-hover:translate-x-1"/>
          </button>
          <button onClick={() => onScrollTo('warranty')} className={"inline-flex items-center gap-2 px-6 h-12 rounded-full text-[14px] font-medium border transition-colors " +
            (theme === 'dark'
              ? 'border-white/15 hover:bg-white/5'
              : 'border-black/15 hover:bg-black/5')}>
            Cómo funciona la garantía
          </button>
        </div>

        {/* Stats strip */}
        <div className="reveal mt-12 md:mt-16 grid grid-cols-3 gap-4 max-w-md">
          {[
            ['+2.300', 'iPhones entregados'],
            ['4.9 / 5', 'Reseñas verificadas'],
            ['100%', 'Originales liberados']
          ].map(([n, l]) => (
            <div key={l} className="border-t border-current/15 pt-3">
              <div className="font-display font-bold text-xl md:text-2xl tracking-tighter">{n}</div>
              <div className="text-[11px] opacity-60 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Device */}
      <div className="col-span-12 md:col-span-5 relative md:-mt-16 lg:-mt-24 reveal">
        <div className="relative mx-auto" style={{ maxWidth: 420 }}>
          {/* Soft halo */}
          <div aria-hidden className="absolute inset-0 blur-3xl opacity-50 -z-10"
               style={{ background: theme === 'dark'
                 ? 'radial-gradient(50% 60% at 50% 40%, rgba(255,255,255,.10), transparent 70%)'
                 : 'radial-gradient(50% 60% at 50% 40%, rgba(0,0,0,.10), transparent 70%)' }}/>
          <IPhonePlaceholder tone={theme === 'dark' ? 'dark' : 'light'} label="iPhone 17 Pro Max" scale={1.15} family="17" colorHex="#3A3A3A" isPro={true}/>

          {/* Floating callouts */}
          <div className={"absolute -left-2 md:-left-10 top-10 text-right hidden sm:block " }>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-50">Desde</div>
            <div className="font-display font-bold text-3xl md:text-4xl tracking-tighter">USD 1.799</div>
            <div className="text-[11px] opacity-60">256 GB · Titanio</div>
          </div>

          <div className={"absolute right-0 md:-right-6 bottom-16 hidden sm:block "}>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-50">Garantía</div>
            <div className="font-display font-bold text-3xl md:text-4xl tracking-tighter">12 meses</div>
            <div className="text-[11px] opacity-60">Apple internacional</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Classic: device left, copy right ----
function ClassicLayout({ theme, onCta, onScrollTo }) {
  return (
    <div className="grid md:grid-cols-2 gap-10 items-center min-h-[520px]">
      <div className="reveal order-2 md:order-1 flex justify-center">
        <IPhonePlaceholder tone={theme === 'dark' ? 'dark' : 'light'} label="iPhone 17 Pro" scale={1.05} family="17" colorHex="#3A3A3A" isPro={true}/>
      </div>
      <div className="reveal order-1 md:order-2">
        <h1 className="font-display font-extrabold leading-[0.9] tracking-tightest text-5xl md:text-7xl">
          El iPhone que querés.<br/>
          <span className="opacity-50">Sin sobresaltos.</span>
        </h1>
        <p className="mt-6 max-w-md text-[16px] leading-relaxed opacity-75">
          Modelos nuevos sellados o reacondicionados premium, con garantía propia y
          asesoramiento honesto. Precios en USD, factura A o B.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button onClick={onCta} className={"px-6 h-12 rounded-full text-sm font-medium " +
            (theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white')}>
            Ver catálogo →
          </button>
          <button onClick={() => onScrollTo('faq')} className="px-6 h-12 rounded-full text-sm font-medium border border-current/20">
            Preguntas frecuentes
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- Split: full-bleed two columns ----
function SplitLayout({ theme, onCta }) {
  const dark = theme === 'dark';
  return (
    <div className={"grid md:grid-cols-2 rounded-3xl overflow-hidden border " + (dark ? 'border-white/[0.08]' : 'border-black/[0.08]')}>
      <div className={"p-10 md:p-14 " + (dark ? 'bg-ink-800' : 'bg-ink-100')}>
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">Lo último</div>
        <h2 className="mt-4 font-display font-extrabold tracking-tightest text-4xl md:text-6xl leading-[0.95]">
          iPhone 17 Pro Max
        </h2>
        <p className="mt-4 max-w-sm opacity-70 text-[15px]">Titanio aeroespacial. Cámara 48 MP. A19 Pro. Desde USD 1.799.</p>
        <button onClick={onCta} className={"mt-8 px-5 h-11 rounded-full text-[13px] font-medium " + (dark ? 'bg-white text-black' : 'bg-black text-white')}>
          Comprar ahora
        </button>
      </div>
      <div className={"p-10 md:p-14 flex flex-col justify-between " + (dark ? 'bg-ink-950' : 'bg-white')}>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">Reacondicionados</div>
          <h2 className="mt-4 font-display font-extrabold tracking-tightest text-4xl md:text-6xl leading-[0.95]">
            iPhone 13<br/>desde USD 449
          </h2>
          <p className="mt-4 max-w-sm opacity-70 text-[15px]">Revisados punto por punto. Batería sobre 85% o reemplazada. 6 meses de garantía.</p>
        </div>
        <div className="mt-8 flex justify-center">
          <IPhonePlaceholder tone={dark ? 'dark' : 'light'} label="iPhone 13" scale={0.65} family="13" colorHex="#1E2026" isPro={false}/>
        </div>
      </div>
    </div>
  );
}

window.Hero = Hero;

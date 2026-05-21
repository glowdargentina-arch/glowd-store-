function ServiceTech({ theme }) {
  const dark = theme === 'dark';
  const ref = React.useRef(null);
  const [selected, setSelected] = React.useState([]);
  const [detail, setDetail] = React.useState('');

  React.useEffect(() => {
    const io = new IntersectionObserver((es) => {
      es.forEach(e => e.isIntersecting && e.target.classList.add('in'));
    }, { threshold: 0.08 });
    ref.current?.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const SERVICES = [
    { key: 'modulo',   label: 'Módulo / Pantalla',     hint: 'Reemplazo completo' },
    { key: 'bateria',  label: 'Cambio de batería',     hint: '100% nueva' },
    { key: 'camaras',  label: 'Cambio de cámaras',     hint: 'Frontal y traseras' },
    { key: 'tapa',     label: 'Tapa trasera',          hint: 'Vidrio o aluminio' },
    { key: 'pin',      label: 'Pin de carga',          hint: 'Lightning / USB-C' },
    { key: 'limpieza', label: 'Limpieza y mantenimiento', hint: 'Polvo, líquidos, óxido' }
  ];

  const toggle = (k) => setSelected(s => s.includes(k) ? s.filter(x => x !== k) : [...s, k]);

  const labels = SERVICES.filter(s => selected.includes(s.key)).map(s => s.label);
  const message =
    'Hola GLOWD! 🔧 Quiero cotizar un servicio técnico.\n\n' +
    (labels.length ? `Necesito: ${labels.join(', ')}.\n` : '') +
    (detail.trim() ? `Detalle: ${detail.trim()}\n` : '') +
    '\n¿Cuánto saldría y cuánto demora?';
  const waHref = buildWhatsAppUrl(message);

  return (
    <section id="service" ref={ref}
      className={"relative py-20 md:py-32 border-t " + (dark ? 'border-white/[0.06]' : 'border-black/[0.06]')}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          {/* Left: copy */}
          <div className="md:col-span-5 reveal">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] opacity-60">
              <LogoMark theme={theme} className="h-4 w-4 opacity-90"/>
              Servicio técnico
            </div>
            <h2 className="mt-2 font-display font-extrabold text-4xl md:text-6xl tracking-tightest leading-[0.95]">
              Reparamos tu<br/>iPhone.<br/>
              <span className="opacity-50">Y otras marcas.</span>
            </h2>
            <p className="mt-5 opacity-70 text-[15px] leading-relaxed max-w-md">
              Pantallas, baterías, cámaras y todo lo que tu equipo necesite.
              Diagnóstico sin cargo. Cotización por WhatsApp en minutos.
            </p>

            <ul className="mt-7 space-y-2 text-[13px]">
              <li className="inline-flex items-center gap-2 opacity-80"><Icon.Check className="w-4 h-4 opacity-70"/> Diagnóstico sin cargo</li>
              <li className="flex items-center gap-2 opacity-80"><Icon.Check className="w-4 h-4 opacity-70"/> Repuesto original cuando es posible</li>
              <li className="flex items-center gap-2 opacity-80"><Icon.Check className="w-4 h-4 opacity-70"/> 60 días de garantía escrita en cada reparación</li>
              <li className="flex items-center gap-2 opacity-80"><Icon.Check className="w-4 h-4 opacity-70"/> Retiro a domicilio en Santa Fe Capital</li>
            </ul>
          </div>

          {/* Right: quote builder */}
          <div className="md:col-span-7 reveal">
            <div className={"rounded-2xl border p-6 md:p-8 " +
              (dark ? 'border-white/[0.08] bg-ink-800/40' : 'border-black/[0.08] bg-white')}>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60 mb-4">
                Tildá lo que necesitás · te cotizamos
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SERVICES.map(s => {
                  const active = selected.includes(s.key);
                  return (
                    <button
                      key={s.key}
                      onClick={() => toggle(s.key)}
                      className={"text-left px-4 py-3.5 rounded-xl border transition-all " +
                        (active
                          ? (dark ? 'bg-white text-black border-white' : 'bg-black text-white border-black')
                          : (dark ? 'border-white/15 hover:border-white/35 bg-white/[0.02]' : 'border-black/15 hover:border-black/35 bg-black/[0.02]'))}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-[14px]">{s.label}</div>
                          <div className={"text-[11px] " + (active ? 'opacity-70' : 'opacity-55')}>{s.hint}</div>
                        </div>
                        <div className={"w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all " +
                          (active
                            ? (dark ? 'border-black bg-black' : 'border-white bg-white')
                            : (dark ? 'border-white/30' : 'border-black/30'))}>
                          {active && (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <path d="M1.5 5.2L4 7.5L8.5 2.5" stroke={dark ? '#fff' : '#000'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5">
                <label className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60 block mb-2">
                  ¿Otra falla? Contanos
                </label>
                <textarea
                  value={detail}
                  onChange={e => setDetail(e.target.value)}
                  rows={3}
                  placeholder="Ej: iPhone 12, no carga aunque cambié el cable. A veces enciende, a veces no."
                  className={"w-full px-4 py-3 rounded-xl border outline-none resize-none text-[14px] transition-colors " +
                    (dark
                      ? 'border-white/15 bg-ink-900/60 placeholder:text-white/35 focus:border-white/40'
                      : 'border-black/15 bg-white placeholder:text-black/40 focus:border-black/40')}>
                </textarea>
              </div>

              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className={"mt-5 w-full h-12 rounded-full inline-flex items-center justify-center gap-2 text-[14px] font-medium transition-colors " +
                  (dark ? 'bg-white text-black hover:bg-ink-100' : 'bg-black text-white hover:bg-ink-700')}>
                <Icon.Whatsapp className="w-4 h-4"/>
                {selected.length || detail.trim()
                  ? `Cotizar por WhatsApp${selected.length ? ` · ${selected.length} ítem${selected.length > 1 ? 's' : ''}` : ''}`
                  : 'Consultar por WhatsApp'}
              </a>

              <p className="mt-3 text-[11px] opacity-55 text-center">
                Respondemos en minutos · Atención 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.ServiceTech = ServiceTech;

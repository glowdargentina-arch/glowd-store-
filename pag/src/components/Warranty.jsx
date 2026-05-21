function Warranty({ theme }) {
  const dark = theme === 'dark';
  const steps = [
  { n: '01', t: 'Revisión de 32 puntos', d: 'Cada equipo pasa por chequeo de hardware, software, batería y autenticidad.' },
  { n: '02', t: 'Activación frente a vos', d: 'Probás el iPhone, lo encendés, verificás IMEI y estado de batería antes de pagar.' },
  { n: '03', t: 'Garantía escrita', d: 'Te entregamos comprobante físico/digital con cobertura y tiempos claros.' },
  { n: '04', t: 'Post-venta directa', d: 'Si algo falla, hablás con la misma persona que te vendió, sin formularios.' }];

  const ref = React.useRef(null);
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="warranty" ref={ref} className={"relative py-20 md:py-32 border-t " + (dark ? 'border-white/[0.06]' : 'border-black/[0.06]')}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 reveal">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] opacity-60">
              <LogoMark theme={theme} className="h-4 w-4 opacity-90"/>
              Garantía
            </div>
            <h2 className="mt-2 font-display font-extrabold text-4xl md:text-6xl tracking-tightest leading-[0.95]">
              Si algo falla,<br />
              <span className="italic font-serif font-normal">lo resolvemos.</span>
            </h2>
            <div className="mt-8 flex items-stretch gap-4">
              <div className={"flex-1 p-6 rounded-2xl border " + (dark ? 'border-white/[0.08] bg-white/[0.02]' : 'border-black/[0.08] bg-black/[0.02]')}>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50">Equipos nuevos</div>
                <div className="font-display font-extrabold text-3xl md:text-4xl tracking-tightest mt-2">12 meses</div>
                <div className="text-[12px] opacity-60 mt-1">Apple internacional</div>
              </div>
              <div className={"flex-1 p-6 rounded-2xl border " + (dark ? 'border-white/[0.08] bg-white/[0.02]' : 'border-black/[0.08] bg-black/[0.02]')}>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50 flex items-center gap-1.5">
                  <LogoMark theme={theme} className="h-3 w-3 opacity-90"/>
                  Reacondicionados
                </div>
                <div className="font-display font-extrabold text-3xl md:text-4xl tracking-tightest mt-2">60 dias</div>
                <div className="text-[12px] opacity-60 mt-1">Cobertura GLOWD</div>
              </div>
            </div>
            <p className="mt-6 opacity-65 text-[14px] max-w-md leading-relaxed">
              Cubre fallas de fábrica. No cubre roturas accidentales o líquidos.
              Si tu equipo se rompe igual, lo reparamos a precio de costo.
            </p>
          </div>

          <div className="lg:col-span-7 reveal">
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {steps.map((s, i) =>
              <li key={s.n}
              className={"relative p-7 rounded-2xl border transition-colors " + (
              dark ? 'border-white/[0.08] hover:border-white/[0.2]' : 'border-black/[0.08] hover:border-black/[0.2]')}
              style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="font-mono text-[11px] opacity-50 tracking-[0.18em]">{s.n}</div>
                  <h3 className="mt-4 font-display font-bold text-xl tracking-tight">{s.t}</h3>
                  <p className="mt-2 text-[14px] opacity-65 leading-relaxed">{s.d}</p>
                </li>
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>);

}

window.Warranty = Warranty;
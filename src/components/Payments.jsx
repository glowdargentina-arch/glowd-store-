function Payments({ theme }) {
  const dark = theme === 'dark';
  const methods = [
    {
      key: 'transfer',
      name: 'Transferencia bancaria',
      detail: 'CBU/CVU · Pesos o USD',
      sub: 'Confirmación inmediata. Sin comisiones.',
      glyph: 'BANK'
    },
    {
      key: 'mp',
      name: 'Mercado Pago',
      detail: 'Débito · Crédito · Saldo',
      sub: 'Pagás desde la app. Cuotas con tarjeta.',
      glyph: 'MP'
    },
    {
      key: 'usd',
      name: 'Dólar billete',
      detail: 'Efectivo en USD',
      sub: 'Entrega presencial en Santa Fe Capital con cita previa.',
      glyph: 'USD'
    }
  ];
  const ref = React.useRef(null);
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={"relative py-20 md:py-28 border-t " + (dark ? 'border-white/[0.06]' : 'border-black/[0.06]')}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="reveal">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-60">Métodos de pago</div>
            <h2 className="mt-2 font-display font-extrabold text-4xl md:text-5xl tracking-tightest leading-[1.0]">
              Pagás como te queda cómodo.
            </h2>
          </div>
          <div className="reveal text-[13px] opacity-65 max-w-sm">
            Todos los precios están en USD. Si pagás en pesos, usamos cotización del día.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {methods.map((m, i) => (
            <div key={m.key}
                 className={"reveal group p-7 rounded-2xl border transition-all " +
                   (dark
                     ? 'border-white/[0.08] hover:border-white/[0.22] bg-white/[0.02]'
                     : 'border-black/[0.08] hover:border-black/[0.22] bg-white')}
                 style={{ transitionDelay: `${i * 80}ms` }}>
              <div className={"flex items-center justify-between " }>
                <div className={"font-display font-bold text-base tracking-tight px-3 py-1.5 rounded-full border " +
                  (dark ? 'border-white/15 bg-white/[0.04]' : 'border-black/15 bg-black/[0.03]')}>
                  <span className="font-mono text-[11px] tracking-[0.18em]">{m.glyph}</span>
                </div>
                <Icon.Check className="w-5 h-5 opacity-50"/>
              </div>
              <h3 className="mt-8 font-display font-bold text-2xl tracking-tighter">{m.name}</h3>
              <div className="mt-1 font-mono text-[11px] opacity-60 tracking-[0.12em]">{m.detail}</div>
              <p className="mt-4 text-[13px] opacity-65 leading-relaxed">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Payments = Payments;

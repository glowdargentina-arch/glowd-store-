function Benefits({ theme }) {
  const dark = theme === 'dark';
  const items = [
  { icon: 'Shield', title: 'Originales y liberados', body: 'Cada equipo se verifica contra la base de Apple. Cero clones, cero iCloud trabado.' },
  { icon: 'Truck', title: 'Envíos a todo el país', body: 'Santa Fe Capital same-day. Resto del país 24–48hs.' },
  { icon: 'Battery', title: 'Batería real', body: 'Reacondicionados con batería sobre 85% o reemplazada por nueva.' },
  { icon: 'Tag', title: 'Precios en USD', body: 'Dólar billete, transferencia o Mercado Pago. Factura A o B.' },
  { icon: 'Headset', title: 'Atención humana', body: 'Hablás con la misma persona desde la consulta hasta la entrega.' },
  { icon: 'Box', title: 'Caja y accesorios', body: 'Equipos sellados con todo lo original. Reacondicionados con cable nuevo.' }];

  const ref = React.useRef(null);
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="benefits" ref={ref} className={"relative py-20 md:py-32 border-t " + (dark ? 'border-white/[0.06]' : 'border-black/[0.06]')}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 mb-12">
          <div className="md:col-span-5 reveal">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] opacity-60">
              <LogoMark theme={theme} className="h-4 w-4 opacity-90"/>
              Por qué GLOWD
            </div>
            <h2 className="mt-2 font-display font-extrabold text-4xl md:text-6xl tracking-tightest leading-[0.95]">
              Lo que esperás de Apple,<br />en una tienda argentina.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 reveal">
            <p className="opacity-70 text-[16px] leading-relaxed max-w-lg">Vendiendo equipos en Santa Fe aprendimos algo: lo que la gente busca no es el precio más bajo, es no salir estafada. Por eso cada iPhone pasa por un protocolo de 32 puntos antes de salir a la venta.



            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => {
            const I = Icon[it.icon];
            return (
              <div key={it.title}
              className={"reveal p-8 md:p-10 border-t " + (
              dark ? 'border-white/[0.08]' : 'border-black/[0.08]') + (
              i % 3 !== 0 ? dark ? ' lg:border-l lg:border-white/[0.08]' : ' lg:border-l lg:border-black/[0.08]' : '') + (
              i % 2 !== 0 ? dark ? ' md:border-l md:border-white/[0.08] lg:border-l-0' : ' md:border-l md:border-black/[0.08] lg:border-l-0' : '') + (
              i >= items.length - 3 ? dark ? ' lg:border-b lg:border-white/[0.08]' : ' lg:border-b lg:border-black/[0.08]' : '')}
              style={{ transitionDelay: `${i * 60}ms` }}>
                <I className="w-7 h-7 mb-6 opacity-90" />
                <h3 className="font-display font-bold text-xl tracking-tight">{it.title}</h3>
                <p className="mt-2 text-[14px] opacity-65 leading-relaxed">{it.body}</p>
              </div>);

          })}
        </div>
      </div>
    </section>);

}

window.Benefits = Benefits;
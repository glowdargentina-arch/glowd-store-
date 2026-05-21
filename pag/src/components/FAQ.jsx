function FAQ({ theme }) {
  const dark = theme === 'dark';
  const [open, setOpen] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="faq" ref={ref} className={"relative py-20 md:py-32 border-t " + (dark ? 'border-white/[0.06]' : 'border-black/[0.06]')}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4 reveal">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-60">FAQ</div>
            <h2 className="mt-2 font-display font-extrabold text-4xl md:text-5xl tracking-tightest leading-[0.95]">
              Preguntas<br/>frecuentes.
            </h2>
            <p className="mt-6 opacity-65 text-[14px] max-w-xs leading-relaxed">
              Las que más nos llegan por WhatsApp. Si tu duda no está acá, escribinos.
            </p>
          </div>
          <div className="md:col-span-8 reveal">
            <ul className={"border-t " + (dark ? 'border-white/[0.08]' : 'border-black/[0.08]')}>
              {FAQS.map((f, i) => {
                const isOpen = open === i;
                return (
                  <li key={i} className={"border-b " + (dark ? 'border-white/[0.08]' : 'border-black/[0.08]')}>
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="w-full py-5 md:py-7 flex items-center justify-between gap-6 text-left group">
                      <span className="font-display font-bold text-[18px] md:text-[22px] tracking-tight">
                        {f.q}
                      </span>
                      <span className={"shrink-0 w-9 h-9 rounded-full inline-flex items-center justify-center border transition-all " +
                        (dark ? 'border-white/15 group-hover:bg-white/5' : 'border-black/15 group-hover:bg-black/5') +
                        (isOpen ? ' rotate-45' : '')}>
                        <Icon.Plus className="w-4 h-4"/>
                      </span>
                    </button>
                    <div className={"grid transition-all duration-500 ease-out " +
                      (isOpen ? 'grid-rows-[1fr] opacity-100 pb-6 md:pb-8' : 'grid-rows-[0fr] opacity-0')}>
                      <div className="overflow-hidden">
                        <p className="text-[15px] opacity-70 leading-relaxed max-w-2xl">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

window.FAQ = FAQ;

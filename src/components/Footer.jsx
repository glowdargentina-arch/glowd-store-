function Footer({ theme, onScrollTo, onToggleTheme }) {
  const dark = theme === 'dark';
  return (
    <footer className={"relative pt-20 md:pt-28 pb-10 border-t " + (dark ? 'border-white/[0.06] bg-ink-950' : 'border-black/[0.06] bg-white')}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Giant wordmark with logo */}
        <div className="flex items-center gap-4 md:gap-6 select-none">
          <img
            src={dark ? 'assets/logo-white.png' : 'assets/logo-dark.png'}
            alt="GLOWD"
            className="h-[18vw] md:h-[14vw] xl:h-[11vw] w-auto block shrink-0"
            draggable="false"
          />
          <div className="font-display font-extrabold tracking-tightest leading-[0.8] text-[20vw] md:text-[14vw] xl:text-[11vw]">
            <span className="opacity-95">GLOWD</span>
            <span className="opacity-30">.</span>
          </div>
        </div>

        <div className={"mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-12 gap-8 pb-12 border-b " + (dark ? 'border-white/[0.08]' : 'border-black/[0.08]')}>
          <div className="col-span-2 md:col-span-4">
            <p className="font-display text-[20px] md:text-[24px] tracking-tight leading-snug max-w-sm">
              iPhones nuevos y reacondicionados con garantía real, en Argentina.
            </p>
            <div className="mt-5 flex items-center gap-2 text-[13px] opacity-65">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"/>
              Atendemos hoy · 10:00 – 19:00
            </div>
          </div>

          <FooterCol title="Tienda" items={[
            ['Catálogo', 'catalog'],
            ['Modelos nuevos', 'catalog'],
            ['Reacondicionados', 'catalog'],
            ['Cotizar mi usado', 'catalog']
          ]} onScrollTo={onScrollTo}/>

          <FooterCol title="Empresa" items={[
            ['Garantía', 'warranty'],
            ['Beneficios', 'benefits'],
            ['Servicio Técnico', 'service'],
            ['Preguntas', 'faq']
          ]} onScrollTo={onScrollTo}/>

          <div className="md:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-50 mb-4">Contacto</div>
            <ul className="space-y-2.5 text-[13px]">
              <li><a href="https://wa.me/5493425174996" target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100 inline-flex items-center gap-2">
                <Icon.Whatsapp className="w-4 h-4"/> +54 9 3425 17-4996
              </a></li>
              <li className="opacity-80">hola@glowd.com.ar</li>
              <li className="opacity-80">25 de Mayo 7875, Santa Fe Capital · Cita previa</li>
              <li className="opacity-80">@glowd.ar</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[12px] opacity-55 font-mono tracking-wide">
          <div>© {new Date().getFullYear()} GLOWD. Marca registrada. CUIT 30-71xxxxxxxx-x.</div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span>Términos</span><span>Privacidad</span><span>Defensa al consumidor</span>
            <button onClick={onToggleTheme} className="inline-flex items-center gap-1.5 opacity-100 hover:opacity-100">
              {dark ? <Icon.Sun className="w-3.5 h-3.5"/> : <Icon.Moon className="w-3.5 h-3.5"/>}
              {dark ? 'Modo claro' : 'Modo oscuro'}
            </button>
          </div>
        </div>

        <div className="mt-4 text-[10px] opacity-40 font-mono tracking-wide max-w-2xl">
          GLOWD es una tienda independiente argentina. No estamos afiliados ni representamos oficialmente a Apple Inc.
          iPhone es una marca registrada de Apple Inc.
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items, onScrollTo }) {
  return (
    <div className="md:col-span-2">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-50 mb-4">{title}</div>
      <ul className="space-y-2.5 text-[13px]">
        {items.map(([label, target]) => (
          <li key={label}>
            <button onClick={() => onScrollTo(target)} className="opacity-80 hover:opacity-100">{label}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

window.Footer = Footer;

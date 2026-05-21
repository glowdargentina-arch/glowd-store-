function Nav({ theme, onToggleTheme, cartCount, onOpenCart, onScrollTo, purchaseMode }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  const links = [
    ['Catálogo', 'catalog'],
    ['Beneficios', 'benefits'],
    ['Servicio Técnico', 'service'],
    ['Garantía', 'warranty'],
    ['Preguntas', 'faq']
  ];

  const dark = theme === 'dark';
  return (
    <header
      className={"no-print fixed top-0 inset-x-0 z-40 transition-all duration-500 " +
        (scrolled
          ? (dark ? 'backdrop-blur-xl bg-ink-900/70 border-b border-white/[0.06]' : 'backdrop-blur-xl bg-white/75 border-b border-black/[0.06]')
          : 'bg-transparent border-b border-transparent')}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-16 md:h-[72px] flex items-center justify-between">
        {/* Wordmark */}
        <a href="#top" className="flex items-center gap-2 group" aria-label="GLOWD inicio">
          <img
            src={dark ? 'assets/logo-white.png' : 'assets/logo-dark.png'}
            alt=""
            aria-hidden="true"
            className="h-8 md:h-9 w-auto block"
            draggable="false"
          />
          <span className="font-display tracking-tightest text-[22px] md:text-[24px] font-extrabold">GLOWD</span>
          <span className="hidden md:inline-block w-1 h-1 rounded-full bg-current opacity-40 group-hover:opacity-100 transition-opacity"/>
          <span className="hidden md:inline-block text-[10px] uppercase tracking-[0.18em] opacity-50 font-mono">AR</span>
        </a>

        {/* Center links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(([label, id]) => (
            <button key={id}
              onClick={() => onScrollTo(id)}
              className="text-[13px] tracking-tight opacity-70 hover:opacity-100 transition-opacity">
              {label}
            </button>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            className={"hidden md:flex h-9 w-9 items-center justify-center rounded-full transition-colors " +
              (dark ? 'hover:bg-white/10' : 'hover:bg-black/5')}
            aria-label="Cambiar tema"
            title="Cambiar tema"
          >
            {dark ? <Icon.Sun className="w-[18px] h-[18px]"/> : <Icon.Moon className="w-[18px] h-[18px]"/>}
          </button>
          {purchaseMode === 'cart' ? (
            <button
              onClick={onOpenCart}
              className={"relative h-9 px-3 rounded-full inline-flex items-center gap-2 text-[13px] transition-colors " +
                (dark ? 'hover:bg-white/10' : 'hover:bg-black/5')}
              aria-label="Carrito"
            >
              <Icon.Cart className="w-[18px] h-[18px]"/>
              <span className="hidden md:inline">Carrito</span>
              {cartCount > 0 && (
                <span className={"absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-medium inline-flex items-center justify-center " +
                  (dark ? 'bg-white text-black' : 'bg-black text-white')}>
                  {cartCount}
                </span>
              )}
            </button>
          ) : (
            <a
              href={buildWhatsAppUrl('Hola GLOWD 👋 quiero consultar por un iPhone.')}
              target="_blank"
              rel="noreferrer"
              className={"h-9 px-3.5 rounded-full inline-flex items-center gap-2 text-[13px] font-medium transition-colors " +
                (dark ? 'bg-white text-black hover:bg-ink-100' : 'bg-black text-white hover:bg-ink-700')}
              aria-label="WhatsApp"
            >
              <Icon.Whatsapp className="w-[16px] h-[16px]"/>
              <span className="hidden md:inline">WhatsApp</span>
            </a>
          )}
          <button
            onClick={() => setOpen(o => !o)}
            className={"md:hidden h-9 w-9 inline-flex items-center justify-center rounded-full " +
              (dark ? 'hover:bg-white/10' : 'hover:bg-black/5')}
            aria-label="Menú"
          >
            {open ? <Icon.Close className="w-[18px] h-[18px]"/> : <Icon.Menu className="w-[18px] h-[18px]"/>}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className={"md:hidden border-t " + (dark ? 'border-white/[0.06] bg-ink-900/95 backdrop-blur-xl' : 'border-black/[0.06] bg-white/95 backdrop-blur-xl')}>
          <div className="px-6 py-4 flex flex-col gap-1">
            {links.map(([label, id]) => (
              <button key={id}
                onClick={() => { setOpen(false); onScrollTo(id); }}
                className={"text-left py-3 text-base " + (dark ? 'border-b border-white/[0.05]' : 'border-b border-black/[0.05]')}>
                {label}
              </button>
            ))}
            <button
              onClick={() => { setOpen(false); onToggleTheme(); }}
              className="text-left py-3 text-base inline-flex items-center gap-2">
              {dark ? <Icon.Sun className="w-4 h-4"/> : <Icon.Moon className="w-4 h-4"/>}
              Modo {dark ? 'claro' : 'oscuro'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

window.Nav = Nav;

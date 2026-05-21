function App() {
  const [tweaks, setTweak] = useTweaks(window.GLOWD_DEFAULTS);

  // Apply theme to <html>
  React.useEffect(() => {
    const html = document.documentElement;
    if (tweaks.theme === 'light') {
      html.classList.add('light');
      html.classList.remove('dark');
      document.body.classList.remove('bg-ink-900', 'text-white');
      document.body.classList.add('bg-white', 'text-ink-900');
    } else {
      html.classList.add('dark');
      html.classList.remove('light');
      document.body.classList.add('bg-ink-900', 'text-white');
      document.body.classList.remove('bg-white', 'text-ink-900');
    }
  }, [tweaks.theme]);

  // Apply font pairing globally
  React.useEffect(() => {
    const root = document.documentElement.style;
    if (tweaks.fontPair === 'serif-mix') {
      document.documentElement.dataset.fontMix = 'serif';
    } else if (tweaks.fontPair === 'mono-mix') {
      document.documentElement.dataset.fontMix = 'mono';
    } else {
      delete document.documentElement.dataset.fontMix;
    }
  }, [tweaks.fontPair]);

  // ---- Cart state ----
  const [cart, setCart] = React.useState([]);
  const [cartOpen, setCartOpen] = React.useState(false);

  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.findIndex(p => p.id === item.id && p.selectedCap.gb === item.selectedCap.gb && p.selectedColor.name === item.selectedColor.name);
      if (exists >= 0) {
        const c = prev.slice();
        c[exists] = { ...c[exists], qty: c[exists].qty + 1 };
        return c;
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setCartOpen(true);
  };
  const updateQty = (i, qty) => setCart(c => c.map((it, idx) => idx === i ? { ...it, qty } : it));
  const removeItem = (i) => setCart(c => c.filter((_, idx) => idx !== i));

  const checkout = () => {
    if (cart.length === 1) {
      const it = cart[0];
      const capLabel = it.selectedCap.gb >= 1024 ? '1 TB' : `${it.selectedCap.gb} GB`;
      const msg = `Hola GLOWD, ¿les queda stock de este iPhone? (${it.name} · ${capLabel} · ${it.selectedColor.name})`;
      window.open(buildWhatsAppUrl(msg), '_blank');
      return;
    }
    const lines = cart.map(it => {
      const capLabel = it.selectedCap.gb >= 1024 ? '1 TB' : `${it.selectedCap.gb} GB`;
      const qty = it.qty > 1 ? ` x${it.qty}` : '';
      return `- ${it.name} · ${capLabel} · ${it.selectedColor.name}${qty}`;
    }).join('\n');
    const msg = `Hola GLOWD, ¿les queda stock de estos iPhones?\n${lines}`;
    window.open(buildWhatsAppUrl(msg), '_blank');
  };

  // ---- Product modal ----
  const [activeProduct, setActiveProduct] = React.useState(null);
  // ---- Story modal ----
  const [activeStory, setActiveStory] = React.useState(null);
  const [activePromo, setActivePromo] = React.useState(null);

  // ---- Customer photos (shared with Highlights + StoryModal) ----
  const [storyPhotos, setStoryPhotos] = React.useState({});
  React.useEffect(() => {
    // Kick the image-slot module to hydrate its store (it normally waits for
    // a connected slot — which doesn't exist in view-only mode).
    if (typeof window.imageSlotsLoad === 'function') window.imageSlotsLoad();
    const readSlots = () => {
      const snap = (typeof window.imageSlotsSnapshot === 'function') ? window.imageSlotsSnapshot() : {};
      const out = {};
      Object.keys(snap).forEach(k => {
        const v = snap[k];
        const u = typeof v === 'string' ? v : v && v.u;
        if (u && /^data:image\//i.test(u)) out[k] = u;
      });
      if (Object.keys(out).length) {
        setStoryPhotos(prev => ({ ...prev, ...out }));
      }
    };
    // Initial pass + a few retries for hydration that lands a tick later.
    readSlots();
    const timers = [200, 600, 1200, 2200, 4000].map(ms => setTimeout(readSlots, ms));
    window.addEventListener('image-slots-change', readSlots);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('image-slots-change', readSlots);
    };
  }, [tweaks.editPhotos]);

  const toggleTheme = () => setTweak('theme', tweaks.theme === 'dark' ? 'light' : 'dark');

  const scrollTo = (id) => {
    if (id === 'top') return window.scrollTo({ top: 0, behavior: 'smooth' });
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div data-screen-label="GLOWD home" className="min-h-screen">
      <FontStyles fontPair={tweaks.fontPair}/>

      <Nav theme={tweaks.theme} onToggleTheme={toggleTheme} cartCount={cart.reduce((s, it) => s + it.qty, 0)} onOpenCart={() => setCartOpen(true)} onScrollTo={scrollTo} purchaseMode={tweaks.purchaseMode}/>

      <main>
        <Hero theme={tweaks.theme} layout={tweaks.heroLayout} onCta={() => scrollTo('catalog')} onScrollTo={scrollTo}/>
        <Highlights theme={tweaks.theme} style={tweaks.highlightsStyle} onOpenStory={setActiveStory} onOpenPromo={setActivePromo} editPhotos={tweaks.editPhotos} photos={storyPhotos}/>
        <Catalog
          theme={tweaks.theme}
          layout={tweaks.productLayout}
          showStockBadges={tweaks.showStockBadges}
          purchaseMode={tweaks.purchaseMode}
          editPhotos={tweaks.editPhotos}
          photos={storyPhotos}
          onAddToCart={addToCart}
          onOpenProduct={setActiveProduct}
        />
        <Benefits theme={tweaks.theme}/>
        <ServiceTech theme={tweaks.theme}/>
        <Warranty theme={tweaks.theme}/>
        <Payments theme={tweaks.theme}/>
        <FAQ theme={tweaks.theme}/>
      </main>

      <Footer theme={tweaks.theme} onScrollTo={scrollTo} onToggleTheme={toggleTheme}/>
      <Floats theme={tweaks.theme}/>

      {activeProduct && (
        <ProductModal product={activeProduct} theme={tweaks.theme} onClose={() => setActiveProduct(null)} onAddToCart={addToCart} purchaseMode={tweaks.purchaseMode}/>
      )}

      {activeStory && (
        <StoryModal story={activeStory} allStories={STORIES} photos={storyPhotos} theme={tweaks.theme} onClose={() => setActiveStory(null)}/>
      )}

      {activePromo && (
        <PromoModal promo={activePromo} theme={tweaks.theme} onClose={() => setActivePromo(null)}/>
      )}

      <CartDrawer
        open={cartOpen}
        items={cart}
        theme={tweaks.theme}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onCheckout={checkout}
      />

      <Tweaks tweaks={tweaks} setTweak={setTweak}/>
    </div>
  );
}

function FontStyles({ fontPair }) {
  // Inject style rules for font pairing variants
  const css = React.useMemo(() => {
    if (fontPair === 'serif-mix') {
      return `
        h1, h2, .font-display { font-family: 'Instrument Serif', ui-serif, Georgia, serif !important; font-weight: 400 !important; letter-spacing: -0.02em !important; }
        h1 .italic, h2 .italic { font-family: 'Instrument Serif', ui-serif, serif !important; font-style: italic !important; }
      `;
    }
    if (fontPair === 'mono-mix') {
      return `
        .font-display { font-family: 'JetBrains Mono', ui-monospace !important; letter-spacing: -0.04em !important; }
      `;
    }
    return '';
  }, [fontPair]);
  return <style>{css}</style>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

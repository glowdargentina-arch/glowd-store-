function ProductModal({ product, theme, onClose, onAddToCart, purchaseMode }) {
  const dark = theme === 'dark';
  const [capIdx, setCapIdx] = React.useState(0);
  const [colorIdx, setColorIdx] = React.useState(0);

  React.useEffect(() => {
    document.body.classList.add('locked');
    const esc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    return () => { document.body.classList.remove('locked'); window.removeEventListener('keydown', esc); };
  }, [onClose]);

  if (!product) return null;
  const cap = product.capacities[capIdx];
  const color = product.colors[colorIdx];

  return (
    <div className="fixed inset-0 z-50 flex items-stretch md:items-center justify-center p-0 md:p-6">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md animate-[fadeIn_.25s_ease-out]" onClick={onClose}/>
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes pop{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}`}</style>
      <div className={"relative w-full max-w-5xl max-h-[100vh] md:max-h-[88vh] overflow-y-auto rounded-none md:rounded-3xl border " +
        (dark ? 'bg-ink-900 border-white/[0.08] text-white' : 'bg-white border-black/[0.08] text-black')}
        style={{ animation: 'pop .35s cubic-bezier(.2,.7,.2,1)' }}>
        {/* Close */}
        <button onClick={onClose} className={"absolute top-4 right-4 z-10 h-10 w-10 rounded-full inline-flex items-center justify-center " +
          (dark ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10')}>
          <Icon.Close className="w-4 h-4"/>
        </button>

        <div className="grid md:grid-cols-2">
          <div className={"phone-shine relative flex items-center justify-center py-12 md:py-16 px-6 " }>
            <span className={"absolute top-5 left-5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] " +
              (product.condition === 'Nuevo'
                ? (dark ? 'bg-white text-black' : 'bg-black text-white')
                : (dark ? 'bg-white/10 border border-white/15' : 'bg-black/5 border border-black/10'))}>
              {product.condition}
            </span>
            {(() => {
              const galleryImgs = product.gallery && product.gallery[color.name];
              if (galleryImgs && galleryImgs.length) {
                return (
                  <div style={{ width: '100%', height: 'min(560px, 65vh)' }}>
                    <Product3DShowcase
                      images={galleryImgs}
                      alt={product.name + ' ' + color.name}
                      theme={theme}
                    />
                  </div>
                );
              }
              return (
                <IPhonePlaceholder
                  tone={dark ? 'dark' : 'light'}
                  label={color.name}
                  scale={1.1}
                  family={product.family}
                  colorHex={color.hex}
                  isPro={/Pro/.test(product.name)}
                />
              );
            })()}
          </div>

          <div className="p-7 md:p-10 flex flex-col">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-50">iPhone</div>
            <h2 className="mt-2 font-display font-extrabold text-3xl md:text-5xl tracking-tightest leading-[0.95]">{product.name}</h2>
            <p className="mt-3 opacity-70 text-[14px]">{product.tagline}</p>

            <div className="mt-6 flex items-baseline gap-3">
              <div className="font-display font-extrabold text-4xl md:text-5xl tracking-tightest">USD {cap.usd.toLocaleString('es-AR')}</div>
              <div className="opacity-50 text-[12px] font-mono">{cap.gb >= 1024 ? '1 TB' : `${cap.gb} GB`} · {color.name}</div>
            </div>

            {/* Capacity */}
            <div className="mt-7">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50 mb-2">Capacidad</div>
              <div className="grid grid-cols-3 gap-2">
                {product.capacities.map((c, i) => (
                  <button key={c.gb} onClick={() => setCapIdx(i)}
                    className={"px-3 h-12 rounded-xl text-[13px] border text-left transition-all " +
                      (i === capIdx
                        ? (dark ? 'bg-white text-black border-white' : 'bg-black text-white border-black')
                        : (dark ? 'border-white/15 hover:border-white/35' : 'border-black/15 hover:border-black/35'))}>
                    <div className="font-medium">{c.gb >= 1024 ? '1 TB' : `${c.gb} GB`}</div>
                    <div className="text-[10px] opacity-70 font-mono">USD {c.usd}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="mt-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50 mb-2">Color · <span className="opacity-100">{color.name}</span></div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c, i) => (
                  <button key={c.name} onClick={() => setColorIdx(i)} title={c.name}
                    className={"relative w-8 h-8 rounded-full transition-all " +
                      (i === colorIdx ? 'ring-2 ring-offset-2 ' + (dark ? 'ring-white ring-offset-ink-900' : 'ring-black ring-offset-white') : '')}
                    style={{ background: c.hex, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.15)' }}/>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div className="mt-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50 mb-2">Highlights</div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13px]">
                {product.specs.map(s => (
                  <li key={s} className="inline-flex items-center gap-2 opacity-80">
                    <Icon.Check className="w-4 h-4 opacity-70"/> {s}
                  </li>
                ))}
              </ul>
              {product.refurbGrade && (
                <div className={"mt-3 inline-flex items-center gap-2 text-[11px] font-mono px-2.5 py-1 rounded-full " +
                  (dark ? 'bg-white/[0.05] border border-white/10' : 'bg-black/[0.04] border border-black/10')}>
                  Grado {product.refurbGrade}
                </div>
              )}
            </div>

            <div className="mt-auto pt-7 flex flex-col sm:flex-row gap-2">
              {purchaseMode === 'cart' ? (
                <>
                  <button onClick={() => { onAddToCart({ ...product, selectedCap: cap, selectedColor: color }); onClose(); }}
                    className={"flex-1 h-12 rounded-full text-[14px] font-medium " +
                      (dark ? 'bg-white text-black hover:bg-ink-100' : 'bg-black text-white hover:bg-ink-700')}>
                    Agregar al carrito · USD {cap.usd.toLocaleString('es-AR')}
                  </button>
                  <a href={buildProductWhatsAppUrl(product, cap, color)}
                    target="_blank" rel="noreferrer"
                    className={"h-12 px-5 rounded-full text-[14px] font-medium inline-flex items-center justify-center gap-2 border " +
                      (dark ? 'border-white/15 hover:bg-white/5' : 'border-black/15 hover:bg-black/5')}>
                    <Icon.Whatsapp className="w-4 h-4"/> Consultar
                  </a>
                </>
              ) : (
                <a href={buildProductWhatsAppUrl(product, cap, color)}
                  target="_blank" rel="noreferrer"
                  className={"flex-1 h-12 rounded-full text-[14px] font-medium inline-flex items-center justify-center gap-2 " +
                    (dark ? 'bg-white text-black hover:bg-ink-100' : 'bg-black text-white hover:bg-ink-700')}>
                  <Icon.Whatsapp className="w-4 h-4"/> Comprar por WhatsApp · USD {cap.usd.toLocaleString('es-AR')}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.ProductModal = ProductModal;

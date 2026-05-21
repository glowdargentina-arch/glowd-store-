function Catalog({ theme, layout, onAddToCart, onOpenProduct, showStockBadges, purchaseMode, editPhotos, photos }) {
  const dark = theme === 'dark';
  const [conditionFilter, setConditionFilter] = React.useState('Todos');
  const [familyFilter, setFamilyFilter] = React.useState('Todos');
  const [capacityFilter, setCapacityFilter] = React.useState('Todas');
  const [sort, setSort] = React.useState('relevance');
  const [query, setQuery] = React.useState('');

  const families = ['Todos', ...Array.from(new Set(PRODUCTS.map(p => p.family))).map(f => `iPhone ${f}`)];
  const conditions = ['Todos', 'Nuevo', 'Reacondicionado'];
  const capacities = ['Todas', '128 GB', '256 GB', '512 GB', '1 TB'];
  const sorts = [['relevance', 'Relevancia'], ['price-asc', 'Precio ↑'], ['price-desc', 'Precio ↓'], ['newest', 'Más nuevos']];

  const filtered = React.useMemo(() => {
    let list = PRODUCTS.slice();
    if (conditionFilter !== 'Todos') list = list.filter(p => p.condition === conditionFilter);
    if (familyFilter !== 'Todos') list = list.filter(p => `iPhone ${p.family}` === familyFilter);
    if (capacityFilter !== 'Todas') {
      const gb = capacityFilter === '1 TB' ? 1024 : parseInt(capacityFilter, 10);
      list = list.filter(p => p.capacities.some(c => c.gb === gb));
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q));
    }
    if (sort === 'price-asc')  list.sort((a, b) => a.capacities[0].usd - b.capacities[0].usd);
    if (sort === 'price-desc') list.sort((a, b) => b.capacities[0].usd - a.capacities[0].usd);
    if (sort === 'newest')     list.sort((a, b) => parseInt(b.family,10) - parseInt(a.family,10));
    return list;
  }, [conditionFilter, familyFilter, capacityFilter, sort, query]);

  const sectionRef = React.useRef(null);
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => e.isIntersecting && e.target.classList.add('in'));
    }, { threshold: 0.08 });
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [filtered]);

  return (
    <section id="catalog" ref={sectionRef} className="relative py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div className="reveal">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] opacity-60">
              <LogoMark theme={theme} className="h-4 w-4 opacity-90"/>
              Catálogo
            </div>
            <h2 className="mt-2 font-display font-extrabold text-4xl md:text-6xl tracking-tightest leading-[0.95]">
              Todos los modelos.<br/>
              <span className="opacity-50">Una sola tienda.</span>
            </h2>
          </div>
          <div className="reveal flex items-center gap-2 max-w-md w-full">
            <div className={"flex items-center gap-2 px-3 h-11 rounded-full w-full border " +
              (dark ? 'border-white/15 bg-white/[0.03]' : 'border-black/15 bg-white')}>
              <Icon.Search className="w-4 h-4 opacity-60"/>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Buscar modelo… (iPhone 15, 17 Pro, etc.)"
                className="bg-transparent outline-none text-[13px] flex-1 placeholder:opacity-50"
              />
              {query && (
                <button onClick={() => setQuery('')} className="opacity-60 hover:opacity-100">
                  <Icon.Close className="w-4 h-4"/>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="reveal flex flex-wrap items-center gap-3 mb-8">
          <FilterChips label="Estado" options={conditions} value={conditionFilter} onChange={setConditionFilter} theme={theme}/>
          <FilterChips label="Modelo"  options={families}   value={familyFilter}    onChange={setFamilyFilter}    theme={theme}/>
          <FilterChips label="Capacidad" options={capacities} value={capacityFilter} onChange={setCapacityFilter} theme={theme}/>
          <div className="ml-auto flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50">Orden</span>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className={"text-[12px] px-3 h-9 rounded-full border outline-none cursor-pointer " +
                (dark ? 'border-white/15 bg-ink-900' : 'border-black/15 bg-white')}>
              {sorts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center opacity-60 text-sm">
            No encontramos modelos con esos filtros.
            <button onClick={() => { setConditionFilter('Todos'); setFamilyFilter('Todos'); setCapacityFilter('Todas'); setQuery(''); }} className="ml-2 underline">Limpiar filtros</button>
          </div>
        )}

        <div className={layout === 'list'
          ? "flex flex-col gap-4"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"}>
          {filtered.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              layout={layout}
              theme={theme}
              showStockBadges={showStockBadges}
              purchaseMode={purchaseMode}
              editPhotos={editPhotos}
              photos={photos}
              onAddToCart={onAddToCart}
              onOpen={onOpenProduct}
              delay={i * 60}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FilterChips({ label, options, value, onChange, theme }) {
  const dark = theme === 'dark';
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50">{label}</span>
      <div className={"flex items-center gap-1 p-1 rounded-full border " + (dark ? 'border-white/10 bg-white/[0.03]' : 'border-black/10 bg-black/[0.02]')}>
        {options.map(o => {
          const active = o === value;
          return (
            <button
              key={o}
              onClick={() => onChange(o)}
              className={"px-3 h-7 rounded-full text-[12px] transition-all " +
                (active
                  ? (dark ? 'bg-white text-black' : 'bg-black text-white')
                  : (dark ? 'text-white/70 hover:text-white' : 'text-black/65 hover:text-black'))}>
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProductCard({ product, theme, layout, onAddToCart, onOpen, showStockBadges, purchaseMode, editPhotos, photos, delay }) {
  const dark = theme === 'dark';
  const [capIdx, setCapIdx] = React.useState(0);
  const [colorIdx, setColorIdx] = React.useState(0);
  const cap = product.capacities[capIdx];
  const color = product.colors[colorIdx];
  const waUrl = buildProductWhatsAppUrl(product, cap, color);
  const waMode = purchaseMode !== 'cart';
  const goToWhatsApp = () => {
    if (!waMode) return;
    const a = document.createElement('a');
    a.href = waUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const inner = (
    <div
      className="reveal"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className={"group relative rounded-2xl border overflow-hidden transition-all duration-500 " +
          (dark
            ? 'border-white/[0.08] bg-ink-800/40 hover:bg-ink-800/70 hover:border-white/[0.18]'
            : 'border-black/[0.08] bg-white hover:border-black/[0.18]') +
          (layout === 'list' ? ' md:flex md:items-stretch' : '')
        }
      >
        {/* Image */}
        <div
          onClick={() => waMode ? goToWhatsApp() : onOpen(product)}
          className={"relative cursor-pointer overflow-hidden " +
            (layout === 'list' ? 'md:w-[300px] shrink-0 phone-shine' : 'phone-shine') }
          style={{ minHeight: layout === 'list' ? 280 : 360 }}
          title={waMode ? 'Comprar por WhatsApp' : 'Ver detalle'}
        >
          {/* Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10 gap-2">
            <span className={"px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] " +
              (product.condition === 'Nuevo'
                ? (dark ? 'bg-white text-black' : 'bg-black text-white')
                : (dark ? 'bg-white/10 text-white border border-white/15' : 'bg-black/5 text-black border border-black/10'))}>
              {product.condition}
            </span>
            {showStockBadges && (
              <span className={"px-2 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] " +
                (dark ? 'bg-ink-900/70 text-white/80' : 'bg-white/80 text-black/70 border border-black/5')}>
                {product.stock}
              </span>
            )}
          </div>

          {/* Phone */}
          <div
            className="relative flex items-center justify-center w-full transition-transform duration-700 group-hover:-translate-y-1"
            style={{ minHeight: layout === 'list' ? 280 : 360, height: '100%' }}
          >
            {editPhotos ? (
              <ProductPhotoSlot product={product} colorIdx={colorIdx}/>
            ) : (() => {
              // 1. Built-in product gallery for this color → 3D showcase
              const colorName = product.colors[colorIdx]?.name;
              const galleryImgs = product.gallery && product.gallery[colorName];
              if (galleryImgs && galleryImgs.length) {
                return (
                  <div style={{ width: '100%', height: layout === 'list' ? 280 : 360 }}>
                    <Product3DShowcase
                      images={galleryImgs}
                      alt={product.name + ' ' + colorName}
                      theme={theme}
                    />
                  </div>
                );
              }
              // 2. User-dropped photo via image-slot
              const photoKey = `product-${product.id}-${colorIdx}`;
              const photo = photos && photos[photoKey];
              if (photo) {
                return <img src={photo} alt={product.name + ' ' + colorName}
                  className="max-h-full max-w-full object-contain" draggable="false"/>;
              }
              // 3. Fallback placeholder
              return <IPhonePlaceholder
                tone={dark ? 'dark' : 'light'}
                label={colorName || product.name}
                scale={layout === 'list' ? 0.7 : 0.85}
                family={product.family}
                colorHex={product.colors[colorIdx]?.hex}
                isPro={/Pro/.test(product.name)}
              />;
            })()}
          </div>

          {/* Quick view / Buy hint */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className={"px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-[0.18em] inline-flex items-center gap-1.5 " +
              (dark ? 'bg-white text-black' : 'bg-black text-white')}>
              {waMode ? (<><Icon.Whatsapp className="w-3 h-3"/> Comprar</>) : 'Ver detalle'}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className={"p-5 md:p-6 flex flex-col gap-4 " + (layout === 'list' ? 'flex-1' : '')}>
          <div>
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display font-bold text-xl md:text-2xl tracking-tighter">{product.name}</h3>
              <div className="text-right">
                <div className="font-display font-bold text-xl md:text-2xl tracking-tighter">USD {cap.usd.toLocaleString('es-AR')}</div>
                <div className="text-[10px] opacity-50 font-mono uppercase tracking-[0.15em]">{cap.gb >= 1024 ? '1 TB' : `${cap.gb} GB`}</div>
              </div>
            </div>
            <p className="mt-1.5 text-[13px] opacity-65">{product.tagline}</p>
          </div>

          {/* Capacity selector */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50 mb-2">Capacidad</div>
            <div className="flex flex-wrap gap-1.5">
              {product.capacities.map((c, i) => (
                <button
                  key={c.gb}
                  onClick={() => setCapIdx(i)}
                  className={"px-2.5 h-8 rounded-full text-[11px] border transition-all " +
                    (i === capIdx
                      ? (dark ? 'bg-white text-black border-white' : 'bg-black text-white border-black')
                      : (dark ? 'border-white/15 hover:border-white/35' : 'border-black/15 hover:border-black/35'))}>
                  {c.gb >= 1024 ? '1 TB' : `${c.gb} GB`}
                </button>
              ))}
            </div>
          </div>

          {/* Color selector */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-50 mb-2">
              Color · <span className="opacity-100">{product.colors[colorIdx].name}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setColorIdx(i)}
                  title={c.name}
                  className={"relative w-7 h-7 rounded-full transition-all " +
                    (i === colorIdx ? 'ring-2 ring-offset-2 ' + (dark ? 'ring-white ring-offset-ink-800' : 'ring-black ring-offset-white') : '')}
                  style={{ background: c.hex, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.15)' }}
                />
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-auto pt-2 flex items-center gap-2">
            {waMode ? (
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className={"flex-1 h-11 rounded-full text-[13px] font-medium transition-colors inline-flex items-center justify-center gap-2 " +
                  (dark ? 'bg-white text-black hover:bg-ink-100' : 'bg-black text-white hover:bg-ink-700')}>
                <Icon.Whatsapp className="w-4 h-4"/> Comprar por WhatsApp
              </a>
            ) : (
              <button
                onClick={() => onAddToCart({ ...product, selectedCap: cap, selectedColor: color })}
                className={"flex-1 h-11 rounded-full text-[13px] font-medium transition-colors " +
                  (dark ? 'bg-white text-black hover:bg-ink-100' : 'bg-black text-white hover:bg-ink-700')}>
                Agregar al carrito
              </button>
            )}
            <button
              onClick={() => onOpen(product)}
              className={"h-11 w-11 rounded-full inline-flex items-center justify-center border " +
                (dark ? 'border-white/15 hover:bg-white/5' : 'border-black/15 hover:bg-black/5')}
              aria-label="Ver detalle">
              <Icon.Arrow className="w-4 h-4"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return inner;
}

window.Catalog = Catalog;
window.ProductCard = ProductCard;

function ProductPhotoSlot({ product, colorIdx }) {
  const ref = React.useRef(null);
  const slotId = `product-${product.id}-${colorIdx}`;
  const colorName = product.colors[colorIdx] ? product.colors[colorIdx].name : '';
  React.useEffect(() => {
    if (!ref.current) return;
    ref.current.setAttribute('id', slotId);
    ref.current.setAttribute('shape', 'rounded');
    ref.current.setAttribute('radius', '16');
    ref.current.setAttribute('placeholder', `Arrastrá foto · ${product.name} · ${colorName}`);
    ref.current.setAttribute('encode-width', '900');
  }, [slotId, product.name, colorName]);
  return (
    <image-slot
      ref={ref}
      style={{ display: 'block', width: '92%', height: '92%' }}
    ></image-slot>
  );
}

function CartDrawer({ open, items, theme, onClose, onUpdateQty, onRemove, onCheckout }) {
  const dark = theme === 'dark';
  React.useEffect(() => {
    if (open) document.body.classList.add('locked');
    else document.body.classList.remove('locked');
    return () => document.body.classList.remove('locked');
  }, [open]);

  const total = items.reduce((s, it) => s + it.selectedCap.usd * it.qty, 0);

  return (
    <div className={"fixed inset-0 z-50 transition-opacity duration-300 " + (open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}/>
      <aside className={"absolute top-0 right-0 h-full w-full max-w-md flex flex-col transition-transform duration-500 " +
        (open ? 'translate-x-0' : 'translate-x-full') +
        ' ' + (dark ? 'bg-ink-900 text-white border-l border-white/[0.08]' : 'bg-white text-black border-l border-black/[0.08]')}>
        <header className={"p-6 flex items-center justify-between border-b " + (dark ? 'border-white/[0.08]' : 'border-black/[0.08]')}>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">Carrito</div>
            <h3 className="mt-1 font-display font-bold text-2xl tracking-tighter">Tu pedido</h3>
          </div>
          <button onClick={onClose} className={"h-10 w-10 inline-flex items-center justify-center rounded-full " + (dark ? 'hover:bg-white/10' : 'hover:bg-black/5')}>
            <Icon.Close className="w-4 h-4"/>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 && (
            <div className="text-center py-16 opacity-60">
              <div className="mx-auto w-12 h-12 rounded-full border border-current/20 flex items-center justify-center mb-4">
                <Icon.Cart className="w-5 h-5"/>
              </div>
              <p className="text-[14px]">Todavía no agregaste ningún iPhone.</p>
            </div>
          )}

          <ul className="flex flex-col gap-4">
            {items.map((it, i) => (
              <li key={i} className={"flex gap-4 pb-4 border-b " + (dark ? 'border-white/[0.06]' : 'border-black/[0.06]')}>
                <div className={"shrink-0 w-20 h-24 rounded-xl phone-shine flex items-center justify-center"}>
                  <div className="scale-[0.20]"><IPhonePlaceholder
                    tone={dark ? 'dark' : 'light'}
                    label=""
                    scale={1}
                    family={it.family}
                    colorHex={it.selectedColor?.hex}
                    isPro={/Pro/.test(it.name)}
                  /></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-display font-bold text-[15px] tracking-tight truncate">{it.name}</div>
                      <div className="text-[11px] opacity-60 font-mono">
                        {it.selectedCap.gb >= 1024 ? '1 TB' : it.selectedCap.gb + ' GB'} · {it.selectedColor.name}
                      </div>
                    </div>
                    <button onClick={() => onRemove(i)} className="opacity-50 hover:opacity-100">
                      <Icon.Close className="w-4 h-4"/>
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className={"inline-flex items-center rounded-full border " + (dark ? 'border-white/15' : 'border-black/15')}>
                      <button onClick={() => onUpdateQty(i, Math.max(1, it.qty - 1))} className="h-8 w-8 inline-flex items-center justify-center">
                        <Icon.Minus className="w-3.5 h-3.5"/>
                      </button>
                      <span className="px-2 text-[12px] tabular-nums">{it.qty}</span>
                      <button onClick={() => onUpdateQty(i, it.qty + 1)} className="h-8 w-8 inline-flex items-center justify-center">
                        <Icon.Plus className="w-3.5 h-3.5"/>
                      </button>
                    </div>
                    <div className="font-display font-bold tracking-tighter text-[15px]">
                      USD {(it.selectedCap.usd * it.qty).toLocaleString('es-AR')}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {items.length > 0 && (
          <footer className={"p-6 border-t " + (dark ? 'border-white/[0.08]' : 'border-black/[0.08]')}>
            <div className="flex items-baseline justify-between mb-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60">Subtotal</span>
              <span className="font-display font-extrabold text-2xl tracking-tightest">USD {total.toLocaleString('es-AR')}</span>
            </div>
            <p className="text-[11px] opacity-60 mb-4">Envío y método de pago se acuerdan por WhatsApp después del checkout.</p>
            <button onClick={onCheckout} className={"w-full h-12 rounded-full text-[14px] font-medium " +
              (dark ? 'bg-white text-black hover:bg-ink-100' : 'bg-black text-white hover:bg-ink-700')}>
              Finalizar por WhatsApp →
            </button>
          </footer>
        )}
      </aside>
    </div>
  );
}

window.CartDrawer = CartDrawer;

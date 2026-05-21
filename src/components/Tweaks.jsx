function Tweaks({ tweaks, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Tema">
        <TweakRadio
          label="Modo"
          value={tweaks.theme}
          options={[{ label: 'Oscuro', value: 'dark' }, { label: 'Claro', value: 'light' }]}
          onChange={(v) => setTweak('theme', v)}
        />
      </TweakSection>

      <TweakSection title="Layout">
        <TweakSelect
          label="Hero"
          value={tweaks.heroLayout}
          options={[
            { label: 'Editorial · type-led', value: 'editorial' },
            { label: 'Clásico · device left', value: 'classic' },
            { label: 'Split · dos cards', value: 'split' }
          ]}
          onChange={(v) => setTweak('heroLayout', v)}
        />
        <TweakRadio
          label="Catálogo"
          value={tweaks.productLayout}
          options={[{ label: 'Grilla', value: 'grid' }, { label: 'Lista', value: 'list' }]}
          onChange={(v) => setTweak('productLayout', v)}
        />
        <TweakRadio
          label="Historias"
          value={tweaks.highlightsStyle}
          options={[{ label: 'Con ring', value: 'ring' }, { label: 'Plano', value: 'flat' }]}
          onChange={(v) => setTweak('highlightsStyle', v)}
        />
      </TweakSection>

      <TweakSection title="Tipografía">
        <TweakSelect
          label="Pareja tipográfica"
          value={tweaks.fontPair}
          options={[
            { label: 'Inter Tight + Inter (default)', value: 'inter' },
            { label: 'Inter Tight + Instrument Serif', value: 'serif-mix' },
            { label: 'Inter + JetBrains Mono accents', value: 'mono-mix' }
          ]}
          onChange={(v) => setTweak('fontPair', v)}
        />
      </TweakSection>

      <TweakSection title="Producto">
        <TweakRadio
          label="Modo de compra"
          value={tweaks.purchaseMode}
          options={[
            { label: 'WhatsApp directo', value: 'whatsapp' },
            { label: 'Carrito', value: 'cart' }
          ]}
          onChange={(v) => setTweak('purchaseMode', v)}
        />
        <TweakToggle
          label="Mostrar badges de stock"
          value={tweaks.showStockBadges}
          onChange={(v) => setTweak('showStockBadges', v)}
        />
      </TweakSection>

      <TweakSection title="Clientes (Historias)">
        <TweakToggle
          label="Editar fotos · drag&drop"
          value={tweaks.editPhotos}
          onChange={(v) => setTweak('editPhotos', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

window.Tweaks = Tweaks;

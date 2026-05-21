// Product3DShowcase — 3D tilt + auto-cycle gallery for product photos.
// Use case: replace the static iPhone render in catalog cards when a product
// has a `gallery` field. The card tilts following the mouse and slowly
// crossfades through the supplied frames.
function Product3DShowcase({ images, alt = '', theme = 'dark', autoMs = 1000 }) {
  const dark = theme === 'dark';
  const [idx, setIdx] = React.useState(0);
  const [hover, setHover] = React.useState(false);
  const [tilt, setTilt] = React.useState({ rx: 0, ry: 0 });
  const wrapRef = React.useRef(null);

  // Auto-cycle (pauses on hover).
  React.useEffect(() => {
    if (!images || images.length < 2 || hover) return;
    const t = setInterval(() => {
      setIdx(i => (i + 1) % images.length);
    }, autoMs);
    return () => clearInterval(t);
  }, [images, hover, autoMs]);

  // Mouse-tracked tilt.
  const onMove = (e) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;   // 0..1
    const y = (e.clientY - r.top)  / r.height;  // 0..1
    const ry = (x - 0.5) * 22;   // ° around Y axis (left/right)
    const rx = (0.5 - y) * 14;   // ° around X axis (up/down)
    setTilt({ rx, ry });
  };
  const onLeave = () => {
    setHover(false);
    setTilt({ rx: 0, ry: 0 });
  };

  if (!images || !images.length) return null;

  return (
    <div
      ref={wrapRef}
      className="relative w-full h-full"
      style={{ perspective: '1200px' }}
      onMouseEnter={() => setHover(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={(e) => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `rotateY(${tilt.ry}deg) rotateX(${tilt.rx}deg) translateZ(0)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 280ms cubic-bezier(.2,.7,.2,1)'
        }}
      >
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={alt}
            draggable="false"
            className="absolute h-[92%] max-w-[88%] w-auto object-contain select-none"
            style={{
              opacity: i === idx ? 1 : 0,
              transform: i === idx
                ? 'scale(1) translateZ(40px)'
                : 'scale(0.96) translateZ(20px)',
              transition: 'opacity 700ms ease, transform 700ms cubic-bezier(.2,.7,.2,1)',
              filter: dark ? 'drop-shadow(0 30px 50px rgba(0,0,0,0.55))' : 'drop-shadow(0 30px 50px rgba(0,0,0,0.18))',
              pointerEvents: 'none'
            }}
          />
        ))}
      </div>

      {/* Floor reflection / soft shadow plate */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-3 h-3 rounded-full pointer-events-none"
        style={{
          width: '52%',
          background: dark
            ? 'radial-gradient(50% 100% at 50% 50%, rgba(0,0,0,0.55), rgba(0,0,0,0) 70%)'
            : 'radial-gradient(50% 100% at 50% 50%, rgba(0,0,0,0.18), rgba(0,0,0,0) 70%)',
          filter: 'blur(2px)',
          opacity: 0.9 - Math.abs(tilt.rx) * 0.02
        }}
      />

      {/* Pagination dots */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 pointer-events-auto">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setIdx(i); }}
              className="w-1.5 h-1.5 rounded-full transition-all"
              style={{
                background: i === idx
                  ? (dark ? '#fff' : '#000')
                  : (dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)'),
                width: i === idx ? 14 : 6
              }}
              aria-label={`Imagen ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

window.Product3DShowcase = Product3DShowcase;

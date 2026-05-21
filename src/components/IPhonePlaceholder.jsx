// Minimalist iPhone placeholder. SVG render removed at user request — they
// supply real photos via the image-slot drop zones. This component now just
// shows a soft frame with the model + color name in mono type, so the empty
// state looks intentional, not broken.
function IPhonePlaceholder({
  className = '',
  label = '',
  tone = 'dark',
  scale = 1,
  family = '',
  colorHex,
  isPro = false
}) {
  const w = 220 * scale, h = 460 * scale;
  const dark = tone === 'dark';
  const border = dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const dim = dark ? 'rgba(255,255,255,0.32)' : 'rgba(0,0,0,0.32)';
  const dimmer = dark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)';

  return (
    <div
      className={"relative inline-flex flex-col items-center justify-center " + className}
      style={{
        width: w, height: h,
        border: '1px dashed ' + border,
        borderRadius: 36
      }}
    >
      {/* Tiny color swatch (if known) */}
      {colorHex && (
        <span
          aria-hidden="true"
          style={{
            width: 14, height: 14, borderRadius: 999,
            background: colorHex,
            boxShadow: 'inset 0 0 0 1px ' + dimmer,
            marginBottom: 12
          }}
        />
      )}
      <span style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 10,
        letterSpacing: '0.22em',
        color: dim,
        textTransform: 'uppercase'
      }}>
        {family ? `iPhone ${family}${isPro ? ' Pro' : ''}` : 'iPhone'}
      </span>
      {label && (
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 9,
          letterSpacing: '0.22em',
          color: dimmer,
          textTransform: 'uppercase',
          marginTop: 6
        }}>
          {label}
        </span>
      )}
    </div>
  );
}

window.IPhonePlaceholder = IPhonePlaceholder;

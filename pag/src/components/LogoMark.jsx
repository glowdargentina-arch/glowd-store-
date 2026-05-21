// Tiny reusable logo mark. Theme-aware (white on dark, black on light).
// Size via class names — defaults to a sensible inline size.
function LogoMark({ theme = 'dark', className = 'h-5 w-5', alt = '' }) {
  const src = theme === 'light' ? 'assets/logo-dark.png' : 'assets/logo-white.png';
  return (
    <img
      src={src}
      alt={alt}
      aria-hidden={!alt}
      draggable="false"
      className={className + ' object-contain inline-block align-middle select-none'}
    />
  );
}
window.LogoMark = LogoMark;

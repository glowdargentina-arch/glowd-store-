// Inline SVG icons — thin stroke, mono
const Icon = {
  Search: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" strokeLinecap="round"/>
    </svg>
  ),
  Cart: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M3 4h2l2.5 12.5a2 2 0 0 0 2 1.5h8.5a2 2 0 0 0 2-1.5L22 8H6" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="10" cy="21" r="1.2"/><circle cx="18" cy="21" r="1.2"/>
    </svg>
  ),
  Sun: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round"/>
    </svg>
  ),
  Moon: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" strokeLinejoin="round"/>
    </svg>
  ),
  Menu: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M4 8h16M4 16h16" strokeLinecap="round"/>
    </svg>
  ),
  Close: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M5 5l14 14M19 5l-14 14" strokeLinecap="round"/>
    </svg>
  ),
  Arrow: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Plus: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
    </svg>
  ),
  Minus: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M5 12h14" strokeLinecap="round"/>
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="m5 12 4 4 10-10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Shield: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" strokeLinejoin="round"/>
      <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Truck: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" strokeLinejoin="round"/>
      <circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>
    </svg>
  ),
  Sparkle: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M12 3v6M12 15v6M3 12h6M15 12h6" strokeLinecap="round"/>
      <path d="m6 6 3 3M15 15l3 3M6 18l3-3M15 9l3-3" strokeLinecap="round"/>
    </svg>
  ),
  Tag: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M3 12V4h8l10 10-8 8L3 12Z" strokeLinejoin="round"/>
      <circle cx="8" cy="8" r="1.3"/>
    </svg>
  ),
  Headset: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" strokeLinecap="round"/>
      <path d="M4 14h3v5H5a1 1 0 0 1-1-1v-4ZM20 14h-3v5h2a1 1 0 0 0 1-1v-4Z" strokeLinejoin="round"/>
    </svg>
  ),
  Whatsapp: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M19.05 4.91A10 10 0 0 0 4.21 18.27L3 22l3.83-1.2A10 10 0 1 0 19.05 4.91Zm-7.06 15.4a8.3 8.3 0 0 1-4.23-1.16l-.3-.18-2.27.71.72-2.21-.2-.31a8.3 8.3 0 1 1 6.28 3.15Zm4.6-6.22c-.25-.13-1.49-.74-1.72-.82-.23-.08-.4-.13-.57.13s-.65.82-.8.99c-.15.17-.3.19-.55.06a6.74 6.74 0 0 1-1.98-1.22 7.42 7.42 0 0 1-1.37-1.71c-.14-.25 0-.38.11-.5.11-.11.25-.3.37-.45.12-.15.16-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.88-.21-.49-.42-.43-.57-.43h-.49a.94.94 0 0 0-.68.32 2.86 2.86 0 0 0-.9 2.13c0 1.26.92 2.48 1.05 2.65.13.17 1.82 2.78 4.41 3.9.62.27 1.1.43 1.48.55a3.58 3.58 0 0 0 1.64.1c.5-.07 1.49-.61 1.7-1.2.21-.59.21-1.1.15-1.2-.06-.1-.23-.16-.49-.29Z"/>
    </svg>
  ),
  Star: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="m12 3 2.7 5.7 6.3.9-4.6 4.4 1.1 6.3L12 17.3 6.5 20.3l1.1-6.3L3 9.6l6.3-.9L12 3Z"/>
    </svg>
  ),
  Battery: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <rect x="3" y="7" width="16" height="10" rx="2"/><path d="M21 10v4" strokeLinecap="round"/>
      <rect x="5" y="9" width="10" height="6" fill="currentColor" stroke="none"/>
    </svg>
  ),
  Camera: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="M4 8h3l2-2h6l2 2h3v11H4z" strokeLinejoin="round"/>
      <circle cx="12" cy="13" r="3.5"/>
    </svg>
  ),
  Chip: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <rect x="6" y="6" width="12" height="12" rx="2"/>
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3M10 10h4v4h-4z" strokeLinejoin="round"/>
    </svg>
  ),
  Box: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
      <path d="m3 7 9-4 9 4-9 4-9-4Z" strokeLinejoin="round"/>
      <path d="M3 7v10l9 4 9-4V7M12 11v10" strokeLinejoin="round"/>
    </svg>
  )
};

window.Icon = Icon;

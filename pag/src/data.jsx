// ---- Catálogo de iPhones ----------------------------------------------------
const PRODUCTS = [
  // ---------- iPhone 17 family ----------
  {
    id: 'i17-pm',
    name: 'iPhone 17 Pro Max',
    family: '17',
    tagline: 'El más nuevo. Titanio aeroespacial.',
    condition: 'Nuevo',
    capacities: [
      { gb: 256, usd: 1799 },
      { gb: 512, usd: 1999 },
      { gb: 1024, usd: 2349 }
    ],
    colors: [
      { name: 'Naranja Cósmico', hex: '#D9633A' },
      { name: 'Azul Profundo',   hex: '#2C3E60' },
      { name: 'Plata',           hex: '#D8D6CE' }
    ],
    gallery: {
      'Naranja Cósmico': [
        'assets/products/i17-pm/naranja-back.png',
        'assets/products/i17-pm/naranja-front.png',
        'assets/products/i17-pm/naranja-side.png'
      ],
      'Azul Profundo': [
        'assets/products/i17-pm/azul-back.png',
        'assets/products/i17-pm/azul-front.png',
        'assets/products/i17-pm/azul-side.png',
        'assets/products/i17-pm/azul-detail.png'
      ],
      'Plata': [
        'assets/products/i17-pm/plata-back.png',
        'assets/products/i17-pm/plata-detail.png',
        'assets/products/i17-pm/plata-side.png'
      ]
    },
    specs: ['6.9" Super Retina XDR', 'A19 Pro · 8-core GPU', 'Cámara 48MP triple', 'Hasta 33 h video'],
    stock: 'En stock',
    featured: true
  },
  {
    id: 'i17-pro',
    name: 'iPhone 17 Pro',
    family: '17',
    tagline: 'Potencia Pro. Diseño minimalista.',
    condition: 'Nuevo',
    capacities: [
      { gb: 256, usd: 1599 },
      { gb: 512, usd: 1799 },
      { gb: 1024, usd: 2099 }
    ],
    colors: [
      { name: 'Naranja Cósmico', hex: '#D9633A' },
      { name: 'Azul Profundo',   hex: '#2C3E60' },
      { name: 'Plata',           hex: '#D8D6CE' }
    ],
    gallery: {
      'Naranja Cósmico': [
        'assets/products/i17-pm/naranja-back.png',
        'assets/products/i17-pm/naranja-front.png',
        'assets/products/i17-pm/naranja-side.png'
      ],
      'Azul Profundo': [
        'assets/products/i17-pm/azul-back.png',
        'assets/products/i17-pm/azul-front.png',
        'assets/products/i17-pm/azul-side.png',
        'assets/products/i17-pm/azul-detail.png'
      ],
      'Plata': [
        'assets/products/i17-pm/plata-back.png',
        'assets/products/i17-pm/plata-detail.png',
        'assets/products/i17-pm/plata-side.png'
      ]
    },
    specs: ['6.3" Super Retina XDR', 'A19 Pro', 'Cámara 48MP triple', 'Hasta 29 h video'],
    stock: 'En stock'
  },
  {
    id: 'i17',
    name: 'iPhone 17',
    family: '17',
    tagline: 'Lo último, sin el "Pro".',
    condition: 'Nuevo',
    capacities: [
      { gb: 128, usd: 1149 },
      { gb: 256, usd: 1299 },
      { gb: 512, usd: 1499 }
    ],
    colors: [
      { name: 'Azul Neblina', hex: '#C9C0DB' },
      { name: 'Blanco',       hex: '#F1EFEB' },
      { name: 'Negro',        hex: '#1B1B1D' }
    ],
    gallery: {
      'Azul Neblina': [
        'assets/products/i17/azulneblina-back.png',
        'assets/products/i17/azulneblina-front.png',
        'assets/products/i17/azulneblina-detail.png',
        'assets/products/i17/azulneblina-side.png'
      ],
      'Blanco': [
        'assets/products/i17/blanco-back.png',
        'assets/products/i17/blanco-front.png',
        'assets/products/i17/blanco-detail.png',
        'assets/products/i17/blanco-side.png'
      ],
      'Negro': [
        'assets/products/i17/negro-back.png',
        'assets/products/i17/negro-front.png',
        'assets/products/i17/negro-detail.png',
        'assets/products/i17/negro-side.png'
      ]
    },
    specs: ['6.1" Super Retina XDR', 'A19', 'Cámara dual 48MP', 'Hasta 22 h video'],
    stock: 'En stock'
  },

  // ---------- iPhone 16 family ----------
  {
    id: 'i16-pm',
    name: 'iPhone 16 Pro Max',
    family: '16',
    tagline: 'Pantalla más grande, batería de récord.',
    condition: 'Nuevo',
    capacities: [
      { gb: 256, usd: 1499 },
      { gb: 512, usd: 1749 },
      { gb: 1024, usd: 1999 }
    ],
    colors: [
      { name: 'Titanio Desierto', hex: '#A88B6B' },
      { name: 'Titanio Natural',  hex: '#9C9A93' },
      { name: 'Titanio Negro',    hex: '#3A3A3A' },
      { name: 'Titanio Blanco',   hex: '#E8E6E1' }
    ],
    specs: ['6.9" ProMotion 120Hz', 'A18 Pro', 'Cámara Fusion 48MP + Tele 5×', 'Hasta 33 h video'],
    stock: 'En stock'
  },
  {
    id: 'i16-pro',
    name: 'iPhone 16 Pro',
    family: '16',
    tagline: 'Apple Intelligence + Cámara Pro.',
    condition: 'Nuevo',
    capacities: [
      { gb: 128, usd: 1299 },
      { gb: 256, usd: 1449 },
      { gb: 512, usd: 1699 }
    ],
    colors: [
      { name: 'Titanio Desierto', hex: '#A88B6B' },
      { name: 'Titanio Natural',  hex: '#9C9A93' },
      { name: 'Titanio Negro',    hex: '#3A3A3A' },
      { name: 'Titanio Blanco',   hex: '#E8E6E1' }
    ],
    specs: ['6.3" ProMotion 120Hz', 'A18 Pro', 'Triple cámara 48MP', 'Botón Cámara'],
    stock: 'En stock'
  },
  {
    id: 'i16',
    name: 'iPhone 16',
    family: '16',
    tagline: 'Apple Intelligence + cámara renovada.',
    condition: 'Nuevo',
    capacities: [
      { gb: 128, usd: 949 },
      { gb: 256, usd: 1099 },
      { gb: 512, usd: 1299 }
    ],
    colors: [
      { name: 'Ultramar',      hex: '#3E5C8A' },
      { name: 'Verde Azulado', hex: '#7BA499' },
      { name: 'Rosa',          hex: '#E5C7C8' },
      { name: 'Blanco',        hex: '#F1EFEB' },
      { name: 'Negro',         hex: '#1C1C1E' }
    ],
    specs: ['6.1" Super Retina XDR', 'A18', 'Cámara Fusion 48MP', 'Botón de Acción'],
    stock: 'En stock'
  },

  // ---------- iPhone 15 family ----------
  {
    id: 'i15-pm',
    name: 'iPhone 15 Pro Max',
    family: '15',
    tagline: 'Titanio + tele 5×. Joya de su generación.',
    condition: 'Reacondicionado',
    capacities: [
      { gb: 256, usd: 1099 },
      { gb: 512, usd: 1249 },
      { gb: 1024, usd: 1399 }
    ],
    colors: [
      { name: 'Titanio Natural', hex: '#9C9A93' },
      { name: 'Titanio Negro',   hex: '#3A3A3A' },
      { name: 'Titanio Blanco',  hex: '#E8E6E1' },
      { name: 'Titanio Azul',    hex: '#4E5A6A' }
    ],
    specs: ['6.7" ProMotion 120Hz', 'A17 Pro', 'Triple cámara 48MP + Tele 5×', 'USB-C 10Gb/s'],
    stock: 'En stock',
    refurbGrade: 'A · Como nuevo'
  },
  {
    id: 'i15-pro',
    name: 'iPhone 15 Pro',
    family: '15',
    tagline: 'Primer titanio. Botón de acción.',
    condition: 'Reacondicionado',
    capacities: [
      { gb: 128, usd: 899 },
      { gb: 256, usd: 999 },
      { gb: 512, usd: 1199 }
    ],
    colors: [
      { name: 'Titanio Natural', hex: '#9C9A93' },
      { name: 'Titanio Negro',   hex: '#3A3A3A' },
      { name: 'Titanio Blanco',  hex: '#E8E6E1' },
      { name: 'Titanio Azul',    hex: '#4E5A6A' }
    ],
    specs: ['6.1" ProMotion 120Hz', 'A17 Pro', 'Triple cámara 48MP', 'USB-C 10Gb/s'],
    stock: 'En stock',
    refurbGrade: 'A · Como nuevo'
  },
  {
    id: 'i15',
    name: 'iPhone 15',
    family: '15',
    tagline: 'USB-C, Dynamic Island, cámara 48MP.',
    condition: 'Reacondicionado',
    capacities: [
      { gb: 128, usd: 619 },
      { gb: 256, usd: 729 },
      { gb: 512, usd: 889 }
    ],
    colors: [
      { name: 'Negro',    hex: '#202022' },
      { name: 'Azul',     hex: '#C7D5DD' },
      { name: 'Verde',    hex: '#C7D6C5' },
      { name: 'Amarillo', hex: '#E7E1B4' },
      { name: 'Rosa',     hex: '#EFD5D2' }
    ],
    specs: ['6.1" Super Retina XDR', 'A16 Bionic', 'Cámara dual 48MP', 'USB-C'],
    stock: 'En stock',
    refurbGrade: 'A · Como nuevo'
  },

  // ---------- iPhone 14 family ----------
  {
    id: 'i14-pm',
    name: 'iPhone 14 Pro Max',
    family: '14',
    tagline: 'Pantalla siempre encendida y triple cámara Pro.',
    condition: 'Reacondicionado',
    capacities: [
      { gb: 128, usd: 849 },
      { gb: 256, usd: 949 },
      { gb: 512, usd: 1099 }
    ],
    colors: [
      { name: 'Negro Espacial', hex: '#2B2B2F' },
      { name: 'Plata',          hex: '#E3E3E1' },
      { name: 'Morado Oscuro',  hex: '#594B62' },
      { name: 'Oro',            hex: '#D9C4A6' }
    ],
    specs: ['6.7" ProMotion 120Hz', 'A16 Bionic', 'Triple cámara Pro 48MP', 'Dynamic Island'],
    stock: 'Últimas unidades',
    refurbGrade: 'A · Como nuevo'
  },
  {
    id: 'i14-pro',
    name: 'iPhone 14 Pro',
    family: '14',
    tagline: 'Dynamic Island y cámara Pro.',
    condition: 'Reacondicionado',
    capacities: [
      { gb: 128, usd: 699 },
      { gb: 256, usd: 799 },
      { gb: 512, usd: 949 }
    ],
    colors: [
      { name: 'Negro Espacial', hex: '#2B2B2F' },
      { name: 'Plata',          hex: '#E3E3E1' },
      { name: 'Morado Oscuro',  hex: '#594B62' },
      { name: 'Oro',            hex: '#D9C4A6' }
    ],
    specs: ['6.1" ProMotion 120Hz', 'A16 Bionic', 'Triple cámara Pro 48MP', 'Dynamic Island'],
    stock: 'Últimas unidades',
    refurbGrade: 'A · Como nuevo'
  },
  {
    id: 'i14',
    name: 'iPhone 14',
    family: '14',
    tagline: 'Confiable y elegante.',
    condition: 'Reacondicionado',
    capacities: [
      { gb: 128, usd: 549 },
      { gb: 256, usd: 649 },
      { gb: 512, usd: 749 }
    ],
    colors: [
      { name: 'Medianoche',     hex: '#1E2026' },
      { name: 'Blanco Estelar', hex: '#F2EFE9' },
      { name: 'Azul',           hex: '#9CB9D5' },
      { name: 'Morado',         hex: '#C9BDDB' },
      { name: 'Rojo',           hex: '#B22234' }
    ],
    specs: ['6.1" Super Retina XDR', 'A15 Bionic', 'Cámara dual 12MP', 'Detección de Choques'],
    stock: 'En stock',
    refurbGrade: 'A · Como nuevo'
  },

  // ---------- iPhone 13 family ----------
  {
    id: 'i13-pm',
    name: 'iPhone 13 Pro Max',
    family: '13',
    tagline: 'Pantalla grande, batería gigante.',
    condition: 'Reacondicionado',
    capacities: [
      { gb: 128, usd: 649 },
      { gb: 256, usd: 749 },
      { gb: 512, usd: 849 }
    ],
    colors: [
      { name: 'Grafito',        hex: '#52514D' },
      { name: 'Plata',          hex: '#E3E3E1' },
      { name: 'Oro',            hex: '#E0CBA3' },
      { name: 'Azul Sierra',    hex: '#445F76' },
      { name: 'Verde Alpino',   hex: '#506B56' }
    ],
    specs: ['6.7" ProMotion 120Hz', 'A15 Bionic', 'Triple cámara Pro', 'Hasta 28 h video'],
    stock: 'En stock',
    refurbGrade: 'A · Como nuevo'
  },
  {
    id: 'i13-pro',
    name: 'iPhone 13 Pro',
    family: '13',
    tagline: 'ProMotion 120Hz en formato compacto.',
    condition: 'Reacondicionado',
    capacities: [
      { gb: 128, usd: 549 },
      { gb: 256, usd: 649 },
      { gb: 512, usd: 749 }
    ],
    colors: [
      { name: 'Grafito',        hex: '#52514D' },
      { name: 'Plata',          hex: '#E3E3E1' },
      { name: 'Oro',            hex: '#E0CBA3' },
      { name: 'Azul Sierra',    hex: '#445F76' },
      { name: 'Verde Alpino',   hex: '#506B56' }
    ],
    specs: ['6.1" ProMotion 120Hz', 'A15 Bionic', 'Triple cámara Pro', 'Modo Cinemático'],
    stock: 'En stock',
    refurbGrade: 'B · Excelente'
  },
  {
    id: 'i13',
    name: 'iPhone 13',
    family: '13',
    tagline: 'El clásico imbatible en precio.',
    condition: 'Reacondicionado',
    capacities: [
      { gb: 128, usd: 449 },
      { gb: 256, usd: 519 },
      { gb: 512, usd: 629 }
    ],
    colors: [
      { name: 'Medianoche',     hex: '#1E2026' },
      { name: 'Blanco Estelar', hex: '#F2EFE9' },
      { name: 'Azul',           hex: '#456478' },
      { name: 'Rosa',           hex: '#E9C9CD' },
      { name: 'Verde',          hex: '#3B5C5E' }
    ],
    specs: ['6.1" Super Retina XDR', 'A15 Bionic', 'Cámara dual 12MP', 'Hasta 19 h video'],
    stock: 'En stock',
    refurbGrade: 'B · Excelente'
  }
];

// ---- Historias destacadas (testimonios) ------------------------------------
const STORIES = [
  { id: 1, name: 'Agustin',     city: 'Santa Fe',         model: 'iPhone 17 Pro', tone: 'g1', quote: 'Cero vueltas. Lo retiré en Palermo a la hora, todo impecable. Ya es la segunda vez que les compro.' },
  { id: 2, name: 'Nico',   city: 'CABA',      model: 'iPhone 15',     tone: 'g2', quote: 'Lo mandaron por encomienda y llegó al día siguiente, sellado. Factura A y todo en regla.' },
  { id: 3, name: 'Nico',  city: 'Santa Fe',     model: 'iPhone 14 Pro', tone: 'g3', quote: 'El reacondicionado parece nuevo. Batería al 100%, caja con accesorios. Recomendadísimo.' },
  { id: 4, name: 'Tomás',      city: '',      model: 'iPhone 16',     tone: 'g4', quote: 'Atención por WhatsApp top. Me asesoraron sin presionar la venta. Pagué con transferencia y listo.' },
  { id: 5, name: 'Fran',      city: 'Santa Fe',      model: 'iPhone 13',     tone: 'g5', quote: 'Buscaba algo accesible y confiable, lo encontré. Mi primer iPhone, súper contenta.' },
  { id: 6, name: 'Yami',    city: 'CABA',         model: 'iPhone 17 Pro Max', tone: 'g6', quote: 'Precio competitivo en dólar billete y garantía real. No te ofrecen humo.' },
  { id: 7, name: 'Axel',      city: 'Santa Fe',    model: 'iPhone 15',     tone: 'g7', quote: 'Me lo enviaron a Bariloche sin drama. Seguimiento por WhatsApp todo el camino.' },
  { id: 8, name: 'Joel',   city: 'Mar Del Plata',model: 'iPhone 14 Pro', tone: 'g8', quote: 'Cambié el mío + diferencia. La cotización fue justa. Sin sorpresas.' },
  { id: 9, name: 'Ludmi',      city: 'CABA',        model: 'iPhone 16',     tone: 'g9', quote: 'Después de 3 años con Android, el cambio fue una locura. GLOWD me bancó en todo.' },
  { id: 10, name: 'David',      city: 'Santa Fe',         model: 'iPhone 13',     tone: 'g10', quote: 'Lo compré para mi vieja. Ella feliz, yo tranquilo: 6 meses de garantía escrita.' },
  { id: 11, name: 'Leo',    city: 'San Carlos',      model: 'iPhone 17',     tone: 'g11', quote: 'Re fácil todo, hasta cuotas con Mercado Pago. Ya recomendé a tres amigas.' },
  { id: 12, name: 'Ariela',      city: 'Santa Fe',      model: 'iPhone 15',     tone: 'g12', quote: 'Veía mil tiendas truchas. Acá vi el local, hablé con la persona, todo cara visible.' },
  { id: 13, name: 'Marti',     city: 'CABA',      model: 'iPhone 15',     tone: 'g13', quote: 'Excelente atención.' },
  { id: 14, name: 'Paula',     city: 'Santa Fe',      model: 'iPhone 15',     tone: 'g14', quote: 'Excelente atención.' }
];

const FAQS = [
  { q: '¿Los iPhones son originales y liberados?', a: 'Sí. Todos nuestros equipos son 100% originales, liberados de fábrica para usar con cualquier compañía. No vendemos clones ni equipos con bloqueo iCloud.' },
  { q: '¿Qué diferencia hay entre Nuevo y Reacondicionado?', a: 'Nuevo: sellado de fábrica, con todos los accesorios originales. Reacondicionado: equipo usado revisado punto por punto, batería sobre 85% (o reemplazada), pantalla y carcasa sin marcas visibles, con garantía propia de 60 días.' },
  { q: '¿Cómo es la garantía?', a: 'Equipos nuevos: 12 meses de garantía Oficial Apple internacional. Reacondicionados: 60 días de garantía escrita.' },
  { q: '¿Aceptan dólar billete?', a: 'Sí. Aceptamos dólares en efectivo (USD), transferencia bancaria y Mercado Pago con débito, crédito o saldo. Los precios listados están en USD.' },
  { q: '¿Hacen envíos a todo el país?', a: 'Sí, enviamos por encomienda asegurada a todo Argentina por correo.' },
  { q: '¿Puedo entregar mi iPhone usado como parte de pago?', a: 'Sí. Así funciona nuestro plan canje: Te cotizamos tu equipo actual y descontamos el valor de tu nuevo iPhone. La cotización es gratis y sin compromiso.' },
  { q: '¿Tienen local físico?', a: 'Obvio. Atendemos con cita previa en Santa Fe Capital, 25 de mayo 7875. Coordinamos por WhatsApp para que vengas a probar el equipo antes de comprarlo.' },
  { q: '¿Emiten factura?', a: 'Sí, emitimos factura A o B según corresponda. Todos los equipos tienen comprobante para tu tranquilidad.' }
];

// ---- Contacto / WhatsApp helper -------------------------------------------
const GLOWD_PHONE = '5493425174996'; // +54 9 3425 17-4996

function buildWhatsAppUrl(message) {
  return `https://wa.me/${GLOWD_PHONE}?text=${encodeURIComponent(message)}`;
}

function buildProductWhatsAppUrl(product, cap, color) {
  const capLabel = cap.gb >= 1024 ? '1 TB' : `${cap.gb} GB`;
  const msg = `Hola GLOWD, ¿les queda stock de este iPhone? (${product.name} · ${capLabel} · ${color.name})`;
  return buildWhatsAppUrl(msg);
}

Object.assign(window, { PRODUCTS, STORIES, FAQS, GLOWD_PHONE, buildWhatsAppUrl, buildProductWhatsAppUrl });

// ---- Highlights promocionales (van antes de las historias de clientes) ----
const PROMOS = [
  {
    id: 'plan-canje',
    label: 'Plan Canje',
    title: 'PLAN CANJE',
    bullets: [
      { icon: '💬', text: '¿Tenés un iPhone y querés uno mejor?' },
      { icon: '💵', text: 'Traé tu equipo y usalo como parte de pago' },
      { icon: '🔄', text: 'Aceptamos iPhones usados en buen estado' },
      { icon: '⚡', text: 'Cambio rápido y seguro' },
      { icon: '📍', text: 'Tomamos tu equipo en el momento' },
      { icon: '✍️', text: 'Escribinos y cotizá el tuyo ahora' }
    ],
    waMessage: 'Hola GLOWD! 👋 Quiero info del Plan Canje. Tengo un iPhone para entregar como parte de pago.'
  }
];
window.PROMOS = PROMOS;

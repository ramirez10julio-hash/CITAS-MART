export interface Service {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  price: number;
  durationMin: number;
  badge?: string;
  isPopular?: boolean;
  isSuperCombo?: boolean;
  perks: string[];
  icon: 'scissors' | 'razor' | 'brush' | 'crown';
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  status: string;
  statusColor: string;
  isFeatured?: boolean;
  rating: number;
  reviewsCount: number;
  avatarSeed: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  stockStatus: string;
  description: string;
  price: number;
  size: string;
  rating: number;
  reviewCount: number;
  imageType: 'wax' | 'oil' | 'shampoo';
}

export interface Review {
  id: string;
  author: string;
  initials: string;
  verified: boolean;
  rating: number;
  quote: string;
  serviceTag: string;
}

export const SERVICES: Service[] = [
  {
    id: 'corte-signature',
    name: 'CORTE SIGNATURE AUREUS',
    shortDesc: 'Lavado relax, corte a tijera y peinado',
    fullDesc: 'Diagnóstico morfológico, lavado dermocalmante con masaje craneal, corte artesanal a tijera/máquina y fijación mate personalizada.',
    price: 28,
    durationMin: 45,
    badge: 'Más pedido',
    isPopular: true,
    perks: ['Incluye lavado y tónico mentolado', 'Espresso o Whisky single malt cortesía'],
    icon: 'scissors',
  },
  {
    id: 'ritual-barba',
    name: 'RITUAL BARBA & NAVAJA',
    shortDesc: 'Toalla caliente, navaja libre y bálsamo',
    fullDesc: 'Perfilado con navaja clásica japonesa, toallas calientes aromáticas con eucalipto, hidratación profunda con aceites nobles y bálsamo nutritivo.',
    price: 22,
    durationMin: 35,
    badge: 'Ritual Caliente',
    perks: ['Doble toalla térmica desinfectante', 'Sérum Imperial Oud de jojoba pura'],
    icon: 'razor',
  },
  {
    id: 'tinte-camuflaje',
    name: 'TINTE & CAMUFLAJE GRIS',
    shortDesc: 'Matización natural para barba o cabello',
    fullDesc: 'Matización natural e imperceptible de canas para barba o cabello. Fórmulas orgánicas certificadas que rejuvenecen sin efecto tintado artificial.',
    price: 35,
    durationMin: 50,
    badge: 'Sin Amoníaco',
    perks: ['Tonalidades calibradas personalizadas', 'Tratamiento fijador con brillo natural'],
    icon: 'brush',
  },
  {
    id: 'master-aureus',
    name: 'MASTER AUREUS FULL EXPERIENCE',
    shortDesc: 'Corte + Barba + Exfoliación spa',
    fullDesc: 'La cumbre del bienestar masculino: Corte estilizado, perfilado de barba con ozonoterapia, exfoliación facial con carbón activado y masaje descontracturante cervical.',
    price: 48,
    durationMin: 75,
    badge: 'EXPERIENCIA SUPREMA',
    isSuperCombo: true,
    perks: ['Ozonoterapia y mascarilla purificante', 'Kit de viaje de cuidado diario incluido'],
    icon: 'crown',
  },
];

export const BARBERS: Barber[] = [
  {
    id: 'mateo',
    name: 'Mateo De La Rosa',
    role: 'Master Stylist & Beard Specialist',
    status: 'Turnos libres hoy',
    statusColor: 'text-emerald-400',
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 850,
    avatarSeed: 'mateo',
  },
  {
    id: 'javier',
    name: 'Javier Mendoza',
    role: 'Experto en Navaja Clásica',
    status: 'Próximo en 30 min',
    statusColor: 'text-amber-400',
    rating: 4.9,
    reviewsCount: 420,
    avatarSeed: 'javier',
  },
  {
    id: 'primer-disponible',
    name: 'Primer Disponible',
    role: 'Máxima Rapidez',
    status: 'Sin esperas',
    statusColor: 'text-blue-400',
    rating: 4.9,
    reviewsCount: 1200,
    avatarSeed: 'any',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'cera-volcanica',
    name: 'CERA MOLDEADORA VOLCÁNICA',
    tagline: 'Fijación Fuerte • Acabado Mate',
    stockStatus: '8 disponibles',
    description: 'Formulada con arcilla volcánica purificada y cera de abeja. Textura remodelable con fijación de 24 horas y lavado fácil solo con agua tibia.',
    price: 19.5,
    size: '100ml / 3.4 fl.oz',
    rating: 5,
    reviewCount: 128,
    imageType: 'wax',
  },
  {
    id: 'aceite-oud',
    name: "ACEITE DE BARBA 'IMPERIAL OUD'",
    tagline: 'Nutrición & Densidad',
    stockStatus: '5 disponibles',
    description: 'Mezcla premium con aceite de argán virgen marroquí, macadamia y madera de agar oud. Hidrata la dermis bajo la barba y elimina el picor al instante.',
    price: 24.0,
    size: '50ml con pipeta de cristal',
    rating: 5,
    reviewCount: 94,
    imageType: 'oil',
  },
  {
    id: 'champu-biotina',
    name: 'CHAMPÚ BIOTINA & MENTA PIPERITA',
    tagline: 'Fortificante Anticaída',
    stockStatus: 'En Stock',
    description: 'Fórmula energizante con biotina B7, cafeína activa y extracto de menta silvestre. Reactiva los folículos y deja sensación de frescor prolongado.',
    price: 18.0,
    size: '250ml sin sulfatos ni siliconas',
    rating: 5,
    reviewCount: 156,
    imageType: 'shampoo',
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'ALEJANDRO RUIZ',
    initials: 'AR',
    verified: true,
    rating: 5,
    quote: 'El ritual de toallas calientes y el trato de Mateo son inigualables. Te tomas un whisky escocés mientras cuidan hasta el último milímetro de tu barba. Un 10 rotundo.',
    serviceTag: 'Corte Signature + Barba • Visita hace 3 días',
  },
  {
    id: 'rev-2',
    author: 'GONZALO PARDO',
    initials: 'GP',
    verified: true,
    rating: 5,
    quote: 'La puntualidad británica es real aquí. Llegas, te reciben por tu nombre y en 45 minutos sales impecable para tus reuniones. La reserva online es comodísima.',
    serviceTag: 'Cliente habitual desde 2021',
  },
  {
    id: 'rev-3',
    author: 'FERNANDO SAINZ',
    initials: 'FS',
    verified: true,
    rating: 5,
    quote: 'El Master Aureus Combo es una auténtica experiencia spa para hombre. Sales como nuevo física y mentalmente. Además compré el aceite Imperial Oud y dura meses.',
    serviceTag: 'Master Aureus Full Experience',
  },
];

export const DATE_OPTIONS = [
  { id: 'hoy', day: 'HOY', dateNum: '24', month: 'Octubre', label: 'Hoy (Jueves 24 Oct)' },
  { id: 'manana', day: 'MAÑANA', dateNum: '25', month: 'Octubre', label: 'Mañana (Viernes 25 Oct)' },
  { id: 'sabado', day: 'SÁBADO', dateNum: '26', month: 'Octubre', label: 'Sábado 26 Octubre' },
  { id: 'lunes', day: 'LUNES', dateNum: '28', month: 'Octubre', label: 'Lunes 28 Octubre' },
];

export const TIME_SLOTS = [
  '11:30 AM',
  '01:00 PM',
  '04:30 PM',
  '05:45 PM',
  '07:00 PM',
];

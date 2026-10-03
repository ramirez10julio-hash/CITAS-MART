/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Phone,
  MapPin,
  Mail,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Star,
  ChevronRight,
  Sparkles,
  Menu,
  X,
  FileCode,
} from 'lucide-react';

import {
  SERVICES,
  BARBERS,
  PRODUCTS,
  REVIEWS,
  DATE_OPTIONS,
  TIME_SLOTS,
  Service,
  Barber,
  Product,
} from './data/barberData';

import { CitaSmartLogo } from './components/CitaSmartLogo';
import {
  ScissorsIcon,
  RazorIcon,
  BrushIcon,
  CrownIcon,
  PomadeJarIllustration,
  BeardOilIllustration,
  ShampooIllustration,
} from './components/BarberVisuals';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { BookingModal, BookingDetails } from './components/BookingModal';
import { ExportModal } from './components/ExportModal';

export default function App() {
  // Booking Wizard States
  const [selectedService, setSelectedService] = useState<Service>(SERVICES[0]);
  const [selectedBarber, setSelectedBarber] = useState<Barber>(BARBERS[0]);
  const [selectedDate, setSelectedDate] = useState<typeof DATE_OPTIONS[0]>(DATE_OPTIONS[0]);
  const [selectedTime, setSelectedTime] = useState<string>(TIME_SLOTS[0]);
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientNotes, setClientNotes] = useState<string>('');

  // Cart & Modals
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingDetails | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Standalone HTML template string for GitHub 1-click export
  const [standaloneCode, setStandaloneCode] = useState<string>('');

  // Load standalone code for export modal on first click
  const openExportModal = async () => {
    try {
      const res = await fetch('/standalone.html');
      if (res.ok) {
        const text = await res.text();
        setStandaloneCode(text);
      } else {
        setStandaloneCode('<!-- Abre /standalone.html para ver el código completo -->');
      }
    } catch {
      setStandaloneCode('<!-- Código HTML completo generado -->');
    }
    setIsExportModalOpen(true);
  };

  // Toast notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`✓ ${product.name} añadido a tu bolsa`);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  // Service Selection in wizard & smooth scroll
  const handleSelectServiceFromCard = (service: Service) => {
    setSelectedService(service);
    const element = document.getElementById('reservar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Servicio seleccionado: ${service.name}`);
  };

  // Handle Booking Submit
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = clientName.trim() || 'Cliente Distinguido';
    const finalPhone = clientPhone.trim() || '+34 600 000 000';
    const code = `#CS-${Math.floor(1000 + Math.random() * 9000)}`;

    const details: BookingDetails = {
      bookingCode: code,
      service: selectedService,
      barber: selectedBarber,
      dateStr: selectedDate.label,
      timeStr: selectedTime,
      clientName: finalName,
      clientPhone: finalPhone,
      clientNotes,
      totalPrice: selectedService.price,
    };

    setConfirmedBooking(details);
    setIsBookingModalOpen(true);
  };

  const renderServiceIcon = (icon: Service['icon']) => {
    switch (icon) {
      case 'scissors':
        return <ScissorsIcon className="w-5 h-5" />;
      case 'razor':
        return <RazorIcon className="w-5 h-5" />;
      case 'brush':
        return <BrushIcon className="w-5 h-5" />;
      case 'crown':
        return <CrownIcon className="w-5 h-5" />;
    }
  };

  const renderProductIllustration = (type: Product['imageType']) => {
    switch (type) {
      case 'wax':
        return <PomadeJarIllustration className="w-20 h-20" />;
      case 'oil':
        return <BeardOilIllustration className="w-18 h-20" />;
      case 'shampoo':
        return <ShampooIllustration className="w-18 h-20" />;
    }
  };

  const cartTotalCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#08090b] text-[#e5e7eb] relative selection:bg-[#d4af37]/30 selection:text-[#fef3c7]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161922] border border-[#d4af37]/60 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-300">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top GitHub Ready Bar */}
      <div className="bg-[#0f1118] border-b border-[#d4af37]/25 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 text-neutral-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
          <span className="font-medium text-white">
            Plantilla Web Barbería con Logo CitaSmart
          </span>
          <span className="hidden sm:inline text-neutral-500">|</span>
          <span className="hidden sm:inline text-neutral-400">
            Agenda en directo, catálogo de autor y diseño Glassmorphism.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openExportModal}
            className="px-3 py-1 rounded-md bg-[#d4af37]/20 hover:bg-[#d4af37]/30 text-[#f5d77f] font-semibold text-[11px] border border-[#d4af37]/40 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Código 1 Solo Archivo (GitHub Pages)</span>
          </button>
        </div>
      </div>

      {/* Fixed Luxury Navigation */}
      <nav className="sticky top-0 z-40 bg-[#08090b]/85 backdrop-blur-xl border-b border-white/[0.08] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#hero" className="flex items-center group">
              <CitaSmartLogo size="md" />
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#hero" className="text-sm font-medium text-neutral-300 hover:text-[#f5d77f] transition-colors">
                Inicio
              </a>
              <a href="#servicios" className="text-sm font-medium text-neutral-300 hover:text-[#f5d77f] transition-colors">
                Servicios
              </a>
              <a href="#store" className="text-sm font-medium text-neutral-300 hover:text-[#f5d77f] transition-colors">
                Grooming Store
              </a>
              <a href="#resenas" className="text-sm font-medium text-neutral-300 hover:text-[#f5d77f] transition-colors">
                Reseñas
              </a>
              <a href="#reservar" className="text-sm font-medium text-neutral-300 hover:text-[#f5d77f] transition-colors">
                Reservar
              </a>
              <a href="#contacto" className="text-sm font-medium text-neutral-300 hover:text-[#f5d77f] transition-colors">
                Contacto
              </a>
            </div>

            {/* Right CTAs */}
            <div className="flex items-center gap-3">
              {/* WhatsApp direct pill */}
              <a
                href="https://wa.me/34912345678"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-semibold transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                WhatsApp
              </a>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#d4af37]/40 text-neutral-300 hover:text-[#f5d77f] transition-colors cursor-pointer"
                title="Ver bolsa de productos"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartTotalCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold-gradient text-neutral-950 font-bold text-[10px] flex items-center justify-center shadow-md">
                    {cartTotalCount}
                  </span>
                )}
              </button>

              {/* Agendar Turno Button */}
              <a
                href="#reservar"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-gradient hover:brightness-110 text-neutral-950 text-xs font-bold shadow-lg shadow-[#d4af37]/20 transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Agendar Turno</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0c0e14] border-b border-white/10 px-6 py-4 space-y-3">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-neutral-300 hover:text-[#f5d77f]"
            >
              Inicio
            </a>
            <a
              href="#servicios"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-neutral-300 hover:text-[#f5d77f]"
            >
              Servicios & Tarifas
            </a>
            <a
              href="#store"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-neutral-300 hover:text-[#f5d77f]"
            >
              Grooming Store
            </a>
            <a
              href="#resenas"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-neutral-300 hover:text-[#f5d77f]"
            >
              Reseñas
            </a>
            <a
              href="#reservar"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-neutral-300 hover:text-[#f5d77f]"
            >
              Reservar Cita
            </a>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-neutral-300 hover:text-[#f5d77f]"
            >
              Ubicación & Contacto
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
        {/* Ambient gold radial glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#d4af37]/10 via-[#d4af37]/5 to-transparent blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#f5d77f]">
                  Experiencia Premium & Grooming de Autor
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase font-sans leading-[1.12] mb-6">
                Estilo y{' '}
                <span className="text-gold-gradient font-serif italic tracking-normal">
                  Precisión
                </span>
                <br />
                en Cada Corte
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed max-w-xl mb-8">
                Elevamos la barbería clásica con diagnóstico morfológico a medida, toallas termales al vapor, selección de whiskies de malta y un ambiente de máxima distinción.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <a
                  href="#reservar"
                  className="px-7 py-3.5 rounded-full bg-gold-gradient hover:brightness-110 text-neutral-950 font-bold text-sm flex items-center gap-2.5 shadow-xl shadow-[#d4af37]/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Turno Ahora</span>
                </a>

                <a
                  href="#servicios"
                  className="px-6 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#d4af37]/40 text-neutral-200 text-sm font-semibold flex items-center gap-2 transition-all"
                >
                  <ScissorsIcon className="w-4 h-4 text-[#f5d77f]" />
                  <span>Ver Carta & Tarifas</span>
                </a>
              </div>

              {/* Guarantees */}
              <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Cancelación sin coste</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Confirmación instantánea</span>
                </div>
              </div>
            </div>

            {/* Right Column: Featured Barber Card */}
            <div className="lg:col-span-5">
              <div className="glass-panel-gold rounded-3xl p-7 relative overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#f5d77f]">
                    Maestro Barbero
                  </span>
                  <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f5d77f] tracking-wide">
                    DISPONIBLE HOY
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-full bg-[#13151b] border-2 border-[#d4af37] flex items-center justify-center text-[#f5d77f] shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                    <ScissorsIcon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide">
                      MATEO DE LA ROSA
                    </h3>
                    <p className="text-xs text-[#f5d77f] font-medium">
                      Master Stylist & Beard Specialist
                    </p>
                    <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1.5 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Turnos libres esta tarde
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 mb-6 text-xs text-neutral-300">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Toallas calientes aromatizadas y vapor ozono</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Navaja tradicional japonesa con filo artesanal</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Barra de café de especialidad y whisky cortesía</span>
                  </li>
                </ul>

                {/* Rating Card */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center gap-4">
                  <div className="flex text-[#f5d77f] text-sm">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <div className="border-l border-white/10 pl-3">
                    <div className="text-xs font-bold text-white">
                      Top Rated Barbería 2024
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Reconocimiento a la excelencia
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 mt-16 border-t border-white/[0.08]">
            <div className="text-center md:text-left">
              <div className="text-4xl sm:text-5xl font-extrabold text-white font-serif mb-1">
                +12K
              </div>
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                Clientes Satisfechos
              </div>
            </div>

            <div className="text-center md:text-left">
              <div className="text-4xl sm:text-5xl font-extrabold text-white font-serif mb-1">
                15+
              </div>
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                Años de Maestría
              </div>
            </div>

            <div className="text-center md:text-left">
              <div className="text-4xl sm:text-5xl font-extrabold text-white font-serif mb-1 flex items-center justify-center md:justify-start gap-2">
                <span>4.9</span>
                <span className="text-[#f5d77f] text-3xl">★</span>
              </div>
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                En Google Reviews (850+)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 relative bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#d4af37] block mb-2">
              Nuestros Servicios Exclusivos
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase text-white font-sans">
              Rituales de{' '}
              <span className="text-gold-gradient font-serif italic">
                Cuidado Masculino
              </span>
            </h2>
          </div>

          {/* Services 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((svc) => (
              <div
                key={svc.id}
                className={`rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
                  svc.isSuperCombo
                    ? 'glass-panel-gold border-[#d4af37]/50 bg-[#14161f]/90 relative'
                    : 'glass-panel hover:border-[#d4af37]/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-[#d4af37]/30 flex items-center justify-center text-[#f5d77f]">
                      {renderServiceIcon(svc.icon)}
                    </div>
                    {svc.badge && (
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                          svc.isSuperCombo
                            ? 'bg-gold-gradient text-neutral-950 font-black'
                            : 'bg-[#d4af37]/15 text-[#f5d77f] border border-[#d4af37]/30'
                        }`}
                      >
                        {svc.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {svc.name}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    {svc.fullDesc}
                  </p>

                  <ul className="space-y-2 mb-6 text-xs text-neutral-300">
                    {svc.perks.map((perk, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10 mt-auto">
                  <div className="flex items-baseline justify-between mb-4">
                    <div className="text-2xl font-bold text-white font-serif">
                      {svc.price}€{' '}
                      <span className="text-xs font-sans font-normal text-neutral-400">
                        / sesión
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{svc.durationMin} min</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectServiceFromCard(svc)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      svc.isSuperCombo
                        ? 'bg-gold-gradient hover:brightness-110 text-neutral-950 shadow-lg shadow-[#d4af37]/25'
                        : 'bg-gold-gradient hover:brightness-110 text-neutral-950'
                    }`}
                  >
                    <span>{svc.isSuperCombo ? 'Agendar Este Combo' : 'Reservar este servicio'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grooming Store Section */}
      <section id="store" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#d4af37] block mb-2">
              Gama Profesional de Barbería
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase text-white font-sans">
              Productos de{' '}
              <span className="text-gold-gradient font-serif italic">
                Grooming de Autor
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="glass-panel rounded-2xl p-6 flex flex-col justify-between text-center hover:border-[#d4af37]/40 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-6">
                    <span className="text-neutral-400 font-medium">
                      {prod.tagline}
                    </span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {prod.stockStatus}
                    </span>
                  </div>

                  {/* SVG Illustration Container */}
                  <div className="h-28 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    {renderProductIllustration(prod.imageType)}
                  </div>

                  <div className="flex items-center justify-center gap-1 text-[#f5d77f] text-xs mb-2">
                    {[...Array(prod.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <span className="text-neutral-400 text-[11px] ml-1">
                      ({prod.reviewCount} valoraciones)
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {prod.name}
                  </h3>

                  <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                    {prod.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-xl font-bold text-white font-serif">
                      {prod.price.toFixed(2)}€
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      {prod.size}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(prod)}
                    className="px-5 py-2.5 rounded-xl bg-gold-gradient hover:brightness-110 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[#d4af37]/20 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Añadir</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews / Testimonials Section */}
      <section id="resenas" className="py-20 relative bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#d4af37] block mb-2">
              Experiencias Reales de Nuestros Socios
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase text-white font-sans">
              Lo Que Dicen{' '}
              <span className="text-gold-gradient font-serif italic">
                Nuestros Clientes
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="glass-panel rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-[#f5d77f]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Cliente Verificado
                    </span>
                  </div>

                  <p className="text-xs text-neutral-300 italic leading-relaxed mb-6 font-serif-luxury">
                    "{rev.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-[#181b22] border border-[#d4af37] text-[#f5d77f] font-bold text-xs flex items-center justify-center shadow-sm">
                    {rev.initials}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-wide">
                      {rev.author}
                    </h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      {rev.serviceTag}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Booking Configurator (Reserva Guiada) */}
      <section id="reservar" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#d4af37] block mb-2">
              Reserva Guiada en 3 Pasos Rápidos
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase text-white font-sans">
              Configura Tu Cita{' '}
              <span className="text-gold-gradient font-serif italic">
                En 60 Segundos
              </span>
            </h2>
            <p className="text-xs text-neutral-400 mt-2">
              Selecciona servicio, barbero especialista y tu horario ideal. Sin pagos por adelantado y con recordatorio por WhatsApp.
            </p>
          </div>

          <div className="glass-panel-gold rounded-3xl p-6 sm:p-10 shadow-2xl">
            <form onSubmit={handleConfirmBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: 3 Steps Form */}
              <div className="lg:col-span-8 space-y-8">
                {/* Step 1: Services */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 h-6 rounded-full bg-gold-gradient text-neutral-950 font-bold text-xs flex items-center justify-center">
                      1
                    </span>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      Elige Tu Servicio
                    </h3>
                    <span className="text-[11px] text-neutral-400 ml-auto">
                      Selección única
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {SERVICES.filter((s) => s.id !== 'tinte-camuflaje').map((svc) => {
                      const isSelected = selectedService.id === svc.id;
                      return (
                        <div
                          key={svc.id}
                          onClick={() => setSelectedService(svc)}
                          className={`p-4 rounded-xl cursor-pointer transition-all border ${
                            isSelected
                              ? 'glass-panel-active border-[#d4af37]'
                              : 'bg-white/[0.02] border-white/10 hover:border-[#d4af37]/40'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-white">
                              {svc.name.replace('AUREUS', '').trim()}
                            </span>
                            <div
                              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                isSelected
                                  ? 'border-[#d4af37] bg-[#d4af37]'
                                  : 'border-neutral-500'
                              }`}
                            >
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                            </div>
                          </div>
                          <p className="text-[11px] text-neutral-400 mb-3 leading-snug line-clamp-2">
                            {svc.shortDesc}
                          </p>
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="text-[#f5d77f] font-serif text-sm">
                              {svc.price}€
                            </span>
                            <span className="text-neutral-400 text-[11px]">
                              ⏱ {svc.durationMin} min
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Barbers */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 h-6 rounded-full bg-gold-gradient text-neutral-950 font-bold text-xs flex items-center justify-center">
                      2
                    </span>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      Selecciona Tu Maestro Barbero
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {BARBERS.map((barber) => {
                      const isSelected = selectedBarber.id === barber.id;
                      return (
                        <div
                          key={barber.id}
                          onClick={() => setSelectedBarber(barber)}
                          className={`p-4 rounded-xl cursor-pointer transition-all border ${
                            isSelected
                              ? 'glass-panel-active border-[#d4af37]'
                              : 'bg-white/[0.02] border-white/10 hover:border-[#d4af37]/40'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-white">
                              {barber.name}
                            </span>
                            <div
                              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                isSelected
                                  ? 'border-[#d4af37] bg-[#d4af37]'
                                  : 'border-neutral-500'
                              }`}
                            >
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                            </div>
                          </div>
                          <div className="text-[11px] text-[#f5d77f]">
                            {barber.role}
                          </div>
                          <div className={`text-[10px] mt-2 font-medium ${barber.statusColor}`}>
                            ● {barber.status}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Date & Time */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-6 h-6 rounded-full bg-gold-gradient text-neutral-950 font-bold text-xs flex items-center justify-center">
                      3
                    </span>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      Elige Día y Horario
                    </h3>
                  </div>

                  {/* Dates */}
                  <div className="mb-3">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block mb-2">
                      Fecha de asistencia:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {DATE_OPTIONS.map((d) => {
                        const isSelected = selectedDate.id === d.id;
                        return (
                          <button
                            type="button"
                            key={d.id}
                            onClick={() => setSelectedDate(d)}
                            className={`p-3 rounded-xl text-center border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#d4af37]/15 border-[#d4af37] text-white shadow-md shadow-[#d4af37]/10'
                                : 'bg-white/[0.02] border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                            }`}
                          >
                            <div className="text-[10px] uppercase font-bold tracking-wider mb-0.5">
                              {d.day}
                            </div>
                            <div className="text-2xl font-bold font-serif text-white">
                              {d.dateNum}
                            </div>
                            <div className="text-[10px] text-neutral-400">
                              {d.month}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="mb-6">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block mb-2">
                      Bloques de horarios disponibles:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {TIME_SLOTS.map((t) => {
                        const isSelected = selectedTime === t;
                        return (
                          <button
                            type="button"
                            key={t}
                            onClick={() => setSelectedTime(t)}
                            className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-gold-gradient text-neutral-950 border-[#d4af37] shadow-md shadow-[#d4af37]/20'
                                : 'bg-white/[0.02] border-white/10 text-neutral-300 hover:border-white/30'
                            }`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Customer Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                        Nombre y Apellidos *
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Ej. Carlos Morales"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[#d4af37] focus:outline-none text-white text-xs transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+34 612 345 678"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[#d4af37] focus:outline-none text-white text-xs transition-colors"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                        Preferencia de Bebida o Notas Especiales (Opcional)
                      </label>
                      <input
                        type="text"
                        value={clientNotes}
                        onChange={(e) => setClientNotes(e.target.value)}
                        placeholder="Ej. Espresso doble, cabello fino, sin laca..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-[#d4af37] focus:outline-none text-white text-xs transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Sticky Summary */}
              <div className="lg:col-span-4 sticky top-28">
                <div className="p-6 rounded-2xl bg-[#12151e] border border-[#d4af37]/40 shadow-xl space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#f5d77f]" />
                      <span className="text-xs font-bold tracking-wider uppercase text-white">
                        Resumen de Reserva
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      En Directo
                    </span>
                  </div>

                  {/* Summary Rows */}
                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-neutral-400 block text-[11px]">
                        Servicio Elegido:
                      </span>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="font-bold text-white">
                          {selectedService.name}
                        </span>
                        <span className="text-neutral-400 text-[11px]">
                          {selectedService.durationMin} min
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-neutral-400 block text-[11px]">
                        Profesional:
                      </span>
                      <span className="font-bold text-white block mt-0.5">
                        {selectedBarber.name}
                      </span>
                    </div>

                    <div>
                      <span className="text-neutral-400 block text-[11px]">
                        Fecha & Hora:
                      </span>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="font-bold text-white">
                          {selectedDate.label}
                        </span>
                        <span className="font-bold text-[#f5d77f]">
                          {selectedTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Total Box */}
                  <div className="p-4 rounded-xl bg-black/40 border border-dashed border-[#d4af37]/35">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 block">
                      Total a abonar en el salón:
                    </span>
                    <div className="text-3xl font-extrabold text-white font-serif my-1">
                      {selectedService.price}€
                    </div>
                    <span className="text-[11px] text-neutral-400 block">
                      IVA incluido • Pago con tarjeta o efectivo
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gold-gradient hover:brightness-110 text-neutral-950 font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirmar Reserva Inmediata</span>
                  </button>

                  {/* Trust guarantees */}
                  <div className="space-y-2 pt-1 text-[11px] text-neutral-400">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Reserva segura sin tarjeta de crédito</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-400" />
                      <span>Recordatorio por WhatsApp 2h antes</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="border-t border-white/10 bg-[#060709] pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
            {/* Col 1: Brand & Logo */}
            <div className="lg:col-span-5 space-y-4">
              <CitaSmartLogo size="md" />
              <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mt-3">
                El punto de encuentro entre la alta peluquería para caballeros, la distinción artesanal y el confort contemporáneo.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#d4af37]/50 flex items-center justify-center text-neutral-400 hover:text-[#f5d77f] transition-colors text-xs"
                >
                  IG
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#d4af37]/50 flex items-center justify-center text-neutral-400 hover:text-[#f5d77f] transition-colors text-xs"
                >
                  FB
                </a>
                <a
                  href="https://wa.me/34912345678"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-[#d4af37]/50 flex items-center justify-center text-neutral-400 hover:text-[#10b981] transition-colors text-xs"
                >
                  WA
                </a>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#f5d77f]">
                Navegación
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li>
                  <a href="#hero" className="hover:text-white transition-colors">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#servicios" className="hover:text-white transition-colors">
                    Servicios & Tarifas
                  </a>
                </li>
                <li>
                  <a href="#store" className="hover:text-white transition-colors">
                    Productos Exclusivos
                  </a>
                </li>
                <li>
                  <a href="#reservar" className="hover:text-white transition-colors">
                    Agendar Turno
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="hover:text-white transition-colors">
                    Ubicación
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Horarios */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#f5d77f]">
                Horarios
              </h4>
              <ul className="space-y-2 text-xs text-neutral-400">
                <li>
                  <span className="block text-neutral-500">Lunes - Viernes</span>
                  <span className="text-white font-medium">10:00 – 21:00</span>
                </li>
                <li>
                  <span className="block text-neutral-500">Sábados</span>
                  <span className="text-white font-medium">09:00 – 20:00</span>
                </li>
                <li>
                  <span className="block text-neutral-500">Domingos</span>
                  <span className="text-white font-medium">10:00 – 15:00</span>
                </li>
              </ul>
            </div>

            {/* Col 4: Ubicación */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#f5d77f]">
                Ubicación
              </h4>
              <div className="text-xs text-neutral-400 space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>
                    Avenida de la Libertad 148,<br />
                    Distrito Salamanca, 28006 Madrid, España.
                  </span>
                </div>
                <div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#f5d77f] hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>Ver en Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center gap-2 pt-2 text-white font-medium">
                  <Phone className="w-4 h-4 text-[#d4af37]" />
                  <span>+34 912 345 678</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                  <Mail className="w-4 h-4 text-[#d4af37]" />
                  <span>contacto@citasmartbarber.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright bar */}
          <div className="pt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-500">
            <div>
              © 2024 CitaSmart Barber Club. Todos los derechos reservados.
            </div>
            <div>
              Diseño con estilo <span className="text-neutral-400">Frosted UI & Glassmorphism</span> en CSS3 puro.
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToBooking={() => {
          const el = document.getElementById('reservar');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Booking Confirmation Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        booking={confirmedBooking}
      />

      {/* Export 1-File HTML Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        htmlCode={standaloneCode}
      />
    </div>
  );
}

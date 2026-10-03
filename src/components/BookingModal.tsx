import React from 'react';
import { CheckCircle2, Calendar, Clock, User, Scissors, MessageSquare, Download, X } from 'lucide-react';
import { Service, Barber } from '../data/barberData';
import { CitaSmartLogo } from './CitaSmartLogo';

export interface BookingDetails {
  bookingCode: string;
  service: Service;
  barber: Barber;
  dateStr: string;
  timeStr: string;
  clientName: string;
  clientPhone: string;
  clientNotes: string;
  totalPrice: number;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingDetails | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, booking }) => {
  if (!isOpen || !booking) return null;

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `¡Hola CitaSmart Barber! Confirmo mi reserva:\n\n` +
      `✂ Localizador: ${booking.bookingCode}\n` +
      `👤 Cliente: ${booking.clientName}\n` +
      `📞 Teléfono: ${booking.clientPhone}\n` +
      `💈 Servicio: ${booking.service.name} (${booking.totalPrice}€)\n` +
      `🧔 Especialista: ${booking.barber.name}\n` +
      `📅 Fecha/Hora: ${booking.dateStr} a las ${booking.timeStr}\n` +
      `📝 Notas/Bebida: ${booking.clientNotes || 'Ninguna'}\n\n` +
      `¡Muchas gracias!`
    );
    window.open(`https://wa.me/34912345678?text=${text}`, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0e1015] border border-[#d4af37]/40 rounded-2xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon & Heading */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h3 className="text-2xl font-bold text-white font-serif tracking-tight">
            ¡Turno Confirmado con Éxito!
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Tu cita ha sido bloqueada en exclusiva para ti en CitaSmart Barber Club.
          </p>
        </div>

        {/* Voucher / Ticket Box */}
        <div className="p-5 rounded-xl bg-[#141720] border border-[#d4af37]/35 relative overflow-hidden space-y-3.5 mb-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <CitaSmartLogo size="sm" showTagline={false} />
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">
                Localizador de Cita
              </span>
              <span className="text-base font-extrabold text-[#f5d77f] font-mono">
                {booking.bookingCode}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-neutral-400 block mb-0.5">Cliente:</span>
              <span className="font-semibold text-white flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#d4af37]" />
                {booking.clientName}
              </span>
            </div>
            <div>
              <span className="text-neutral-400 block mb-0.5">Contacto:</span>
              <span className="font-semibold text-white">
                {booking.clientPhone}
              </span>
            </div>

            <div>
              <span className="text-neutral-400 block mb-0.5">Servicio Seleccionado:</span>
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5 text-[#d4af37]" />
                {booking.service.name}
              </span>
              <span className="text-[11px] text-neutral-400 block mt-0.5">
                Duración: {booking.service.durationMin} min
              </span>
            </div>

            <div>
              <span className="text-neutral-400 block mb-0.5">Especialista:</span>
              <span className="font-semibold text-white">
                {booking.barber.name}
              </span>
              <span className="text-[11px] text-[#f5d77f] block mt-0.5">
                {booking.barber.role}
              </span>
            </div>

            <div>
              <span className="text-neutral-400 block mb-0.5">Fecha de Asistencia:</span>
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                {booking.dateStr}
              </span>
            </div>

            <div>
              <span className="text-neutral-400 block mb-0.5">Horario Reservado:</span>
              <span className="font-semibold text-[#f5d77f] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                {booking.timeStr}
              </span>
            </div>
          </div>

          {booking.clientNotes && (
            <div className="pt-2 border-t border-white/5 text-xs">
              <span className="text-neutral-400">Preferencia/Nota: </span>
              <span className="text-neutral-200 italic">"{booking.clientNotes}"</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div>
              <span className="text-[11px] text-neutral-400 block">Total a abonar en recepción:</span>
              <span className="text-xs text-neutral-400">IVA incluido (Tarjeta o efectivo)</span>
            </div>
            <div className="text-2xl font-bold text-white font-serif">
              {booking.totalPrice}€
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={handleWhatsAppShare}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#25d366] to-[#128c7e] hover:brightness-105 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Abrir Recordatorio en WhatsApp</span>
          </button>

          <button
            onClick={handlePrint}
            className="w-full py-2.5 rounded-xl border border-white/15 hover:border-[#d4af37]/40 text-neutral-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Descargar / Imprimir Comprobante
          </button>
        </div>
      </div>
    </div>
  );
};

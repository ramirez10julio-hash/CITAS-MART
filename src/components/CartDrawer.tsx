import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../data/barberData';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToBooking: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToBooking,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleWhatsAppCheckout = () => {
    const lines = items
      .map(
        (i) => `• ${i.product.name} (x${i.quantity}) - ${(i.product.price * i.quantity).toFixed(2)}€`
      )
      .join('\n');
    const msg = encodeURIComponent(
      `¡Hola CitaSmart Barber! Deseo encargar los siguientes productos de grooming para retirar en el salón:\n\n${lines}\n\nTotal estimado: ${totalAmount.toFixed(2)}€\n\n¿Tienen disponibilidad para hoy?`
    );
    window.open(`https://wa.me/34912345678?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md h-full bg-[#0d0f14] border-l border-[#d4af37]/30 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#12151e]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#f5d77f]" />
            <h3 className="font-bold text-white text-lg font-serif">
              Bolsa de Grooming
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#d4af37]/20 text-[#f5d77f] font-semibold">
              {items.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 mb-4">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h4 className="text-base font-semibold text-white mb-1">
                Tu bolsa está vacía
              </h4>
              <p className="text-xs text-neutral-400 max-w-xs mb-6">
                Añade cera volcánica, aceite Imperial Oud o champú fortificante para retirarlos en tu próxima visita.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold rounded-lg border border-[#d4af37]/40 text-[#f5d77f] hover:bg-[#d4af37]/10 transition-colors"
              >
                Explorar Productos
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#d4af37]/30 transition-colors"
              >
                <div className="flex-1 min-w-0 pr-3">
                  <h4 className="text-sm font-bold text-white truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-xs text-neutral-400 mt-0.5">
                    {item.product.size}
                  </div>
                  <div className="text-sm font-semibold text-[#f5d77f] mt-1">
                    {(item.product.price * item.quantity).toFixed(2)}€
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-white/10 rounded-lg bg-black/40 overflow-hidden">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="px-2.5 py-1 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors text-xs font-bold"
                    >
                      -
                    </button>
                    <span className="px-2 text-xs font-semibold text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="px-2.5 py-1 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors text-xs font-bold"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#12151e] space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-400">Total Productos:</span>
              <span className="text-xl font-bold text-white font-serif">
                {totalAmount.toFixed(2)}€
              </span>
            </div>
            <p className="text-[11px] text-neutral-400">
              * Los productos se reservan para abonar y retirar directamente en el salón de barbería.
            </p>

            <div className="space-y-2 pt-2">
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3 rounded-xl bg-gold-gradient hover:brightness-110 text-neutral-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/20 transition-all cursor-pointer"
              >
                <span>Encargar vía WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onClose();
                  onProceedToBooking();
                }}
                className="w-full py-2.5 rounded-xl border border-white/15 hover:border-[#d4af37]/40 text-neutral-300 hover:text-white text-xs font-semibold transition-colors"
              >
                Continuar a Reservar Turno de Barbería
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

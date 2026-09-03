import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { CartItem } from '../types';
import { formatRupiah } from '../utils/format';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToOrder: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToOrder,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#26142B]/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 font-sans">
        <div className="w-screen max-w-md bg-[#FAF7FC] border-l border-[#6E3482]/15 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 bg-[#26142B] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-300" />
              <h3 className="font-serif text-xl font-light italic">Keranjang Belanja</h3>
              <span className="bg-[#6E3482] text-white text-[10px] font-sans font-bold px-2 py-0.5 rounded-full">
                {totalItemCount}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12 text-[#705B77] space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto text-[#6E3482]/40 stroke-[1.5]" />
                <h4 className="font-serif text-lg font-light italic text-[#26142B]">
                  Keranjang Masih Kosong
                </h4>
                <p className="text-xs max-w-xs mx-auto">
                  Pilih lilin aromaterapi favorit Anda dari katalog dan tambahkan ke sini.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white p-3.5 rounded-2xl border border-[#6E3482]/15 flex gap-3 shadow-xs"
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-[#6E3482]/15 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-1">
                      <div className="min-w-0">
                        <span className="text-[9px] uppercase font-bold tracking-widest text-[#6E3482] block truncate">
                          {item.product.category}
                        </span>
                        <h5 className="font-serif text-base font-medium text-[#26142B] truncate">
                          {item.product.name}
                        </h5>
                        <span className="text-xs font-semibold text-[#705B77]">
                          {formatRupiah(item.product.price)}
                        </span>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-neutral-400 hover:text-rose-600 p-1 transition-colors"
                        title="Hapus item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#6E3482]/10 mt-2">
                      <div className="flex items-center border border-[#6E3482]/20 rounded-lg bg-[#F3ECF7] overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#26142B] hover:bg-[#EAE0F0] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-bold text-xs text-[#26142B]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#26142B] hover:bg-[#EAE0F0] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-[#26142B]">
                        {formatRupiah(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Checkout */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#6E3482]/15 space-y-4">
              <div className="space-y-1.5 text-xs text-[#705B77]">
                <div className="flex justify-between">
                  <span>Jumlah Produk:</span>
                  <span className="font-semibold text-[#26142B]">{totalItemCount} pcs</span>
                </div>
                <div className="flex justify-between items-baseline pt-1 border-t border-[#6E3482]/10">
                  <span className="text-xs uppercase tracking-wider text-[#705B77]">Total Pembayaran:</span>
                  <span className="font-bold text-lg text-[#26142B]">
                    {formatRupiah(totalAmount)}
                  </span>
                </div>
              </div>

              <button
                onClick={onProceedToOrder}
                className="w-full flex items-center justify-center gap-2 bg-[#6E3482] hover:bg-[#5D2570] text-white font-sans font-bold uppercase text-xs tracking-wider py-4 px-4 rounded-full shadow-md hover:scale-[1.01] transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Lanjut Pesan via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-[#705B77]">
                Pilihan bayar: QRIS (Semua E-Wallet) & Transfer Bank
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

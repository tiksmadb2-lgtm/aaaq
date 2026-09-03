import React, { useState } from 'react';
import { X, Clock, Weight, Flame, Sparkles, CheckCircle2, MessageCircle, ShoppingBag, ShieldCheck, Heart, Edit3, Trash2 } from 'lucide-react';
import { CandleProduct } from '../types';
import { formatRupiah } from '../utils/format';

interface ProductDetailModalProps {
  candle: CandleProduct | null;
  isAdmin: boolean;
  onClose: () => void;
  onOrderViaWhatsApp: (candle: CandleProduct, quantity: number) => void;
  onAddToCart: (candle: CandleProduct, quantity: number) => void;
  onEdit: (candle: CandleProduct) => void;
  onDelete: (candleId: string, candleName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  candle,
  isAdmin,
  onClose,
  onOrderViaWhatsApp,
  onAddToCart,
  onEdit,
  onDelete,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  if (!candle) return null;

  const handleAdd = () => {
    onAddToCart(candle, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#26142B]/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-4xl bg-[#FAF7FC] rounded-[32px] shadow-2xl border border-[#6E3482]/20 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#26142B] flex items-center justify-center shadow-md border border-[#6E3482]/20 transition-all cursor-pointer"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left: Big Product Image */}
          <div className="md:col-span-5 bg-[#F3ECF7] relative min-h-[300px] md:min-h-full">
            <img
              src={candle.imageUrl}
              alt={candle.name}
              className="w-full h-full object-cover object-center max-h-[480px] md:max-h-none"
            />
            
            {/* Category tag */}
            <div className="absolute top-4 left-4">
              <span className="bg-white/95 backdrop-blur-md text-[#6E3482] text-[10px] uppercase tracking-wider font-sans font-semibold px-3 py-1.5 rounded-full border border-[#6E3482]/15 shadow-xs">
                {candle.category}
              </span>
            </div>

            {/* Natural Ingredients Badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#5D2570]/95 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-white text-xs space-y-1 font-sans">
              <div className="flex items-center gap-1.5 text-amber-200 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Eco-Friendly Soy Wax</span>
              </div>
              <p className="text-[11px] text-white/80">
                Bebas parafin, bebas phthalate, dan ramah untuk pernapasan.
              </p>
            </div>
          </div>

          {/* Right: Detailed Candle Description & Ordering */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div className="space-y-6">
              
              {/* Header */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#6E3482] font-sans">
                    Koleksi Lilin Aromaterapi
                  </span>
                  
                  {/* Admin controls */}
                  {isAdmin && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(candle)}
                        className="text-xs flex items-center gap-1 bg-white hover:bg-[#F3ECF7] text-[#6E3482] px-2.5 py-1 rounded-md border border-[#6E3482]/20 font-medium cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          onClose();
                          onDelete(candle.id, candle.name);
                        }}
                        className="text-xs flex items-center gap-1 bg-rose-50 hover:bg-rose-100 text-rose-700 px-2.5 py-1 rounded-md border border-rose-200 font-medium cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Hapus
                      </button>
                    </div>
                  )}
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-light italic text-[#26142B] mt-1">
                  {candle.name}
                </h2>
                <p className="text-xs text-[#705B77] italic mt-1 font-serif">
                  "{candle.tagline}"
                </p>

                <div className="text-2xl font-sans font-medium text-[#26142B] mt-3">
                  {formatRupiah(candle.price)}
                </div>
              </div>

              {/* Specifications Pills */}
              <div className="grid grid-cols-3 gap-2.5 text-center font-sans">
                <div className="p-2.5 rounded-2xl bg-white border border-[#6E3482]/10">
                  <Clock className="w-4 h-4 mx-auto text-[#6E3482] mb-1" />
                  <span className="text-[10px] text-[#705B77] uppercase tracking-wider block">Waktu Bakar</span>
                  <span className="text-xs font-semibold text-[#26142B]">{candle.burnTime}</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-white border border-[#6E3482]/10">
                  <Weight className="w-4 h-4 mx-auto text-[#6E3482] mb-1" />
                  <span className="text-[10px] text-[#705B77] uppercase tracking-wider block">Berat Lilin</span>
                  <span className="text-xs font-semibold text-[#26142B]">{candle.weight}</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-white border border-[#6E3482]/10">
                  <Flame className="w-4 h-4 mx-auto text-[#6E3482] mb-1" />
                  <span className="text-[10px] text-[#705B77] uppercase tracking-wider block">Jenis Wax</span>
                  <span className="text-xs font-semibold text-[#26142B] truncate">Soy Wax Alami</span>
                </div>
              </div>

              {/* Full Description (Keterangan Lilin) */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wider text-[#6E3482] font-sans font-bold">
                  Keterangan & Sensasi Aroma
                </h4>
                <p className="text-sm text-[#705B77] font-sans leading-relaxed">
                  {candle.description}
                </p>
              </div>

              {/* Scent Pyramid Notes */}
              <div className="p-4 rounded-2xl bg-[#F3ECF7] border border-[#6E3482]/15 space-y-2.5">
                <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-[#6E3482] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#6E3482]" />
                  Piramida Aroma (Fragrance Notes)
                </h4>
                <div className="space-y-1.5 text-xs font-sans">
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-[#6E3482] w-20 shrink-0">Top Note:</span>
                    <span className="text-[#26142B]">{candle.scentNotes.top}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-[#6E3482] w-20 shrink-0">Heart Note:</span>
                    <span className="text-[#26142B]">{candle.scentNotes.middle}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-[#6E3482] w-20 shrink-0">Base Note:</span>
                    <span className="text-[#26142B]">{candle.scentNotes.base}</span>
                  </div>
                </div>
              </div>

              {/* Aromatherapy Benefits */}
              <div className="space-y-2 font-sans">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#6E3482] flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#6E3482]" />
                  Manfaat Aromaterapi Bagi Tubuh & Pikiran
                </h4>
                <div className="space-y-2">
                  {candle.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#705B77]">
                      <CheckCircle2 className="w-4 h-4 text-[#6E3482] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Actions: Quantity + Order buttons */}
            <div className="pt-6 mt-6 border-t border-[#6E3482]/15 space-y-4">
              <div className="flex items-center justify-between font-sans">
                <span className="text-xs uppercase tracking-wider text-[#705B77]">Jumlah Pesanan:</span>
                <div className="flex items-center border border-[#6E3482]/20 rounded-full bg-white overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center text-[#6E3482] hover:bg-[#F3ECF7] transition-colors font-bold text-base cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-[#26142B]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center text-[#6E3482] hover:bg-[#F3ECF7] transition-colors font-bold text-base cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Price total for selected quantity */}
              <div className="flex items-baseline justify-between py-1 text-sm font-sans">
                <span className="text-[#705B77]">Total Sementara:</span>
                <span className="text-xl font-medium text-[#26142B]">
                  {formatRupiah(candle.price * quantity)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAdd}
                  className="flex items-center justify-center gap-2 border border-[#6E3482]/30 hover:bg-[#6E3482] hover:text-white text-[#6E3482] uppercase tracking-wider font-sans font-semibold text-xs py-3.5 px-4 rounded-full transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{addedToast ? '✓ Masuk Keranjang' : 'Tambah Keranjang'}</span>
                </button>

                <button
                  onClick={() => onOrderViaWhatsApp(candle, quantity)}
                  className="flex items-center justify-center gap-2 bg-[#6E3482] hover:bg-[#5D2570] text-white uppercase tracking-wider font-sans font-bold text-xs py-3.5 px-4 rounded-full shadow-md hover:scale-[1.01] transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Pesan via WhatsApp</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-[#705B77] font-sans">
                🔒 Pembayaran dapat menggunakan <strong>QRIS</strong> (Semua E-Wallet) atau <strong>Transfer Bank</strong> resmi.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

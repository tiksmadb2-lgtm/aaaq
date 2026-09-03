import React from 'react';
import { Clock, Weight, MessageCircle, Eye, Edit3, Trash2, Check, ShoppingBag } from 'lucide-react';
import { CandleProduct } from '../types';
import { formatRupiah } from '../utils/format';

interface ProductCardProps {
  candle: CandleProduct;
  isAdmin: boolean;
  onSelect: (candle: CandleProduct) => void;
  onInstantOrder: (candle: CandleProduct) => void;
  onAddToCart: (candle: CandleProduct) => void;
  onEdit: (candle: CandleProduct) => void;
  onDelete: (candleId: string, candleName: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  candle,
  isAdmin,
  onSelect,
  onInstantOrder,
  onAddToCart,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="group relative bg-white p-4 rounded-3xl border border-[#6E3482]/10 hover:border-[#6E3482]/30 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#F3ECF7] rounded-2xl mb-3">
        <img
          src={candle.imageUrl}
          alt={candle.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <span className="bg-white/90 backdrop-blur-sm text-[#6E3482] text-[10px] font-sans font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs border border-[#6E3482]/15">
            {candle.category}
          </span>
          {candle.featured && (
            <span className="bg-[#6E3482] text-white text-[9px] font-sans font-bold px-2 py-0.5 rounded-md uppercase tracking-widest shadow-xs">
              Signature
            </span>
          )}
        </div>

        {/* Admin Quick Action Floating Buttons */}
        {isAdmin && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#26142B]/85 backdrop-blur-sm p-1.5 rounded-lg border border-white/20 z-10 shadow-lg">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(candle);
              }}
              className="p-1.5 text-amber-200 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
              title="Edit Lilin Ini"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(candle.id, candle.name);
              }}
              className="p-1.5 text-rose-300 hover:text-rose-100 hover:bg-red-500/30 rounded transition-colors cursor-pointer"
              title="Hapus Lilin Ini"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Quick View overlay on hover */}
        <button
          onClick={() => onSelect(candle)}
          className="absolute inset-0 bg-[#26142B]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
        >
          <span className="bg-white text-[#26142B] font-sans font-semibold text-xs uppercase tracking-wider px-3.5 py-2 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all">
            <Eye className="w-3.5 h-3.5 text-[#6E3482]" />
            Detail Lilin
          </span>
        </button>
      </div>

      {/* Product Content Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Scent Title & Subtitle */}
          <h3 
            onClick={() => onSelect(candle)}
            className="font-serif text-xl font-normal text-[#26142B] hover:text-[#6E3482] cursor-pointer transition-colors leading-snug"
          >
            {candle.name}
          </h3>
          <p className="text-xs text-[#705B77] mt-0.5 line-clamp-1 italic font-serif">
            "{candle.tagline}"
          </p>

          {/* Candle Specs: Weight & Burn Time */}
          <div className="flex items-center gap-4 text-xs font-sans text-[#705B77] mt-3 py-2 border-y border-[#6E3482]/10">
            <span className="flex items-center gap-1" title="Waktu Pembakaran">
              <Clock className="w-3.5 h-3.5 text-[#6E3482]" />
              {candle.burnTime}
            </span>
            <span className="flex items-center gap-1" title="Berat Bersih">
              <Weight className="w-3.5 h-3.5 text-[#6E3482]" />
              {candle.weight}
            </span>
          </div>

          {/* Brief Description Snippet */}
          <p className="text-xs text-[#705B77] font-sans mt-3 line-clamp-2 leading-relaxed">
            {candle.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-[#6E3482]/10">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-[10px] text-[#705B77] uppercase tracking-widest block font-sans">
                Harga
              </span>
              <span className="text-lg font-sans font-medium text-[#26142B]">
                {formatRupiah(candle.price)}
              </span>
            </div>
            <span className="text-[10px] font-sans uppercase tracking-wider text-[#6E3482] bg-[#6E3482]/10 px-2 py-0.5 rounded flex items-center gap-1">
              <Check className="w-3 h-3" />
              Ready
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onAddToCart(candle)}
              className="flex items-center justify-center gap-1.5 border border-[#6E3482]/30 hover:bg-[#6E3482] hover:text-white text-[#6E3482] text-xs font-sans font-medium py-2.5 px-3 rounded-xl transition-colors cursor-pointer"
              title="Tambah ke Keranjang"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>+ Keranjang</span>
            </button>

            <button
              onClick={() => onInstantOrder(candle)}
              className="flex items-center justify-center gap-1.5 bg-[#6E3482] hover:bg-[#5D2570] text-white text-xs font-sans font-bold uppercase tracking-wider py-2.5 px-3 rounded-xl shadow-xs transition-colors cursor-pointer"
              title="Pesan Langsung via WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Pesan WA</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

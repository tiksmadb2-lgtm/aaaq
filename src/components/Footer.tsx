import React from 'react';
import { Flame, MessageCircle, CreditCard, ShieldCheck, Heart } from 'lucide-react';
import { StoreSettings } from '../types';

interface FooterProps {
  settings: StoreSettings;
  onOpenAdmin: () => void;
  onOpenPaymentGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onOpenAdmin,
  onOpenPaymentGuide,
}) => {
  return (
    <footer className="bg-[#26142B] text-[#FAF7FC] pt-16 pb-12 border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#6E3482] border border-white/20 flex items-center justify-center text-white">
                <Flame className="w-5 h-5 fill-white/30 text-white" />
              </div>
              <div>
                <span className="font-serif text-2xl font-light italic tracking-wider text-white block leading-none">
                  CANDLE MANTRA
                </span>
                <span className="text-[9px] font-sans font-medium tracking-widest uppercase text-white/60 block mt-1">
                  Handmade Scented Candles
                </span>
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed pr-4">
              Lilin aromaterapi artisan terbuat dari 100% soy wax murni tanpa parafin. Menghidupkan suasana damai, merilekskan pikiran, dan melengkapi keindahan hunian Anda.
            </p>

            <div className="pt-2">
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#6E3482] hover:bg-[#5D2570] text-white text-xs uppercase tracking-wider font-sans font-bold px-5 py-3 rounded-full transition-transform hover:scale-[1.02] shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Konsultasi WhatsApp: +{settings.whatsappNumber}</span>
              </a>
            </div>
          </div>

          {/* Candle Care Tips */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif text-xl font-light italic text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-300" />
              Tips Perawatan Lilin
            </h4>
            <ul className="text-xs text-white/70 space-y-2 leading-relaxed font-sans">
              <li className="flex items-start gap-2">
                <span className="text-[#6E3482] font-bold">•</span>
                <span><strong>Pembakaran Pertama:</strong> Nyalakan lilin selama 2-3 jam hingga seluruh permukaan lilin mencair merata agar tidak berlubang (tunneling).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6E3482] font-bold">•</span>
                <span><strong>Potong Sumbu:</strong> Selalu potong sumbu lilin sekitar 5 mm sebelum dinyalakan kembali untuk mencegah asap berlebih.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#6E3482] font-bold">•</span>
                <span><strong>Keamanan:</strong> Jangan letakkan lilin menyala dekat benda yang mudah terbakar atau tanpa pengawasan.</span>
              </li>
            </ul>
          </div>

          {/* Payment Info & Quick Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif text-xl font-light italic text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-300" />
              Metode Pembayaran
            </h4>
            <p className="text-xs text-white/70 leading-relaxed font-sans">
              Kami menerima transaksi aman melalui scan <strong>QRIS</strong> (semua e-wallet dan m-banking) serta <strong>Transfer Bank</strong> (BCA, Mandiri, BRI).
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <button
                onClick={onOpenPaymentGuide}
                className="text-xs uppercase tracking-wider font-sans bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full border border-white/20 transition-colors cursor-pointer"
              >
                Lihat Panduan QRIS & Bank
              </button>
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenAdmin}
                className="text-[11px] text-white/50 hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-sans"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Portal Login Admin Toko</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4 font-sans">
          <p>© {new Date().getFullYear()} {settings.storeName}. Hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Dibuat dengan cinta untuk para penikmat aromaterapi</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 inline" />
          </div>
        </div>

      </div>
    </footer>
  );
};

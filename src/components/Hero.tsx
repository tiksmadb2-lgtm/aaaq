import React from 'react';
import { Sparkles, Heart, ShieldCheck, CreditCard, QrCode, ArrowRight, MessageCircle } from 'lucide-react';

interface HeroProps {
  onScrollToCatalog: () => void;
  onOpenPaymentGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToCatalog, onOpenPaymentGuide }) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF7FC] pt-8 pb-16 md:pt-12 md:pb-24 border-b border-[#6E3482]/15">
      {/* Subtle organic ambient purple highlights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F3ECF7]/80 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#EFE6F5]/70 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6E3482]/10 text-[#6E3482] text-xs uppercase tracking-widest font-sans border border-[#6E3482]/15">
              <Sparkles className="w-3.5 h-3.5 text-[#6E3482]" />
              <span>Hand-Poured Soy Wax Candles</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#26142B] leading-[1.12] tracking-tight">
              Hadirkan Ketenangan Jiwa Melalui Keharuman Lilin Alami.
            </h1>

            <p className="text-base sm:text-lg text-[#705B77] leading-relaxed max-w-2xl font-sans">
              Dibuat dengan cermat dari <strong>100% Lilin Kedelai (Soy Wax)</strong> murni dan minyak esensial terapeutik. Bebas jelaga hitam dan parafin, memberikan aroma relaksasi yang tahan hingga 50 jam untuk menemani istirahat, meditasi, dan self-care Anda.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-explore-btn"
                onClick={onScrollToCatalog}
                className="flex items-center gap-2.5 bg-[#6E3482] hover:bg-[#5D2570] text-white px-7 py-3.5 rounded-full font-sans font-bold uppercase text-xs tracking-widest shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
              >
                <span>Lihat Koleksi Lilin</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-payment-guide-btn"
                onClick={onOpenPaymentGuide}
                className="flex items-center gap-2 border border-[#6E3482]/30 hover:bg-[#6E3482] hover:text-white text-[#6E3482] px-6 py-3.5 rounded-full font-sans text-xs uppercase tracking-widest transition-colors cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Info Transfer & QRIS</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[#6E3482]/15">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F3ECF7] flex items-center justify-center text-[#6E3482]">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#26142B]">100% Bahan Alami</h4>
                  <p className="text-[11px] text-[#705B77]">Kedelai murni tanpa parafin</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F3ECF7] flex items-center justify-center text-[#6E3482]">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#26142B]">Pesan via WhatsApp</h4>
                  <p className="text-[11px] text-[#705B77]">Pelayanan ramah & cepat</p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#F3ECF7] flex items-center justify-center text-[#6E3482]">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#26142B]">QRIS & Transfer Bank</h4>
                  <p className="text-[11px] text-[#705B77]">BCA, Mandiri, E-Wallet</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Showcase - Arched Cut */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Arched Architectural Showcase Frame */}
              <div className="relative rounded-t-[80px] sm:rounded-t-[100px] rounded-b-3xl overflow-hidden shadow-2xl border border-[#6E3482]/20 bg-[#F3ECF7] group">
                <img
                  src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=85"
                  alt="Lilin Aromaterapi Candle Mantra"
                  className="w-full h-[440px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Card Overlay */}
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-sm p-6 rounded-2xl border border-[#6E3482]/15 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-[#6E3482] block mb-1">
                        Signature Collection
                      </span>
                      <h3 className="font-serif text-2xl font-light italic text-[#26142B]">
                        Lavande Sérénité
                      </h3>
                      <p className="text-xs text-[#705B77] font-sans mt-0.5">Bulgarian Lavender & Pure Vanilla</p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-sans font-medium text-[#26142B] block">Rp 135.000</span>
                      <div className="flex gap-1.5 mt-1.5 justify-end">
                        <span className="px-2 py-0.5 bg-[#6E3482]/10 text-[9px] uppercase tracking-wider rounded text-[#6E3482]">
                          Soy Wax
                        </span>
                        <span className="px-2 py-0.5 bg-[#6E3482]/10 text-[9px] uppercase tracking-wider rounded text-[#6E3482]">
                          Eco
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Small floating feature pill */}
              <div className="absolute -top-3 -right-3 bg-[#6E3482] text-white px-3.5 py-2 rounded-full shadow-lg border border-white/20 text-xs font-sans tracking-wide flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>Clean Burning • No Toxic Soot</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

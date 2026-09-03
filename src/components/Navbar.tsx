import React from 'react';
import { Flame, ShoppingBag, Shield, LogIn, LogOut, HelpCircle, Sparkles, CreditCard } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  isAdmin: boolean;
  onOpenCart: () => void;
  onOpenAdmin: () => void;
  onLogoutAdmin: () => void;
  onOpenPaymentGuide: () => void;
  onScrollToCatalog: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  isAdmin,
  onOpenCart,
  onOpenAdmin,
  onLogoutAdmin,
  onOpenPaymentGuide,
  onScrollToCatalog,
}) => {
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7FC]/95 backdrop-blur-md border-b border-[#6E3482]/15">
      {/* Top Announcement Bar */}
      <div className="bg-[#5D2570] text-white text-[11px] font-sans tracking-widest uppercase py-2 px-4 text-center">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 opacity-90">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            100% Pure Natural Soy Wax
          </span>
          <span className="hidden md:inline opacity-40">•</span>
          <span className="hidden md:inline opacity-90">Pemesanan Mudah via WhatsApp</span>
          <span className="hidden md:inline opacity-40">•</span>
          <span className="flex items-center gap-1.5 opacity-90">
            <CreditCard className="w-3.5 h-3.5 text-amber-300" />
            QRIS & Transfer Bank Otomatis
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer flex items-center gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-full bg-[#F3ECF7] border border-[#6E3482]/20 flex items-center justify-center text-[#6E3482] shadow-xs group-hover:bg-[#6E3482] group-hover:text-white transition-all duration-300">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="font-serif text-2xl font-light tracking-[0.2em] text-[#5D2570] block leading-none">
                CANDLE MANTRA
              </span>
              <span className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-[#705B77] block mt-1">
                Aroma Scent Sanctuary
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-sans text-[#26142B]">
            <button
              onClick={onScrollToCatalog}
              className="hover:text-[#6E3482] border-b-2 border-transparent hover:border-[#6E3482] pb-1 transition-all cursor-pointer"
            >
              Koleksi Lilin
            </button>
            <button
              onClick={onOpenPaymentGuide}
              className="hover:text-[#6E3482] border-b-2 border-transparent hover:border-[#6E3482] pb-1 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5 text-[#6E3482]" />
              Metode Pembayaran
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('about-scents');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#6E3482] border-b-2 border-transparent hover:border-[#6E3482] pb-1 transition-all cursor-pointer"
            >
              Tentang Soy Wax
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Payment Guide trigger (Mobile / Small) */}
            <button
              id="nav-payment-guide-btn"
              onClick={onOpenPaymentGuide}
              className="md:hidden p-2 text-[#6E3482] hover:bg-[#F3ECF7] rounded-lg transition-colors"
              title="Info Pembayaran (QRIS & Transfer)"
            >
              <CreditCard className="w-5 h-5" />
            </button>

            {/* Admin status / login */}
            {isAdmin ? (
              <div className="flex items-center gap-2 bg-[#F3ECF7] px-3 py-1.5 rounded-full border border-[#6E3482]/20">
                <span className="flex items-center gap-1 text-xs font-semibold text-[#6E3482]">
                  <Shield className="w-3.5 h-3.5 text-[#6E3482]" />
                  Admin
                </span>
                <button
                  id="nav-admin-dashboard-btn"
                  onClick={onOpenAdmin}
                  className="text-xs bg-[#6E3482] text-white px-2.5 py-1 rounded-full hover:bg-[#5D2570] transition-colors font-medium"
                >
                  Kelola
                </button>
                <button
                  id="nav-admin-logout-btn"
                  onClick={onLogoutAdmin}
                  className="text-[#705B77] hover:text-rose-700 p-1 transition-colors"
                  title="Keluar dari Akun Admin"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                id="nav-admin-login-btn"
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-sans text-[#6E3482] border border-[#6E3482]/30 hover:bg-[#6E3482] hover:text-white px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
                title="Masuk sebagai Admin Toko"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin Portal</span>
              </button>
            )}

            {/* Shopping Cart Button */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-[#26142B] hover:bg-[#6E3482] text-white px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-full font-sans text-xs uppercase tracking-widest shadow-sm transition-all duration-200 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Keranjang</span>
              {totalCartCount > 0 && (
                <span className="bg-[#6E3482] text-white border border-white/30 text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[18px] text-center">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

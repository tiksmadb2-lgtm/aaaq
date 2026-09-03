import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Search, Filter, Plus, Flame, CheckCircle, 
  MessageCircle, ShoppingBag, CreditCard, Shield, QrCode
} from 'lucide-react';
import { CandleProduct, CartItem, ScentCategory, StoreSettings } from './types';
import { INITIAL_CANDLES, INITIAL_SETTINGS } from './data/initialCandles';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OrderModal } from './components/OrderModal';
import { AdminModal } from './components/AdminModal';
import { PaymentGuideModal } from './components/PaymentGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { AboutScents } from './components/AboutScents';
import { Footer } from './components/Footer';

const ALL_CATEGORIES: Array<'Semua Aroma' | ScentCategory> = [
  'Semua Aroma',
  'Relaksasi & Tidur',
  'Ketenangan Zen',
  'Fokus & Energi',
  'Floral & Romantis',
  'Hangat & Rempah',
  'Fresh & Citrus'
];

export default function App() {
  // Candles State (hydrated from localStorage or default)
  const [candles, setCandles] = useState<CandleProduct[]>(() => {
    const saved = localStorage.getItem('candlemantra_candles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved candles', e);
      }
    }
    return INITIAL_CANDLES;
  });

  // Settings State
  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('candlemantra_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure storeName is Candle Mantra if old name was present
        if (parsed.storeName === 'Kandela' || parsed.storeName === 'Kandela Studio') {
          parsed.storeName = 'Candle Mantra';
        }
        return parsed;
      } catch (e) {
        console.error('Failed to parse settings', e);
      }
    }
    return INITIAL_SETTINGS;
  });

  // Admin Auth State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('candlemantra_is_admin') === 'true';
  });

  // Shopping Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('candlemantra_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
    return [];
  });

  // Modal / UI States
  const [selectedCandle, setSelectedCandle] = useState<CandleProduct | null>(null);
  const [candleToEdit, setCandleToEdit] = useState<CandleProduct | null>(null);
  const [orderItems, setOrderItems] = useState<CartItem[] | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isPaymentGuideOpen, setIsPaymentGuideOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Catalog Filters
  const [selectedCategory, setSelectedCategory] = useState<'Semua Aroma' | ScentCategory>('Semua Aroma');
  const [searchQuery, setSearchQuery] = useState('');

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Persist State to LocalStorage
  useEffect(() => {
    localStorage.setItem('candlemantra_candles', JSON.stringify(candles));
  }, [candles]);

  useEffect(() => {
    localStorage.setItem('candlemantra_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('candlemantra_is_admin', isAdmin ? 'true' : 'false');
  }, [isAdmin]);

  useEffect(() => {
    localStorage.setItem('candlemantra_cart', JSON.stringify(cart));
  }, [cart]);

  // Admin Authentication handlers
  const handleAdminLogin = (user: string, pass: string): boolean => {
    if (user.trim() === 'admin' && pass === 'admin123') {
      setIsAdmin(true);
      showToast('Berhasil masuk sebagai Admin Candle Mantra.');
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    showToast('Anda telah keluar dari akun Admin.');
  };

  // Product CRUD operations
  const handleAddCandle = (newCandle: CandleProduct) => {
    setCandles((prev) => [newCandle, ...prev]);
    showToast(`Lilin "${newCandle.name}" berhasil ditambahkan.`);
  };

  const handleUpdateCandle = (updatedCandle: CandleProduct) => {
    setCandles((prev) =>
      prev.map((c) => (c.id === updatedCandle.id ? updatedCandle : c))
    );
    if (selectedCandle?.id === updatedCandle.id) {
      setSelectedCandle(updatedCandle);
    }
    showToast(`Lilin "${updatedCandle.name}" berhasil diperbarui.`);
  };

  const handleDeleteCandle = (candleId: string, candleName?: string) => {
    setCandles((prev) => prev.filter((c) => c.id !== candleId));
    setCart((prev) => prev.filter((item) => item.product.id !== candleId));
    if (selectedCandle?.id === candleId) {
      setSelectedCandle(null);
    }
    showToast(`Lilin ${candleName ? `"${candleName}"` : ''} dan keterangannya berhasil dihapus.`);
  };

  // Cart operations
  const handleAddToCart = (candle: CandleProduct, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === candle.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === candle.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product: candle, quantity: qty }];
    });
    showToast(`"${candle.name}" (${qty} pcs) ditambahkan ke keranjang.`);
  };

  const handleUpdateCartQty = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Instant order for a single candle
  const handleInstantOrder = (candle: CandleProduct, quantity = 1) => {
    setOrderItems([{ product: candle, quantity }]);
    setSelectedCandle(null);
    setIsOrderModalOpen(true);
  };

  // Order from cart
  const handleOrderFromCart = () => {
    if (cart.length === 0) return;
    setOrderItems(cart);
    setIsCartOpen(false);
    setIsOrderModalOpen(true);
  };

  // Filtered candles
  const filteredCandles = candles.filter((candle) => {
    const matchesCategory =
      selectedCategory === 'Semua Aroma' || candle.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      candle.name.toLowerCase().includes(query) ||
      candle.tagline.toLowerCase().includes(query) ||
      candle.description.toLowerCase().includes(query) ||
      candle.scentNotes.top.toLowerCase().includes(query) ||
      candle.scentNotes.middle.toLowerCase().includes(query) ||
      candle.scentNotes.base.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7FC] text-[#26142B]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#26142B] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#6E3482]/30 flex items-center gap-3 text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle className="w-4 h-4 text-amber-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        cartItems={cart}
        isAdmin={isAdmin}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAdmin={() => {
          setCandleToEdit(null);
          setIsAdminModalOpen(true);
        }}
        onLogoutAdmin={handleAdminLogout}
        onOpenPaymentGuide={() => setIsPaymentGuideOpen(true)}
        onScrollToCatalog={scrollToCatalog}
      />

      {/* Hero Banner */}
      <Hero
        onScrollToCatalog={scrollToCatalog}
        onOpenPaymentGuide={() => setIsPaymentGuideOpen(true)}
      />

      {/* Admin Floating Banner (if admin is active) */}
      {isAdmin && (
        <div className="bg-[#F3ECF7] border-b border-[#6E3482]/20 py-2.5 px-4 text-xs font-sans">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-[#6E3482] font-medium">
              <Shield className="w-4 h-4 text-[#6E3482]" />
              <span>
                <strong>Mode Admin Aktif:</strong> Anda dapat menambah lilin baru, mengedit keterangan, menghapus lilin, atau mengubah nomor WhatsApp dan rekening pembayaran.
              </span>
            </div>
            <button
              onClick={() => {
                setCandleToEdit(null);
                setIsAdminModalOpen(true);
              }}
              className="bg-[#6E3482] text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-[#5D2570] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Lilin Baru</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Catalog Section */}
      <main id="catalog-section" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        
        {/* Catalog Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-[#6E3482]/15">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#6E3482] mb-2 font-sans">
              <Flame className="w-4 h-4 text-[#6E3482]" />
              <span>Koleksi Terlengkap</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#26142B]">
              Lilin Aromaterapi Kedelai Alami
            </h2>
            <p className="text-sm text-[#705B77] mt-1 max-w-2xl font-sans leading-relaxed">
              Setiap lilin dituangkan secara manual dengan 100% natural soy wax, menghadirkan aroma murni yang menenangkan tanpa racun parafin.
            </p>
          </div>

          {/* Quick Payment Feature Highlight */}
          <div 
            onClick={() => setIsPaymentGuideOpen(true)}
            className="cursor-pointer bg-white p-3.5 rounded-2xl border border-[#6E3482]/10 shadow-xs hover:border-[#6E3482]/30 transition-colors flex items-center gap-3 shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-[#F3ECF7] flex items-center justify-center text-[#6E3482]">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#705B77] block">Metode Pembayaran:</span>
              <span className="text-xs font-sans font-bold text-[#26142B] block">QRIS & Transfer Bank</span>
              <span className="text-[11px] text-[#6E3482] block font-medium">Bebas Biaya Admin • Instan</span>
            </div>
          </div>
        </div>

        {/* Search and Category Filter Bar */}
        <div className="space-y-4 mb-10">
          
          {/* Search Box */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-[#705B77] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari lilin (cth: Lavender, Cendana, Peppermint, Mawar)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-2xl border border-[#6E3482]/20 bg-white text-[#26142B] placeholder-[#705B77]/60 focus:outline-none focus:ring-2 focus:ring-[#6E3482]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#705B77] hover:text-[#26142B]"
              >
                Hapus
              </button>
            )}
          </div>

          {/* Scent Categories Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap text-xs uppercase tracking-wider font-sans font-medium px-4 py-2 rounded-full transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#6E3482] text-white shadow-xs'
                    : 'bg-white text-[#6E3482] border border-[#6E3482]/20 hover:bg-[#F3ECF7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Product Grid */}
        {filteredCandles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-[#6E3482]/20 space-y-3">
            <Flame className="w-12 h-12 mx-auto text-[#6E3482]/40 stroke-[1.5]" />
            <h4 className="font-serif text-xl font-light italic text-[#26142B]">
              Lilin Tidak Ditemukan
            </h4>
            <p className="text-xs text-[#705B77] max-w-sm mx-auto font-sans">
              Tidak ada lilin yang sesuai dengan kata kunci "{searchQuery}" atau filter kategori ini.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Semua Aroma');
              }}
              className="mt-2 text-xs bg-[#6E3482] text-white px-5 py-2 rounded-full font-sans font-bold uppercase tracking-wider hover:bg-[#5D2570] cursor-pointer"
            >
              Tampilkan Semua Lilin
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCandles.map((candle) => (
              <ProductCard
                key={candle.id}
                candle={candle}
                isAdmin={isAdmin}
                onSelect={(c) => setSelectedCandle(c)}
                onInstantOrder={(c) => handleInstantOrder(c, 1)}
                onAddToCart={(c) => handleAddToCart(c, 1)}
                onEdit={(c) => {
                  setCandleToEdit(c);
                  setIsAdminModalOpen(true);
                }}
                onDelete={(id, name) => handleDeleteCandle(id, name)}
              />
            ))}
          </div>
        )}

        {/* Seamless Purchase Banner */}
        <div className="bg-[#6E3482] text-white p-8 rounded-[40px] mt-14 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-lg">
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-70 font-sans">
              Seamless Purchase
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-light italic">
              Pemesanan Cepat via WhatsApp
            </h3>
            <p className="text-xs text-white/80 font-sans leading-relaxed">
              Pilih lilin favorit Anda dan selesaikan pesanan secara langsung melalui WhatsApp. Didukung pembayaran instan dengan QRIS (Semua E-Wallet) dan Transfer Bank resmi.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Halo Candle Mantra, saya ingin menanyakan koleksi lilin aromaterapi dan pemesanan.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-white text-[#6E3482] py-4 px-7 rounded-full font-sans font-bold uppercase text-xs tracking-widest hover:scale-[1.02] transition-transform shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order via WhatsApp</span>
            </a>

            <div className="flex flex-col justify-center border-t sm:border-t-0 sm:border-l border-white/20 pt-3 sm:pt-0 sm:pl-4 text-xs font-sans">
              <span className="text-[9px] uppercase tracking-wider opacity-60">Payment Accepted</span>
              <div className="flex gap-2 mt-1">
                <span className="bg-white/10 px-2 py-1 rounded text-[10px] font-sans">QRIS</span>
                <span className="bg-white/10 px-2 py-1 rounded text-[10px] font-sans">Bank Transfer</span>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* About Scents & Soy Wax Educational Section */}
      <AboutScents />

      {/* Footer */}
      <Footer
        settings={settings}
        onOpenAdmin={() => {
          setCandleToEdit(null);
          setIsAdminModalOpen(true);
        }}
        onOpenPaymentGuide={() => setIsPaymentGuideOpen(true)}
      />

      {/* Modals & Drawers */}
      
      {/* 1. Candle Detail Modal */}
      {selectedCandle && (
        <ProductDetailModal
          candle={selectedCandle}
          isAdmin={isAdmin}
          onClose={() => setSelectedCandle(null)}
          onOrderViaWhatsApp={(candle, qty) => handleInstantOrder(candle, qty)}
          onAddToCart={(candle, qty) => handleAddToCart(candle, qty)}
          onEdit={() => {
            const candle = selectedCandle;
            setSelectedCandle(null);
            setCandleToEdit(candle);
            setIsAdminModalOpen(true);
          }}
          onDelete={(id, name) => {
            handleDeleteCandle(id, name);
            setSelectedCandle(null);
          }}
        />
      )}

      {/* 2. WhatsApp Order Checkout Modal (with QRIS & Transfer Bank) */}
      {isOrderModalOpen && orderItems && (
        <OrderModal
          items={orderItems}
          settings={settings}
          onClose={() => {
            setIsOrderModalOpen(false);
            setOrderItems(null);
          }}
          onOrderSuccess={() => {
            setIsOrderModalOpen(false);
            setOrderItems(null);
            showToast('Pesanan berhasil dibuat & dialihkan ke WhatsApp.');
          }}
        />
      )}

      {/* 3. Admin Login & Store Management Modal */}
      {isAdminModalOpen && (
        <AdminModal
          isAdmin={isAdmin}
          candles={candles}
          settings={settings}
          candleToEdit={candleToEdit}
          onLogin={handleAdminLogin}
          onLogout={handleAdminLogout}
          onAddCandle={handleAddCandle}
          onUpdateCandle={handleUpdateCandle}
          onDeleteCandle={handleDeleteCandle}
          onUpdateSettings={(newSettings) => {
            setSettings(newSettings);
            showToast('Pengaturan toko berhasil diperbarui.');
          }}
          onClose={() => {
            setIsAdminModalOpen(false);
            setCandleToEdit(null);
          }}
        />
      )}

      {/* 4. Payment Guide Modal (QRIS & Bank Transfer) */}
      {isPaymentGuideOpen && (
        <PaymentGuideModal
          settings={settings}
          onClose={() => setIsPaymentGuideOpen(false)}
        />
      )}

      {/* 5. Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onProceedToOrder={handleOrderFromCart}
      />

    </div>
  );
}

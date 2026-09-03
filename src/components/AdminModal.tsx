import React, { useState } from 'react';
import { 
  X, Lock, Shield, PlusCircle, Trash2, Edit3, Check, Upload, Image, 
  Settings, LogOut, Sparkles, AlertCircle, RefreshCw, Layers, Phone
} from 'lucide-react';
import { CandleProduct, ScentCategory, StoreSettings } from '../types';
import { formatRupiah } from '../utils/format';

interface AdminModalProps {
  isAdmin: boolean;
  candles: CandleProduct[];
  settings: StoreSettings;
  candleToEdit?: CandleProduct | null;
  onLogin: (user: string, pass: string) => boolean;
  onLogout: () => void;
  onAddCandle: (candle: CandleProduct) => void;
  onUpdateCandle: (candle: CandleProduct) => void;
  onDeleteCandle: (candleId: string) => void;
  onUpdateSettings: (settings: StoreSettings) => void;
  onClose: () => void;
}

const SCENT_CATEGORIES: ScentCategory[] = [
  'Relaksasi & Tidur',
  'Ketenangan Zen',
  'Fokus & Energi',
  'Floral & Romantis',
  'Hangat & Rempah',
  'Fresh & Citrus'
];

const PRESET_IMAGES = [
  { label: 'Amber Jar Classic', url: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80' },
  { label: 'Wooden Wick Cozy', url: 'https://images.unsplash.com/photo-1572726729437-37326462725e?auto=format&fit=crop&w=800&q=80' },
  { label: 'Minimalist White Jar', url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80' },
  { label: 'Floral Botanical Rose', url: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80' },
  { label: 'Warm Spice Cinnamon', url: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80' },
  { label: 'Green Tea & Sage', url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80' },
];

export const AdminModal: React.FC<AdminModalProps> = ({
  isAdmin,
  candles,
  settings,
  candleToEdit,
  onLogin,
  onLogout,
  onAddCandle,
  onUpdateCandle,
  onDeleteCandle,
  onUpdateSettings,
  onClose,
}) => {
  // Login State
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');

  // Admin Panel Tabs: 'add' | 'manage' | 'settings'
  const [activeTab, setActiveTab] = useState<'add' | 'manage' | 'settings'>(candleToEdit ? 'add' : 'add');

  // Add/Edit Product Form State
  const [editingId, setEditingId] = useState<string | null>(candleToEdit?.id || null);
  const [name, setName] = useState(candleToEdit?.name || '');
  const [tagline, setTagline] = useState(candleToEdit?.tagline || '');
  const [category, setCategory] = useState<ScentCategory>(candleToEdit?.category || 'Relaksasi & Tidur');
  const [price, setPrice] = useState<number>(candleToEdit?.price || 135000);
  const [weight, setWeight] = useState(candleToEdit?.weight || '200 gram / 7 oz');
  const [burnTime, setBurnTime] = useState(candleToEdit?.burnTime || '45 - 50 Jam');
  const [waxType, setWaxType] = useState(candleToEdit?.waxType || '100% Natural Soy Wax & Organic Wick');
  const [imageUrl, setImageUrl] = useState(candleToEdit?.imageUrl || PRESET_IMAGES[0].url);
  const [description, setDescription] = useState(candleToEdit?.description || '');
  const [topNotes, setTopNotes] = useState(candleToEdit?.scentNotes?.top || '');
  const [middleNotes, setMiddleNotes] = useState(candleToEdit?.scentNotes?.middle || '');
  const [baseNotes, setBaseNotes] = useState(candleToEdit?.scentNotes?.base || '');
  const [benefitsText, setBenefitsText] = useState(candleToEdit?.benefits?.join('\n') || 'Membantu relaksasi dan meredakan stres\nMeningkatkan kualitas tidur malam\nAroma alami lembut tanpa asap hitam');
  const [inStock, setInStock] = useState(candleToEdit ? candleToEdit.inStock : true);
  const [featured, setFeatured] = useState(candleToEdit ? Boolean(candleToEdit.featured) : false);

  // Status feedback toast
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Settings tab form state
  const [localSettings, setLocalSettings] = useState<StoreSettings>(settings);

  // Search filter in manage tab
  const [searchFilter, setSearchFilter] = useState('');

  // Handle Login
  const handlePerformLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = onLogin(username, password);
    if (!ok) {
      setLoginError('Username atau kata sandi admin salah. Silakan coba lagi.');
    } else {
      setLoginError('');
    }
  };

  // Handle File Upload (converts image to Data URL)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset Add Form
  const resetForm = () => {
    setEditingId(null);
    setName('');
    setTagline('');
    setCategory('Relaksasi & Tidur');
    setPrice(135000);
    setWeight('200 gram / 7 oz');
    setBurnTime('45 - 50 Jam');
    setWaxType('100% Natural Soy Wax & Organic Wick');
    setImageUrl(PRESET_IMAGES[0].url);
    setDescription('');
    setTopNotes('');
    setMiddleNotes('');
    setBaseNotes('');
    setBenefitsText('Membantu relaksasi dan meredakan stres\nMeningkatkan kualitas tidur malam\nAroma alami lembut tanpa asap hitam');
    setInStock(true);
    setFeatured(false);
  };

  // Populate form for Edit
  const handleEditInit = (c: CandleProduct) => {
    setEditingId(c.id);
    setName(c.name);
    setTagline(c.tagline);
    setCategory(c.category);
    setPrice(c.price);
    setWeight(c.weight);
    setBurnTime(c.burnTime);
    setWaxType(c.waxType);
    setImageUrl(c.imageUrl);
    setDescription(c.description);
    setTopNotes(c.scentNotes.top);
    setMiddleNotes(c.scentNotes.middle);
    setBaseNotes(c.scentNotes.base);
    setBenefitsText(c.benefits.join('\n'));
    setInStock(c.inStock);
    setFeatured(Boolean(c.featured));
    setActiveTab('add');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Save product (Add or Update)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) {
      alert('Nama lilin dan keterangan deskripsi lilin wajib diisi!');
      return;
    }

    const benefitsArray = benefitsText
      .split('\n')
      .map(b => b.trim())
      .filter(Boolean);

    const candleData: CandleProduct = {
      id: editingId || `candlemantra-${Date.now()}`,
      name: name.trim(),
      tagline: tagline.trim() || 'Aroma alami penyegar ruangan',
      category,
      price: Number(price),
      weight,
      burnTime,
      waxType,
      imageUrl: imageUrl.trim() || PRESET_IMAGES[0].url,
      description: description.trim(),
      scentNotes: {
        top: topNotes.trim() || 'Fresh Herbal / Citrus',
        middle: middleNotes.trim() || 'Floral / Botanical Heart',
        base: baseNotes.trim() || 'Warm Woods / Amber',
      },
      benefits: benefitsArray.length > 0 ? benefitsArray : ['Memberikan keharuman menenangkan bagi ruangan'],
      inStock,
      featured,
    };

    if (editingId) {
      onUpdateCandle(candleData);
      setFeedbackMessage(`Lilin "${candleData.name}" berhasil diperbarui!`);
    } else {
      onAddCandle(candleData);
      setFeedbackMessage(`Lilin baru "${candleData.name}" berhasil ditambahkan ke katalog!`);
    }

    resetForm();
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  // Handle Save Store Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(localSettings);
    setFeedbackMessage('Pengaturan toko (WhatsApp, Rekening Bank & QRIS) berhasil disimpan!');
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#26142B]/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 font-sans">
      <div className="relative w-full max-w-4xl bg-[#FAF7FC] rounded-[32px] shadow-2xl border border-[#6E3482]/20 overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#26142B] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#6E3482] flex items-center justify-center text-white">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-light italic">
                {isAdmin ? 'Panel Kontrol Admin Candle Mantra' : 'Login Admin Toko'}
              </h3>
              <p className="text-[10px] uppercase tracking-wider text-white/70">
                {isAdmin ? 'Kelola produk lilin, gambar, deskripsi, dan sistem pembayaran' : 'Masukkan kredensial admin untuk mengelola lilin'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-rose-900/60 text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/20 transition-colors cursor-pointer"
                title="Keluar Admin"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedbackMessage && (
          <div className="bg-[#6E3482] text-white text-xs px-6 py-2.5 flex items-center gap-2 shadow-inner">
            <Check className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="font-medium">{feedbackMessage}</span>
          </div>
        )}

        {/* NOT LOGGED IN: Show Login Form */}
        {!isAdmin ? (
          <div className="p-8 max-w-md mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-[#F3ECF7] border border-[#6E3482]/20 flex items-center justify-center text-[#6E3482] mx-auto shadow-sm">
                <Lock className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-2xl font-light italic text-[#26142B]">
                Akses Khusus Admin
              </h4>
              <p className="text-xs text-[#705B77]">
                Silakan masuk untuk menambah, mengedit, atau menghapus lilin aromaterapi serta mengatur metode pembayaran.
              </p>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handlePerformLogin} className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-[#705B77] block mb-1 font-semibold">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#6E3482]/20 bg-white text-[#26142B] focus:outline-none focus:ring-2 focus:ring-[#6E3482]"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#705B77] block mb-1 font-semibold">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#6E3482]/20 bg-white text-[#26142B] focus:outline-none focus:ring-2 focus:ring-[#6E3482]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#6E3482] hover:bg-[#5D2570] text-white font-sans font-bold uppercase tracking-wider py-3.5 px-4 rounded-full text-xs shadow-md transition-colors cursor-pointer"
              >
                Masuk Sebagai Admin
              </button>
            </form>

            {/* Demo Helper Box */}
            <div className="p-3.5 bg-[#F3ECF7] rounded-2xl border border-[#6E3482]/20 text-xs text-[#705B77] space-y-1 text-center">
              <span className="font-semibold text-[#26142B] block">💡 Akun Demo Siap Pakai:</span>
              <p>Username: <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[#6E3482]">admin</code></p>
              <p>Password: <code className="bg-white px-1.5 py-0.5 rounded font-mono text-[#6E3482]">admin123</code></p>
            </div>
          </div>
        ) : (
          /* LOGGED IN: Admin Panel */
          <div className="flex flex-col h-full">
            {/* Tabs Navigation */}
            <div className="flex border-b border-[#6E3482]/15 bg-[#F3ECF7]/70 px-6 pt-2 gap-2 text-xs font-semibold">
              <button
                onClick={() => {
                  resetForm();
                  setActiveTab('add');
                }}
                className={`py-3 px-4 rounded-t-2xl uppercase tracking-wider text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'add'
                    ? 'bg-[#FAF7FC] text-[#26142B] border-t border-x border-[#6E3482]/15 shadow-xs'
                    : 'text-[#705B77] hover:text-[#26142B]'
                }`}
              >
                <PlusCircle className="w-4 h-4 text-[#6E3482]" />
                <span>{editingId ? 'Edit Lilin' : 'Tambah Lilin Baru'}</span>
              </button>

              <button
                onClick={() => setActiveTab('manage')}
                className={`py-3 px-4 rounded-t-2xl uppercase tracking-wider text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'manage'
                    ? 'bg-[#FAF7FC] text-[#26142B] border-t border-x border-[#6E3482]/15 shadow-xs'
                    : 'text-[#705B77] hover:text-[#26142B]'
                }`}
              >
                <Layers className="w-4 h-4 text-[#6E3482]" />
                <span>Kelola & Hapus Lilin ({candles.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`py-3 px-4 rounded-t-2xl uppercase tracking-wider text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-[#FAF7FC] text-[#26142B] border-t border-x border-[#6E3482]/15 shadow-xs'
                    : 'text-[#705B77] hover:text-[#26142B]'
                }`}
              >
                <Settings className="w-4 h-4 text-[#6E3482]" />
                <span>Pengaturan Toko & Pembayaran</span>
              </button>
            </div>

            {/* TAB CONTENT */}
            <div className="p-6 max-h-[75vh] overflow-y-auto">
              
              {/* TAB 1: ADD / EDIT PRODUCT */}
              {activeTab === 'add' && (
                <form onSubmit={handleSaveProduct} className="space-y-6">
                  <div className="flex items-center justify-between pb-2 border-b border-[#6E3482]/15">
                    <div>
                      <h4 className="font-serif text-2xl font-light italic text-[#26142B]">
                        {editingId ? `Edit Lilin: "${name}"` : 'Form Tambah Lilin Aromaterapi'}
                      </h4>
                      <p className="text-xs text-[#705B77]">
                        Admin dapat mengunggah gambar baru dan mengisi keterangan lengkap lilin.
                      </p>
                    </div>
                    {editingId && (
                      <button
                        type="button"
                        onClick={resetForm}
                        className="text-xs uppercase tracking-wider bg-[#F3ECF7] text-[#26142B] px-3.5 py-1.5 rounded-full hover:bg-[#EADBEE] font-semibold"
                      >
                        Batal Edit (Buat Baru)
                      </button>
                    )}
                  </div>

                  {/* Image Management Section */}
                  <div className="p-4 bg-white rounded-2xl border border-[#6E3482]/15 space-y-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#6E3482] block">
                      1. Gambar Lilin (Foto Produk)
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      {/* Image Preview */}
                      <div className="md:col-span-4 aspect-square bg-[#FAF7FC] rounded-xl border border-[#6E3482]/20 overflow-hidden relative flex items-center justify-center">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt="Preview Lilin"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-3 text-[#705B77]">
                            <Image className="w-8 h-8 mx-auto mb-1 opacity-50" />
                            <span className="text-[11px] block">Belum ada gambar</span>
                          </div>
                        )}
                      </div>

                      {/* Image Inputs */}
                      <div className="md:col-span-8 space-y-3">
                        {/* File upload option */}
                        <div>
                          <span className="text-xs font-semibold text-[#26142B] block mb-1">
                            Unggah dari File Komputer / HP:
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileUpload}
                            className="w-full text-xs text-[#705B77] file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-[#6E3482] file:text-white hover:file:bg-[#5D2570] cursor-pointer"
                          />
                        </div>

                        {/* URL input option */}
                        <div>
                          <span className="text-xs font-semibold text-[#26142B] block mb-1">
                            Atau Masukkan URL Gambar:
                          </span>
                          <input
                            type="url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full text-xs px-3.5 py-2 rounded-xl border border-[#6E3482]/20 bg-white text-[#26142B] focus:outline-none focus:ring-2 focus:ring-[#6E3482]"
                          />
                        </div>

                        {/* Quick Presets */}
                        <div>
                          <span className="text-[11px] text-[#705B77] block mb-1.5 font-medium">
                            Atau Pilih Cepat dari Preset Foto Berkualitas:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {PRESET_IMAGES.map((preset) => (
                              <button
                                key={preset.label}
                                type="button"
                                onClick={() => setImageUrl(preset.url)}
                                className={`text-[10px] px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                                  imageUrl === preset.url
                                    ? 'bg-[#6E3482] text-white border-[#6E3482]'
                                    : 'bg-[#FAF7FC] text-[#705B77] border-[#6E3482]/20 hover:bg-[#F3ECF7]'
                                }`}
                              >
                                {preset.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="p-4 bg-white rounded-2xl border border-[#6E3482]/15 space-y-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#6E3482] block">
                      2. Identitas & Harga Lilin
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-[#26142B] block mb-1">
                          Nama Lilin *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Contoh: Lavande Sérénité"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#6E3482]/20 bg-white text-[#26142B] focus:outline-none focus:ring-2 focus:ring-[#6E3482]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#26142B] block mb-1">
                          Tagline Singkat
                        </label>
                        <input
                          type="text"
                          value={tagline}
                          onChange={(e) => setTagline(e.target.value)}
                          placeholder="Contoh: Ketenangan mendalam untuk tidur nyenyak"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#6E3482]/20 bg-white text-[#26142B] focus:outline-none focus:ring-2 focus:ring-[#6E3482]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#26142B] block mb-1">
                          Kategori Aroma
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value as ScentCategory)}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#6E3482]/20 bg-white text-[#26142B] focus:outline-none focus:ring-2 focus:ring-[#6E3482]"
                        >
                          {SCENT_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#26142B] block mb-1">
                          Harga Jual (Rp) *
                        </label>
                        <input
                          type="number"
                          required
                          min={10000}
                          step={1000}
                          value={price}
                          onChange={(e) => setPrice(Number(e.target.value))}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#6E3482]/20 bg-white text-[#26142B] focus:outline-none focus:ring-2 focus:ring-[#6E3482]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#26142B] block mb-1">
                          Estimasi Waktu Bakar
                        </label>
                        <input
                          type="text"
                          value={burnTime}
                          onChange={(e) => setBurnTime(e.target.value)}
                          placeholder="Contoh: 45 - 50 Jam"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#6E3482]/20 bg-white text-[#26142B] focus:outline-none focus:ring-2 focus:ring-[#6E3482]"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-[#26142B] block mb-1">
                          Berat / Ukuran
                        </label>
                        <input
                          type="text"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          placeholder="Contoh: 210 gram / 7.4 oz"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#6E3482]/20 bg-white text-[#26142B] focus:outline-none focus:ring-2 focus:ring-[#6E3482]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Candle Description & Fragrance Notes */}
                  <div className="p-4 bg-white rounded-2xl border border-[#6E3482]/15 space-y-4">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#6E3482] block">
                      3. Keterangan Lengkap & Detail Aroma
                    </label>

                    <div>
                      <label className="text-xs font-semibold text-[#26142B] block mb-1">
                        Keterangan / Deskripsi Lilin *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Jelaskan aroma lilin, suasana yang dihadirkan, bahan lilin kedelai, dan keistimewaannya..."
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#6E3482]/20 bg-white text-[#26142B] focus:outline-none focus:ring-2 focus:ring-[#6E3482]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-[#705B77] block mb-1">
                          Top Notes
                        </label>
                        <input
                          type="text"
                          value={topNotes}
                          onChange={(e) => setTopNotes(e.target.value)}
                          placeholder="Contoh: French Lavender & Bergamot"
                          className="w-full text-xs px-3 py-2 rounded-xl border border-[#6E3482]/20 bg-white text-[#26142B]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-[#705B77] block mb-1">
                          Middle / Heart Notes
                        </label>
                        <input
                          type="text"
                          value={middleNotes}
                          onChange={(e) => setMiddleNotes(e.target.value)}
                          placeholder="Contoh: Chamomile & Clary Sage"
                          className="w-full text-xs px-3 py-2 rounded-xl border border-[#6E3482]/20 bg-white text-[#26142B]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-[#705B77] block mb-1">
                          Base Notes
                        </label>
                        <input
                          type="text"
                          value={baseNotes}
                          onChange={(e) => setBaseNotes(e.target.value)}
                          placeholder="Contoh: Vanilla & Cedarwood"
                          className="w-full text-xs px-3 py-2 rounded-xl border border-[#6E3482]/20 bg-white text-[#26142B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#26142B] block mb-1">
                        Manfaat Aromaterapi (1 baris per manfaat)
                      </label>
                      <textarea
                        rows={3}
                        value={benefitsText}
                        onChange={(e) => setBenefitsText(e.target.value)}
                        placeholder="Tuliskan tiap manfaat pada baris baru..."
                        className="w-full text-xs px-3.5 py-2 rounded-xl border border-[#6E3482]/20 bg-white text-[#26142B]"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-5 py-2.5 rounded-full border border-[#6E3482]/20 text-xs uppercase tracking-wider font-semibold text-[#705B77] hover:bg-[#F3ECF7] cursor-pointer"
                    >
                      Reset Form
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-full bg-[#6E3482] hover:bg-[#5D2570] text-white text-xs uppercase tracking-wider font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>{editingId ? 'Simpan Perubahan Lilin' : 'Tambahkan Lilin ke Toko'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: MANAGE & DELETE CANDLES */}
              {activeTab === 'manage' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-[#6E3482]/15">
                    <div>
                      <h4 className="font-serif text-2xl font-light italic text-[#26142B]">
                        Daftar Lilin yang Sedang Dijual ({candles.length})
                      </h4>
                      <p className="text-xs text-[#705B77]">
                        Admin dapat menghapus lilin atau mengedit keterangan dan gambarnya kapan saja.
                      </p>
                    </div>

                    <input
                      type="text"
                      placeholder="Cari lilin..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="text-xs px-3.5 py-2 rounded-xl border border-[#6E3482]/20 bg-white text-[#26142B] w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-[#6E3482]"
                    />
                  </div>

                  <div className="space-y-3">
                    {candles
                      .filter(c => c.name.toLowerCase().includes(searchFilter.toLowerCase()) || c.category.toLowerCase().includes(searchFilter.toLowerCase()))
                      .map((candle) => (
                        <div
                          key={candle.id}
                          className="bg-white p-4 rounded-2xl border border-[#6E3482]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#6E3482]/40 transition-colors shadow-xs"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <img
                              src={candle.imageUrl}
                              alt={candle.name}
                              className="w-16 h-16 rounded-xl object-cover border border-[#6E3482]/15 shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="text-[9px] font-bold text-[#6E3482] uppercase tracking-wider block">
                                {candle.category}
                              </span>
                              <h5 className="font-serif text-lg font-medium text-[#26142B] truncate">
                                {candle.name}
                              </h5>
                              <p className="text-xs text-[#705B77] line-clamp-1">
                                {candle.description}
                              </p>
                              <span className="text-xs font-semibold text-[#26142B] block mt-1">
                                {formatRupiah(candle.price)} • {candle.burnTime}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                            <button
                              onClick={() => handleEditInit(candle)}
                              className="flex items-center gap-1.5 bg-[#F3ECF7] hover:bg-[#EADBEE] text-[#26142B] px-3.5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold border border-[#6E3482]/15 transition-colors cursor-pointer"
                              title="Edit Lilin"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-[#6E3482]" />
                              <span>Edit</span>
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`Apakah Anda yakin ingin menghapus lilin "${candle.name}" beserta gambar dan keterangannya? Tindakan ini tidak dapat dibatalkan.`)) {
                                  onDeleteCandle(candle.id);
                                  setFeedbackMessage(`Lilin "${candle.name}" berhasil dihapus.`);
                                  setTimeout(() => setFeedbackMessage(null), 3000);
                                }
                              }}
                              className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 px-3.5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold border border-rose-200 transition-colors cursor-pointer"
                              title="Hapus Lilin Ini"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Hapus</span>
                            </button>
                          </div>
                        </div>
                      ))}

                    {candles.length === 0 && (
                      <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-[#6E3482]/20 text-[#705B77]">
                        <p className="text-sm">Belum ada lilin yang dijual di toko.</p>
                        <button
                          onClick={() => setActiveTab('add')}
                          className="mt-3 text-xs text-[#6E3482] font-bold uppercase tracking-wider underline cursor-pointer"
                        >
                          + Tambahkan Lilin Pertama Anda Sekarang
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: STORE & PAYMENT SETTINGS */}
              {activeTab === 'settings' && (
                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div className="pb-2 border-b border-[#6E3482]/15">
                    <h4 className="font-serif text-2xl font-light italic text-[#26142B]">
                      Pengaturan Toko, WhatsApp & Metode Pembayaran
                    </h4>
                    <p className="text-xs text-[#705B77]">
                      Ubah nomor WhatsApp penjual untuk menerima pesanan, dan atur rekening Transfer Bank & QRIS.
                    </p>
                  </div>

                  {/* WhatsApp Store Info */}
                  <div className="p-4 bg-white rounded-2xl border border-[#6E3482]/15 space-y-3 shadow-xs">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#6E3482] flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-[#6E3482]" />
                      Nomor WhatsApp Toko (Penerima Pesanan)
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs uppercase tracking-wider text-[#705B77] block mb-1 font-semibold">
                          Nomor WhatsApp (format angka diawali 62)
                        </label>
                        <input
                          type="text"
                          required
                          value={localSettings.whatsappNumber}
                          onChange={(e) => setLocalSettings({ ...localSettings, whatsappNumber: e.target.value })}
                          placeholder="6281234567890"
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#6E3482]/20 bg-white text-[#26142B] font-mono focus:outline-none focus:ring-2 focus:ring-[#6E3482]"
                        />
                      </div>

                      <div>
                        <label className="text-xs uppercase tracking-wider text-[#705B77] block mb-1 font-semibold">
                          Nama Toko / Brand
                        </label>
                        <input
                          type="text"
                          required
                          value={localSettings.storeName}
                          onChange={(e) => setLocalSettings({ ...localSettings, storeName: e.target.value })}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#6E3482]/20 bg-white text-[#26142B] focus:outline-none focus:ring-2 focus:ring-[#6E3482]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bank Accounts Settings */}
                  <div className="p-4 bg-white rounded-2xl border border-[#6E3482]/15 space-y-3 shadow-xs">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#6E3482] block">
                      Rekening Transfer Bank
                    </label>

                    {localSettings.bankAccounts.map((bank, index) => (
                      <div key={index} className="p-3.5 bg-[#FAF7FC] rounded-xl border border-[#6E3482]/15 space-y-2">
                        <span className="text-xs font-bold text-[#6E3482] uppercase tracking-wider block">
                          Bank {index + 1}: {bank.bankName}
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <span className="text-[11px] text-[#705B77] block mb-1">Nomor Rekening:</span>
                            <input
                              type="text"
                              value={bank.accountNumber}
                              onChange={(e) => {
                                const newBanks = [...localSettings.bankAccounts];
                                newBanks[index].accountNumber = e.target.value;
                                setLocalSettings({ ...localSettings, bankAccounts: newBanks });
                              }}
                              className="w-full text-xs px-3 py-2 rounded-lg border border-[#6E3482]/20 bg-white font-mono text-[#26142B]"
                            />
                          </div>
                          <div>
                            <span className="text-[11px] text-[#705B77] block mb-1">Atas Nama (A/N):</span>
                            <input
                              type="text"
                              value={bank.accountHolder}
                              onChange={(e) => {
                                const newBanks = [...localSettings.bankAccounts];
                                newBanks[index].accountHolder = e.target.value;
                                setLocalSettings({ ...localSettings, bankAccounts: newBanks });
                              }}
                              className="w-full text-xs px-3 py-2 rounded-lg border border-[#6E3482]/20 bg-white text-[#26142B]"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* QRIS Settings */}
                  <div className="p-4 bg-white rounded-2xl border border-[#6E3482]/15 space-y-3 shadow-xs">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#6E3482] block">
                      Pengaturan QRIS Toko
                    </label>

                    <div>
                      <label className="text-xs uppercase tracking-wider text-[#705B77] block mb-1 font-semibold">
                        Nomor Identifikasi Pedagang (NMID) QRIS
                      </label>
                      <input
                        type="text"
                        value={localSettings.qrisNmid}
                        onChange={(e) => setLocalSettings({ ...localSettings, qrisNmid: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#6E3482]/20 bg-white font-mono text-[#26142B]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-6 py-3.5 rounded-full bg-[#6E3482] hover:bg-[#5D2570] text-white text-xs uppercase tracking-wider font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Check className="w-4 h-4 text-amber-300" />
                      <span>Simpan Pengaturan Toko & Pembayaran</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, MessageCircle, QrCode, CreditCard, Copy, Check, ShieldCheck, AlertCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { CartItem, OrderForm, PaymentMethod, StoreSettings } from '../types';
import { formatRupiah, generateWhatsAppMessage, getWhatsAppLink } from '../utils/format';

interface OrderModalProps {
  items: CartItem[];
  settings: StoreSettings;
  onClose: () => void;
  onOrderSuccess: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  items,
  settings,
  onClose,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState<OrderForm>({
    customerName: '',
    phoneNumber: '',
    address: '',
    city: '',
    paymentMethod: 'QRIS',
    selectedBank: settings.bankAccounts[0]?.bankName || 'BCA (Bank Central Asia)',
    notes: '',
  });

  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [errorNotice, setErrorNotice] = useState<string>('');

  const totalAmount = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCopy = (text: string, bankName: string) => {
    navigator.clipboard.writeText(text.replace(/-/g, '').trim());
    setCopiedAccount(bankName);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.customerName.trim()) {
      setErrorNotice('Mohon isi nama lengkap penerima pesanan.');
      return;
    }
    if (!formData.phoneNumber.trim()) {
      setErrorNotice('Mohon cantumkan nomor WhatsApp Anda agar kami dapat menghubungi.');
      return;
    }
    if (!formData.address.trim()) {
      setErrorNotice('Mohon isi alamat pengiriman pesanan.');
      return;
    }

    setErrorNotice('');

    // Generate formatted message
    const waMessage = generateWhatsAppMessage(formData, items, settings);
    const waUrl = getWhatsAppLink(settings.whatsappNumber, waMessage);

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank');
    onOrderSuccess();
  };

  const selectedBankObj = settings.bankAccounts.find(b => b.bankName === formData.selectedBank) || settings.bankAccounts[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#26142B]/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 font-sans">
      <div className="relative w-full max-w-2xl bg-[#FAF7FC] rounded-[32px] shadow-2xl border border-[#6E3482]/20 overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#26142B] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#6E3482] flex items-center justify-center text-white">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-light italic">
                Pemesanan via WhatsApp
              </h3>
              <p className="text-[10px] uppercase tracking-wider text-white/70">
                {settings.storeName} • Pembayaran Transfer & QRIS
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmitOrder} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Order Summary Box */}
          <div className="bg-white p-4 rounded-2xl border border-[#6E3482]/15 space-y-3">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#6E3482] block">
              Ringkasan Lilin yang Dipesan ({items.length} Macam)
            </span>
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between text-xs py-1 border-b border-[#6E3482]/10 last:border-b-0">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-9 h-9 rounded-lg object-cover border border-[#6E3482]/15"
                    />
                    <div>
                      <h5 className="font-medium text-[#26142B]">{item.product.name}</h5>
                      <span className="text-[11px] text-[#705B77]">
                        {item.quantity} x {formatRupiah(item.product.price)}
                      </span>
                    </div>
                  </div>
                  <span className="font-medium text-[#26142B]">
                    {formatRupiah(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-baseline justify-between pt-2 border-t border-[#6E3482]/10">
              <span className="text-xs uppercase tracking-wider text-[#705B77]">Total Tagihan:</span>
              <span className="text-xl font-medium text-[#26142B]">
                {formatRupiah(totalAmount)}
              </span>
            </div>
          </div>

          {/* Customer Shipping Data */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6E3482]">
              1. Data Pengiriman Pemesan
            </h4>

            {errorNotice && (
              <div className="flex items-center gap-2 p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorNotice}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs uppercase tracking-wider text-[#705B77] block mb-1">
                  Nama Penerima *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bunga Kartika"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#6E3482]/20 bg-white text-[#26142B] focus:outline-none focus:ring-2 focus:ring-[#6E3482]"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#705B77] block mb-1">
                  Nomor WhatsApp Anda *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 081234567890"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#6E3482]/20 bg-white text-[#26142B] focus:outline-none focus:ring-2 focus:ring-[#6E3482]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-[#705B77] block mb-1">
                Alamat Lengkap Pengiriman *
              </label>
              <textarea
                required
                rows={2}
                placeholder="Jl. Melati No. 12, RT 02 / RW 05, Kelurahan/Desa..."
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#6E3482]/20 bg-white text-[#26142B] focus:outline-none focus:ring-2 focus:ring-[#6E3482]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs uppercase tracking-wider text-[#705B77] block mb-1">
                  Kota / Kabupaten & Kode Pos
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Bandung, 40132"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#6E3482]/20 bg-white text-[#26142B] focus:outline-none focus:ring-2 focus:ring-[#6E3482]"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#705B77] block mb-1">
                  Catatan Khusus (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Untuk hadiah kado ulang tahun"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#6E3482]/20 bg-white text-[#26142B] focus:outline-none focus:ring-2 focus:ring-[#6E3482]"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6E3482] flex items-center justify-between">
              <span>2. Pilih Metode Pembayaran</span>
              <span className="text-[10px] uppercase tracking-wider text-[#6E3482] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Terverifikasi aman
              </span>
            </h4>

            {/* Method Tabs */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'QRIS' })}
                className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  formData.paymentMethod === 'QRIS'
                    ? 'bg-[#6E3482] text-white border-[#6E3482] shadow-sm'
                    : 'bg-white text-[#6E3482] border-[#6E3482]/20 hover:bg-[#F3ECF7]'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>Scan QRIS</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'TRANSFER_BANK' })}
                className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                  formData.paymentMethod === 'TRANSFER_BANK'
                    ? 'bg-[#6E3482] text-white border-[#6E3482] shadow-sm'
                    : 'bg-white text-[#6E3482] border-[#6E3482]/20 hover:bg-[#F3ECF7]'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Transfer Bank</span>
              </button>
            </div>

            {/* Payment Details Container */}
            {formData.paymentMethod === 'QRIS' ? (
              /* QRIS View */
              <div className="p-4 bg-white rounded-2xl border border-[#6E3482]/15 space-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Realistic QRIS Box */}
                  <div className="w-44 bg-white p-3 rounded-xl border-2 border-[#26142B] text-center shrink-0 shadow-sm">
                    <div className="flex items-center justify-between pb-1 mb-2 border-b border-gray-200">
                      <span className="font-extrabold tracking-tighter text-xs text-[#6E3482]">QRIS</span>
                      <span className="text-[8px] font-semibold text-gray-500">GPN</span>
                    </div>
                    {/* QR Code display */}
                    <div className="aspect-square bg-[#FAF7FC] flex items-center justify-center rounded-lg p-1 border border-purple-100 overflow-hidden">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=00020101021226580016ID.CO.QRIS.WWW01189360099900000000010215ID10243009876540303UME51440014ID.LINKAJA.WWW01189360082100000000010215ID10243009876540303UME5204581253033605802ID5920CANDLE%20MANTRA6007BANDUNG61054013262070703A016304D2E5"
                        alt="QRIS Candle Mantra"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="mt-1.5 text-[9px] font-bold text-gray-800 uppercase truncate">
                      {settings.storeName}
                    </div>
                    <div className="text-[8px] text-gray-500 font-mono">
                      NMID: {settings.qrisNmid}
                    </div>
                  </div>

                  {/* QRIS Instructions */}
                  <div className="space-y-2 text-xs text-[#705B77]">
                    <h5 className="font-bold text-[#26142B] text-sm">
                      Cara Pembayaran via QRIS:
                    </h5>
                    <ol className="list-decimal list-inside space-y-1.5 text-[11px] leading-relaxed">
                      <li>Buka aplikasi m-Banking (BCA, Mandiri, BRImo, dll) atau E-Wallet (GoPay, OVO, ShopeePay, DANA).</li>
                      <li>Pilih menu <strong>"Scan / Bayar QRIS"</strong>.</li>
                      <li>Scan QR code di samping atau tangkap layar (screenshot).</li>
                      <li>Pastikan nama merchant: <strong>{settings.storeName.toUpperCase()}</strong>.</li>
                      <li>Masukkan nominal pas: <strong>{formatRupiah(totalAmount)}</strong>.</li>
                      <li>Setelah berhasil, simpan bukti untuk dilampirkan di WhatsApp.</li>
                    </ol>
                  </div>
                </div>
              </div>
            ) : (
              /* Transfer Bank View */
              <div className="p-4 bg-white rounded-2xl border border-[#6E3482]/15 space-y-3">
                <span className="text-xs uppercase tracking-wider text-[#705B77] block">
                  Pilih Bank Tujuan:
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {settings.bankAccounts.map((bank) => (
                    <button
                      key={bank.bankName}
                      type="button"
                      onClick={() => setFormData({ ...formData, selectedBank: bank.bankName })}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        formData.selectedBank === bank.bankName
                          ? 'border-[#6E3482] bg-[#F3ECF7] ring-1 ring-[#6E3482]'
                          : 'border-[#6E3482]/20 hover:bg-[#FAF7FC]'
                      }`}
                    >
                      <span className="font-semibold text-[#26142B] block truncate">{bank.bankName}</span>
                      <span className="text-[10px] text-[#705B77] block mt-0.5 font-mono">{bank.accountNumber}</span>
                    </button>
                  ))}
                </div>

                {/* Selected Bank Account Details Card */}
                {selectedBankObj && (
                  <div className="mt-3 p-3.5 rounded-xl bg-[#F3ECF7] border border-[#6E3482]/20 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider font-semibold text-[#6E3482] block">
                        Nomor Rekening {selectedBankObj.bankName}:
                      </span>
                      <span className="text-base font-bold font-mono text-[#26142B] tracking-wider block">
                        {selectedBankObj.accountNumber}
                      </span>
                      <span className="text-[11px] text-[#705B77] block mt-0.5">
                        a.n {selectedBankObj.accountHolder}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(selectedBankObj.accountNumber, selectedBankObj.bankName)}
                      className="flex items-center gap-1.5 px-3 py-2 bg-[#6E3482] hover:bg-[#5D2570] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      {copiedAccount === selectedBankObj.bankName ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-amber-300" />
                          <span>Disalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin No.</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* WhatsApp Submit Action */}
          <div className="pt-2 space-y-3">
            <button
              id="order-submit-whatsapp-btn"
              type="submit"
              className="w-full flex items-center justify-center gap-2.5 bg-[#6E3482] hover:bg-[#5D2570] text-white font-sans font-bold uppercase text-xs tracking-widest py-4 px-6 rounded-full shadow-lg hover:scale-[1.01] transition-all cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Kirim Pesanan ke WhatsApp ({formatRupiah(totalAmount)})</span>
            </button>

            <p className="text-[11px] text-center text-[#705B77] leading-normal">
              Dengan mengklik tombol di atas, Anda akan dialihkan ke chat WhatsApp resmi toko kami dengan pesan pemesanan yang sudah tersusun rapi. Anda cukup menekan tombol kirim dan melampirkan bukti transfer/QRIS.
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};

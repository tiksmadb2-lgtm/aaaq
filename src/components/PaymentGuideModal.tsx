import React, { useState } from 'react';
import { X, QrCode, CreditCard, Check, Copy, ShieldCheck, Zap, Smartphone, Building2 } from 'lucide-react';
import { StoreSettings } from '../types';

interface PaymentGuideModalProps {
  settings: StoreSettings;
  onClose: () => void;
}

export const PaymentGuideModal: React.FC<PaymentGuideModalProps> = ({
  settings,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'qris' | 'bank'>('qris');
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  const handleCopy = (accountNo: string, bankName: string) => {
    navigator.clipboard.writeText(accountNo.replace(/-/g, '').trim());
    setCopiedBank(bankName);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#26142B]/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 font-sans">
      <div className="relative w-full max-w-2xl bg-[#FAF7FC] rounded-[32px] shadow-2xl border border-[#6E3482]/20 overflow-hidden my-6">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#26142B] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#6E3482] flex items-center justify-center text-white">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-light italic">
                Panduan Metode Pembayaran
              </h3>
              <p className="text-[10px] uppercase tracking-wider text-white/70">
                {settings.storeName} menerima pembayaran Transfer Bank & QRIS
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

        {/* Tab Selector */}
        <div className="flex border-b border-[#6E3482]/15 bg-[#F3ECF7]/70 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('qris')}
            className={`flex items-center gap-2 py-3 px-5 rounded-t-2xl text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
              activeTab === 'qris'
                ? 'bg-[#FAF7FC] text-[#26142B] border-t border-x border-[#6E3482]/15 shadow-xs'
                : 'text-[#705B77] hover:text-[#26142B]'
            }`}
          >
            <QrCode className="w-4 h-4 text-[#6E3482]" />
            <span>1. Pembayaran via QRIS</span>
          </button>

          <button
            onClick={() => setActiveTab('bank')}
            className={`flex items-center gap-2 py-3 px-5 rounded-t-2xl text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
              activeTab === 'bank'
                ? 'bg-[#FAF7FC] text-[#26142B] border-t border-x border-[#6E3482]/15 shadow-xs'
                : 'text-[#705B77] hover:text-[#26142B]'
            }`}
          >
            <Building2 className="w-4 h-4 text-[#6E3482]" />
            <span>2. Transfer Bank (BCA / Mandiri / BRI)</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {activeTab === 'qris' ? (
            /* QRIS Details */
            <div className="space-y-5">
              <div className="p-4 bg-white rounded-2xl border border-[#6E3482]/15 flex flex-col sm:flex-row items-center gap-5">
                {/* QRIS Frame */}
                <div className="w-40 bg-white p-3 rounded-xl border-2 border-[#26142B] text-center shrink-0 shadow-sm">
                  <div className="flex items-center justify-between pb-1 mb-1 border-b border-gray-200">
                    <span className="font-black text-xs text-[#6E3482] tracking-tighter">QRIS</span>
                    <span className="text-[7px] font-bold text-gray-500">GPN</span>
                  </div>
                  <div className="aspect-square bg-[#FAF7FC] flex items-center justify-center rounded p-1 border border-purple-100">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=00020101021226580016ID.CO.QRIS.WWW01189360099900000000010215ID10243009876540303UME51440014ID.LINKAJA.WWW01189360082100000000010215ID10243009876540303UME5204581253033605802ID5920CANDLE%20MANTRA6007BANDUNG61054013262070703A016304D2E5"
                      alt="QRIS Merchant Candle Mantra"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="mt-1 text-[8px] font-bold uppercase text-gray-800 truncate">
                    {settings.storeName}
                  </div>
                  <div className="text-[7px] text-gray-400 font-mono">
                    NMID: {settings.qrisNmid}
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#705B77]">
                  <span className="inline-block bg-[#6E3482]/10 text-[#6E3482] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#6E3482]/20">
                    Bebas Biaya Admin
                  </span>
                  <h4 className="font-serif text-xl font-light italic text-[#26142B]">
                    Apa itu Pembayaran QRIS?
                  </h4>
                  <p className="leading-relaxed">
                    QRIS (Quick Response Code Indonesian Standard) adalah standar pembayaran nasional yang memudahkan Anda membayar dari <strong>aplikasi m-Banking apapun</strong> dan <strong>semua dompet digital Indonesia</strong> cukup dengan memindai satu kode QR.
                  </p>
                </div>
              </div>

              {/* Supported Platforms */}
              <div className="space-y-2.5">
                <span className="text-xs uppercase tracking-wider font-bold text-[#6E3482] block">
                  Aplikasi yang Didukung:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {['BCA Mobile', 'Livin Mandiri', 'BRImo', 'BNI Mobile', 'GoPay', 'ShopeePay', 'OVO', 'DANA'].map((app) => (
                    <div key={app} className="p-2.5 rounded-xl bg-white border border-[#6E3482]/15 text-center font-medium text-[#26142B] flex items-center justify-center gap-1.5 shadow-xs">
                      <Smartphone className="w-3.5 h-3.5 text-[#6E3482]" />
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Steps */}
              <div className="p-4 rounded-2xl bg-[#F3ECF7] border border-[#6E3482]/20 space-y-2 text-xs text-[#705B77]">
                <h5 className="font-semibold text-[#26142B] flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#6E3482]" />
                  Langkah Pembayaran Mudah via QRIS:
                </h5>
                <ol className="list-decimal list-inside space-y-1 text-[11px] leading-relaxed">
                  <li>Buka aplikasi perbankan atau e-wallet pilihan Anda di ponsel.</li>
                  <li>Pilih menu <strong>Scan QR / Bayar</strong>.</li>
                  <li>Arahkan kamera ke QR code yang muncul saat proses pemesanan.</li>
                  <li>Ketikkan nominal tepat sesuai tagihan pesanan Anda.</li>
                  <li>Konfirmasi PIN, dan kirimkan tangkapan layar (screenshot) bukti pembayaran ke chat WhatsApp kami.</li>
                </ol>
              </div>
            </div>
          ) : (
            /* Bank Transfer Details */
            <div className="space-y-4">
              <p className="text-xs text-[#705B77] leading-relaxed">
                Anda dapat melakukan transfer antar bank melalui ATM, Internet Banking, atau Mobile Banking ke rekening resmi kami di bawah ini:
              </p>

              <div className="space-y-3">
                {settings.bankAccounts.map((bank) => (
                  <div
                    key={bank.bankName}
                    className="p-4 bg-white rounded-2xl border border-[#6E3482]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div>
                      <span className="text-xs font-bold text-[#6E3482] uppercase tracking-wider block">
                        {bank.bankName}
                      </span>
                      <span className="text-lg font-bold font-mono text-[#26142B] tracking-wider block mt-0.5">
                        {bank.accountNumber}
                      </span>
                      <span className="text-xs text-[#705B77] block mt-0.5">
                        Atas Nama: <strong>{bank.accountHolder}</strong>
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopy(bank.accountNumber, bank.bankName)}
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-[#6E3482] hover:bg-[#5D2570] text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer self-end sm:self-center"
                    >
                      {copiedBank === bank.bankName ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-amber-300" />
                          <span>Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Nomor</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-[#F3ECF7] border border-[#6E3482]/20 text-xs text-[#705B77] space-y-1.5">
                <span className="font-semibold text-[#26142B] block">
                  💡 Tips Verifikasi Cepat:
                </span>
                <p className="text-[11px] leading-relaxed">
                  Setelah melakukan transfer, silakan kirim foto atau tangkapan layar struk transfer ke nomor WhatsApp toko kami. Tim kami akan langsung memverifikasi dan menyiapkan pesanan lilin Anda dengan kemasan aman (bubble wrap tebal + box kardus estetik).
                </p>
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full bg-[#6E3482] hover:bg-[#5D2570] text-white text-xs uppercase tracking-widest font-sans font-bold py-3.5 px-4 rounded-full transition-colors cursor-pointer"
            >
              Saya Mengerti & Siap Berbelanja
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

import { CartItem, OrderForm, StoreSettings } from '../types';

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateWhatsAppMessage(
  order: OrderForm,
  items: CartItem[],
  settings: StoreSettings
): string {
  const totalAmount = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const now = new Date();
  const dateString = now.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const itemsList = items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.product.name}*\n   - Kategori: ${item.product.category}\n   - Jumlah: ${item.quantity} pcs\n   - Subtotal: ${formatRupiah(item.product.price * item.quantity)}`
    )
    .join('\n\n');

  let paymentInfoText = '';
  if (order.paymentMethod === 'QRIS') {
    paymentInfoText = `📱 *METODE PEMBAYARAN:* QRIS (Semua E-Wallet & Mobile Banking)\n*NMID:* ${settings.qrisNmid}\n*Status:* Menunggu pengiriman bukti screenshot scan QRIS`;
  } else {
    const selectedBank = settings.bankAccounts.find(b => b.bankName === order.selectedBank) || settings.bankAccounts[0];
    paymentInfoText = `🏦 *METODE PEMBAYARAN:* Transfer Bank\n*Bank Tujuan:* ${selectedBank?.bankName || 'BCA'}\n*No. Rekening:* ${selectedBank?.accountNumber || '-'}\n*A/N:* ${selectedBank?.accountHolder || '-'}\n*Status:* Menunggu bukti transfer`;
  }

  const message = `🌿 *FORMULIR PEMESANAN LILIN AROMA TERAPI - ${settings.storeName.toUpperCase()}*
Tanggal: ${dateString}

Halo Kak, saya ingin memesan lilin aromaterapi dengan rincian berikut:

👤 *DATA PEMESAN:*
- Nama Penerima: *${order.customerName}*
- No. WhatsApp: ${order.phoneNumber}
- Alamat Pengiriman: ${order.address}
- Kota/Kecamatan: ${order.city}

🕯️ *DAFTAR PESANAN:*
${itemsList}

💰 *TOTAL TAGIHAN:* *${formatRupiah(totalAmount)}*

${paymentInfoText}

📝 *CATATAN TAMBAHAN:*
${order.notes ? `"${order.notes}"` : '- (Tidak ada catatan)'}

----------------------------------------
_Saya akan segera melampirkan bukti pembayaran (${order.paymentMethod === 'QRIS' ? 'Scan QRIS' : 'Struk Transfer Bank'}) di pesan ini. Mohon konfirmasi ketersediaan dan proses pengirimannya ya kak. Terima kasih!_ ✨`;

  return message;
}

export function getWhatsAppLink(phone: string, text: string): string {
  // Clean phone number: remove +, spaces, dashes
  let cleanPhone = phone.replace(/[^0-9]/g, '');
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '62' + cleanPhone.slice(1);
  }
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

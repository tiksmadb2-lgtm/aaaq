export type ScentCategory = 
  | 'Relaksasi & Tidur' 
  | 'Ketenangan Zen' 
  | 'Fokus & Energi' 
  | 'Floral & Romantis' 
  | 'Hangat & Rempah'
  | 'Fresh & Citrus';

export interface CandleProduct {
  id: string;
  name: string;
  tagline: string;
  category: ScentCategory;
  price: number;
  weight: string; // e.g. "200 gram / 7 oz"
  burnTime: string; // e.g. "45 - 50 Jam"
  waxType: string; // e.g. "100% Natural Soy Wax & Wooden Wick"
  imageUrl: string;
  description: string;
  scentNotes: {
    top: string;
    middle: string;
    base: string;
  };
  benefits: string[];
  inStock: boolean;
  featured?: boolean;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  logoColor: string;
}

export interface StoreSettings {
  whatsappNumber: string; // Format e.g. "6281234567890"
  storeName: string;
  storeTagline: string;
  bankAccounts: BankAccount[];
  qrisImageUrl: string;
  qrisNmid: string;
}

export type PaymentMethod = 'QRIS' | 'TRANSFER_BANK';

export interface CartItem {
  product: CandleProduct;
  quantity: number;
}

export interface OrderForm {
  customerName: string;
  phoneNumber: string;
  address: string;
  city: string;
  paymentMethod: PaymentMethod;
  selectedBank?: string;
  notes: string;
}

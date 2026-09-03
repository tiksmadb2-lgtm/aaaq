import { CandleProduct, StoreSettings } from '../types';

export const INITIAL_CANDLES: CandleProduct[] = [
  {
    id: 'candle-mantra-01',
    name: 'Lavande Sérénité',
    tagline: 'Ketenangan mendalam untuk tidur nyenyak',
    category: 'Relaksasi & Tidur',
    price: 135000,
    weight: '210 gram / 7.4 oz',
    burnTime: '45 - 50 Jam',
    waxType: '100% Natural Soy Wax & Organic Cotton Wick',
    imageUrl: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    description: 'Diformulasikan secara khusus untuk meredakan ketegangan setelah hari yang melelahkan. Lilin aromaterapi ini memadukan minyak esensial lavender Prancis murni dengan sentuhan lembut chamomile dan vanila madagaskar, menciptakan suasana kamar tidur yang tenang, hangat, dan damai.',
    scentNotes: {
      top: 'French Lavender & Bergamot Crisp',
      middle: 'Roman Chamomile & Clary Sage',
      base: 'Madagascar Vanilla & Warm Cedarwood',
    },
    benefits: [
      'Membantu mengatasi insomnia dan meningkatkan kualitas tidur',
      'Meredakan rasa cemas, stres, dan kelelahan mental',
      'Memberikan kehangatan ruangan yang menenangkan jiwa'
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'candle-mantra-02',
    name: 'Santal Mystique',
    tagline: 'Kayu cendana mistis untuk meditasi & ketenangan zen',
    category: 'Ketenangan Zen',
    price: 145000,
    weight: '220 gram / 7.7 oz',
    burnTime: '50 - 55 Jam',
    waxType: '100% Soy Wax & Crackling Wooden Wick',
    imageUrl: 'https://images.unsplash.com/photo-1572726729437-37326462725e?auto=format&fit=crop&w=800&q=80',
    description: 'Paduan kaya dan bersahaja dari kayu cendana nusantara (sandalwood), amber keemasan, dan resin kemenyan manis. Menggunakan sumbu kayu alami (wooden wick) yang berderik lembut menyerupai perapian kayu kecil, sangat cocok mendampingi waktu membaca buku, yoga, atau meditasi senja.',
    scentNotes: {
      top: 'Cardamom Pods & White Incense',
      middle: 'Indonesian Sandalwood & Iris Root',
      base: 'Golden Amber, Vetiver & Dark Musk',
    },
    benefits: [
      'Meningkatkan fokus batin dan kejernihan pikiran saat meditasi',
      'Menciptakan nuansa mewah nan hangat bagai spa bintang lima',
      'Sumbu kayu alami bersuara crackle yang memanjakan pendengaran'
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'candle-mantra-03',
    name: 'Aura Eucalyptus & Peppermint',
    tagline: 'Penyegar udara & pereda penat seketika',
    category: 'Fokus & Energi',
    price: 125000,
    weight: '190 gram / 6.7 oz',
    burnTime: '40 - 45 Jam',
    waxType: '100% Natural Soy Wax & Cotton Wick',
    imageUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    description: 'Nafas segar dan lapang dari perpaduan daun eucalyptus segar dan mint liar. Aromanya menyegarkan rongga pernapasan, meredakan sakit kepala ringan, dan memberi suntikan energi segar saat bekerja dari rumah atau belajar.',
    scentNotes: {
      top: 'Crushed Peppermint Leaves & Wild Spearmint',
      middle: 'Fresh Eucalyptus Globulus & Rosemary',
      base: 'Clean White Pine & Fresh Ozone',
    },
    benefits: [
      'Membuka saluran pernapasan dan melegakan hidung tersumbat',
      'Menghilangkan kantuk serta meningkatkan daya konsentrasi',
      'Menetralisir bau ruangan dengan aroma alami yang bersih'
    ],
    inStock: true,
    featured: false,
  },
  {
    id: 'candle-mantra-04',
    name: 'Rose Éternelle & Peony',
    tagline: 'Kelembutan kelopak mawar murni bernuansa romantis',
    category: 'Floral & Romantis',
    price: 139000,
    weight: '200 gram / 7.0 oz',
    burnTime: '45 Jam',
    waxType: '100% Pure Soy Wax & Organic Wick',
    imageUrl: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80',
    description: 'Keharuman romantis buket mawar Damaskus segar yang baru dipetik di pagi hari berpadu dengan keanggunan peony merah muda dan sentuhan buah pir madu. Menghadirkan rasa bahagia, kasih sayang, dan suasana hangat yang memesona di sudut ruang tamu Anda.',
    scentNotes: {
      top: 'Crisp Green Apple & Juicy Pear',
      middle: 'Damask Rose Petals, Blush Peony & Jasmine',
      base: 'Soft White Cashmere & Light Amber',
    },
    benefits: [
      'Membangkitkan suasana hati gembira dan penuh kasih sayang',
      'Aroma floral lembut yang tidak menyengat di hidung',
      'Sangat cocok untuk kado spesial, self-reward, atau candlelight dinner'
    ],
    inStock: true,
    featured: true,
  },
  {
    id: 'candle-mantra-05',
    name: 'Vanille Épicée & Cokelat Hangat',
    tagline: 'Kenyamanan manis layaknya kue panggang di sore hari',
    category: 'Hangat & Rempah',
    price: 130000,
    weight: '200 gram / 7.0 oz',
    burnTime: '45 Jam',
    waxType: '100% Natural Soy Wax & Wooden Wick',
    imageUrl: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=800&q=80',
    description: 'Sensasi aroma gourmand yang manis, mengenyangkan rasa rindu dan memberikan pelukan hangat di kala cuaca hujan atau dingin. Ekstrak vanila Bourbon asli bercampur dengan kayu manis Ceylon, roasted hazelnut, dan lelehan cokelat hangat.',
    scentNotes: {
      top: 'Ceylon Cinnamon Bark & Nutmeg',
      middle: 'Dark Roasted Hazelnut & Cocoa Bean',
      base: 'Bourbon Vanilla Pods & Caramel Brown Sugar',
    },
    benefits: [
      'Memicu hormon endorfin dan memberikan kenyamanan psikologis instan',
      'Menciptakan nuansa hangat di ruang kumpul keluarga',
      'Aroma manis lembut yang tahan lama di ruangan ber-AC'
    ],
    inStock: true,
    featured: false,
  },
  {
    id: 'candle-mantra-06',
    name: 'Yuzu Blossom & Green Tea',
    tagline: 'Kesegaran sitrus Jepang berpadu teh hijau zen',
    category: 'Fresh & Citrus',
    price: 129000,
    weight: '190 gram / 6.7 oz',
    burnTime: '42 Jam',
    waxType: '100% Eco Soy Wax & Cotton Wick',
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    description: 'Kesegaran buah Yuzu Jepang yang ceria berpadu harmonis dengan infus teh hijau matcha yang menyeimbangkan. Pilihan tepat untuk memulai pagi hari, menyegarkan suasana ruang kerja, serta mengusir kejenuhan rutinitas harian.',
    scentNotes: {
      top: 'Japanese Yuzu Zest, Mandarine & Lime Leaf',
      middle: 'Steeped Green Tea & White Lotus Blossom',
      base: 'Sheer Bamboo Wood & Clean Musk',
    },
    benefits: [
      'Menghalau stres dan membangkitkan rasa optimisme di pagi hari',
      'Aroma sitrus alami yang menyegarkan tanpa aroma kimia artifisial',
      'Membantu meningkatkan produktivitas saat bekerja atau berkarya'
    ],
    inStock: true,
    featured: false,
  }
];

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'Candle Mantra',
  storeTagline: 'Artisan Scented Candles & Mindful Aromatherapy',
  whatsappNumber: '6281234567890',
  qrisNmid: 'ID1024300987654',
  qrisImageUrl: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=600&q=80', // Fallback or user uploaded
  bankAccounts: [
    {
      bankName: 'BCA (Bank Central Asia)',
      accountNumber: '8690-8812-34',
      accountHolder: 'CANDLE MANTRA NUSANTARA',
      logoColor: 'from-purple-700 to-indigo-900',
    },
    {
      bankName: 'Bank Mandiri',
      accountNumber: '137-00-1988223-1',
      accountHolder: 'CANDLE MANTRA NUSANTARA',
      logoColor: 'from-purple-800 to-indigo-950',
    },
    {
      bankName: 'BRI (Bank Rakyat Indonesia)',
      accountNumber: '0206-01-003456-50-9',
      accountHolder: 'CANDLE MANTRA NUSANTARA',
      logoColor: 'from-purple-600 to-purple-900',
    }
  ]
};

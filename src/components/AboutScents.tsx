import React from 'react';
import { Sparkles, Shield, Heart, Moon, Wind, Sun, Flame, Check } from 'lucide-react';

export const AboutScents: React.FC = () => {
  return (
    <section id="about-scents" className="py-16 md:py-24 bg-[#F3ECF7]/50 border-y border-[#6E3482]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#6E3482]/10 text-[#6E3482] text-xs uppercase tracking-widest font-sans border border-[#6E3482]/15">
            <Sparkles className="w-3.5 h-3.5 text-[#6E3482]" />
            <span>Keahlian & Bahan Berkualitas</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#26142B]">
            Mengapa Lilin Kedelai (Soy Wax) Jauh Lebih Baik?
          </h2>
          <p className="text-sm sm:text-base text-[#705B77] leading-relaxed font-sans">
            Berbeda dengan lilin parafin konvensional dari turunan minyak bumi, lilin aromaterapi Candle Mantra dibuat eksklusif dari <strong>100% ekstrak minyak kacang kedelai murni</strong> dan minyak atsiri botani.
          </p>
        </div>

        {/* 3 Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-7 rounded-[32px] border border-[#6E3482]/10 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F3ECF7] flex items-center justify-center text-[#6E3482]">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-light italic text-[#26142B]">
              Bersih & Aman Pernapasan
            </h3>
            <p className="text-xs sm:text-sm text-[#705B77] font-sans leading-relaxed">
              Bebas racun benzena dan toluena. Menghasilkan pembakaran yang bersih tanpa jelaga hitam tebal, sehingga sangat aman untuk kamar tidur, ruang kerja ber-AC, dan dekat hewan peliharaan.
            </p>
            <ul className="text-xs font-sans text-[#705B77] space-y-2 pt-2 border-t border-[#6E3482]/10">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#6E3482]" />
                <span>Non-toxic & bebas timbal</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#6E3482]" />
                <span>Biodegradable & ramah lingkungan</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-7 rounded-[32px] border border-[#6E3482]/10 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F3ECF7] flex items-center justify-center text-[#6E3482]">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-light italic text-[#26142B]">
              Waktu Bakar 50% Lebih Lama
            </h3>
            <p className="text-xs sm:text-sm text-[#705B77] font-sans leading-relaxed">
              Titik leleh lilin kedelai jauh lebih rendah daripada lilin parafin biasa. Kolam lelehan lilin menjadi lebih lambat menguap, sehingga lilin dapat bertahan hingga 50 jam penuh.
            </p>
            <ul className="text-xs font-sans text-[#705B77] space-y-2 pt-2 border-t border-[#6E3482]/10">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#6E3482]" />
                <span>Pelepasan aroma lebih stabil</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#6E3482]" />
                <span>Lebih hemat dan awet berhari-hari</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-7 rounded-[32px] border border-[#6E3482]/10 shadow-xs hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F3ECF7] flex items-center justify-center text-[#6E3482]">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-light italic text-[#26142B]">
              Minyak Atsiri Terapeutik
            </h3>
            <p className="text-xs sm:text-sm text-[#705B77] font-sans leading-relaxed">
              Kami memadukan ekstrak bunga, dedaunan, dan kayu nusantara dengan standar aromaterapi terapeutik untuk menstimulasi hormon serotonin dan relaksasi otak secara nyata.
            </p>
            <ul className="text-xs font-sans text-[#705B77] space-y-2 pt-2 border-t border-[#6E3482]/10">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#6E3482]" />
                <span>Formula fragrance oil & essential oil premium</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#6E3482]" />
                <span>Aroma lembut tidak memicu pusing</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Scent Guide Banner */}
        <div className="mt-14 bg-[#26142B] text-white rounded-[36px] p-8 sm:p-10 border border-white/10 shadow-xl">
          <h3 className="font-serif text-2xl sm:text-3xl font-light italic text-center mb-6">
            Panduan Menemukan Aroma Lilin Sesuai Kebutuhan
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-sans">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-semibold">
                <Moon className="w-4 h-4" />
                <span>Susah Tidur & Cemas</span>
              </div>
              <p className="text-white/75 leading-relaxed">
                Pilih varian <strong>Lavande Sérénité</strong>. Ekstrak lavender Prancis membantu merelaksasi saraf dan menurunkan denyut jantung sebelum terlelap.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-semibold">
                <Wind className="w-4 h-4" />
                <span>Meditasi & Ketenangan Batin</span>
              </div>
              <p className="text-white/75 leading-relaxed">
                Pilih varian <strong>Santal Mystique</strong>. Kayu cendana dan resin amber membimbing pikiran memasuki frekuensi alfa yang tenang.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-semibold">
                <Sun className="w-4 h-4" />
                <span>Kerja & Butuh Fokus</span>
              </div>
              <p className="text-white/75 leading-relaxed">
                Pilih varian <strong>Aura Eucalyptus</strong> atau <strong>Yuzu Blossom</strong>. Melegakan pernapasan dan menyegarkan konsentrasi saat WFH.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-semibold">
                <Heart className="w-4 h-4" />
                <span>Suasana Romantis & Hangat</span>
              </div>
              <p className="text-white/75 leading-relaxed">
                Pilih <strong>Rose Éternelle</strong> atau <strong>Vanille Épicée</strong> untuk malam yang intim, perayaan anniversary, atau hadiah kado.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

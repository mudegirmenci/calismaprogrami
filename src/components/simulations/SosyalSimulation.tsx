'use client';

import React, { useState } from 'react';
import { sounds } from '@/lib/sound';
import { Compass, Landmark, Scroll, Award, Sparkles, MapPin } from 'lucide-react';

export const SosyalSimulation: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<'mezopotamya' | 'anadolu'>('mezopotamya');
  const [selectedCivilizationIndex, setSelectedCivilizationIndex] = useState(0);

  const MEZOPOTAMYA = [
    {
      name: "Sümerler",
      capital: "Ur, Uruk, Kiş Şehir Devletleri",
      invention: "Çivi Yazısı ve Tekerlek",
      legacy: "M.Ö. 3200'de çivi yazısını bularak tarih çağlarını başlattılar. Tekerleği icat ettiler. Ziggurat adı verilen çok katlı tapınakların en üst katını rasathane (gözlemevi) olarak kullanıp Ay yılı takvimini geliştirdiler.",
      icon: "📜",
      color: "border-amber-500",
    },
    {
      name: "Babilliler",
      capital: "Babil Şehri (Fırat Nehri Kıyısı)",
      invention: "Hammurabi Kanunları & Babil'in Asma Bahçeleri",
      legacy: "Tarihin en sert ve ünlü yasaları olan 'Göze göz, dişe diş' esaslı Hammurabi Kanunları'nı hazırladılar. Dünyanın yedi harikasından biri sayılan Babil'in Asma Bahçeleri'ni ve Babil Kulesi'ni inşa ettiler.",
      icon: "⚖️",
      color: "border-orange-500",
    },
    {
      name: "Asurlar",
      capital: "Ninova",
      invention: "Dünyanın İlk Kütüphanesi & Ticaret Yolu",
      legacy: "Kayseri Kültepe'de ticaret kolonileri kurarak çivi yazısını Anadolu'ya taşıdılar ve Anadolu'da tarihi başlattılar. Başkent Ninova'da dünyanın ilk kütüphanesini kurarak binlerce kil tableti koruma altına aldılar.",
      icon: "📚",
      color: "border-yellow-500",
    },
  ];

  const ANADOLU = [
    {
      name: "Hititler",
      capital: "Hattuşa (Çorum)",
      invention: "Tarihin İlk Yazılı Barış Antlaşması (Kadeş)",
      legacy: "Mısırlılar ile tarihin ilk yazılı barış antlaşması olan Kadeş'i imzaladılar. Kralların tanrıya hesap vermek amacıyla hem zaferlerini hem yenilgilerini tarafsızca yazdığı 'Anal' (yıllık) adı verilen tarafsız tarih yazıcılığını başlattılar.",
      icon: "🕊️",
      color: "border-cyan-500",
    },
    {
      name: "Lidyalılar",
      capital: "Sardes (Manisa)",
      invention: "Madeni Paranın İcadı",
      legacy: "M.Ö. 7. yüzyılda parayı icat ederek ticaretteki zahmetli 'takas' (değiş-tokuş) yöntemine son verdiler. Efes'ten Mezopotamya'ya kadar uzanan meşhur ticaret yolu 'Kral Yolu'nu kurup zenginleştiler.",
      icon: "🪙",
      color: "border-amber-400",
    },
    {
      name: "Frigler",
      capital: "Gordion (Ankara - Polatlı)",
      invention: "Fibula (Çengelli İğne) & Sert Tarım Yasaları",
      legacy: "Tarım ve hayvancılığı korumak için 'öküz öldürenin veya saban kıranın cezası ölümdür' gibi sert yasalar koydular. 'Tapates' adı verilen harika kilimler dokudular ve bugünkü çengelli iğnenin atası olan 'Fibula'yı icat ettiler.",
      icon: "🧷",
      color: "border-emerald-500",
    },
    {
      name: "Urartular",
      capital: "Tuşpa (Van)",
      invention: "Kaya ve Taş İşçiliği & Sulama Kanalları",
      legacy: "Van Gölü çevresinde kuruldular. Sarp kayalıklara Van Kalesi'ni yaptılar, maden işletmeciliğinde ustalaştılar. Yaptıkları meşhur 'Şamran Sulama Kanalı' günümüzde bile su taşımaya devam etmektedir.",
      icon: "🏰",
      color: "border-blue-500",
    },
    {
      name: "İyonlar",
      capital: "Efes, Milet, Foça Şehir Devletleri",
      invention: "Özgür Düşünce, Bilim ve Felsefe",
      legacy: "Deniz ticaretiyle zenginleştiler. Baskı altında olmayan özgür düşünce ortamı sayesinde Thales (matematik/felsefe), Hipokrat (tıp), Pisagor ve Herodot (tarih) gibi dev bilim insanları yetiştirdiler.",
      icon: "🏛️",
      color: "border-purple-500",
    },
  ];

  const currentList = selectedRegion === 'mezopotamya' ? MEZOPOTAMYA : ANADOLU;
  const currentCiv = currentList[selectedCivilizationIndex] || currentList[0];

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-amber-900/50 shadow-2xl">
      {/* Üst Başlık & Bölge Seçici */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            İnteraktif Tarih Kapsülü (SB.5.1.1 & SB.5.2.1)
          </span>
          <h3 className="text-2xl font-black text-white">
            Kadim Anadolu ve Mezopotamya Uygarlıkları
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Uygarlıkların insanlığa bıraktığı mirasları ve icatları zaman tünelinde incele.
          </p>
        </div>

        <div className="flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => {
              setSelectedRegion('mezopotamya');
              setSelectedCivilizationIndex(0);
              sounds.playClick();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedRegion === 'mezopotamya'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🌊 Mezopotamya (3 Uygarlık)
          </button>
          <button
            onClick={() => {
              setSelectedRegion('anadolu');
              setSelectedCivilizationIndex(0);
              sounds.playClick();
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedRegion === 'anadolu'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🏔️ Anadolu (5 Uygarlık)
          </button>
        </div>
      </div>

      {/* Uygarlık Seçici Şerit */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        {currentList.map((civ, idx) => (
          <button
            key={civ.name}
            onClick={() => {
              setSelectedCivilizationIndex(idx);
              sounds.playClick();
            }}
            className={`px-4 py-2.5 rounded-xl font-black text-sm transition-all border flex items-center gap-2 whitespace-nowrap ${
              selectedCivilizationIndex === idx
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg scale-105'
                : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-amber-500/40'
            }`}
          >
            <span>{civ.icon}</span>
            <span>{civ.name}</span>
          </button>
        ))}
      </div>

      {/* Seçilen Uygarlığın Detay Kartı */}
      <div className="bg-slate-950 p-6 rounded-2xl border-2 border-slate-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-4xl p-2 bg-slate-900 rounded-2xl border border-slate-800">{currentCiv.icon}</span>
            <div>
              <h4 className="text-2xl font-black text-white">{currentCiv.name}</h4>
              <p className="text-xs text-amber-400 font-semibold flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
                Başkent / Bölge: {currentCiv.capital}
              </p>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-xl text-xs font-bold text-amber-300">
            ⭐ Başlıca İcat: {currentCiv.invention}
          </div>
        </div>

        {/* İnsanlığa Mirası */}
        <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 text-sm text-slate-300 leading-relaxed">
          <span className="font-bold text-white block mb-1">🌍 İnsanlık Tarihine Katkısı & Mirası:</span>
          {currentCiv.legacy}
        </div>
      </div>
    </div>
  );
};

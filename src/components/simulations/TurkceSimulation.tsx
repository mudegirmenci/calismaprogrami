'use client';

import React, { useState } from 'react';
import { sounds } from '@/lib/sound';
import { BookOpen, Sparkles, Compass, Lightbulb, Heart, Search } from 'lucide-react';

export const TurkceSimulation: React.FC = () => {
  const [selectedWordIndex, setSelectedWordIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'sozcuk' | 'paragraf'>('sozcuk');

  const WORDS = [
    {
      word: "SICAK",
      gercek: {
        text: "Güneşin altındaki tencerenin kapağı çok sıcaktı.",
        explanation: "Fiziksel ısı derecesi yüksek olan, dokunulduğunda yakan nesne.",
      },
      mecaz: {
        text: "Yeni gelen öğrenciyi sınıfta çok sıcak ve güler yüzle karşıladılar.",
        explanation: "İçten, samimi, sevgi dolu ve dostça davranış.",
      },
      terim: {
        text: "Coğrafya dersinde ekvatorun sıcak iklim kuşağını işledik.",
        explanation: "Coğrafi iklim kuşağı sınıflandırma terimi.",
      },
    },
    {
      word: "KESKİN",
      gercek: {
        text: "Aşçı ekmeği keskin bir bıçakla ince dilimler halinde kesti.",
        explanation: "Kolayca kesen, bilenmiş, sivri ve tehlikeli fiziksel özellik.",
      },
      mecaz: {
        text: "Olayları keskin bir zekayla anında çözüverdi.",
        explanation: "Çok çabuk kavrayan, etkileyici ve kıvrak akıl.",
      },
      terim: {
        text: "Matematikte keskin olmayan açı türlerine geniş açı denir.",
        explanation: "Geometri ve açı derecesi terimi.",
      },
    },
    {
      word: "AĞIR",
      gercek: {
        text: "Ağır çimento çuvallarını taşımak için iki kişi yardım etti.",
        explanation: "Tartıda çok çeken, kütlesi ve ağırlığı fazla olan cisim.",
      },
      mecaz: {
        text: "Arkadaşının toplantıda söylediği ağır sözler herkesi üzdü.",
        explanation: "İnsanın gücüne giden, kırıcı, sert ve incitici laf.",
      },
      terim: {
        text: "Kimya laboratuvarında cıva gibi ağır metallerin yoğunluğu ölçüldü.",
        explanation: "Kimya ve fizik element yoğunluğu sınıflandırması.",
      },
    },
    {
      word: "KIRMAK",
      gercek: {
        text: "Masanın kenarındaki porselen vazo yere düşüp kırıldı.",
        explanation: "Sert bir nesneyi vurarak veya çarparak parçalara ayırmak.",
      },
      mecaz: {
        text: "Onun kalbini kırmak istemediğim için sessiz kaldım.",
        explanation: "Birinin duygularını incitmek, üzmek ve hevesini söndürmek.",
      },
      terim: {
        text: "Işığın prizmadan geçerken kırılmasıyla gökkuşağı renkleri oluştu.",
        explanation: "Fizik optik kurallarındaki ışığın yön değiştirme terimi.",
      },
    },
  ];

  const currentWord = WORDS[selectedWordIndex];

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-rose-900/50 shadow-2xl">
      {/* Üst Başlık & Mod Seçici */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            İnteraktif Türkçe Laboratuvarı (T.5.3.1 & T.5.3.12)
          </span>
          <h3 className="text-2xl font-black text-white">
            Kelime Bukalemunu & Paragraf Röntgeni
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Kelimelerin girdikleri cümleye göre nasıl kılık değiştirdiğini ve metnin kalbini keşfet.
          </p>
        </div>

        <div className="flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => {
              setActiveTab('sozcuk');
              sounds.playClick();
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'sozcuk' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            🦎 Bukalemun Sözcük
          </button>
          <button
            onClick={() => {
              setActiveTab('paragraf');
              sounds.playClick();
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'paragraf' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            🩻 Paragraf Röntgeni
          </button>
        </div>
      </div>

      {activeTab === 'sozcuk' ? (
        <div>
          {/* Kelime Seçici Şerit */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
            {WORDS.map((w, idx) => (
              <button
                key={w.word}
                onClick={() => {
                  setSelectedWordIndex(idx);
                  sounds.playClick();
                }}
                className={`px-5 py-2.5 rounded-xl font-black text-sm transition-all border ${
                  selectedWordIndex === idx
                    ? 'bg-rose-500 text-white border-rose-400 shadow-lg scale-105'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-rose-500/40'
                }`}
              >
                &quot;{w.word}&quot;
              </button>
            ))}
          </div>

          {/* 3 Anlam Spektrumu (Gerçek, Mecaz, Terim) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Gerçek Anlam */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border-2 border-blue-500/40 flex flex-col justify-between">
              <div>
                <div className="inline-block px-2.5 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-black uppercase mb-3">
                  🔵 Gerçek Anlam
                </div>
                <h4 className="text-base font-bold text-white mb-2 leading-snug">
                  &quot;{currentWord.gercek.text}&quot;
                </h4>
              </div>
              <div className="bg-blue-950/40 p-3 rounded-xl border border-blue-900/60 text-xs text-blue-200 mt-4">
                <span className="font-bold block text-blue-300">Zihinsel İpucu:</span>
                {currentWord.gercek.explanation}
              </div>
            </div>

            {/* 2. Mecaz Anlam */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border-2 border-purple-500/40 flex flex-col justify-between">
              <div>
                <div className="inline-block px-2.5 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-black uppercase mb-3">
                  🟣 Mecaz Anlam
                </div>
                <h4 className="text-base font-bold text-white mb-2 leading-snug">
                  &quot;{currentWord.mecaz.text}&quot;
                </h4>
              </div>
              <div className="bg-purple-950/40 p-3 rounded-xl border border-purple-900/60 text-xs text-purple-200 mt-4">
                <span className="font-bold block text-purple-300">Zihinsel İpucu:</span>
                {currentWord.mecaz.explanation}
              </div>
            </div>

            {/* 3. Terim Anlam */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border-2 border-emerald-500/40 flex flex-col justify-between">
              <div>
                <div className="inline-block px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-black uppercase mb-3">
                  🟢 Terim Anlam
                </div>
                <h4 className="text-base font-bold text-white mb-2 leading-snug">
                  &quot;{currentWord.terim.text}&quot;
                </h4>
              </div>
              <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-900/60 text-xs text-emerald-200 mt-4">
                <span className="font-bold block text-emerald-300">Zihinsel İpucu:</span>
                {currentWord.terim.explanation}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Paragraf Röntgeni Modu */
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block mb-1">
                Örnek Metin:
              </span>
              <p className="text-sm text-slate-200 leading-relaxed italic">
                &quot;Kitaplar zamanın denizinde seyahat eden gemiler gibidir. Yüzyıllar önce yaşamış bir düşünürün fikirlerini bir kitabın sayfalarında bugün sıcacık hissedebiliriz. Bir kitap okuduğunuzda sadece yeni bilgiler öğrenmezsiniz; aynı zamanda hiç gitmediğiniz diyarları gezer, tanımadığınız insanların yüreğine konuk olursunuz. Kitap okuyan bir insan asla tek başına ve çaresiz kalmaz.&quot;
              </p>
            </div>

            {/* Röntgen Katmanları */}
            <div className="space-y-3">
              <div className="p-3.5 bg-blue-950/40 border border-blue-800/60 rounded-xl flex items-start gap-3">
                <Compass className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-blue-300">1. Konu (Metinde ne anlatılıyor?):</span>
                  <p className="text-xs text-white font-semibold">Kitap okumanın insana kazandırdıkları ve zenginliği.</p>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-950/40 border border-emerald-800/60 rounded-xl flex items-start gap-3">
                <Search className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-emerald-300">2. Yardımcı Fikirler (Kanıtlar & İpuçları):</span>
                  <p className="text-xs text-white font-semibold">
                    Geçmiş düşünürlerle bağ kurma, yeni dünyaları tanıma, yalnızlığı giderme.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-rose-950/80 to-purple-950/80 border-2 border-rose-500 rounded-2xl flex items-start gap-3 shadow-lg">
                <Heart className="w-6 h-6 text-rose-400 shrink-0 mt-0.5 fill-rose-500" />
                <div>
                  <span className="text-xs font-black uppercase text-rose-300 tracking-wider">
                    3. Metnin Kalbi: ANA FİKİR (Yazarın Asıl Mesajı):
                  </span>
                  <p className="text-sm font-black text-white mt-0.5">
                    &quot;Kitap okumak insanı hem bilgi hem de ruhsal yönden zenginleştirerek asla yalnız bırakmayan en değerli dosttur.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

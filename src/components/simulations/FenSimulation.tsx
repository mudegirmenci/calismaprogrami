'use client';

import React, { useState } from 'react';
import { sounds } from '@/lib/sound';
import { Orbit, Sun, Eye, Info, Play, Pause } from 'lucide-react';

export const FenSimulation: React.FC = () => {
  // 0: Yeni Ay, 1: Hilal, 2: İlk Dördün, 3: Şişkin Ay, 4: Dolunay, 5: Şişkin Ay (Azalan), 6: Son Dördün, 7: Hilal (Son)
  const [phaseIndex, setPhaseIndex] = useState(2); // Başlangıç: İlk Dördün
  const [isRotating, setIsRotating] = useState(false);

  const PHASES = [
    {
      name: "1. Yeni Ay",
      type: "Ana Evre",
      angle: 0,
      desc: "Ay, Güneş ile Dünya arasındadır. Güneş gören aydınlık yüzü Güneş'e, karanlık yüzü Dünya'ya dönüktür. Bu yüzden Dünya'dan bakıldığında gökyüzünde hiç görünmez.",
      moonSvg: (
        <circle cx="50" cy="50" r="40" fill="#1e293b" stroke="#475569" strokeWidth="3" />
      ),
      timeNote: "Başlangıç noktası (0. Gün)",
    },
    {
      name: "Hilal (İlk)",
      type: "Ara Evre",
      angle: 45,
      desc: "Yeni Ay'dan birkaç gün sonra görülür. Ay batı göğünde ince bir yay şeklinde, Türk bayrağındaki gibi ters C harfi formunda parlar.",
      moonSvg: (
        <g>
          <circle cx="50" cy="50" r="40" fill="#1e293b" />
          <path d="M 50 10 A 40 40 0 0 1 50 90 A 28 40 0 0 0 50 10" fill="#facc15" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#64748b" strokeWidth="2" />
        </g>
      ),
      timeNote: "Yeni Ay'dan ~3-4 gün sonra",
    },
    {
      name: "2. İlk Dördün",
      type: "Ana Evre",
      angle: 90,
      desc: "Yeni Ay'dan yaklaşık 1 hafta sonra oluşur. Ay'ın Dünya'dan görünen yüzünün sağ yarısı aydınlıktır. Gökyüzünde tam bir düz 'D' harfi gibi görünür.",
      moonSvg: (
        <g>
          <circle cx="50" cy="50" r="40" fill="#1e293b" />
          <path d="M 50 10 A 40 40 0 0 1 50 90 Z" fill="#facc15" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#64748b" strokeWidth="2" />
        </g>
      ),
      timeNote: "Yeni Ay'dan 1 hafta sonra (7. Gün)",
    },
    {
      name: "Şişkin Ay (Büyüyen)",
      type: "Ara Evre",
      angle: 135,
      desc: "İlk Dördün ile Dolunay arasında görülür. Aydınlık kısım yarım daireden fazladır, dolunaya doğru şişer.",
      moonSvg: (
        <g>
          <circle cx="50" cy="50" r="40" fill="#1e293b" />
          <circle cx="50" cy="50" r="40" fill="#facc15" />
          <path d="M 50 10 A 25 40 0 0 1 50 90 A 40 40 0 0 1 50 10" fill="#1e293b" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#64748b" strokeWidth="2" />
        </g>
      ),
      timeNote: "10-11. Günler civarı",
    },
    {
      name: "3. Dolunay",
      type: "Ana Evre",
      angle: 180,
      desc: "Dünya, Güneş ile Ay'ın arasındadır. Ay'ın Dünya'ya bakan yüzü tamamen Güneş ışığı alır. Gökyüzünde bembeyaz, dairesel ve göz kamaştırıcı biçimde parlar.",
      moonSvg: (
        <circle cx="50" cy="50" r="40" fill="#fef08a" stroke="#facc15" strokeWidth="3" />
      ),
      timeNote: "Yeni Ay'dan 2 hafta sonra (14. Gün)",
    },
    {
      name: "Şişkin Ay (Küçülen)",
      type: "Ara Evre",
      angle: 225,
      desc: "Dolunay'dan Son Dördün'e geçerken aydınlık yüzün sağ tarafından yavaş yavaş kararmaya başladığı şişkin formdur.",
      moonSvg: (
        <g>
          <circle cx="50" cy="50" r="40" fill="#1e293b" />
          <circle cx="50" cy="50" r="40" fill="#facc15" />
          <path d="M 50 10 A 25 40 0 0 0 50 90 A 40 40 0 0 0 50 10" fill="#1e293b" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#64748b" strokeWidth="2" />
        </g>
      ),
      timeNote: "18-19. Günler civarı",
    },
    {
      name: "4. Son Dördün",
      type: "Ana Evre",
      angle: 270,
      desc: "Dolunay'dan yaklaşık 1 hafta sonra görülür. Ay'ın Dünya'dan görünen yüzünün bu kez sol yarısı aydınlıktır. Gökyüzünde ters 'D' harfi şeklinde görünür.",
      moonSvg: (
        <g>
          <circle cx="50" cy="50" r="40" fill="#1e293b" />
          <path d="M 50 10 A 40 40 0 0 0 50 90 Z" fill="#facc15" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#64748b" strokeWidth="2" />
        </g>
      ),
      timeNote: "Yeni Ay'dan 3 hafta sonra (21. Gün)",
    },
    {
      name: "Hilal (Son / Küçülen)",
      type: "Ara Evre",
      angle: 315,
      desc: "Son Dördün ile Yeni Ay arasında görülür. Sabah gün doğmadan önce doğu göğünde düzgün 'C' harfi gibi çok ince bir yay olarak görünür.",
      moonSvg: (
        <g>
          <circle cx="50" cy="50" r="40" fill="#1e293b" />
          <path d="M 50 10 A 40 40 0 0 0 50 90 A 28 40 0 0 1 50 10" fill="#facc15" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#64748b" strokeWidth="2" />
        </g>
      ),
      timeNote: "26-28. Günler civarı",
    },
  ];

  const currentPhase = PHASES[phaseIndex];

  // Simülasyon Otomatik Oynatma
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRotating) {
      interval = setInterval(() => {
        setPhaseIndex((prev) => (prev + 1) % PHASES.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isRotating, PHASES.length]);

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-900/50 shadow-2xl">
      {/* Başlık */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Orbit className="w-3.5 h-3.5" />
            İnteraktif Kozmik Simülasyon (F.5.1.3.2 & F.5.1.4.1)
          </span>
          <h3 className="text-2xl font-black text-white">
            Ay&apos;ın Evreleri ve Yörünge Simülatörü
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Ay&apos;ı Dünya etrafında hareket ettirerek gökyüzündeki görünümünü anlık izle.
          </p>
        </div>

        {/* Simülasyon Kontrolleri */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsRotating(!isRotating);
              sounds.playClick();
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              isRotating
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRotating ? 'Döngüyü Durdur' : 'Otomatik Döndür'}</span>
          </button>
        </div>
      </div>

      {/* Simülasyon Alanı (SVG Yörünge ve Canlı Ay) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-8">
        {/* Sol Panel: Kuşbakışı Uzay Sahnesi */}
        <div className="lg:col-span-7 bg-slate-950/80 p-6 rounded-3xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden min-h-[340px]">
          {/* Sol Kenardaki Güneş Işınları */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2 text-amber-400 z-10">
            <Sun className="w-12 h-12 text-amber-400 animate-spin" style={{ animationDuration: '20s' }} />
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">Güneş Işınları ➔</span>
          </div>

          {/* Uzay Yörünge Şeması */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Yörünge Halkası */}
            <div className="absolute inset-4 rounded-full border-2 border-dashed border-slate-700 pointer-events-none" />

            {/* Merkezdeki Dünya */}
            <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 via-cyan-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-cyan-500/30 text-white font-black text-xs text-center border-2 border-white/40">
              Dünya
            </div>

            {/* Yörüngedeki Ay (Açıya Göre Konumlandırılır) */}
            {(() => {
              const rad = (currentPhase.angle * Math.PI) / 180;
              const r = 100; // Yarıçap
              const x = Math.cos(rad) * r;
              const y = Math.sin(rad) * r;
              return (
                <div
                  className="absolute w-10 h-10 -ml-5 -mt-5 rounded-full z-20 flex items-center justify-center cursor-pointer transition-all duration-500 shadow-lg"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                  }}
                  title={currentPhase.name}
                >
                  <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-amber-400 flex items-center justify-center text-[10px] font-black text-slate-950 shadow-md">
                    Ay
                  </div>
                </div>
              );
            })()}
          </div>

          <p className="text-[11px] text-slate-400 mt-2 text-center">
            🔄 Dönüş Yönü: Saat yönünün tersine (batıdan doğuya).
          </p>
        </div>

        {/* Sağ Panel: Dünyadan Görünüm (Teleskop Görünümü) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-indigo-950/60 p-6 rounded-3xl border border-indigo-900/60 flex flex-col items-center text-center">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-2">
            <Eye className="w-4 h-4" />
            <span>Dünya&apos;dan Teleskopla Bakış</span>
          </div>

          {/* Ayın Evre SVG İllüstrasyonu */}
          <div className="w-28 h-28 my-3 drop-shadow-[0_0_20px_rgba(250,204,21,0.3)]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {currentPhase.moonSvg}
            </svg>
          </div>

          <div className="inline-block px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-black uppercase mb-1">
            {currentPhase.type}
          </div>
          <h4 className="text-xl font-black text-white">
            {currentPhase.name}
          </h4>
          <span className="text-xs text-indigo-300 font-semibold mb-3">
            {currentPhase.timeNote}
          </span>

          <p className="text-xs text-slate-300 leading-relaxed text-left bg-white/5 p-3.5 rounded-2xl border border-white/10">
            {currentPhase.desc}
          </p>
        </div>
      </div>

      {/* Aşama Seçici Butonları */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {PHASES.map((p, idx) => {
          const isSelected = phaseIndex === idx;
          return (
            <button
              key={p.name}
              onClick={() => {
                setPhaseIndex(idx);
                setIsRotating(false);
                sounds.playClick();
              }}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                isSelected
                  ? 'bg-amber-400 text-slate-950 border-amber-400 font-black shadow-lg scale-105'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700 text-xs'
              }`}
            >
              <div className="text-[11px] font-bold line-clamp-1">{p.name}</div>
              <div className="text-[10px] opacity-75">{p.type}</div>
            </button>
          );
        })}
      </div>

      {/* Kritik MEB Sırrı Bilgilendirmesi */}
      <div className="mt-6 bg-indigo-950/40 border border-indigo-800/80 p-4 rounded-2xl flex items-start gap-3">
        <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs text-indigo-200 leading-relaxed">
          <span className="font-bold text-white">Kritik Sınav Bilgisi: </span>
          Dünya&apos;dan baktığımızda Ay&apos;ın hep aynı yüzünü görürüz; arka yüzünü asla göremeyiz! Çünkü Ay&apos;ın kendi ekseni etrafında dönme süresi ile Dünya etrafında dolanma süresi birbirine eşittir (yaklaşık 27 gün).
        </div>
      </div>
    </div>
  );
};

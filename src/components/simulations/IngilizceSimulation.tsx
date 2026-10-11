'use client';

import React, { useState } from 'react';
import { sounds } from '@/lib/sound';
import { Globe, Clock, Navigation, MapPin, Compass, ArrowUp, ArrowLeft, ArrowRight } from 'lucide-react';

export const IngilizceSimulation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'routine' | 'directions'>('routine');
  const [selectedHourIndex, setSelectedHourIndex] = useState(0);
  const [selectedDirectionIndex, setSelectedDirectionIndex] = useState(0);

  const ROUTINES = [
    { time: "07:00", action: "Wake up", sentence: "I wake up at seven o'clock in the morning.", icon: "⏰" },
    { time: "07:30", action: "Brush teeth & Wash face", sentence: "I brush my teeth and wash my face.", icon: "🪥" },
    { time: "08:00", action: "Have breakfast", sentence: "I have breakfast with my family.", icon: "🍳" },
    { time: "09:00", action: "Attend classes (School)", sentence: "I attend Science, Maths and English classes.", icon: "🏫" },
    { time: "16:30", action: "Do homework", sentence: "I do my homework in the afternoon.", icon: "📝" },
    { time: "21:30", action: "Go to bed", sentence: "I go to bed and sleep at night.", icon: "🛌" },
  ];

  const DIRECTIONS = [
    {
      phrase: "Go straight ahead",
      turkish: "Düz git",
      example: "Go straight ahead on Green Street.",
      icon: <ArrowUp className="w-6 h-6 text-emerald-400" />,
    },
    {
      phrase: "Turn left",
      turkish: "Sola dön",
      example: "Turn left at the hospital corner.",
      icon: <ArrowLeft className="w-6 h-6 text-blue-400" />,
    },
    {
      phrase: "Turn right",
      turkish: "Sağa dön",
      example: "Turn right into Daisy Avenue.",
      icon: <ArrowRight className="w-6 h-6 text-purple-400" />,
    },
    {
      phrase: "Next to",
      turkish: "Bitişiğinde / Yanında",
      example: "The library is next to the bakery.",
      icon: <MapPin className="w-6 h-6 text-amber-400" />,
    },
    {
      phrase: "Opposite",
      turkish: "Karşısında",
      example: "The cinema is opposite the city park.",
      icon: <Compass className="w-6 h-6 text-rose-400" />,
    },
    {
      phrase: "Between",
      turkish: "İki şeyin arasında",
      example: "The pharmacy is between the bank and the cafe.",
      icon: <Navigation className="w-6 h-6 text-cyan-400" />,
    },
  ];

  const currentRoutine = ROUTINES[selectedHourIndex];
  const currentDirection = DIRECTIONS[selectedDirectionIndex];

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-violet-900/50 shadow-2xl">
      {/* Üst Başlık & Mod Seçici */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-violet-500/20 text-violet-300 border border-violet-500/40 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Globe className="w-3.5 h-3.5" />
            İnteraktif İngilizce Laboratuvarı (E5.1.L1 & E5.2.R1)
          </span>
          <h3 className="text-2xl font-black text-white">
            Daily Routines & Town Navigator
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Günlük rutinler ve şehirde yol tarifi kalıplarını etkileşimli deneyimle.
          </p>
        </div>

        <div className="flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => {
              setActiveTab('routine');
              sounds.playClick();
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'routine' ? 'bg-violet-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            ⏰ Daily Routines
          </button>
          <button
            onClick={() => {
              setActiveTab('directions');
              sounds.playClick();
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'directions' ? 'bg-violet-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            🗺️ Giving Directions
          </button>
        </div>
      </div>

      {activeTab === 'routine' ? (
        <div>
          {/* Saat Seçici Şerit */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
            {ROUTINES.map((r, idx) => (
              <button
                key={r.time}
                onClick={() => {
                  setSelectedHourIndex(idx);
                  sounds.playClick();
                }}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  selectedHourIndex === idx
                    ? 'bg-violet-600 text-white border-violet-400 shadow-lg scale-105'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-violet-500/40'
                }`}
              >
                <span className="text-2xl block mb-1">{r.icon}</span>
                <span className="block font-mono font-black text-sm text-amber-300">{r.time}</span>
                <span className="block text-[11px] font-bold line-clamp-1">{r.action}</span>
              </button>
            ))}
          </div>

          {/* Rutin Kartı */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center">
            <span className="text-5xl block mb-2">{currentRoutine.icon}</span>
            <div className="font-mono text-xl font-black text-amber-300 mb-2">
              Time: {currentRoutine.time}
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white mb-2">
              &quot;{currentRoutine.sentence}&quot;
            </h4>
            <p className="text-xs text-violet-300 font-semibold">
              Eylem: {currentRoutine.action}
            </p>
          </div>
        </div>
      ) : (
        /* Yol Tarifi Modu */
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {DIRECTIONS.map((dir, idx) => (
              <button
                key={dir.phrase}
                onClick={() => {
                  setSelectedDirectionIndex(idx);
                  sounds.playClick();
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                  selectedDirectionIndex === idx
                    ? 'bg-violet-600 text-white border-violet-400 shadow-lg scale-105'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-violet-500/40'
                }`}
              >
                <div className="p-2 bg-slate-900 rounded-xl">{dir.icon}</div>
                <div>
                  <span className="block font-black text-sm">{dir.phrase}</span>
                  <span className="block text-[11px] text-violet-300">{dir.turkish}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Seçilen Yön Tarifi Kartı */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">{currentDirection.icon}</div>
              <div>
                <h4 className="text-xl font-black text-white">{currentDirection.phrase}</h4>
                <p className="text-xs text-violet-300 font-semibold">Türkçe Anlamı: {currentDirection.turkish}</p>
              </div>
            </div>

            <div className="bg-violet-950/40 p-4 rounded-xl border border-violet-900/60 text-sm text-slate-200">
              <span className="text-xs text-amber-300 font-bold block mb-1">Örnek Şehir Cümlesi:</span>
              &quot;{currentDirection.example}&quot;
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

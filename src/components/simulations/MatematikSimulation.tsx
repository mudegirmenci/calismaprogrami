'use client';

import React, { useState } from 'react';
import { sounds } from '@/lib/sound';
import { Calculator, Dices, Sparkles, Building2, HelpCircle } from 'lucide-react';

export const MatematikSimulation: React.FC = () => {
  const [numberInput, setNumberInput] = useState('345802119');
  const [selectedDigitIndex, setSelectedDigitIndex] = useState<number | null>(1); // Varsayılan: On milyonlar

  // 9 haneye tamamla (başa 0 ekle)
  const sanitized = numberInput.replace(/\D/g, '').slice(0, 9);
  const padded = sanitized.padStart(9, '0');

  const DIGITS_METADATA = [
    { name: 'Yüz Milyonlar Basamağı', period: 'Milyonlar Bölüğü', multiplier: 100000000, color: 'bg-purple-600' },
    { name: 'On Milyonlar Basamağı', period: 'Milyonlar Bölüğü', multiplier: 10000000, color: 'bg-indigo-600' },
    { name: 'Milyonlar Basamağı', period: 'Milyonlar Bölüğü', multiplier: 1000000, color: 'bg-blue-600' },
    { name: 'Yüz Binler Basamağı', period: 'Binler Bölüğü', multiplier: 100000, color: 'bg-teal-600' },
    { name: 'On Binler Basamağı', period: 'Binler Bölüğü', multiplier: 10000, color: 'bg-emerald-600' },
    { name: 'Binler Basamağı', period: 'Binler Bölüğü', multiplier: 1000, color: 'bg-green-600' },
    { name: 'Yüzler Basamağı', period: 'Birler Bölüğü', multiplier: 100, color: 'bg-amber-600' },
    { name: 'Onlar Basamağı', period: 'Birler Bölüğü', multiplier: 10, color: 'bg-orange-600' },
    { name: 'Birler Basamağı', period: 'Birler Bölüğü', multiplier: 1, color: 'bg-rose-600' },
  ];

  // Türkçe 3 basamaklı okuma fonksiyonu
  const readThreeDigits = (str: string): string => {
    const units = ['', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz'];
    const tens = ['', 'on', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan'];
    const n = parseInt(str, 10);
    if (isNaN(n) || n === 0) return '';

    const h = Math.floor(n / 100);
    const t = Math.floor((n % 100) / 10);
    const u = n % 10;

    let res = '';
    if (h === 1) res += 'yüz ';
    else if (h > 1) res += units[h] + ' yüz ';

    if (t > 0) res += tens[t] + ' ';
    if (u > 0) res += units[u] + ' ';

    return res.trim();
  };

  const getTurkishReading = (numStr: string): string => {
    const p = numStr.padStart(9, '0');
    const millions = p.slice(0, 3);
    const thousands = p.slice(3, 6);
    const ones = p.slice(6, 9);

    const mNum = parseInt(millions, 10);
    const tNum = parseInt(thousands, 10);
    const oNum = parseInt(ones, 10);

    if (mNum === 0 && tNum === 0 && oNum === 0) return 'Sıfır';

    let parts: string[] = [];

    if (mNum > 0) {
      parts.push(readThreeDigits(millions) + ' milyon');
    }

    if (tNum === 1) {
      parts.push('bin');
    } else if (tNum > 1) {
      parts.push(readThreeDigits(thousands) + ' bin');
    }

    if (oNum > 0) {
      parts.push(readThreeDigits(ones));
    }

    return parts.join(' ').trim();
  };

  const generateRandom = () => {
    const rand = Math.floor(10000000 + Math.random() * 900000000).toString();
    setNumberInput(rand);
    sounds.playClick();
  };

  const selectedMeta = selectedDigitIndex !== null ? DIGITS_METADATA[selectedDigitIndex] : null;
  const selectedDigitChar = selectedDigitIndex !== null ? padded[selectedDigitIndex] : '0';
  const selectedDigitVal = parseInt(selectedDigitChar, 10);
  const selectedPlaceVal = selectedMeta ? selectedDigitVal * selectedMeta.multiplier : 0;

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-blue-900/50 shadow-2xl">
      {/* Üst Başlık & Input */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            İnteraktif Basamak Simülasyonu (M.5.1.1.1 & M.5.1.1.2)
          </span>
          <h3 className="text-2xl font-black text-white">
            Bölük & Basamak Değeri Apartmanı
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            İstediğin sayıyı yaz veya rakamlara tıklayarak basamak değerlerini keşfet.
          </p>
        </div>

        {/* Rastgele ve Giriş Alanı */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            maxLength={9}
            value={numberInput}
            onChange={(e) => setNumberInput(e.target.value.replace(/\D/g, ''))}
            className="w-36 bg-slate-950 border border-blue-500/40 px-3 py-2 rounded-xl text-center font-mono font-black text-lg text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="9 Haneli Sayı"
          />
          <button
            onClick={generateRandom}
            className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow"
            title="Rastgele Sayı Üret"
          >
            <Dices className="w-4 h-4" />
            <span>Rastgele</span>
          </button>
        </div>
      </div>

      {/* Sayının Türkçe Okunuşu Kartı */}
      <div className="bg-gradient-to-r from-blue-950/60 to-indigo-950/60 p-4 rounded-2xl border border-blue-800/60 mb-6 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="text-[11px] font-black uppercase text-blue-300 tracking-wider">
            Doğal Sayının Türkçe Okunuşu:
          </span>
          <p className="text-base sm:text-lg font-bold text-white capitalize mt-0.5">
            &quot;{getTurkishReading(padded)}&quot;
          </p>
        </div>
      </div>

      {/* 3 Apartman Bloku (Bölükler) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* 1. Milyonlar Bölüğü */}
        <div className="bg-slate-950/70 p-4 rounded-2xl border-2 border-purple-500/40">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
            <h4 className="font-black text-sm text-purple-400 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Milyonlar Bölüğü
            </h4>
            <span className="text-xs font-mono font-bold bg-purple-950 text-purple-300 px-2 py-0.5 rounded">
              {padded.slice(0, 3)}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((idx) => {
              const meta = DIGITS_METADATA[idx];
              const isSelected = selectedDigitIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedDigitIndex(idx);
                    sounds.playClick();
                  }}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'border-purple-400 bg-purple-600 text-white font-black scale-105 shadow-lg'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-purple-500/50'
                  }`}
                >
                  <span className="block text-2xl font-black">{padded[idx]}</span>
                  <span className="block text-[10px] opacity-75 mt-1 line-clamp-1">{meta.name.replace(' Basamağı', '')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Binler Bölüğü */}
        <div className="bg-slate-950/70 p-4 rounded-2xl border-2 border-teal-500/40">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
            <h4 className="font-black text-sm text-teal-400 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Binler Bölüğü
            </h4>
            <span className="text-xs font-mono font-bold bg-teal-950 text-teal-300 px-2 py-0.5 rounded">
              {padded.slice(3, 6)}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[3, 4, 5].map((idx) => {
              const meta = DIGITS_METADATA[idx];
              const isSelected = selectedDigitIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedDigitIndex(idx);
                    sounds.playClick();
                  }}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'border-teal-400 bg-teal-600 text-white font-black scale-105 shadow-lg'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-teal-500/50'
                  }`}
                >
                  <span className="block text-2xl font-black">{padded[idx]}</span>
                  <span className="block text-[10px] opacity-75 mt-1 line-clamp-1">{meta.name.replace(' Basamağı', '')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Birler Bölüğü */}
        <div className="bg-slate-950/70 p-4 rounded-2xl border-2 border-rose-500/40">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
            <h4 className="font-black text-sm text-rose-400 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Birler Bölüğü
            </h4>
            <span className="text-xs font-mono font-bold bg-rose-950 text-rose-300 px-2 py-0.5 rounded">
              {padded.slice(6, 9)}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[6, 7, 8].map((idx) => {
              const meta = DIGITS_METADATA[idx];
              const isSelected = selectedDigitIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedDigitIndex(idx);
                    sounds.playClick();
                  }}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'border-rose-400 bg-rose-600 text-white font-black scale-105 shadow-lg'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-rose-500/50'
                  }`}
                >
                  <span className="block text-2xl font-black">{padded[idx]}</span>
                  <span className="block text-[10px] opacity-75 mt-1 line-clamp-1">{meta.name.replace(' Basamağı', '')}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Seçilen Basamağın Mikroskop Analizi */}
      {selectedMeta && (
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs font-black uppercase text-amber-400">
                Seçilen Basamak İncelemesi:
              </span>
              <h4 className="text-xl font-black text-white mt-0.5">
                {selectedMeta.name} ({selectedMeta.period})
              </h4>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
                <span className="text-slate-400">Sayı Değeri: </span>
                <span className="font-black text-white text-base">{selectedDigitVal}</span>
              </div>
            </div>
          </div>

          {/* Formül Kutusu */}
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-4 rounded-xl border border-blue-700/40 text-center">
            <span className="text-xs text-blue-300 font-bold block mb-1">
              Basamak Değeri Hesabı (Rakam × Basamak Çarpanı):
            </span>
            <div className="font-mono text-xl sm:text-2xl font-black text-emerald-400">
              {selectedDigitVal} × {selectedMeta.multiplier.toLocaleString('tr-TR')} ={' '}
              <span className="text-amber-300 underline">{selectedPlaceVal.toLocaleString('tr-TR')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

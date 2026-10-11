'use client';

import React, { useState, useEffect } from 'react';
import { sounds } from '@/lib/sound';
import { Lock, Coffee, Play, Pause, RotateCcw, X, ShieldAlert, Award, Eye, GlassWater, Dumbbell } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  subjectTitle: string;
  gameModeName?: string;
  onStudyComplete: () => void;
}

export const StudyTimerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  subjectTitle,
  gameModeName,
  onStudyComplete,
}) => {
  // 20 dk etüt = 1200 sn, 10 dk mola = 600 sn
  const [mode, setMode] = useState<'study' | 'break'>('study');
  const [secondsLeft, setSecondsLeft] = useState(20 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMode('study');
      setSecondsLeft(20 * 60);
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  }, [isOpen]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && secondsLeft === 0) {
      if (mode === 'study') {
        // 20 dakika bitti! Zorunlu ekran kilidi & 10 dakika mola başlar!
        sounds.playScreenLock();
        setMode('break');
        setSecondsLeft(10 * 60);
        onStudyComplete();
      } else {
        // Mola bitti!
        sounds.playFanfare();
        setIsRunning(false);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft, mode, onStudyComplete]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const totalSeconds = mode === 'study' ? 20 * 60 : 10 * 60;
  const progressPercent = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  // Hızlı Demo Simülasyonu (Kullanıcının 20 dk beklemeden ekran kilidini görmesi için)
  const handleFastForward = () => {
    setSecondsLeft(3);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      {/* Mola Durumunda Tam Ekran Kilidi */}
      {mode === 'break' ? (
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white rounded-3xl p-8 max-w-2xl w-full border-4 border-amber-400 shadow-2xl text-center animate-fadeIn relative">
          <div className="inline-flex p-4 bg-amber-400/20 rounded-full mb-4 animate-pulse">
            <Lock className="w-16 h-16 text-amber-400" />
          </div>

          <div className="inline-block px-4 py-1.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-full text-xs font-black uppercase tracking-wider mb-2">
            🔒 EKRAN KİLİTLENDİ (MEB KURALI)
          </div>

          <h2 className="text-3xl sm:text-4xl font-black mb-2">
            Zorunlu 10 Dakika Mola Zamanı!
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto mb-6">
            Tebrikler! 20 dakikalık etüdünü tamamladın. Gözlerini ve zihnini dinlendirmek için ekran 10 dakika boyunca kilitlendi.
          </p>

          {/* Mola Geri Sayımı */}
          <div className="text-6xl sm:text-7xl font-mono font-black text-amber-400 tracking-wider mb-6">
            {formattedTime}
          </div>

          {/* Sağlık & Dinlenme İpuçları */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <Eye className="w-6 h-6 text-cyan-300 mb-2" />
              <h4 className="font-bold text-sm text-cyan-200">Göz Dinlendir</h4>
              <p className="text-xs text-slate-300 mt-1">20-20-20 Kuralı: 20 metre uzağa 20 saniye bak.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <GlassWater className="w-6 h-6 text-blue-300 mb-2" />
              <h4 className="font-bold text-sm text-blue-200">Su Molası</h4>
              <p className="text-xs text-slate-300 mt-1">Bir bardak taze su iç, beynine oksijen gitsin.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
              <Dumbbell className="w-6 h-6 text-emerald-300 mb-2" />
              <h4 className="font-bold text-sm text-emerald-200">Esneme Hareketi</h4>
              <p className="text-xs text-slate-300 mt-1">Omuzlarını dairesel çevir, derin nefes al.</p>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4">
            <button
              onClick={handleFastForward}
              className="text-xs text-slate-400 hover:text-white underline"
            >
              (Öğretmen / Test: Molayı Hızlı Bitir ⏩)
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-white/20 hover:bg-white/30 text-white font-bold text-sm rounded-xl"
            >
              Pencereyi Kapat
            </button>
          </div>
        </div>
      ) : (
        /* Çalışma Modu (20 dk Etüt) */
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              ⏱️ 20 Dk Canlı Etüt Sayacı
            </span>
            <h3 className="text-2xl font-black text-slate-800 dark:text-white">
              {subjectTitle}
            </h3>
            {gameModeName && (
              <p className="text-sm font-medium text-slate-500 mt-1">
                {gameModeName}
              </p>
            )}
          </div>

          {/* Dairesel / Sayısal Gösterge */}
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-3xl p-8 mb-6 text-center border border-slate-200 dark:border-slate-700">
            <div className="text-6xl font-mono font-black text-blue-600 dark:text-blue-400 tracking-wider mb-4">
              {formattedTime}
            </div>

            {/* İlerleme Çubuğu */}
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-1000 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Buton Kontrolleri */}
          <div className="flex justify-center items-center gap-4 mb-6">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-white shadow-lg transition transform active:scale-95 ${
                isRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5" />
                  Duraklat
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Devam Et
                </>
              )}
            </button>

            <button
              onClick={() => {
                setSecondsLeft(20 * 60);
                setIsRunning(false);
              }}
              className="p-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-2xl font-bold transition"
              title="Sıfırla"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* Test / Simülasyon Butonu */}
          <div className="text-center pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleFastForward}
              className="text-xs text-slate-400 hover:text-blue-600 font-semibold"
            >
              ⚡ 20 Dakikayı Simüle Et (Ekran Kilidini Gör) ⏩
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import { Activity5BinaryChoice } from '@/types';
import { sounds } from '@/lib/sound';
import confetti from 'canvas-confetti';
import { Scale, RotateCcw, Trophy, Sparkles, Flame } from 'lucide-react';

interface Props {
  binaryData: Activity5BinaryChoice;
  onComplete: (earnedXp: number) => void;
}

export const GameBinaryChoice: React.FC<Props> = ({ binaryData, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; selected: 'A' | 'B' } | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentItem = binaryData.items[currentIndex];
  const total = binaryData.items.length;

  const handleChoose = (categoryChoice: 'A' | 'B') => {
    if (feedback || !currentItem) return;

    const isCorrect = categoryChoice === currentItem.correctCategory;

    if (isCorrect) {
      sounds.playCorrect();
      const points = 10 + (combo >= 3 ? 5 : 0);
      setScore((prev) => prev + points);
      setCombo((prev) => prev + 1);
      setFeedback({ isCorrect: true, selected: categoryChoice });
    } else {
      sounds.playWrong();
      setScore((prev) => Math.max(0, prev - 5));
      setCombo(0);
      setFeedback({ isCorrect: false, selected: categoryChoice });
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex + 1 < total) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsFinished(true);
        sounds.playFanfare();
        confetti({ particleCount: 110, spread: 75, origin: { y: 0.6 } });
        onComplete(score);
      }
    }, 800);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setCombo(0);
    setFeedback(null);
    setIsFinished(false);
    sounds.playClick();
  };

  if (isFinished) {
    return (
      <div className="bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-950 text-white rounded-3xl p-8 shadow-2xl text-center border-4 border-pink-400">
        <div className="inline-block p-4 bg-pink-400/20 rounded-full mb-4 animate-bounce">
          <Trophy className="w-16 h-16 text-pink-300" />
        </div>
        <h2 className="text-3xl font-black mb-2">Karşılaştırma Düellosu Bitti!</h2>
        <p className="text-pink-200 text-lg mb-6">
          Kategorileri hızla ayırt ettin ve harika puan topladın!
        </p>

        <div className="inline-flex items-center gap-3 bg-pink-500/20 border border-pink-400 px-6 py-3 rounded-2xl mb-8">
          <Sparkles className="w-6 h-6 text-pink-300" />
          <span className="text-2xl font-black text-pink-200">Toplam Puan: {score} XP</span>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition"
          >
            <RotateCcw className="w-5 h-5" />
            Tekrar Oyna
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800">
      {/* Üst Bilgi */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 rounded-full text-xs font-bold tracking-wide uppercase mb-2">
            <Scale className="w-3.5 h-3.5" />
            Etkinlik 5: İkili Karşılaştırma (+10 / -5 Puan)
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">
            Hangi Kategoriye Ait? (Kart {currentIndex + 1} / {total})
          </h2>
        </div>

        {/* Skor & Combo */}
        <div className="flex items-center gap-4">
          {combo >= 2 && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 rounded-full font-black text-xs animate-bounce">
              <Flame className="w-4 h-4 fill-amber-500" />
              <span>{combo}X Seri!</span>
            </div>
          )}
          <div className="text-xl font-black text-pink-600 dark:text-pink-400">
            {score} Puan
          </div>
        </div>
      </div>

      {/* Soru / İfade Kartı */}
      {currentItem && (
        <div className="mb-8">
          <div
            className={`p-8 rounded-3xl border-2 shadow-lg text-center transition-all ${
              feedback
                ? feedback.isCorrect
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40'
                  : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 animate-shake'
                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60'
            }`}
          >
            <p className="text-xl sm:text-2xl font-bold leading-relaxed text-slate-800 dark:text-slate-100">
              &quot;{currentItem.statement}&quot;
            </p>
            {feedback && (
              <p
                className={`mt-3 font-black text-sm ${
                  feedback.isCorrect ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {feedback.isCorrect ? '+10 Puan! Doğru Eşleştirme' : '-5 Puan! Hatalı Seçim'}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Karşılaştırma Seçim Butonları (A vs B) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          disabled={!!feedback}
          onClick={() => handleChoose('A')}
          className="group relative p-6 bg-gradient-to-br from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white rounded-2xl shadow-md transition-all transform active:scale-95 disabled:opacity-50 text-left"
        >
          <span className="block text-xs font-black uppercase tracking-wider text-indigo-200 mb-1">
            [ KATEGORİ A ]
          </span>
          <span className="text-lg sm:text-xl font-bold block">
            {binaryData.categoryA}
          </span>
        </button>

        <button
          disabled={!!feedback}
          onClick={() => handleChoose('B')}
          className="group relative p-6 bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-2xl shadow-md transition-all transform active:scale-95 disabled:opacity-50 text-left"
        >
          <span className="block text-xs font-black uppercase tracking-wider text-purple-200 mb-1">
            [ KATEGORİ B ]
          </span>
          <span className="text-lg sm:text-xl font-bold block">
            {binaryData.categoryB}
          </span>
        </button>
      </div>
    </div>
  );
};

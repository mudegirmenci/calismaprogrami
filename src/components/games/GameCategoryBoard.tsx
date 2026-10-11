'use client';

import React, { useState } from 'react';
import { Activity3CategoryBoard } from '@/types';
import { sounds } from '@/lib/sound';
import confetti from 'canvas-confetti';
import { Layers, CheckCircle2, RotateCcw, Trophy, Sparkles } from 'lucide-react';

interface Props {
  boardData: Activity3CategoryBoard;
  onComplete: (earnedXp: number) => void;
}

export const GameCategoryBoard: React.FC<Props> = ({ boardData, onComplete }) => {
  const [remainingItems, setRemainingItems] = useState(boardData.items);
  const [categorizedItems, setCategorizedItems] = useState<Record<string, typeof boardData.items>>(() => {
    const init: Record<string, typeof boardData.items> = {};
    boardData.categories.forEach((cat) => {
      init[cat] = [];
    });
    return init;
  });
  const [feedback, setFeedback] = useState<{ id: number; isError: boolean } | null>(null);
  const [score, setScore] = useState(0);

  const activeCard = remainingItems[0] || null;
  const isFinished = remainingItems.length === 0;

  const handleAssignCategory = (targetCategory: string) => {
    if (!activeCard) return;

    if (activeCard.category === targetCategory) {
      sounds.playCorrect();
      setCategorizedItems((prev) => ({
        ...prev,
        [targetCategory]: [...prev[targetCategory], activeCard],
      }));
      setRemainingItems((prev) => prev.slice(1));
      setScore((prev) => prev + 10);
      setFeedback(null);

      if (remainingItems.length === 1) {
        sounds.playFanfare();
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        onComplete(score + 10);
      }
    } else {
      sounds.playWrong();
      setFeedback({ id: activeCard.id, isError: true });
      setTimeout(() => {
        setFeedback(null);
      }, 1200);
    }
  };

  const handleRestart = () => {
    setRemainingItems(boardData.items);
    const init: Record<string, typeof boardData.items> = {};
    boardData.categories.forEach((cat) => {
      init[cat] = [];
    });
    setCategorizedItems(init);
    setScore(0);
    setFeedback(null);
    sounds.playClick();
  };

  if (isFinished) {
    return (
      <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-8 shadow-2xl text-center border-4 border-emerald-400">
        <div className="inline-block p-4 bg-emerald-400/20 rounded-full mb-4 animate-bounce">
          <Trophy className="w-16 h-16 text-emerald-300" />
        </div>
        <h2 className="text-3xl font-extrabold mb-2">Pano Tamamlandı!</h2>
        <p className="text-emerald-200 text-lg mb-6">
          Bütün kartları kusursuz şekilde ait olduğu kategorilere yerleştirdin!
        </p>

        <div className="inline-flex items-center gap-3 bg-emerald-500/20 border border-emerald-400 px-6 py-3 rounded-2xl mb-8">
          <Sparkles className="w-6 h-6 text-emerald-300" />
          <span className="text-2xl font-black text-emerald-200">+{score} XP Kazandın!</span>
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
      {/* Üst Başlık */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 rounded-full text-xs font-bold tracking-wide uppercase mb-2">
            <Layers className="w-3.5 h-3.5" />
            Etkinlik 3: Kategori Panosu
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">
            Sürükle-Bırak & Kategoriye Ayır
          </h2>
        </div>

        <div className="text-sm font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl">
          Kalan Kart: {remainingItems.length} / {boardData.items.length}
        </div>
      </div>

      {/* Ortadaki Aktif Kart Vitrini */}
      {activeCard && (
        <div className="mb-8">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center mb-2">
            Aşağıdaki Kartı Uygun Kategoriye Gönder:
          </div>
          <div
            className={`max-w-xl mx-auto p-6 rounded-2xl border-2 shadow-lg text-center transition-all transform ${
              feedback?.isError
                ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 animate-shake'
                : 'border-teal-400 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800 text-slate-800 dark:text-white'
            }`}
          >
            <p className="text-lg sm:text-xl font-bold leading-relaxed">
              {activeCard.cardText}
            </p>
            {feedback?.isError && (
              <p className="text-xs font-bold text-rose-600 mt-2">
                Yanlış Kategori! Bilgiyi tekrar incele.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Hedef Kategoriler Panosu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {boardData.categories.map((categoryName) => {
          const placedList = categorizedItems[categoryName] || [];

          return (
            <div
              key={categoryName}
              className="flex flex-col bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border-2 border-slate-200 dark:border-slate-700 min-h-[220px]"
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200 dark:border-slate-700">
                <h4 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                  {categoryName}
                </h4>
                <span className="text-xs font-bold bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 px-2.5 py-0.5 rounded-full">
                  {placedList.length}
                </span>
              </div>

              {/* Yerleştirilen Kartlar Listesi */}
              <div className="flex-1 space-y-2 mb-3 overflow-y-auto max-h-48 pr-1">
                {placedList.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs font-medium text-slate-700 dark:text-slate-300 flex items-start gap-2 shadow-sm animate-fadeIn"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item.cardText}</span>
                  </div>
                ))}
              </div>

              {/* Kategori Seç Butonu */}
              <button
                onClick={() => handleAssignCategory(categoryName)}
                className="w-full py-2.5 px-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow transition active:scale-95"
              >
                Bu Kategoriye Ekle ➕
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

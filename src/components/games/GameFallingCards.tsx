'use client';

import React, { useState, useEffect } from 'react';
import { FallingCardItem } from '@/types';
import { sounds } from '@/lib/sound';
import confetti from 'canvas-confetti';
import { Heart, Play, RotateCcw, ShieldAlert, Sparkles, Trophy, Zap } from 'lucide-react';

interface Props {
  cards: FallingCardItem[];
  onComplete: (earnedXp: number) => void;
}

export const GameFallingCards: React.FC<Props> = ({ cards, onComplete }) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover' | 'victory'>('idle');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [timerProgress, setTimerProgress] = useState(100);
  const [cardStatus, setCardStatus] = useState<'normal' | 'hit-correct' | 'hit-wrong'>('normal');

  const activeCard = cards[currentCardIndex];
  const totalCards = cards.length;

  // Kart zamanlayıcısı (Her kart için ~6 saniye süzülme süresi)
  useEffect(() => {
    if (gameState !== 'playing' || !activeCard) return;

    setTimerProgress(100);
    const intervalTime = 50; // 50ms
    const step = 100 / (6000 / intervalTime); // 6 saniye toplam

    const timer = setInterval(() => {
      setTimerProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleCardTimeout();
          return 0;
        }
        return prev - step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [gameState, currentCardIndex]);

  // Kart düşüp kaçtığında çağrılır
  const handleCardTimeout = () => {
    if (!activeCard) return;

    if (activeCard.isCorrect) {
      // Doğru kart kaçırıldı! Can kaybedilir
      sounds.playWrong();
      loseLife();
    } else {
      // Yanlış kart atlatıldı! Tebrikler
      sounds.playCorrect();
      setScore((prev) => prev + 10);
      nextCard();
    }
  };

  const handleCardClick = () => {
    if (gameState !== 'playing' || !activeCard || cardStatus !== 'normal') return;

    if (activeCard.isCorrect) {
      // Doğru bilgi tıklandı! Başarı!
      sounds.playCorrect();
      setCardStatus('hit-correct');
      setScore((prev) => prev + 20);

      setTimeout(() => {
        setCardStatus('normal');
        nextCard();
      }, 500);
    } else {
      // Yanlış bilgiye tıklandı! Ceza
      sounds.playWrong();
      setCardStatus('hit-wrong');
      loseLife();

      setTimeout(() => {
        setCardStatus('normal');
        nextCard();
      }, 600);
    }
  };

  const loseLife = () => {
    setLives((prev) => {
      const nextLives = prev - 1;
      if (nextLives <= 0) {
        setGameState('gameover');
        sounds.playWrong();
      } else {
        nextCard();
      }
      return nextLives;
    });
  };

  const nextCard = () => {
    if (currentCardIndex + 1 < totalCards) {
      setCurrentCardIndex((prev) => prev + 1);
      setTimerProgress(100);
    } else {
      setGameState('victory');
      sounds.playFanfare();
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      onComplete(score + 30);
    }
  };

  const startGame = () => {
    setGameState('playing');
    setCurrentCardIndex(0);
    setLives(3);
    setScore(0);
    setCardStatus('normal');
    sounds.playClick();
  };

  // Başlangıç Ekranı
  if (gameState === 'idle') {
    return (
      <div className="bg-gradient-to-br from-amber-500 via-orange-600 to-rose-600 text-white rounded-3xl p-8 shadow-2xl text-center">
        <div className="inline-block p-4 bg-white/20 rounded-full mb-4 animate-bounce">
          <Zap className="w-16 h-16 text-yellow-200" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-black mb-3">Yukarıdan Düşen Kartlar</h2>
        <div className="bg-white/10 max-w-lg mx-auto p-4 rounded-2xl mb-6 text-orange-100 font-medium leading-relaxed">
          <p className="font-bold text-white text-lg mb-2">🎮 Görev Talimatı:</p>
          &quot;Sadece DOĞRU bilgilerin olduğu kartlara tıkla, YANLIŞ olanlara dokunma! 3 canın var.&quot;
        </div>

        <div className="flex justify-center items-center gap-3 mb-8">
          <Heart className="w-7 h-7 text-rose-300 fill-rose-400" />
          <Heart className="w-7 h-7 text-rose-300 fill-rose-400" />
          <Heart className="w-7 h-7 text-rose-300 fill-rose-400" />
          <span className="font-bold text-lg">3 Can ile Başla</span>
        </div>

        <button
          onClick={startGame}
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-orange-600 hover:bg-orange-50 font-black text-xl rounded-2xl shadow-xl transition transform active:scale-95"
        >
          <Play className="w-6 h-6 fill-orange-600" />
          Macerayı Başlat!
        </button>
      </div>
    );
  }

  // Oyun Sonu / Can Bitti Ekranı
  if (gameState === 'gameover') {
    return (
      <div className="bg-gradient-to-br from-slate-900 to-rose-950 text-white rounded-3xl p-8 shadow-2xl text-center border-4 border-rose-500">
        <div className="inline-block p-4 bg-rose-500/20 rounded-full mb-4">
          <ShieldAlert className="w-16 h-16 text-rose-400" />
        </div>
        <h2 className="text-3xl font-black mb-2">Canların Tükendi!</h2>
        <p className="text-rose-200 text-lg mb-6">
          Yanlış kartlara bastın ya da doğruları kaçırdın. Tekrar dene ve rekorunu kır!
        </p>

        <div className="text-xl font-bold text-rose-300 mb-8">
          Toplanan Puan: <span className="text-white font-black text-2xl">{score}</span>
        </div>

        <button
          onClick={startGame}
          className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-lg transition"
        >
          <RotateCcw className="w-5 h-5" />
          Tekrar Dene
        </button>
      </div>
    );
  }

  // Zafer Ekranı
  if (gameState === 'victory') {
    return (
      <div className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white rounded-3xl p-8 shadow-2xl text-center border-4 border-amber-400">
        <div className="inline-block p-4 bg-amber-400/20 rounded-full mb-4 animate-bounce">
          <Trophy className="w-16 h-16 text-amber-300" />
        </div>
        <h2 className="text-3xl font-black mb-2">Harika Refleksler!</h2>
        <p className="text-emerald-200 text-lg mb-6">
          Tüm kartları başarıyla analiz ettin ve canlarını korudun!
        </p>

        <div className="inline-flex items-center gap-3 bg-amber-500/20 border border-amber-400 px-6 py-3 rounded-2xl mb-8">
          <Sparkles className="w-6 h-6 text-amber-300" />
          <span className="text-2xl font-black text-amber-200">+{score + 30} XP Kazandın!</span>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={startGame}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition"
          >
            <RotateCcw className="w-5 h-5" />
            Yeniden Oyna
          </button>
        </div>
      </div>
    );
  }

  // Aktif Oyun Alanı
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800">
      {/* Üst Bar */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Heart
              key={idx}
              className={`w-7 h-7 transition-all ${
                idx < lives
                  ? 'text-rose-500 fill-rose-500 scale-100'
                  : 'text-slate-300 dark:text-slate-700 scale-90'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-xs font-bold text-slate-500">
            Kart: {currentCardIndex + 1} / {totalCards}
          </div>
          <div className="text-lg font-black text-amber-600 dark:text-amber-400">
            {score} Puan
          </div>
        </div>
      </div>

      {/* Süre Çubuğu */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full mb-6 overflow-hidden">
        <div
          className={`h-full transition-all duration-75 rounded-full ${
            timerProgress > 40 ? 'bg-amber-500' : 'bg-rose-500 animate-pulse'
          }`}
          style={{ width: `${timerProgress}%` }}
        />
      </div>

      {/* Düşen / Ekranda Süzülen Kart */}
      {activeCard && (
        <div className="min-h-[220px] flex items-center justify-center py-6">
          <button
            onClick={handleCardClick}
            className={`w-full max-w-xl p-8 rounded-3xl border-4 shadow-2xl transition-all transform cursor-pointer text-center ${
              cardStatus === 'hit-correct'
                ? 'bg-emerald-500 text-white border-emerald-400 scale-105'
                : cardStatus === 'hit-wrong'
                ? 'bg-rose-500 text-white border-rose-400 animate-shake'
                : 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800 border-amber-400 hover:border-orange-500 hover:scale-[1.02]'
            }`}
          >
            <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-amber-700 dark:text-amber-300 mb-3 bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded-full">
              DOĞRU İSE DOKUN!
            </span>
            <p className="text-xl sm:text-2xl font-bold leading-relaxed text-slate-800 dark:text-slate-100">
              {activeCard.content}
            </p>
          </button>
        </div>
      )}
    </div>
  );
};

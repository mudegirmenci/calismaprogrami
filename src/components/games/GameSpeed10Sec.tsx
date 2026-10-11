'use client';

import React, { useState, useEffect } from 'react';
import { SpeedQuestion } from '@/types';
import { sounds } from '@/lib/sound';
import confetti from 'canvas-confetti';
import { Clock, RotateCcw, Trophy, Sparkles, Zap, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  questions: SpeedQuestion[];
  onComplete: (earnedXp: number) => void;
}

export const GameSpeed10Sec: React.FC<Props> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex];
  const total = questions.length;

  // 10 Saniyelik Sayaç
  useEffect(() => {
    if (isFinished || isAnswered || !currentQ) return;

    setTimeLeft(10);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        if (prev <= 4) {
          sounds.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, isAnswered, isFinished]);

  const handleTimeout = () => {
    sounds.playWrong();
    setIsAnswered(true);
    setSelectedOption(null);

    setTimeout(() => {
      nextQuestion();
    }, 1000);
  };

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;

    setSelectedOption(opt);
    setIsAnswered(true);

    const isCorrect = opt === currentQ.correctAnswer;
    if (isCorrect) {
      sounds.playCorrect();
      // Kalan süreye göre ekstra bonus puan! (10s kaldıysa 20 puan, 1s kaldıysa 11 puan)
      const earned = 10 + timeLeft;
      setScore((prev) => prev + earned);
      setCorrectAnswers((prev) => prev + 1);
    } else {
      sounds.playWrong();
    }

    setTimeout(() => {
      nextQuestion();
    }, 900);
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < total) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      sounds.playFanfare();
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      onComplete(score);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setTimeLeft(10);
    setScore(0);
    setCorrectAnswers(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsFinished(false);
    sounds.playClick();
  };

  if (isFinished) {
    return (
      <div className="bg-gradient-to-br from-amber-900 to-red-950 text-white rounded-3xl p-8 shadow-2xl text-center border-4 border-amber-400">
        <div className="inline-block p-4 bg-amber-400/20 rounded-full mb-4 animate-bounce">
          <Trophy className="w-16 h-16 text-amber-300" />
        </div>
        <h2 className="text-3xl font-black mb-2">Hız Arenası Tamamlandı!</h2>
        <p className="text-amber-200 text-lg mb-6">
          Zamana meydan okudun ve {total} soruda {correctAnswers} doğru yanıt verdin!
        </p>

        <div className="inline-flex items-center gap-3 bg-amber-500/20 border border-amber-400 px-6 py-3 rounded-2xl mb-8">
          <Sparkles className="w-6 h-6 text-amber-300" />
          <span className="text-2xl font-black text-amber-200">Toplam Puan: {score} XP</span>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition"
          >
            <RotateCcw className="w-5 h-5" />
            Yeniden Yarış
          </button>
        </div>
      </div>
    );
  }

  const timePercent = (timeLeft / 10) * 100;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800">
      {/* Üst Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 rounded-full text-xs font-bold tracking-wide uppercase mb-2">
            <Zap className="w-3.5 h-3.5" />
            Etkinlik 6: 10 Saniyelik Süreli Yarışma
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">
            Hızlı Düşünme Sınavı (Soru {currentIndex + 1} / {total})
          </h2>
        </div>

        {/* 10 Saniyelik Sayaç Rozeti */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-lg transition-all ${
              timeLeft <= 3
                ? 'bg-rose-500 text-white animate-ping'
                : timeLeft <= 6
                ? 'bg-amber-500 text-white'
                : 'bg-emerald-500 text-white'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span>{timeLeft} sn</span>
          </div>

          <div className="text-lg font-black text-amber-600 dark:text-amber-400">
            {score} XP
          </div>
        </div>
      </div>

      {/* Azalan Süre Barı */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full mb-6 overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ease-linear rounded-full ${
            timeLeft <= 3 ? 'bg-rose-500' : timeLeft <= 6 ? 'bg-amber-500' : 'bg-emerald-500'
          }`}
          style={{ width: `${timePercent}%` }}
        />
      </div>

      {/* Soru */}
      {currentQ && (
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 mb-6 border border-slate-200 dark:border-slate-700">
          <p className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 text-center mb-8">
            {currentQ.question}
          </p>

          {/* Şıklar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === opt;
              const isCorrect = opt === currentQ.correctAnswer;

              let style = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-amber-400 hover:bg-amber-50/40 text-slate-800 dark:text-slate-100';

              if (isAnswered) {
                if (isCorrect) {
                  style = 'bg-emerald-500 text-white border-emerald-400 font-bold';
                } else if (isSelected && !isCorrect) {
                  style = 'bg-rose-500 text-white border-rose-400 font-bold';
                } else {
                  style = 'opacity-40 border-slate-200 dark:border-slate-800';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-5 rounded-2xl text-lg font-bold border-2 transition-all flex items-center justify-between shadow-sm active:scale-95 ${style}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-6 h-6 text-white" />}
                  {isAnswered && isSelected && !isCorrect && <AlertCircle className="w-6 h-6 text-white" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

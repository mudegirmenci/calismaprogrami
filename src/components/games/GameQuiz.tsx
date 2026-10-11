'use client';

import React, { useState } from 'react';
import { QuizQuestion } from '@/types';
import { sounds } from '@/lib/sound';
import confetti from 'canvas-confetti';
import { CheckCircle2, AlertCircle, HelpCircle, ArrowRight, RotateCcw, Trophy, Sparkles } from 'lucide-react';

interface Props {
  questions: QuizQuestion[];
  onComplete: (earnedXp: number) => void;
}

export const GameQuiz: React.FC<Props> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex];
  const optionKeys = ['A', 'B', 'C', 'D'];

  const handleSelectOption = (optKey: string) => {
    if (isAnswered) return;
    setSelectedOption(optKey);
    setIsAnswered(true);

    const isCorrect = optKey === currentQ.correctAnswer;
    if (isCorrect) {
      sounds.playCorrect();
      setCorrectCount((prev) => prev + 1);
    } else {
      sounds.playWrong();
      setWrongCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      sounds.playClick();
    } else {
      setIsFinished(true);
      sounds.playFanfare();
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      onComplete(correctCount * 10);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setWrongCount(0);
    setIsFinished(false);
    sounds.playClick();
  };

  if (isFinished) {
    const total = questions.length;
    const score = correctCount * 10;
    const successRate = Math.round((correctCount / total) * 100);

    return (
      <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-8 shadow-2xl text-center border-4 border-cyan-400">
        <div className="inline-block p-4 bg-cyan-400/20 rounded-full mb-4 animate-bounce">
          <Trophy className="w-16 h-16 text-cyan-300" />
        </div>
        <h2 className="text-3xl font-extrabold mb-2">Test Tamamlandı!</h2>
        <p className="text-blue-200 text-lg mb-6">
          Kazanımı ölçen tüm soruları yanıtladın!
        </p>

        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
          <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
            <span className="block text-2xl font-black text-emerald-400">{correctCount}</span>
            <span className="text-xs text-blue-200 font-semibold">Doğru</span>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
            <span className="block text-2xl font-black text-rose-400">{wrongCount}</span>
            <span className="text-xs text-blue-200 font-semibold">Yanlış</span>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
            <span className="block text-2xl font-black text-amber-300">%{successRate}</span>
            <span className="text-xs text-blue-200 font-semibold">Başarı</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-3 bg-cyan-500/20 border border-cyan-400 px-6 py-3 rounded-2xl mb-8">
          <Sparkles className="w-6 h-6 text-cyan-300" />
          <span className="text-2xl font-black text-cyan-200">+{score} XP Kazandın!</span>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition"
          >
            <RotateCcw className="w-5 h-5" />
            Tekrar Çöz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800">
      {/* Üst Bilgi Barı */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold tracking-wide uppercase mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            Etkinlik 2: Doğruyu Bul
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">
            Kazanım Testi (Soru {currentIndex + 1} / {questions.length})
          </h2>
        </div>

        {/* Skor Takibi */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-4 h-4" />
            <span>{correctCount}</span>
          </div>
          <div className="flex items-center gap-2 text-rose-600 font-bold text-sm bg-rose-50 dark:bg-rose-950/40 px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-800">
            <AlertCircle className="w-4 h-4" />
            <span>{wrongCount}</span>
          </div>
        </div>
      </div>

      {/* Soru Kartı */}
      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 mb-6 border border-slate-200 dark:border-slate-700">
        <p className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 leading-relaxed mb-6">
          {currentQ.question}
        </p>

        {/* Şıklar */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((optionText, idx) => {
            const optLetter = optionKeys[idx];
            const isSelected = selectedOption === optLetter;
            const isTargetCorrect = optLetter === currentQ.correctAnswer;

            let style = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50/40';

            if (isAnswered) {
              if (isTargetCorrect) {
                style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 font-bold';
              } else if (isSelected && !isTargetCorrect) {
                style = 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200 font-bold';
              } else {
                style = 'opacity-50 border-slate-200 dark:border-slate-800';
              }
            }

            return (
              <button
                key={optLetter}
                disabled={isAnswered}
                onClick={() => handleSelectOption(optLetter)}
                className={`w-full p-4 rounded-xl text-left border-2 transition-all flex items-center justify-between shadow-sm ${style}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}>
                    {optLetter}
                  </span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {optionText}
                  </span>
                </div>

                {isAnswered && isTargetCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isAnswered && isSelected && !isTargetCorrect && (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Açıklama Kutusu */}
        {isAnswered && currentQ.explanation && (
          <div className="p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl mb-4 text-sm text-blue-900 dark:text-blue-200 flex items-start gap-2 animate-fadeIn">
            <span className="text-base">💡</span>
            <div>
              <span className="font-bold">Öğrenme Notu: </span>
              {currentQ.explanation}
            </div>
          </div>
        )}

        {/* İlerle Butonu */}
        {isAnswered && (
          <div className="flex justify-end">
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition flex items-center gap-2"
            >
              <span>{currentIndex + 1 === questions.length ? 'Sonuçları Gör' : 'Sonraki Soru'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

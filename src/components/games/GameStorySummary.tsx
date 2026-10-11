'use client';

import React, { useState } from 'react';
import { Activity1Story } from '@/types';
import { sounds } from '@/lib/sound';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, AlertCircle, ArrowRight, RotateCcw, ShieldCheck, Trophy } from 'lucide-react';

interface Props {
  storyData: Activity1Story;
  onComplete: (earnedXp: number) => void;
}

export const GameStorySummary: React.FC<Props> = ({ storyData, onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const currentStep = storyData.steps[currentStepIndex];
  const progressPercent = Math.round(((currentStepIndex) / storyData.steps.length) * 100);

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    sounds.playClick();
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || isAnswered) return;

    const correct = selectedOption === currentStep.correctOptionIndex;
    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      sounds.playCorrect();
      setScore((prev) => prev + 25);
    } else {
      sounds.playWrong();
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex + 1 < storyData.steps.length) {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsCorrect(false);
      sounds.playClick();
    } else {
      setIsFinished(true);
      sounds.playFanfare();
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      onComplete(score + 25);
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setIsFinished(false);
    setScore(0);
    sounds.playClick();
  };

  if (isFinished) {
    return (
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white rounded-3xl p-8 shadow-2xl text-center border-4 border-amber-400">
        <div className="inline-block p-4 bg-amber-400/20 rounded-full mb-4 animate-bounce">
          <Trophy className="w-16 h-16 text-amber-300" />
        </div>
        <h2 className="text-3xl font-extrabold mb-2">Görev Başarıyla Tamamlandı!</h2>
        <p className="text-indigo-200 text-lg mb-6 max-w-lg mx-auto">
          Tüm ipuçlarını çözdün, uzay operasyonunu zekânla kurtardın.
        </p>

        <div className="inline-flex items-center gap-3 bg-amber-500/20 border border-amber-400 px-6 py-3 rounded-2xl mb-8">
          <Sparkles className="w-6 h-6 text-amber-300" />
          <span className="text-2xl font-black text-amber-200">+{score} XP Kazandın!</span>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition"
          >
            <RotateCcw className="w-5 h-5" />
            Görevi Tekrarla
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
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full text-xs font-bold tracking-wide uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Etkinlik 1: Oyunlaştırılmış Özet
          </div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-slate-100">
            {storyData.title}
          </h2>
        </div>

        {/* İlerleme Çubuğu */}
        <div className="w-full sm:w-48 bg-slate-100 dark:bg-slate-800 rounded-full p-1 border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between text-xs font-bold text-slate-500 px-2 mb-1">
            <span>Aşama {currentStepIndex + 1}/{storyData.steps.length}</span>
            <span>%{progressPercent}</span>
          </div>
          <div className="h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-600 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Hikaye Giriş Betimlemesi */}
      {currentStepIndex === 0 && (
        <div className="mb-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border border-purple-200 dark:border-purple-800 p-4 rounded-2xl flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
          <p className="text-sm text-purple-900 dark:text-purple-200 font-medium">
            {storyData.intro}
          </p>
        </div>
      )}

      {/* Mevcut Aşama Kartı */}
      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 mb-6 border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold text-sm flex items-center justify-center">
            {currentStep.stepNumber}
          </span>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            {currentStep.title}
          </h3>
        </div>

        {/* Hikaye Anlatısı */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 leading-relaxed mb-6 font-normal">
          {currentStep.narrative}
        </div>

        {/* Görev Sorusu */}
        <p className="font-bold text-slate-800 dark:text-slate-100 text-base mb-4 flex items-center gap-2">
          <span className="text-purple-600 dark:text-purple-400">❓</span>
          {currentStep.question}
        </p>

        {/* Şıklar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {currentStep.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isTargetCorrect = idx === currentStep.correctOptionIndex;

            let btnStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-purple-400 hover:bg-purple-50/50';

            if (isSelected) {
              btnStyle = 'border-purple-600 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-bold';
            }

            if (isAnswered) {
              if (isTargetCorrect) {
                btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-bold';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 font-bold';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`p-4 rounded-xl text-left border-2 transition-all flex items-center justify-between shadow-sm ${btnStyle}`}
              >
                <span>{option}</span>
                {isAnswered && isTargetCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Cevap Geri Bildirimi */}
        {isAnswered && (
          <div
            className={`p-4 rounded-xl mb-4 text-sm font-semibold flex items-center gap-3 animate-fadeIn ${
              isCorrect
                ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200 border border-emerald-300'
                : 'bg-rose-100 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200 border border-rose-300'
            }`}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{currentStep.rewardText}</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-rose-600" />
                <span>
                  Rota hatası! Doğru cevap: &quot;{currentStep.options[currentStep.correctOptionIndex]}&quot; idi.
                </span>
              </>
            )}
          </div>
        )}

        {/* Aksiyon Butonu */}
        <div className="flex justify-end">
          {!isAnswered ? (
            <button
              onClick={handleConfirmAnswer}
              disabled={selectedOption === null}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white font-bold rounded-xl shadow-md transition flex items-center gap-2"
            >
              Cevabı Onayla ve İlerle
            </button>
          ) : (
            <button
              onClick={handleNextStep}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition flex items-center gap-2"
            >
              <span>{currentStepIndex + 1 === storyData.steps.length ? 'Görevi Bitir' : 'Sonraki Aşama'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

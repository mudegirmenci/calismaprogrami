'use client';

import React, { useState } from 'react';
import { WEEKLY_SCHEDULE } from '@/data/scheduleData';
import { SUBJECTS } from '@/data/curriculumData';
import { SubjectId } from '@/types';
import { sounds } from '@/lib/sound';
import { Clock, Lock, Sparkles, CheckCircle2, Play, AlertCircle, Calendar, ShieldCheck, Flame } from 'lucide-react';

interface Props {
  onStartSession: (subjectTitle: string, gameModeName?: string, subjectId?: SubjectId) => void;
  onSelectSubjectForGames: (subjectId: SubjectId) => void;
}

export const ScheduleView: React.FC<Props> = ({ onStartSession, onSelectSubjectForGames }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const currentDay = WEEKLY_SCHEDULE[selectedDayIndex];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Kural Bilgilendirme Bannerı */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-700/50 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4" />
            MEB Uyumlu 5. Sınıf Oyunlaştırılmış Rutin
          </div>
          <h2 className="text-2xl sm:text-3xl font-black mb-3">
            Haftalık Ders ve Görev Programı
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 text-xs sm:text-sm text-indigo-100">
            <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
              <span className="font-bold text-amber-300 block mb-1">🕒 Başlangıç:</span>
              Okul 15:00&apos;da biter; tüm programlar 16:00&apos;dan sonra dinlenmiş olarak başlar.
            </div>
            <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
              <span className="font-bold text-cyan-300 block mb-1">🔒 20 Dk + 10 Dk Kuralı:</span>
              Her etüt tam 20 dakikadır. Sonunda zorunlu 10 dakika ekran kilidi devreye girer.
            </div>
            <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
              <span className="font-bold text-rose-300 block mb-1">📚 Odak 5 Ders:</span>
              Türkçe (Ağırlıklı), Matematik, Fen Bilimleri, Sosyal Bilgiler, İngilizce.
            </div>
            <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
              <span className="font-bold text-emerald-300 block mb-1">🚫 Hafta Sonu Kuralı:</span>
              Cumartesi ve Pazar YENİ KONU İŞLENMEZ; sadece hafta içi 5 dersin tekrarı ve turnuvaları oynanır.
            </div>
          </div>
        </div>
      </div>

      {/* Gün Seçici Tabları */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {WEEKLY_SCHEDULE.map((day, idx) => {
          const isSelected = selectedDayIndex === idx;
          return (
            <button
              key={day.dayName}
              onClick={() => {
                setSelectedDayIndex(idx);
                sounds.playClick();
              }}
              className={`px-5 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/25 scale-105'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-300'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>{day.dayName}</span>
              {day.isWeekend && (
                <span className="text-[10px] bg-amber-400 text-slate-900 px-1.5 py-0.5 rounded-full font-black">
                  Tekrar
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Seçilen Günün Program Detayı */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">
              {currentDay.dayName} Akışı
            </h3>
            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
              {currentDay.theme}
            </p>
          </div>

          {currentDay.isWeekend && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 rounded-xl text-xs font-bold border border-amber-300">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Hafta Sonu Modu: Yeni Konu Kilitli</span>
            </div>
          )}
        </div>

        {/* Slotlar / Etütler Listesi */}
        <div className="space-y-4">
          {currentDay.slots.map((slot) => {
            const isBreak = slot.type === 'mola';
            const subject = slot.subjectId ? SUBJECTS[slot.subjectId] : null;

            if (isBreak) {
              return (
                <div
                  key={slot.id}
                  className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-200 dark:bg-amber-900/60 flex items-center justify-center text-amber-800 dark:text-amber-300 font-bold">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-amber-900 dark:text-amber-200 text-sm">
                          {slot.subjectTitle}
                        </span>
                        <span className="text-xs bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded-full font-bold">
                          {slot.durationMin} Dk
                        </span>
                      </div>
                      <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                        {slot.notes}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400">
                    {slot.timeRange}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={slot.id}
                className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 rounded-2xl p-5 transition-all shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${subject ? subject.color : 'from-indigo-500 to-purple-600'} text-white flex items-center justify-center font-black shadow-md shrink-0`}>
                    <Clock className="w-6 h-6" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-slate-500 bg-slate-200 dark:bg-slate-700 px-2.5 py-0.5 rounded-lg">
                        {slot.timeRange}
                      </span>
                      <span className="text-sm font-black text-slate-800 dark:text-slate-100">
                        {slot.subjectTitle}
                      </span>
                      <span className="text-xs bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold px-2 py-0.5 rounded-full">
                        {slot.durationMin} Dk Etüt
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-indigo-600 dark:text-indigo-400">
                      {slot.gameModeName}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {slot.notes}
                    </p>
                  </div>
                </div>

                {/* Aksiyon Butonları */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {slot.subjectId && (
                    <button
                      onClick={() => {
                        sounds.playClick();
                        onSelectSubjectForGames(slot.subjectId!);
                      }}
                      className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Oyunlara Git</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      sounds.playClick();
                      onStartSession(slot.subjectTitle, slot.gameModeName, slot.subjectId);
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow transition flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>20 Dk Etüde Başla</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

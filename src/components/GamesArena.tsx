'use client';

import React, { useState } from 'react';
import { SubjectId, WeeklyLessonContent } from '@/types';
import { SUBJECTS, ALL_LESSONS } from '@/data/curriculumData';
import { sounds } from '@/lib/sound';
import { GameStorySummary } from './games/GameStorySummary';
import { GameQuiz } from './games/GameQuiz';
import { GameCategoryBoard } from './games/GameCategoryBoard';
import { GameFallingCards } from './games/GameFallingCards';
import { GameBinaryChoice } from './games/GameBinaryChoice';
import { GameSpeed10Sec } from './games/GameSpeed10Sec';
import {
  Sparkles,
  BookOpen,
  HelpCircle,
  Layers,
  Zap,
  Scale,
  Clock,
  ChevronRight,
  Lightbulb,
} from 'lucide-react';

interface Props {
  activeSubjectId: SubjectId;
  setActiveSubjectId: (id: SubjectId) => void;
  customLessonContent: WeeklyLessonContent | null;
  onRewardXp: (amount: number) => void;
}

export const GamesArena: React.FC<Props> = ({
  activeSubjectId,
  setActiveSubjectId,
  customLessonContent,
  onRewardXp,
}) => {
  const [activeActivityIndex, setActiveActivityIndex] = useState<number>(1);

  // Eğer özel yüklenen bir içerik varsa ve geçerli derse uyuyorsa onu kullan, yoksa veritabanından al
  const currentLesson: WeeklyLessonContent =
    customLessonContent && customLessonContent.subjectId === activeSubjectId
      ? customLessonContent
      : ALL_LESSONS[activeSubjectId] || ALL_LESSONS.fen;

  const currentSubjectInfo = SUBJECTS[activeSubjectId] || SUBJECTS.fen;

  const ACTIVITIES = [
    { id: 1, name: '1. Oyunlaştırılmış Özet', icon: Sparkles, desc: 'Hikaye & Görev Tabanlı Macera' },
    { id: 2, name: '2. Doğruyu Bul', icon: HelpCircle, desc: 'Kazanım Testi (4 Şıklı)' },
    { id: 3, name: '3. Kategori Panosu', icon: Layers, desc: 'Sürükle-Bırak & Ayırma Panosu' },
    { id: 4, name: '4. Düşen Kartlar (3 Can)', icon: Zap, desc: 'Sadece Doğrulara Tıkla, Canlarını Koru' },
    { id: 5, name: '5. İkili Karşılaştırma', icon: Scale, desc: '+10 / -5 Puanlı Kategori Düellosu' },
    { id: 6, name: '6. 10 Saniyelik Hız Arenası', icon: Clock, desc: 'Zamana Karşı Refleks Yarışı' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 5 Ders Seçici Şerit */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {Object.values(SUBJECTS).map((subj) => {
          const isSelected = subj.id === activeSubjectId;
          return (
            <button
              key={subj.id}
              onClick={() => {
                setActiveSubjectId(subj.id);
                sounds.playClick();
              }}
              className={`p-4 rounded-2xl border-2 text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-600 bg-white dark:bg-slate-900 shadow-xl shadow-indigo-500/10 scale-102 ring-2 ring-indigo-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${subj.color}`} />
                {isSelected && (
                  <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-full">
                    Aktif
                  </span>
                )}
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-100">
                  {subj.name}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  {subj.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Aktif Ders & MEB Kazanım & Derinlemesine Kavrama Kartı */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-bold uppercase">
                {currentLesson.grade}. Sınıf • {currentLesson.term}. Dönem {currentLesson.week}. Hafta
              </span>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 rounded-full text-xs font-bold font-mono">
                MEB: {currentLesson.mebObjectiveCode}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100">
              {currentLesson.topicTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {currentLesson.mebObjectiveDesc}
            </p>
          </div>
        </div>

        {/* Derinlemesine Kavrama (Zihinsel Simülasyon) */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800 border border-amber-200 dark:border-slate-700 p-5 rounded-2xl flex items-start gap-4">
          <div className="p-2.5 bg-amber-400/20 text-amber-700 dark:text-amber-300 rounded-xl shrink-0 mt-0.5">
            <Lightbulb className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm sm:text-base text-amber-900 dark:text-amber-200 mb-1">
              {currentLesson.deepSummaryTitle}
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {currentLesson.deepSummaryNarrative}
            </p>
          </div>
        </div>
      </div>

      {/* 6 Oyun Modu Seçici Butonları */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {ACTIVITIES.map((act) => {
          const Icon = act.icon;
          const isSelected = activeActivityIndex === act.id;
          return (
            <button
              key={act.id}
              onClick={() => {
                setActiveActivityIndex(act.id);
                sounds.playClick();
              }}
              className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 scale-102'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
              }`}
            >
              <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-white' : 'text-indigo-600'}`} />
              <div>
                <span className="block font-black text-xs">
                  {act.name}
                </span>
                <span className={`block text-[10px] line-clamp-1 mt-0.5 ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                  {act.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Aktif Oyun Alanı */}
      <div>
        {activeActivityIndex === 1 && (
          <GameStorySummary
            storyData={currentLesson.activity1}
            onComplete={(xp) => onRewardXp(xp)}
          />
        )}
        {activeActivityIndex === 2 && (
          <GameQuiz
            questions={currentLesson.activity2}
            onComplete={(xp) => onRewardXp(xp)}
          />
        )}
        {activeActivityIndex === 3 && (
          <GameCategoryBoard
            boardData={currentLesson.activity3}
            onComplete={(xp) => onRewardXp(xp)}
          />
        )}
        {activeActivityIndex === 4 && (
          <GameFallingCards
            cards={currentLesson.activity4}
            onComplete={(xp) => onRewardXp(xp)}
          />
        )}
        {activeActivityIndex === 5 && (
          <GameBinaryChoice
            binaryData={currentLesson.activity5}
            onComplete={(xp) => onRewardXp(xp)}
          />
        )}
        {activeActivityIndex === 6 && (
          <GameSpeed10Sec
            questions={currentLesson.activity6}
            onComplete={(xp) => onRewardXp(xp)}
          />
        )}
      </div>
    </div>
  );
};

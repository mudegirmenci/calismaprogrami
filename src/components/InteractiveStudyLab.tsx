'use client';

import React from 'react';
import { SubjectId, WeeklyLessonContent } from '@/types';
import { SUBJECTS, ALL_LESSONS } from '@/data/curriculumData';
import { FenSimulation } from './simulations/FenSimulation';
import { MatematikSimulation } from './simulations/MatematikSimulation';
import { TurkceSimulation } from './simulations/TurkceSimulation';
import { SosyalSimulation } from './simulations/SosyalSimulation';
import { IngilizceSimulation } from './simulations/IngilizceSimulation';
import { sounds } from '@/lib/sound';
import { Sparkles, Play, Lightbulb, BookOpen, Orbit, Calculator, Compass, Globe } from 'lucide-react';

interface Props {
  activeSubjectId: SubjectId;
  setActiveSubjectId: (id: SubjectId) => void;
  onGoToGames: (subjectId: SubjectId) => void;
}

export const InteractiveStudyLab: React.FC<Props> = ({
  activeSubjectId,
  setActiveSubjectId,
  onGoToGames,
}) => {
  const currentSubject = SUBJECTS[activeSubjectId] || SUBJECTS.fen;
  const currentLesson: WeeklyLessonContent = ALL_LESSONS[activeSubjectId] || ALL_LESSONS.fen;

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
                    İnceleniyor
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

      {/* MEB Kazanımı & Konu Özeti Kartı */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-bold uppercase">
                {currentLesson.grade}. Sınıf • {currentLesson.term}. Dönem {currentLesson.week}. Hafta
              </span>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 rounded-full text-xs font-bold font-mono">
                MEB Kazanımı: {currentLesson.mebObjectiveCode}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100">
              {currentLesson.topicTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {currentLesson.mebObjectiveDesc}
            </p>
          </div>

          <button
            onClick={() => onGoToGames(activeSubjectId)}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition shrink-0"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Bu Konunun Oyunlarına Geç</span>
          </button>
        </div>

        {/* Derinlemesine Kavrama (Zihinsel Simülasyon Anlatımı) */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800 border border-amber-200 dark:border-slate-700 p-5 rounded-2xl flex items-start gap-4 mb-6">
          <div className="p-2.5 bg-amber-400/20 text-amber-700 dark:text-amber-300 rounded-xl shrink-0 mt-0.5">
            <Lightbulb className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm sm:text-base text-amber-900 dark:text-amber-200 mb-1">
              🧠 Zihinsel Betimleme: {currentLesson.deepSummaryTitle}
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {currentLesson.deepSummaryNarrative}
            </p>
          </div>
        </div>

        {/* Canlı İnteraktif Simülasyon Bölümü */}
        <div>
          {activeSubjectId === 'fen' && <FenSimulation />}
          {activeSubjectId === 'matematik' && <MatematikSimulation />}
          {activeSubjectId === 'turkce' && <TurkceSimulation />}
          {activeSubjectId === 'sosyal' && <SosyalSimulation />}
          {activeSubjectId === 'ingilizce' && <IngilizceSimulation />}
        </div>
      </div>
    </div>
  );
};

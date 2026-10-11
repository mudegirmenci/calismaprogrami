'use client';

import React, { useState } from 'react';
import { UserStats } from '@/types';
import { sounds } from '@/lib/sound';
import { Sparkles, Trophy, Flame, Volume2, VolumeX, Terminal, BookOpen, Clock } from 'lucide-react';

interface Props {
  stats: UserStats;
  activeTab: 'program' | 'oyunlar';
  setActiveTab: (tab: 'program' | 'oyunlar') => void;
  onOpenBadges: () => void;
  onOpenEngine: () => void;
  onOpenTimer: () => void;
}

export const Navbar: React.FC<Props> = ({
  stats,
  activeTab,
  setActiveTab,
  onOpenBadges,
  onOpenEngine,
  onOpenTimer,
}) => {
  const [soundOn, setSoundOn] = useState(true);

  const toggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    sounds.setSoundEnabled(nextState);
    if (nextState) sounds.playClick();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 transform hover:scale-105 transition">
            <span className="text-2xl font-black">5</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                EğitimKozmosu
              </span>
              <span className="text-[11px] font-black uppercase bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full">
                5. Sınıf
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              MEB Müfredatı Oyun & Programlama Motoru
            </p>
          </div>
        </div>

        {/* Ana Navigasyon Tabları */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => {
              setActiveTab('program');
              sounds.playClick();
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'program'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Haftalık Program</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('oyunlar');
              sounds.playClick();
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === 'oyunlar'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Oyun Arenası</span>
          </button>
        </div>

        {/* Gamification Göstergeleri & Aksiyonlar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Canlı 20 Dk Etüt Sayacı Butonu */}
          <button
            onClick={onOpenTimer}
            className="flex items-center gap-1.5 px-3 py-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 rounded-xl text-xs font-bold hover:bg-blue-100 transition shadow-sm"
            title="20 Dk Canlı Etüt Sayacı & Ekran Kilidi"
          >
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="hidden md:inline">Canlı Etüt Sayacı</span>
          </button>

          {/* XP Rozeti */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 rounded-xl text-xs font-black shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{stats.xp} XP</span>
          </div>

          {/* Seviye & Rozet Butonu */}
          <button
            onClick={onOpenBadges}
            className="flex items-center gap-1.5 px-3 py-2 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 rounded-xl text-xs font-bold hover:bg-purple-100 transition shadow-sm"
            title="Rozet Vitrini"
          >
            <Trophy className="w-4 h-4 text-purple-600" />
            <span className="hidden sm:inline">Lv. {stats.level}</span>
          </button>

          {/* İçerik Motoru Butonu */}
          <button
            onClick={onOpenEngine}
            className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl transition"
            title="İçerik ve Programlama Motoru (JSON / MEB Kazanım)"
          >
            <Terminal className="w-5 h-5 text-indigo-600" />
          </button>

          {/* Ses Aç / Kapat */}
          <button
            onClick={toggleSound}
            className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl transition"
            title={soundOn ? 'Sesi Kapat' : 'Sesi Aç'}
          >
            {soundOn ? (
              <Volume2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

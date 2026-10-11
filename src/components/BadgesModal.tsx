'use client';

import React from 'react';
import { UserStats } from '@/types';
import { Award, Trophy, Star, ShieldCheck, Flame, X, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
}

export const BadgesModal: React.FC<Props> = ({ isOpen, onClose, stats }) => {
  if (!isOpen) return null;

  const BADGES = [
    {
      id: 'kozmik-kasif',
      title: 'Kozmik Kaşif',
      desc: "Ay'ın evreleri ve yörünge hareketlerini eksiksiz tamamladı.",
      icon: '🚀',
      unlocked: stats.xp >= 50,
    },
    {
      id: 'sayi-sifrecisi',
      title: 'Sayı Şifrecisi',
      desc: 'Milyonlar basamağını ve bölükleri başarıyla çözdü.',
      icon: '🔢',
      unlocked: stats.xp >= 150,
    },
    {
      id: 'kelime-avcisi',
      title: 'Kelime Dedektifi',
      desc: 'Mecaz, gerçek ve terim anlamları ustaca ayırt etti.',
      icon: '🔍',
      unlocked: stats.xp >= 250,
    },
    {
      id: 'refleks-ustasi',
      title: 'Işık Hızı Refleksi',
      desc: '10 saniyelik süreli yarışmada süper hızlı cevaplar verdi.',
      icon: '⚡',
      unlocked: stats.xp >= 350,
    },
    {
      id: 'disiplin-kahramani',
      title: 'Ekran Disiplini Şampiyonu',
      desc: '20 dk etüt + 10 dk zorunlu mola kuralına sadakatle uydu.',
      icon: '🔒',
      unlocked: stats.completedActivities >= 2,
    },
    {
      id: 'kozmik-bilge',
      title: '5. Sınıf Kozmik Bilgesi',
      desc: 'Tüm 5 derste haftalık turnuvaları başarıyla bitirdi.',
      icon: '👑',
      unlocked: stats.xp >= 600,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex p-3 bg-amber-400/20 rounded-full mb-3">
            <Trophy className="w-10 h-10 text-amber-500" />
          </div>
          <h3 className="text-2xl font-black text-slate-800 dark:text-white">
            Rozet Vitrini & Başarılar
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Dersleri tamamladıkça ve oyunları kazandıkça yeni rozetler açılır!
          </p>
        </div>

        {/* İstatistik Özet Kartı */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
            <span className="block text-xl font-black text-amber-500">{stats.xp}</span>
            <span className="text-xs text-slate-500 font-semibold">Toplam XP</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
            <span className="block text-xl font-black text-indigo-500">Lv. {stats.level}</span>
            <span className="text-xs text-slate-500 font-semibold">Seviye</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
            <span className="block text-xl font-black text-rose-500">{stats.completedActivities}</span>
            <span className="text-xs text-slate-500 font-semibold">Etüt Sayısı</span>
          </div>
        </div>

        {/* Rozetler Listesi */}
        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
          {BADGES.map((badge) => (
            <div
              key={badge.id}
              className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${
                badge.unlocked
                  ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800'
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 opacity-50'
              }`}
            >
              <div className="text-3xl">{badge.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">
                    {badge.title}
                  </h4>
                  {badge.unlocked && (
                    <span className="text-[10px] font-black uppercase bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full">
                      Kazanıldı
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {badge.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

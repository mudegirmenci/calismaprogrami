'use client';

import React, { useState, useEffect } from 'react';
import { SubjectId, UserStats, WeeklyLessonContent } from '@/types';
import { ALL_LESSONS } from '@/data/curriculumData';
import { Navbar } from '@/components/Navbar';
import { ScheduleView } from '@/components/ScheduleView';
import { GamesArena } from '@/components/GamesArena';
import { StudyTimerModal } from '@/components/StudyTimerModal';
import { ContentEngineModal } from '@/components/ContentEngineModal';
import { BadgesModal } from '@/components/BadgesModal';
import { sounds } from '@/lib/sound';
import confetti from 'canvas-confetti';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'program' | 'oyunlar'>('program');
  const [activeSubjectId, setActiveSubjectId] = useState<SubjectId>('fen');
  const [customLessonContent, setCustomLessonContent] = useState<WeeklyLessonContent | null>(null);

  // Modallar
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [activeSessionInfo, setActiveSessionInfo] = useState<{
    subjectTitle: string;
    gameModeName?: string;
  }>({
    subjectTitle: 'Fen Bilimleri',
    gameModeName: "Uzay İstasyonu: Ay'ın Evreleri",
  });
  const [isEngineOpen, setIsEngineOpen] = useState(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState(false);

  // Kullanıcı İlerlemesi / İstatistikleri
  const [stats, setStats] = useState<UserStats>({
    xp: 120,
    level: 2,
    streakDays: 4,
    completedActivities: 3,
    unlockedBadges: ['kozmik-kasif'],
  });

  // LocalStorage yükle
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedStats = localStorage.getItem('egitimkozmosu_stats_5');
      if (savedStats) {
        try {
          setStats(JSON.parse(savedStats));
        } catch {
          // ignore error
        }
      }
    }
  }, []);

  // XP Kazanma İşleyicisi
  const handleRewardXp = (amount: number) => {
    setStats((prev) => {
      const newXp = prev.xp + amount;
      const newLevel = Math.max(1, Math.floor(newXp / 150) + 1);
      const updated: UserStats = {
        ...prev,
        xp: newXp,
        level: newLevel,
        completedActivities: prev.completedActivities + 1,
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('egitimkozmosu_stats_5', JSON.stringify(updated));
      }

      if (newLevel > prev.level) {
        sounds.playFanfare();
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
      }

      return updated;
    });
  };

  // 20 Dk Etüt Başlatma
  const handleStartStudySession = (
    subjectTitle: string,
    gameModeName?: string,
    subjectId?: SubjectId
  ) => {
    setActiveSessionInfo({ subjectTitle, gameModeName });
    if (subjectId) {
      setActiveSubjectId(subjectId);
    }
    setIsTimerOpen(true);
  };

  // Etütten direkt oyun arenasına yönlendirme
  const handleSelectSubjectForGames = (subjectId: SubjectId) => {
    setActiveSubjectId(subjectId);
    setActiveTab('oyunlar');
  };

  const currentContent = customLessonContent || ALL_LESSONS[activeSubjectId] || ALL_LESSONS.fen;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      {/* Üst Navigasyon */}
      <Navbar
        stats={stats}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBadges={() => setIsBadgesOpen(true)}
        onOpenEngine={() => setIsEngineOpen(true)}
        onOpenTimer={() => setIsTimerOpen(true)}
      />

      {/* Ana İçerik Alanı */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'program' ? (
          <ScheduleView
            onStartSession={handleStartStudySession}
            onSelectSubjectForGames={handleSelectSubjectForGames}
          />
        ) : (
          <GamesArena
            activeSubjectId={activeSubjectId}
            setActiveSubjectId={setActiveSubjectId}
            customLessonContent={customLessonContent}
            onRewardXp={handleRewardXp}
          />
        )}
      </main>

      {/* Alt Bilgi / Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500">
        <p>
          © 2026 EğitimKozmosu 5 • 5. Sınıf MEB Kazanımları Oyunlaştırılmış Öğrenme ve Etüt Motoru
        </p>
        <p className="mt-1 text-slate-400">
          20 Dk Etüt + 10 Dk Ekran Kilidi Kuralı • Türkçe Ağırlıklı • Hafta Sonu Turnuva Modu
        </p>
      </footer>

      {/* Modallar */}
      <StudyTimerModal
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
        subjectTitle={activeSessionInfo.subjectTitle}
        gameModeName={activeSessionInfo.gameModeName}
        onStudyComplete={() => handleRewardXp(50)}
      />

      <ContentEngineModal
        isOpen={isEngineOpen}
        onClose={() => setIsEngineOpen(false)}
        currentContent={currentContent}
        onLoadCustomContent={(newContent) => {
          setCustomLessonContent(newContent);
          setActiveSubjectId(newContent.subjectId);
          setActiveTab('oyunlar');
        }}
      />

      <BadgesModal
        isOpen={isBadgesOpen}
        onClose={() => setIsBadgesOpen(false)}
        stats={stats}
      />
    </div>
  );
}

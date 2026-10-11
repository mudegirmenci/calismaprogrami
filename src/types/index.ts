export type SubjectId = 'fen' | 'matematik' | 'turkce' | 'sosyal' | 'ingilizce';

export interface SubjectInfo {
  id: SubjectId;
  name: string;
  color: string;
  bgLight: string;
  borderColor: string;
  iconName: string;
  description: string;
}

export interface ScheduleSlot {
  id: string;
  timeRange: string;
  type: 'etut' | 'mola' | 'tekrar';
  durationMin: number;
  subjectId?: SubjectId;
  subjectTitle: string;
  gameModeName?: string;
  notes?: string;
}

export interface DaySchedule {
  dayName: string;
  isWeekend: boolean;
  theme: string;
  slots: ScheduleSlot[];
}

// Etkinlik 1: Oyunlaştırılmış Özet Senaryosu
export interface StoryStep {
  stepNumber: number;
  title: string;
  narrative: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  rewardText: string;
}

export interface Activity1Story {
  title: string;
  intro: string;
  steps: StoryStep[];
}

// Etkinlik 2: Doğruyu Bul (Test Sorusu)
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string; // 'A' | 'B' | 'C' | 'D'
  explanation?: string;
}

// Etkinlik 3: Kategori Panosu
export interface CategoryBoardItem {
  id: number;
  cardText: string;
  category: string;
}

export interface Activity3CategoryBoard {
  categories: string[];
  items: CategoryBoardItem[];
}

// Etkinlik 4: Yukarıdan Düşen Kartlar (3 Can)
export interface FallingCardItem {
  id: number;
  content: string;
  isCorrect: boolean; // Doğru mu Yanlış mı
}

// Etkinlik 5: İkili Karşılaştırma (+10 / -5 Puan)
export interface BinaryChoiceItem {
  id: number;
  statement: string;
  correctCategory: 'A' | 'B';
}

export interface Activity5BinaryChoice {
  categoryA: string;
  categoryB: string;
  items: BinaryChoiceItem[];
}

// Etkinlik 6: 10 Saniyelik Süreli Yarışma
export interface SpeedQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

// Haftalık Ders İçerik Paketi
export interface WeeklyLessonContent {
  grade: number;
  subjectId: SubjectId;
  term: number;
  week: number;
  topicTitle: string;
  mebObjectiveCode: string;
  mebObjectiveDesc: string;
  deepSummaryTitle: string;
  deepSummaryNarrative: string;
  
  // 6 Oyun Veritabanı
  activity1: Activity1Story;
  activity2: QuizQuestion[];
  activity3: Activity3CategoryBoard;
  activity4: FallingCardItem[];
  activity5: Activity5BinaryChoice;
  activity6: SpeedQuestion[];
}

export interface UserStats {
  xp: number;
  level: number;
  streakDays: number;
  completedActivities: number;
  unlockedBadges: string[];
}

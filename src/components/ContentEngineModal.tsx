'use client';

import React, { useState } from 'react';
import { WeeklyLessonContent } from '@/types';
import { Copy, Check, Code, Download, Upload, X, Terminal, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentContent: WeeklyLessonContent;
  onLoadCustomContent: (content: WeeklyLessonContent) => void;
}

export const ContentEngineModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentContent,
  onLoadCustomContent,
}) => {
  const [copied, setCopied] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(currentContent, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (!parsed.topicTitle || !parsed.activity2 || !parsed.activity4) {
        throw new Error('Eksik veri yapısı!');
      }
      onLoadCustomContent(parsed);
      setImportStatus('✅ Yeni hafta verisi başarıyla yüklendi!');
      setTimeout(() => {
        setImportStatus(null);
        onClose();
      }, 1500);
    } catch {
      setImportStatus('❌ Geçersiz JSON formatı! Lütfen tam veri şablonunu kullanın.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] flex flex-col border border-slate-200 dark:border-slate-800 shadow-2xl relative">
        {/* Başlık */}
        <div className="flex justify-between items-start mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Terminal className="w-3.5 h-3.5" />
              İçerik ve Programlama Motoru
            </div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-white">
              MEB Kazanım & Oyun Veritabanı Motoru
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Aktif Hafta: {currentContent.grade}. Sınıf {currentContent.topicTitle} ({currentContent.mebObjectiveCode})
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gövde - Tablar & JSON Export */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {/* Kazanım & Derinlemesine Kavrama Kartı */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-sm text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              MEB Kazanımı
            </h4>
            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              <span className="font-black text-indigo-600">[{currentContent.mebObjectiveCode}]</span> {currentContent.mebObjectiveDesc}
            </div>

            <h4 className="font-bold text-sm text-slate-700 dark:text-slate-200 mt-4 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              Derinlemesine Kavrama & Zihinsel Simülasyon
            </h4>
            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentContent.deepSummaryNarrative}
            </div>
          </div>

          {/* Dışa Aktarma / Kopyalama */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-sm text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <Code className="w-4 h-4 text-blue-500" />
                6 Oyunun Tam Veri Seti (JSON Formatı)
              </h4>
              <button
                onClick={handleCopyJson}
                className="flex items-center gap-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Kopyalandı!' : 'JSON Kopyala'}
              </button>
            </div>
            <pre className="bg-slate-900 text-emerald-400 p-3 rounded-xl text-[11px] overflow-x-auto max-h-40 font-mono">
              {JSON.stringify(currentContent, null, 2)}
            </pre>
          </div>

          {/* Yeni Hafta Yükleme (İçe Aktarma) */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-sm text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-500" />
              Yeni Hafta İçeriği Yükle (JSON Yapıştır)
            </h4>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Oluşturulan yeni haftalık JSON verisini buraya yapıştırıp uygulamaya yükleyin..."
              className="w-full h-24 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {importStatus && (
              <div className="text-xs font-bold mb-2 text-indigo-600">
                {importStatus}
              </div>
            )}
            <button
              onClick={handleImportJson}
              disabled={!jsonInput.trim()}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow transition"
            >
              Uygulamaya Yükle ve Başlat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

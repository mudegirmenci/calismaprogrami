import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EğitimKozmosu 5 - MEB Uyumlu Oyunlaştırılmış Öğrenme ve Etüt Motoru",
  description: "5. Sınıf öğrencileri için 20 dk etüt + 10 dk ekran kilidi molalı haftalık çalışma programı ve 6 etkileşimli MEB kazanım oyunu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-purple-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

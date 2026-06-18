import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '랜딩랩 브랜드 의뢰 폼',
  description: '가맹모집 랜딩페이지 제작 의뢰',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

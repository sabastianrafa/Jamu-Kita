import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jamu Kita - Herbal Indonesia',
  description: 'Sehat dengan jamu alami',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Elsie:wght@900&family=Poppins:wght@400;600&family=Inter:wght@400;700&family=Josefin+Sans:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
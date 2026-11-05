import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';

const fontStyle = {
  '--font-plus-jakarta': 'Arial, Helvetica, sans-serif',
} as React.CSSProperties;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  ),
  title: 'Lakesite FA — Nurturing Champions from Nairobi',
  description:
    'Lakesite Football Academy in Langata, Nairobi trains young players from U8 to Senior level through structured coaching, mentorship, and competitive football programs.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" style={fontStyle}>
      <body style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
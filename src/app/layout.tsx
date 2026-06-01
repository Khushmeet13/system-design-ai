import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SysArch AI — 3D System Design Simulator',
  description: 'AI-powered interactive 3D system architecture visualizer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

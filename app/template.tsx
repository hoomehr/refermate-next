'use client';
import ThemeRegistry from '../components/ThemeRegistry';

export default function Template({ children }: { children: React.ReactNode }) {
  return <ThemeRegistry>{children}</ThemeRegistry>;
} 
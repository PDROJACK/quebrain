'use client';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';
import { useEffect, useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AuthCheck from '@/components/AuthCheck';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

import { metadata } from './metadata';
import CustomSidebar from '@/components/Sidebar';
import { Noto_Sans, Noto_Sans_Mono } from 'next/font/google';

const nbInternational = Noto_Sans({
  variable: '--font-nb-international',
  subsets: ['latin'],
  display: 'swap',
});

const nbInternationalMono = Noto_Sans_Mono({
  variable: '--font-nb-international-mono',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  return (
    <html lang="en">
      <body className={`${nbInternational.variable} ${nbInternationalMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

          {loading ? (
            <div>Loading...</div>
          ) : user ? (
            <AuthCheck>
              <SidebarProvider>
                <CustomSidebar />
                <div className="flex-1 p-4">
                  {children}
                </div>
              </SidebarProvider>
            </AuthCheck>
          ) : (
            children
          )}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

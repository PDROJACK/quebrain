"use client";

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect, useState } from 'react';

interface ThemeProviderProps {
    children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </NextThemesProvider>
    );
}


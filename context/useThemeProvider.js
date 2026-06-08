'use client';

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(undefined);

export default function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(false);

    // 2. Récupération au premier rendu
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        // vérifie la préférence système si rien n'est stocké
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDark(true);
        } else {
            setIsDark(false);
        }
    }, []);

    useEffect(() => {
        if (isDark === null) return;

        const theme = isDark ? 'dark' : 'light';
        localStorage.setItem('theme', theme);

        //document.documentElement.setAttribute('data-theme', theme);

        // Pour Tailwind (la stratégie par classe)
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggle = () => setIsDark(prev => !prev);

    // Éviter le flash blanc pendant que Next.js s'initialise sur le client
    if (isDark === null) {
        return <div style={{ visibility: 'hidden' }}>{children}</div>;
    }

    return (
        <ThemeContext.Provider value={{ isDark, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme doit être utilisé à l'intérieur d'un ThemeProvider");
    }
    return context;
};
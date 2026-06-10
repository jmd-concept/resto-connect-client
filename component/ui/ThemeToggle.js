'use client';

import { useTheme } from "@/context/useThemeProvider";

export default function ThemeToggle() {
    const { isDark, toggle } = useTheme();

    return (
        <button
            onClick={toggle}
            aria-label="Changer de thème"
            className={`fixed top-1/5 right-2 -translate-y-1/2 md:translate-y-0 z-50 md:top-0 md:right-0 md:static text-xl p-1 rounded-xl hover:scale-110 transition-transform cursor-pointer
                ${isDark
                    ? "dark:bg-gray-900 dark:text-white"
                    : "bg-gray-200 text-black"}`}
        >
            {isDark ? "☀️" : "🌙"}
        </button>
    );
} 
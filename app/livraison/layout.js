'use client'

import NavBarComponent from "@/component/NavBar"
import FooterComponent from "@/component/Footer"
import ProtectedRoute from "@/component/ProtectedRoute"

import { useTheme } from "@/context/useThemeProvider";

export default function LayoutSuivi({ children }) {

    const { isDark } = useTheme();
    return (
        <div className={`${isDark ? "bg-zinc-900 text-white" : "bg-white text-black"}
        `}>
            <ProtectedRoute>
                <NavBarComponent />
                <main className="px-8">
                    {children}
                </main>
                <FooterComponent />
            </ProtectedRoute>
        </div>
    )
}
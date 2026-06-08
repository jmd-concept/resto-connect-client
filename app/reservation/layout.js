'use client'

import NavBarComponent from "@/component/NavBar"
import FooterComponent from "@/component/Footer"

import { useTheme } from "@/context/useThemeProvider";

export default function LayoutCommande({ children }) {

    const { isDark } = useTheme();
    return (
        <div className={`${isDark ? "bg-zinc-900 text-white" : "bg-white text-black"}
        `}>
            <NavBarComponent />
            <main className="mt-12">
                {children}
            </main>
            <FooterComponent />
        </div>
    )
}
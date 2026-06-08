'use client'

import NavBarComponent from "@/component/NavBar"
import FooterComponent from "@/component/Footer"
import ProtectedRoute from "@/component/ProtectedRoute"

import { useTheme } from "@/context/useThemeProvider";

export default function Layout({ children }) {
    const { isDark } = useTheme();
    return (
        <div className={`${isDark ? "bg-zinc-900 text-white" : "bg-white text-black"}
               `}
        >
            <ProtectedRoute>
                <NavBarComponent />
                {children}
                <FooterComponent />
            </ProtectedRoute>
        </div>
    )
}

/* 
'use client'

import React from "react";
import { useSearchParams } from "next/navigation";

export default function VerifierPage({ params }) {
    const { id } = React.use(params);

    const searchParams = useSearchParams();
    const secret = searchParams.get("secret");

    return (
        <div className="m-auto max-w-7xl p-6">
            <h1 className="text-2xl font-bold">Info menu</h1>
            <p className="text-sm text-gray-500 mt-2">ID du Menu détecté :
                <span className="font-mono text-black bg-gray-100 px-2 py-0.5 rounded">{id}</span>
            </p>

            {secret && (
                <p className="text-xs text-emerald-600 mt-1">Jeton de session validé.</p>
            )}
        </div>
    );
} */
'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserHome } from "@/context/useHomeContext";

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const { user, loading, isLoggedIn } = useUserHome();

    useEffect(() => {
        if (!loading || !isLoggedIn) {
            if (!user || !isLoggedIn) {
                router.push("/login");
                return;
            }
        }

    }, [user, loading, isLoggedIn, router]);

    if (loading) return <p>Chargement...</p>;

    if (!user || !isLoggedIn) {
        return null;
    }

    return children;
}

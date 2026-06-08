'use client'

import { createContext, useContext, useEffect, useState } from "react";

const SubscriptionContext = createContext();

export default function AbonnerProvider({ children }) {
    const [isSubscribe, setIsSubscribe] = useState(false);
    const [email, setEmail] = useState("");
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);

    const updatePhoto = async (id_cl, file) => {
        if (!id_cl) {
            console.error("Tentative d'upload sans ID client valide");
            return { success: false, message: "ID client manquant" };
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("photo", file);

            const res = await fetch(`${window.location.origin}/api/subscribe/photo/${id_cl}`, {
                next: { revalidate: 1800 },
                method: "PATCH",
                body: formData,
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setPhoto(data.photo);
                return { success: true, photo: data.photo };
            }
            return { success: false, message: data.error };
        } catch (error) {
            return { success: false, message: error.message || "Erreur lors de l'upload" };
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSubscription = async (user) => {
        try {
            const response = await fetch(`/api/subscribe/google`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email,
                    image: user.image
                }),
            });
            return await response.json();
        } catch (error) {
            return { success: false, message: error.message || "Erreur réseau" };
        }
    };

    const handleGoogleUnSubscription = async (email) => {
        try {
            const response = await fetch(`/api/unsubscribe/google`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (data.success) {
                setIsSubscribe(false);
            }
            return data;
        } catch (error) {
            return { success: false, message: error.message || "Erreur réseau" };
        }
    };

    const handleAbonnement = async (email) => {
        setLoading(true);

        try {
            const res = await fetch(`${window.location.origin}/api/subscribe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            /* if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || "Erreur serveur");
            } */

            const data = await res.json();

            if (res.ok && data.success) {
                setIsSubscribe(true);
                setEmail(email);
            }
            return data;
        } catch (error) {
            return { success: false, message: error.message || "Impossible de contacter le server" };
        } finally {
            setLoading(false);
        }
    };

    const handleDesabonnement = async (email) => {
        setLoading(true);

        try {
            const res = await fetch(`${window.location.origin}/api/unsubscribe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            /*  if (!res.ok) {
                 const errorData = await res.json().catch(() => ({}));
                 throw new Error(errorData.message || "Erreur serveur");
             } */

            const data = await res.json();

            if (data.success) {
                setIsSubscribe(false);
                setEmail("");
                localStorage.removeItem("email");
            }
            return data;
        } catch (error) {
            return { success: false, message: error.message || "Impossible de contacter le server" };
        } finally {
            setLoading(false);
        }
    };

    // Hydratation initiale
    useEffect(() => {
        const stored = localStorage.getItem("isSubscribe");
        const storedEmail = localStorage.getItem("email");

        if (stored === "true" && storedEmail) {
            setIsSubscribe(true);
            setEmail(storedEmail);
            fetchUserPhoto(storedEmail)
        }
    }, []);

    const fetchUserPhoto = async (emailToFetch) => {
        const targetEmail = emailToFetch || email;
        if (!targetEmail) return;

        setLoading(true);

        try {
            const res = await fetch(`${window.location.origin}/api/subscribe/photo/${encodeURIComponent(targetEmail)}`, {
                next: { revalidate: 1800 },
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setPhoto(data.photo);
            }
        } catch (error) {
            console.error("Erreur fetch photo:", error);
        } finally {
            setLoading(false);
        }
    };

    // Sauvegarde auto
    useEffect(() => {
        localStorage.setItem("isSubscribe", isSubscribe ? "true" : "false");
        if (email) {
            localStorage.setItem("email", email);
        } else if (!isSubscribe) {
            localStorage.removeItem("email");
        }
    }, [isSubscribe, email]);

    // Sync multi-onglets
    useEffect(() => {
        const sync = (e) => {
            if (e.key === "isSubscribe") setIsSubscribe(e.newValue === "true");
            if (e.key === "email") setEmail(e.newValue || "");
        };

        window.addEventListener("storage", sync);
        return () => window.removeEventListener("storage", sync);
    }, []);

    return (
        <SubscriptionContext.Provider
            value={{
                isSubscribe,
                email,
                setEmail,
                photo,
                loading,
                setLoading,
                setPhoto,
                handleAbonnement,
                handleDesabonnement,
                handleGoogleSubscription,
                handleGoogleUnSubscription,
                updatePhoto,
            }}
        >
            {children}
        </SubscriptionContext.Provider>
    );
}

export const useAbonner = () => useContext(SubscriptionContext);
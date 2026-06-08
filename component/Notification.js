'use client'

import { useState, useEffect } from 'react';
import { toast } from "react-hot-toast";

import { useTheme } from "@/context/useThemeProvider";

import { FaBell } from 'react-icons/fa';
import { HiXMark, HiBell } from 'react-icons/hi2';

// Fonction utilitaire pour déclencher une notification 
import { triggerNotification } from "@/utils/triggerNotification";

export function NotificationComponent() {

    const { isDark } = useTheme();

    const [hasAlert, setHasAlert] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [count, setCount] = useState(0);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        let intervalId;

        const handleVisibility = () => {
            if (document.visibilityState === "visible") {
                fetchNotifications();
                triggerNotification("Bienvenue sur JMD RestoConnect ! 🎉", "Vous avez activé les notifications.👋");
                intervalId = setInterval(fetchNotifications, 5000);
            } else {
                clearInterval(intervalId);
            }
        };

        handleVisibility();
        document.addEventListener("visibilitychange", handleVisibility);
        return () => {
            clearInterval(intervalId);
            document.removeEventListener("visibilitychange", handleVisibility);
        };
    }, []);

    const fetchNotifications = async () => {
        try {
            // Exemple statique, à remplacer par un vrai fetch API
            const fakeResponse = {
                count: 2,
                data: [
                    { id: 1, titre: "nouveau 1", date: "2026-06-01T10:30:00Z" },
                    { id: 2, titre: "nouveau 2", date: "2026-06-02T14:45:00Z" },
                ],
            };

            setNotifications(fakeResponse.data);
            setCount(fakeResponse.count);
            setHasAlert(fakeResponse.count > 0);
        } catch (error) {
            toast.error(error?.message || "Erreur lors du chargement des notifications");
        }
    };

    const handleMarkAsRead = () => {
        setNotifications([]);
        setCount(0);
        setHasAlert(false);
        toast.success("Toutes les notifications ont été marquées comme lues ✅");
    };

    const togglePopup = () => {
        if (hasAlert) setIsOpen(!isOpen);
    };

    const formatDate = (dateProps) => {
        const date = new Date(dateProps);
        return (
            date.getDate().toString().padStart(2, "0") +
            "/" +
            (date.getMonth() + 1).toString().padStart(2, "0") +
            "/" +
            date.getFullYear() +
            " " +
            date.getHours().toString().padStart(2, "0") +
            "h:" +
            date.getMinutes().toString().padStart(2, "0")
        );
    };

    return (
        <div className='relative top-0 lg:inline-block'>
            <div onClick={togglePopup} aria-label="Notifications" tabIndex={0} role='button'>
                <button type="button" className="relative p-1.5 text-amber-200 hover:text-amber-400 transition-colors cursor-pointer">
                    <span
                        className={`
              absolute top-0.5 right-1
              font-bold text-white text-[10px]
              px-1.5 py-0.5
              rounded-full
              ${count > 0 ? "bg-red-600" : "bg-gray-400"}
            `}
                    >
                        {count}
                    </span>
                    <FaBell size={25} className="text-amber-500" />
                </button>
            </div>

            {isOpen && (
                <div className={`absolute top-0 right-0 
                    ${isDark
                        ? "bg-zinc-900 text-white"
                        : "bg-white text-black"}
                z-50 w-85 sm:w-96 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-lg backdrop-blur-sm transition-all duration-200 animate-in fade-in slide-in-from-top-2`
                }
                >
                    {/* Header */}
                    <div className="flex justify-between items-center px-4 py-3.5 border-b border-slate-800 dark:border-slate-500/60">
                        <div className="flex items-center gap-2.5">
                            <div className="relative flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                            </div>
                            <h2 className="text-sm font-semibold tracking-tight flex items-center gap-1.5">
                                <HiBell className="text-slate-400 text-base" />
                                Notifications
                            </h2>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-slate-200 hover:text-slate-400 dark:hover:text-slate-200 rounded-lg p-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                            <HiXMark className="text-lg" />
                        </button>
                    </div>

                    {/* Liste */}
                    <div className="overflow-y-auto max-h-88 divide-y divide-slate-50 dark:divide-slate-800/40">
                        {notifications.length > 0 ? (
                            notifications.map((item) => (
                                <div key={item.id} className="group flex flex-col gap-1 p-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 cursor-pointer transition-colors duration-200">
                                    <div className="flex justify-between items-start gap-3">
                                        <h4 className="text-sm font-medium dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                                            {item.titre}
                                        </h4>
                                    </div>
                                    <span className="text-[11px] font-medium tracking-wide text-slate-500 dark:text-slate-400 uppercase">
                                        {formatDate(item.date)}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                                <p className="text-sm text-slate-400 dark:text-slate-500">Aucun nouveau message</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-2.5 border-t border-slate-100 dark:border-slate-800/60 text-center">
                        <button onClick={handleMarkAsRead} className="w-full py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                            Tout marquer comme lu
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

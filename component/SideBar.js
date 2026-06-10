'use client'

import { useState } from "react";
import Link from "next/link";
import CartPanier from "./CartPanier";
import { useTheme } from "@/context/useThemeProvider";
import { useUserHome } from "@/context/useHomeContext";
import ThemeToggle from "@/component/ui/ThemeToggle";
import { NotificationComponent } from "./Notification";
// ICONS
import { FiMenu, FiX, FiHome, FiClipboard, FiLayers, FiSettings, FiLogOut, FiUser } from 'react-icons/fi';

export const SideBarComponent = () => {
    const { isDark } = useTheme();
    const { user, isLoggedIn, handleLogout } = useUserHome();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { id: 1, label: "Accueil", href: "/", icon: <FiHome className="w-5 h-5" /> },/* 
        { id: 2, label: "Menus", href: "/menu", icon: <FiLayers className="w-5 h-5" /> },
        { id: 3, label: "Commandes", href: "/commande", icon: <FiClipboard className="w-5 h-5" /> }, */
        { id: 4, label: "Suivre la livraison", href: "/livraison", icon: <FiClipboard className="w-5 h-5" /> },
        { id: 5, label: "Reserver une table", href: "/reserver-table", icon: <FiLayers className="w-5 h-5" /> },
    ];

    return (
        <div className="relative p-1.5 antialiased">

            <div className={`flex gap-2 md:gap-3 px-4 py-1.5 items-center justify-between shadow-sm rounded-2xl border
                ${isDark
                    ? 'bg-slate-950 text-gray-50 border-slate-800'
                    : 'bg-slate-50 text-gray-700 border-slate-50'}`}
            >

                {!isLoggedIn ? (
                    <Link
                        href="/login"
                        className={`hidden md:flex justify-center items-center gap-2 md:px-2 py-2 rounded-xl text-center text-sm font-medium transition-colors duration-200
                            ${isDark
                                ? 'text-blue-50 dark:hover:bg-blue-300'
                                : 'text-blue-900 hover:bg-blue-50'}
                            `}
                    >
                        <FiUser size={16} className="shrink-0" />
                        <span className="shrink-0">Se connecter</span>
                    </Link>
                ) : (
                    <div className="flex items-center gap-2">
                        <div className={`flex items-center justify-center w-10 h-10 font-bold rounded-full
                             ${isDark
                                ? 'text-blue-800 bg-blue-50 dark:hover:bg-blue-300'
                                : 'text-blue-950 bg-slate-300 hover:bg-blue-50'}
                            `}>
                            {user?.email.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 dark:text-slate-700">Bienvenue,</p>
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-500">
                                {user?.email.replace('@gmail.com', '')}
                            </p>
                        </div>
                    </div>
                )}


                <CartPanier />
                <NotificationComponent />
                <div className="hidden md:flex">
                    <ThemeToggle />
                </div>

                <div className="flex flex-col items-center gap-1">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Menu"
                        className="flex md:hidden p-1.5 md:p-2 rounded-xl transition-all duration-200 active:scale-95 border
                            bg-slate-900 text-white border-slate-800 hover:bg-slate-800
                            dark:bg-amber-500 dark:text-slate-950 dark:border-amber-400 dark:hover:bg-amber-400
                            shadow-md shadow-slate-900/10 dark:shadow-amber-500/10"
                    >
                        {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsMenuOpen(false)}
                    />
                    <div className={`absolute right-2 top-24 z-20 w-80 rounded-2xl px-4 py-6 shadow-xl border backdrop-blur-md
                        ${isDark
                            ? 'bg-slate-900/95 text-slate-100 border-slate-800'
                            : 'bg-slate-50 text-gray-900 border-slate-300'}
                        animate-in fade-in slide-in-from-top-4 duration-200"
            `}>
                        {isLoggedIn && (
                            <>
                                <div className="flex flex-col justify-center items-center gap-2">
                                    <div className="flex items-center justify-center w-14 h-14 font-bold text-blue-500 bg-gray-100 rounded-full dark:bg-gray-200">
                                        {user?.email.charAt(0).toUpperCase()}j
                                    </div>

                                    <div className="text-center">
                                        <h3 className="text-md font-semibold text-slate-500 dark:text-slate-500">{user?.nom.charAt(0).toUpperCase() + user?.nom.slice(1)}</h3>
                                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-500">{user?.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center pt-6 pb-4 border-b border-gray-500">
                                    <Link
                                        href="/client"
                                        className="px-6 py-2 bg-amber-500 text-gray-50 rounded-xl"
                                    >
                                        Gérer mon compte
                                    </Link>
                                </div>
                            </>
                        )}


                        <div className="flex flex-col h-full justify-between gap-6 pt-2">

                            <ul className="space-y-2">
                                {menuItems.map((item) => (
                                    <li key={item.id}>
                                        <a
                                            href={item.href}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-colors
                                                text-slate-500 hover:text-amber-700 hover:bg-amber-50
                                                dark:hover:text-amber-400 dark:hover:bg-amber-950/40"
                                        >
                                            {item.icon}
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-3 border-t border-slate-100 dark:border-slate-400 space-y-3">
                                {!isLoggedIn ? (
                                    <div className="flex flex-col items-center justify-center gap-4 w-full px-3 py-2 rounded-xl text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/20 transition-colors">
                                        <Link
                                            href="/login"
                                            className="flex justify-center items-center gap-2 px-4 py-2 rounded-xl text-center text-sm font-medium text-blue-600 dark:text-blue-400 transition-colors duration-200"
                                        >
                                            <FiUser size={18} className="shrink-0" />
                                            <span className="shrink-0">Se connecter</span>
                                        </Link>
                                    </div>
                                ) : (
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center justify-center gap-4 w-full px-3 py-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-950/30 transition-colors">
                                        <FiLogOut className="w-5 h-5" />
                                        Déconnexion
                                    </button>
                                )}

                                <div className="text-center pt-1.5">
                                    <span className="text-[11px] font-semibold tracking-wider uppercase text-amber-600 dark:text-amber-500">
                                        JMD RestoConnect
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
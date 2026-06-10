'use client'

import { useEffect } from "react";
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";
import { useFormStore } from "@/stores/useFormStore";
import { useMenuStore } from "@/stores/useMenuStore";
import { SideBarComponent } from "./SideBar";
import { SearchButton } from "./ui/SearchButton";
import { useTheme } from "@/context/useThemeProvider";
// ICONS
import { BiFoodMenu } from 'react-icons/bi';
import { FaHome, } from 'react-icons/fa';
import { LuShoppingCart, LuTruck, LuCalendarDays } from "react-icons/lu";

export default function NavBarComponent() {
    const { isDark } = useTheme();
    const pathname = usePathname();

    const { searchQuery, setSearchQuery, setDebouncedSearch } = useMenuStore();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchQuery, setDebouncedSearch]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
    };

    // Récupération des actions Zustand
    const { activeForm, toggleForm } = useFormStore();

    /*  const navItems = [
         { href: "/", label: "Home", icon: <FaHome size={16} /> },
         // Ajout d'une propriété formId pour les liens qui déclenchent un formulaire
         { href: "/commande", label: "Commander", icon: <LuShoppingCart size={16} />, formId: "commande" },
         { href: "/livraison", label: "Livraison", icon: <LuTruck size={16} />, formId: "livraison" },
         { href: "/reservation", label: "Reserver", icon: <LuCalendarDays size={16} />, formId: "reservation" },
     ]; */

    const navItems = [
        { href: "/", label: "Home", icon: <FaHome size={16} />, type: "link" },
        { label: "Livraison", icon: <LuTruck size={16} />, formId: "livraison", type: "button" },
        { label: "Reserver", icon: <LuCalendarDays size={16} />, formId: "reservation", type: "button" },
    ];
    return (
        <div className={`fixed top-0 left-0 right-0 w-full flex justify-between items-center gap-x-2 md:gap-x-4 px-2 md:p-4 h-20 z-15 transition-colors duration-200
            ${isDark ? "bg-zinc-950 text-white" : "bg-white text-black border-b border-gray-100 shadow-sm"}`}
        >
            {/* Logo & Localisation */}
            <div className="flex items-center gap-x-4 shrink-0">
                <h1 className="text-gray-500 text-sm whitespace-nowrap">
                    <img src="vercel.svg" alt="logo" />
                    {/* <span className="text-[#f8c828] text-md font-bold">JMD</span>
                    <br /> RestoConnect */}
                </h1>
            </div>

            {/* Barre de recherche (Prend la place centrale disponible sans écraser le reste) */}
            <div className="flex-1 max-w-xs md:max-w-md mx-4">
                <SearchButton
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Liens de navigation */}
            <nav className="hidden md:flex gap-3 items-center">
                {navItems.map((item) => {
                    const isFormActive = activeForm === item.formId;
                    const isActive = (item.type === "link" && pathname === item.href) || isFormActive;

                    const className = `flex gap-2 px-4 py-2 rounded-xl items-center font-medium transition-all ${isActive ? "bg-amber-400 text-black font-semibold" : "bg-transparent hover:text-amber-500"
                        }`;

                    // SI C'EST UN VRAI LIEN
                    if (item.type === "link") {
                        return (
                            <Link key={item.href} href={item.href} className={className}>
                                {item.icon} {item.label}
                            </Link>
                        );
                    }

                    // SI C'EST UN BOUTON DE FORMULAIRE
                    return (
                        <button
                            key={item.formId}
                            type="button"
                            onClick={() => toggleForm(item.formId)}
                            className={className}
                        >
                            {item.icon} {item.label}
                        </button>
                    );
                })}
            </nav>

            {/*      <nav className="hidden md:flex gap-3 items-center">
                {navItems.map((item) => {
                    const isFormActive = activeForm === item.formId;

                    // Si l'élément a un formulaire, on peut bloquer ou enrichir le comportement du Link
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={(e) => {
                                if (item.formId) {
                                    e.preventDefault(); // Empêche la navigation si tu veux juste ouvrir le formulaire en modal
                                    toggleForm(item.formId);
                                }
                            }}
                            className={`flex gap-2 px-4 py-2 rounded-xl items-center font-medium transition-all
                                ${pathname === item.href || isFormActive
                                    ? "bg-amber-400 text-black font-semibold"
                                    : "bg-transparent hover:text-amber-500"
                                }`}
                        >
                            {item.icon} {item.label}
                        </Link>
                    );
                })}
            </nav>
 */}
            {/* Profil, Panier, Notifications, Menu Burger */}
            <div className="shrink-0">
                <SideBarComponent />
            </div>
        </div>
    );
}

'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AvisClient from "./avis/AvisClient";
import { useUserHome } from "@/context/useHomeContext";
import { motion, AnimatePresence } from 'framer-motion';
// ICONS
import { FiLogOut, FiUser } from 'react-icons/fi';
import {
    FaWhatsapp,
    FaFacebookF,
    FaTiktok,
    FaInstagram,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaClock,
    FaArrowUp
} from 'react-icons/fa';

export default function FooterComponent({ isPanelOpen, handleShowPanel }) {
    const image = "/plats/food.webp";

    const { isLoggedIn, handleLogout } = useUserHome();

    const socialLinks = [
        { icon: <FaWhatsapp size={22} />, href: "https://wa.me/243838120851", color: "hover:text-green-500" },
        { icon: <FaInstagram size={22} />, href: "https://www.instagram.com/jmd_group3", color: "hover:text-pink-500" },
        { icon: <FaFacebookF size={22} />, href: "https://www.facebook.com/profile.php?id=61581381020725", color: "hover:text-blue-500" },
        { icon: <FaTiktok size={22} />, href: "https://www.tiktok.com/@jmd_group3", color: "hover:text-red-500" },
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="w-full max-w-7xl mx-auto px-4 py-8 text-gray-300">

            {/* Section Bannière Haute */}
            <div className="relative min-h-[200px] p-8 md:p-12 w-full flex flex-col md:flex-row justify-between gap-6 items-center rounded-3xl overflow-hidden shadow-2xl group">

                {/* Image d'arrière-plan avec léger effet de zoom au survol */}
                <Image
                    src={image}
                    alt="Arrière-plan restaurant"
                    fill
                    priority
                    className="object-cover z-0 transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/75 z-10" />

                <div className="z-10 text-center md:text-left">
                    <h2 className="text-white font-serif font-bold text-3xl tracking-wide md:text-4xl">
                        JMD <span className="text-amber-400">RestoConnect</span>
                    </h2>
                    <p className="text-gray-300 text-sm mt-1 font-light tracking-wider hidden md:block">
                        Une expérience culinaire d'exception
                    </p>
                </div>

                <div className="z-10">
                    <p className="flex gap-2 items-center text-md font-medium text-gray-200 whitespace-nowrap bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                        <FaMapMarkerAlt className="text-amber-500 text-xl animate-bounce" />
                        Livraison à Kinshasa
                    </p>
                </div>
            </div>

            {/* NOUVELLE SECTION : Infos du Restaurant (Grille 3 colonnes) */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12 pb-8 border-b border-gray-800 text-sm">

                {/* Colonne 1 : Contact */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-white font-semibold text-base tracking-wide uppercase border-b border-amber-500/30 pb-2 w-fit">
                        Contactez-nous
                    </h3>
                    <p className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                        <FaPhoneAlt className="text-amber-500" />
                        <a href="tel:+243838120851">+243 838 120 851</a>
                    </p>
                    <p className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                        <FaEnvelope className="text-amber-500" />
                        <a href="mailto:contact@jmdgroup.com">contact@jmdgroup.com</a>
                    </p>
                    <p className="flex items-start gap-3 text-gray-400">
                        <FaMapMarkerAlt className="text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>Croisement des avenues, Gombe / Kinshasa, RDC</span>
                    </p>
                </div>

                {/* Colonne 2 : Horaires */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-white font-semibold text-base tracking-wide uppercase border-b border-amber-500/30 pb-2 w-fit">
                        Horaires d'ouverture
                    </h3>
                    <div className="flex items-start gap-3 text-gray-400">
                        <FaClock className="text-amber-500 mt-0.5" />
                        <div className="flex flex-col gap-1">
                            <p><span className="text-amber-400 font-medium">Lun - Ven :</span> 11h00 - 22h00</p>
                            <p><span className="text-amber-400 font-medium">Sam - Dim :</span> 12h00 - 23h30</p>
                        </div>
                    </div>
                </div>

                {/* Colonne 3 : Liens utiles ou zones */}
                <div className="flex flex-col gap-3">
                    <h3 className="text-white font-semibold text-base tracking-wide uppercase border-b border-amber-500/30 pb-2 w-fit">
                        Zones de livraison
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                        Gombe, Ngaliema, Kintambo, Lingwala, Limete et environs.
                        Commandez directement via le formulaire ou notre WhatsApp !
                    </p>
                </div>

            </div>

            {/* Section Basse : Avis, Réseaux Sociaux & Copyright */}
            <div className="m-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6 mt-6 pt-2">

                {/* Bouton Avis */}
                {/*  <div className="w-full md:w-auto flex justify-center md:justify-start">
                    <button
                        onClick={handleShowPanel}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-medium text-sm shadow-md hover:shadow-amber-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                    >
                        <span className="inline-block animate-pulse">✨</span> Votre avis nous intéresse
                    </button>

                    {isPanelOpen && (
                        <div className="fixed inset-0 flex p-4 items-center justify-center bg-black/70 backdrop-blur-sm z-50 animate-fade-in">
                            <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
                                <AvisClient handleShowPanel={handleShowPanel} />
                            </div>
                        </div>
                    )}
                </div> */}

                <div>
                    <p className="pb-6 text-gray-400">
                        Restez informez de nos derniers offre
                    </p>

                    {!isLoggedIn ? (
                        <div className="flex flex-col items-center justify-center gap-4 w-full px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-medium text-sm shadow-md hover:shadow-amber-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 whitespace-nowrap self-stretch sm:self-auto">
                            <Link
                                href="/login"
                                className="flex justify-center items-center gap-2 px-4 py-2 rounded-xl text-center text-sm font-medium text-white transition-colors duration-200"
                            >
                                <FiUser size={18} className="shrink-0" />
                                <span className="shrink-0">Se connecter</span>
                            </Link>
                        </div>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-4 w-full px-3 py-2 rounded-xl text-sm font-medium bg-red-400 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30 transition-colors">
                            <FiLogOut className="w-5 h-5" />
                            Déconnexion
                        </button>
                    )}
                </div>

                {/* Réseaux Sociaux */}
                <div className="flex gap-6 px-4 py-2 items-center justify-center rounded-xl">
                    {socialLinks.map((social, index) => (
                        <a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-gray-500 ${social.color} transition-colors duration-300`}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>

                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.5 }}
                    /*className="fixed bottom-8 right-6 z-50"*/
                    >
                        <button
                            onClick={scrollToTop}
                            className="p-3 rounded-md bg-amber-600 text-white shadow-xl shadow-sky-900/40 active:scale-90 transition-transform"
                            aria-label="Scroll to top"
                        >
                            <FaArrowUp />
                        </button>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex justify-center items-center mt-6 pt-4 border-t border-gray-800/60">
                <p className="text-xs tracking-wider text-gray-500 font-light">
                    © {new Date().getFullYear()} JMD RestoConnect | Tous droits réservés.
                </p>
            </div>

        </footer>
    );
}

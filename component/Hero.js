'use client'

import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaFacebookF, FaTiktok, FaInstagram, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';

export default function HeroComponent({ openOrderForm, openTableForm }) {
    const image = "/plats/food.webp";
    const image2 = "/plats/serveuse.jpeg";

    const socialLinks = [
        { icon: <FaWhatsapp size={22} />, href: "https://wa.me/243838120851", color: "hover:text-green-500" },
        { icon: <FaInstagram size={22} />, href: "https://www.instagram.com/jmd_group3", color: "hover:text-pink-500" },
        { icon: <FaFacebookF size={22} />, href: "https://www.facebook.com/profile.php?id=61581381020725", color: "hover:text-blue-500" },
        { icon: <FaTiktok size={22} />, href: "https://www.tiktok.com/@jmd_group3", color: "hover:text-red-500" },
    ];

    return (
        <div className="relative min-h-[420px] p-8 md:p-16 w-full flex flex-col md:flex-row justify-between gap-6 items-center rounded-3xl overflow-hidden shadow-2xl group">

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

                <p className="text-gray-200 text-sm mt-6 font-light tracking-wider hidden md:block">
                    Une expérience culinaire d'exception
                </p>

                <p className="max-w-md mt-2 text-gray-50">
                    Profitez de 20 % de réduction sur tous les fruits et légumes bio. Frais de la ferme, livrés directement chez vous.
                </p>

                <div className="relative top-5 max-w-xs flex gap-6 px-6 py-4.5 items-center justify-center rounded-xl bg-gray-50/10 hover:bg-gray-50/55">
                    {socialLinks.map((social, index) => (
                        <a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-gray-200 ${social.color} transition-colors duration-300`}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            </div>

            <div className="z-10">
                <p className="flex gap-2 items-center text-md font-medium text-gray-200 whitespace-nowrap bg-black/2 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/10">
                    <FaMapMarkerAlt className="text-amber-500 text-xl animate-bounce" />
                    Livraison à Kinshasa
                </p>
            </div>
        </div>
    )
}
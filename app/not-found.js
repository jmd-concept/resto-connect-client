"use client";

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="relative h-screen w-full flex items-center justify-center bg-gray-950 overflow-hidden">

            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-sky-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center text-center px-4">

                <h1 className="text-[10rem] text-gray-100 font-black leading-none text-transparent bg-gray-950 animate-pulse">
                    404
                </h1>

                <div className="mt-4 space-y-2">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Oups ! Page introuvable
                    </h2>
                    <p className="text-gray-400 text-lg max-w-md mx-auto">
                        Désolé, la page que vous recherchez semble avoir disparu dans le vide numérique.
                    </p>
                </div>

                <div className="mt-10">
                    <Link
                        href="/"
                        className="group relative px-8 py-3 font-semibold text-white transition-all duration-300 bg-red-600 rounded-full hover:bg-red-700 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] active:scale-95"
                    >
                        <span className="relative z-10">Retour à l'accueil</span>
                    </Link>
                </div>

                <Link href="https://wa.me/243838120851" className="mt-6 text-sm text-gray-500 hover:text-sky-400 transition-colors">
                    Signaler un problème
                </Link>
            </div>

            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        </div>
    );
}

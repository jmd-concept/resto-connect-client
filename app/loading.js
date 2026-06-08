"use client";

export default function Loading() {
    return (
        <div className="h-screen w-full bg-gray-50 flex flex-col items-center justify-center">
            <div className="relative flex items-center justify-center">
                {/* Spinner Extérieur (Bleu) */}
                <div className="w-24 h-24 border-4 border-gray-200 border-t-blue-950 rounded-full animate-spin" />

                {/* Spinner Intérieur (Rouge) - Position absolue pour être bien centré */}
                <div className="absolute w-12 h-12 border-4 border-transparent border-t-orange-600 rounded-full animate-spin-slow" />
            </div>

            <p className="mt-8 text-gray-500 font-medium tracking-wide animate-pulse">
                Chargement en cours...
            </p>
        </div>
    );
}

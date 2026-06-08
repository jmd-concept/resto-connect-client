'use client'

import SuiviLivreur from "../livraison/SuiviLivreur";
import useSuiviLivraison from "@/hooks/useSuiviLivraison";

export default function FormLivraison({ closeForm }) {
    const { livraison, loading } = useSuiviLivraison(1);

    if (loading) {
        return (
            <div className="bg-gray-800 p-6 rounded-xl text-center text-gray-300">
                <p className="animate-pulse">Chargement du suivi...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 p-6 rounded-xl w-full shadow-2xl border border-gray-700 flex flex-col gap-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                <h1 className="text-2xl font-bold text-gray-100">Suivi de livraison</h1>
                <button
                    onClick={closeForm}
                    type="button"
                    className="text-gray-400 hover:text-gray-100 p-1.5 rounded-lg hover:bg-gray-700 transition-all"
                    aria-label="Fermer"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <SuiviLivreur
                livraison={livraison}
                closeForm={closeForm}
            />
        </div>
    );
}
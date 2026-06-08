'use client';

import React from 'react';
import { useTheme } from "@/context/useThemeProvider";

import {
    FiClock,
    FiUserCheck,
    FiTruck,
    FiCheckCircle,
    FiAlertTriangle,
    FiPhone,
    FiMapPin,
    FiUser
} from 'react-icons/fi';
import { BiMailSend } from 'react-icons/bi';

// --- Configuration des étapes du Stepper ---
const STEPS = [
    { key: 'en_attente', label: 'En attente', icon: FiClock, desc: 'Recherche d\'un livreur disponibles' },
    { key: 'attribuee', label: 'Acceptée', icon: FiUserCheck, desc: 'Livreur en route vers le restaurant' },
    { key: 'en_route', label: 'En cours', icon: FiTruck, desc: 'Votre commande arrive chez vous' },
    { key: 'livree', label: 'Livrée', icon: FiCheckCircle, desc: 'Bon appétit !' },
];

export default function SuiviLivreur({ livraison, closeForm }) {
    const { status, Livreur, Commande, updatedAt } = livraison;

    const { isDark } = useTheme();

    // Calculer l'index actuel dans le processus de livraison
    const currentStepIndex = STEPS.findIndex(step => step.key === status);
    const isFailed = status === 'echouee';

    return (
        <div className={`
            ${isDark
                ? "bg-zinc-900 text-white"
                : "bg-white text-black"
            }
        "w-full max-w-5xl mx-auto rounded-3xl shadow-xl border border-stone-200 overflow-hidden text-stone-800`}>

            {/* En-tête de la carte */}
            <div className="bg-gradient-to-r from-stone-900 to-stone-800 p-6 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-stone-400">Suivi en direct 🚚</span>
                    <h2 className="text-2xl font-bold mt-1">Livraison #{livraison.id_livraison}</h2>
                    {Commande && <p className="text-sm text-stone-300">Commande associée : #{Commande.id_commande}</p>}
                </div>
                <div className="text-right">
                    <p className="text-xs text-stone-400">Dernière mise à jour</p>
                    <p className="text-sm font-medium">{new Date(updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>

                <button
                    onClick={closeForm}
                    type="button"
                    className="text-gray-50 hover:text-gray-100 p-1.5 rounded-lg hover:bg-gray-700 transition-all"
                    aria-label="Fermer"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="p-8">
                {/* --- LE STEPPER (Progression visuelle) --- */}
                {!isFailed ? (
                    <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4 mb-12">
                        {/* Ligne de progression en arrière-plan (Desktop) */}
                        <div className="hidden md:block absolute top-7 left-4 right-4 h-1 bg-stone-200 -z-10" />
                        <div
                            className="hidden md:block absolute top-7 left-4 h-1 bg-amber-500 transition-all duration-500 -z-10"
                            style={{ width: `${(currentStepIndex / (STEPS.length - 1)) * 100}%` }}
                        />

                        {STEPS.map((step, index) => {
                            const StepIcon = step.icon;
                            const isCompleted = index < currentStepIndex;
                            const isActive = index === currentStepIndex;

                            return (
                                <div key={step.key} className="flex md:flex-col items-center md:text-center gap-4 md:gap-2 flex-1 w-full">
                                    {/* Rond de l'étape */}
                                    <div className={`
                    w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all duration-300 shadow-md
                    ${isCompleted ? 'bg-amber-500 border-amber-100 text-white' : ''}
                    ${isActive ? 'bg-white border-amber-500 text-amber-500 animate-pulseScale' : ''}
                    ${!isCompleted && !isActive ? 'bg-stone-100 border-stone-200 text-stone-400' : ''}
                  `}>
                                        <StepIcon className="text-xl" />
                                    </div>

                                    {/* Textes de l'étape */}
                                    <div className="flex flex-col md:items-center">
                                        <p className={`font-semibold text-base ${isActive ? 'text-amber-600' : 'text-stone-700'}`}>
                                            {step.label}
                                        </p>
                                        <p className="text-xs text-stone-400 max-w-[150px] md:mx-auto">
                                            {isActive ? step.desc : ''}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* --- Alerte en cas d'échec de la livraison --- */
                    <div className="flex items-center gap-4 bg-red-50 border border-red-200 text-red-800 p-5 rounded-2xl mb-12">
                        <FiAlertTriangle className="text-3xl flex-shrink-0 text-red-500" />
                        <div>
                            <h3 className="font-bold text-lg">Livraison échouée</h3>
                            <p className="text-sm text-red-700">Un problème est survenu lors de la livraison. Veuillez contacter le support client.</p>
                        </div>
                    </div>
                )}

                <hr className="border-stone-200 my-8" />

                {/* --- DÉTAILS LIVREUR & ADRESSE --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Bloc Livreur */}
                    <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-4 flex items-center gap-2">
                            <FiUser className="text-sm" /> Votre Livreur
                        </h4>

                        {Livreur ? (
                            <div className="flex items-center gap-4">
                                <div className="p-1.5 w-12 h-12 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center font-bold text-xl uppercase">
                                    {Livreur.prenom ? Livreur.prenom[0] : ''}{Livreur.nom[0]}
                                </div>
                                <div>
                                    <p className="font-bold text-lg text-stone-800">
                                        {Livreur.prenom} {Livreur.nom}
                                    </p>

                                    <a
                                        href={`tel:${Livreur.email}`}
                                        className="inline-flex items-center gap-2 text-sm text-amber-600 font-semibold mt-1 hover:underline"
                                    >
                                        <BiMailSend className="text-xs" /> {Livreur.email}
                                    </a>

                                    {Livreur.telephone && (
                                        <a
                                            href={`tel:${Livreur.telephone}`}
                                            className="inline-flex items-center gap-2 text-sm text-amber-600 font-semibold mt-1 hover:underline"
                                        >
                                            <FiPhone className="text-xs" /> {Livreur.telephone}
                                        </a>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-stone-500 italic">En attente d'attribution d'un livreur...</p>
                        )}
                    </div>

                    {/* Bloc Adresse de livraison */}
                    <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100 flex flex-col justify-between">
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4 flex items-center gap-2">
                                <FiMapPin className="text-sm" /> Adresse de livraison
                            </h4>

                            <p className="text-stone-700 font-medium">
                                {Commande?.adresse_livraison || "Adresse non spécifiée"}
                            </p>
                        </div>

                        {/* Position GPRS si en cours de route */}
                        {status === 'en_route' && livraison.latitude && (
                            <div className="mt-2 text-xs text-amber-600 font-semibold flex items-center gap-1.5 bg-amber-50 px-3 py-5 rounded-lg w-max space-y-2">
                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                                Position GPS active ({livraison.latitude}, {livraison.longitude})
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}


/**
 * 
export default function SuiviPosition({ livraison }) {

    if (!livraison) return null;

    return (
        <div>
            <h2>Livraison # {livraison.id_livraison}</h2>
            <p>Statut : {livraison.status}</p>
            <p>Adresse : {livraison.Commande?.adresse_livraison}</p>

            <p>
                Livreur :
                {livraison.Livreur?.nom}
                {" "}
                {livraison.Livreur?.prenom}
            </p>

        </div>
    );
}
 */
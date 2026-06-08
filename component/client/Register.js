'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useUserHome } from '@/context/useHomeContext';

const Register = () => {
    const { user, error, isLoggedIn, handleSubmit } = useUserHome();
    const [formData, setFormData] = useState({
        nom: '', email: '', telephone: '', mot_de_passe: '', adresse: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-all duration-300">
            <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-2xl transition-all border border-gray-100 max-h-[90vh] overflow-y-auto">

                <div className="text-center mb-6">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Créer un compte
                    </h2>
                    <p className="mt-1.5 text-sm text-gray-500">
                        Rejoignez-nous en remplissant les informations ci-dessous
                    </p>
                </div>

                {error && (
                    <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 flex items-center gap-2">
                        <svg className="w-5 h-5 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                            Nom complet
                        </label>
                        <input
                            type="text"
                            name="nom"
                            placeholder="Nom complet"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 outline-none text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                            Adresse email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="nom@exemple.com"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 outline-none text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                            Téléphone
                        </label>
                        <input
                            type="tel"
                            name="telephone"
                            placeholder="06 12 34 56 78"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 outline-none text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            name="mot_de_passe"
                            placeholder="••••••••"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 outline-none text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                            Adresse de résidence
                        </label>
                        <input
                            type="text"
                            name="adresse"
                            placeholder="adresse"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 outline-none text-sm"
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <button
                            type="submit"
                            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-200 active:scale-[0.98] transition-all duration-150 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-200"
                        >
                            S'inscrire
                        </button>

                        <Link
                            href="/"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-c text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-200 active:scale-[0.98] transition-all duration-150 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-200"
                        >
                            Retour à l'acceuil
                        </Link>
                    </div>
                </form>

                <p className="mt-6 text-center text-xs text-gray-500">
                    Vous avez déjà un compte ?{' '}
                    <Link
                        href="/login"
                        className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors underline focus:outline-none">
                        Connectez-vous
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
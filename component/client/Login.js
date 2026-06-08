import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useUserHome } from '@/context/useHomeContext';

const Login = () => {
    const Navigation = useRouter();
    const { user, error, isLoggedIn, handleLogin } = useUserHome();
    const [formData, setFormData] = useState({ email: '', mot_de_passe: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Intercepter la soumission du formulaire
    const localHandleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        await handleLogin(formData); // Envoie l'état local contenant l'email et le mot de passe
    };

    // Redirection propre une fois connecté
    useEffect(() => {
        if (isLoggedIn) {
            Navigation.push("/");
        }
    }, [isLoggedIn, Navigation]);

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-all duration-300">
            <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 shadow-2xl transition-all border border-gray-100">

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        Ravi de vous revoir
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Connectez-vous à votre compte pour continuer
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 flex items-center gap-2">
                        <svg className="w-5 h-5 flex-shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                {/* On utilise la fonction locale ici */}
                <form onSubmit={localHandleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Adresse email
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                name="email"
                                value={formData.email} // Ajouté pour un meilleur contrôle du composant
                                placeholder="nom@exemple.com"
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 outline-none text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="text-sm font-semibold text-gray-700">
                                Mot de passe
                            </label>
                        </div>
                        <input
                            type="password"
                            name="mot_de_passe"
                            value={formData.mot_de_passe} // Ajouté pour un meilleur contrôle
                            placeholder="••••••••"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 bg-gray-50/50 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 outline-none text-sm"
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <button
                            type="submit"
                            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-200 active:scale-[0.98] transition-all duration-150 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-200"
                        >
                            Se connecter
                        </button>

                        <Link
                            href="/"
                            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-center text-white font-semibold py-3 px-4 rounded-xl shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-indigo-200 active:scale-[0.98] transition-all duration-150 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-200"
                        >
                            Retour à l'accueil
                        </Link>
                    </div>
                </form>

                <p className="mt-8 text-center text-xs text-gray-400">
                    En vous connectant, vous acceptez nos <a href="#" className="underline hover:text-gray-600">Conditions d'utilisation</a>.
                </p>
            </div>
        </div>
    );
};

export default Login;
'use client';

import React from 'react';
import Swal from 'sweetalert2';

export default function FormulaireReservation({ openTableForm }) {
    const handleSubmit = (event) => {
        event.preventDefault();

        const configs = {
            success: {
                title: 'Opération réussie',
                text: 'Les données ont été modifiées avec succès !',
                icon: 'success',
                confirmButtonColor: '#7cd1f9'
            },
        };

        Swal.fire(configs['success']);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm z-50 animate-fade-in">

            <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-2xl border border-gray-700">

                <div className='flex justify-between items-center mb-6'>
                    <h1 className="text-2xl font-bold text-gray-100">Formulaire de réservation</h1>

                    <button
                        onClick={openTableForm}
                        className="text-blue-50 rounded-2xl font-bold text-md shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="text-sm font-medium text-gray-300">
                            Nom :
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-3 py-2 bg-gray-700 text-gray-100 placeholder:text-gray-500 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Votre nom complet"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-sm font-medium text-gray-300">
                            Email :
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-3 py-2 bg-gray-700 text-gray-100 placeholder:text-gray-500 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="exemple@domaine.com"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="address" className="text-sm font-medium text-gray-300">
                            Adresse :
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            required
                            className="w-full px-3 py-2 bg-gray-700 text-gray-100 placeholder:text-gray-500 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="123 Rue de la Paix"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 shadow-md"
                    >
                        Passer la réservation
                    </button>
                </form>
            </div>
        </div>
    );
}
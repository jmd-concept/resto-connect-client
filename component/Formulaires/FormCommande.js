'use client';

import React from 'react';
import Swal from 'sweetalert2';
import { triggerNotification } from "@/utils/triggerNotification";
import { useFormStore } from "@/stores/useFormStore";
import { SocialLinks } from '../ui/SocialLinks';

export default function FormCommande() {
    const { closeForm } = useFormStore();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        Swal.fire({
            title: 'Traitement de votre commande...',
            text: 'Veuillez patienter.',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        try {
            if (triggerNotification) {
                triggerNotification({ type: 'order', data });
            }

            await Swal.fire({
                title: 'Opération réussie',
                text: 'Votre commande a été enregistrée avec succès !',
                icon: 'success',
                confirmButtonColor: '#3b82f6',
                confirmButtonText: 'Super !'
            });

            closeForm();
        } catch (error) {
            console.error("Erreur lors de la commande :", error);
            Swal.fire({
                title: 'Oups...',
                text: "Une erreur est survenue lors du traitement. Veuillez réessayer.",
                icon: 'error',
                confirmButtonColor: '#ef4444'
            });
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-xl w-full shadow-2xl border border-gray-700 flex flex-col gap-4">
            {/* En-tête */}
            <div className="flex justify-between items-center pb-2 border-b border-gray-700">
                <h1 className="text-2xl font-bold text-gray-100">Formulaire de commande</h1>
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

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                {['name', 'email', 'address'].map((field) => (
                    <div key={field} className="flex flex-col gap-1">
                        <label htmlFor={field} className="text-sm font-medium text-gray-300 capitalize">
                            {field === 'name' ? 'Nom :' : field === 'email' ? 'Email :' : 'Adresse :'}
                        </label>
                        <input
                            type={field === 'email' ? 'email' : 'text'}
                            id={field}
                            name={field}
                            required
                            className="w-full px-3 py-2 bg-gray-700 text-gray-100 placeholder:text-gray-500 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            placeholder={field === 'name' ? 'Votre nom complet' : field === 'email' ? 'exemple@domaine.com' : '123 Rue de la Paix'}
                        />
                    </div>
                ))}

                <button
                    type="submit"
                    className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                >
                    Passer la commande
                </button>
            </form>

            <SocialLinks />
        </div>
    );
}
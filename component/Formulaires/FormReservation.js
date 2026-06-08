'use client';

import React from 'react';
import Swal from 'sweetalert2';
import { FaWhatsapp } from 'react-icons/fa';
import { SocialLinks } from '../ui/SocialLinks';

export default function FormReservation({ closeForm }) {

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        const { name, email, address, guests, date, time, dish } = data;

        Swal.fire({
            title: 'Enregistrement...',
            text: 'Nous sauvegardons votre réservation.',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        try {
            const response = await fetch('/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    email,
                    address,
                    guests: parseInt(guests, 10),
                    date,
                    time,
                    dish
                }),
            });

            if (!response.ok) throw new Error("Erreur serveur");

            const phoneNumber = "243838120851";
            const message = `Bonjour JMD Group, je souhaite effectuer une réservation :\n\n` +
                `👤 *Nom :* ${name}\n` +
                `📧 *Email :* ${email}\n` +
                `📍 *Adresse :* ${address}\n` +
                `👥 *Nombre de personnes :* ${guests}\n` +
                `📅 *Date :* ${date}\n` +
                `🕒 *Heure :* ${time}\n` +
                `🍽️ *Choix du plat :* ${dish}`;

            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

            await Swal.fire({
                title: 'Réservation enregistrée !',
                text: 'Vous allez être redirigé vers WhatsApp pour finaliser votre confirmation.',
                icon: 'success',
                confirmButtonColor: '#3b82f6',
                confirmButtonText: 'Continuer vers WhatsApp'
            });

            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            closeForm(); // Correction ici : On ferme proprement via Zustand/Props passés

        } catch (error) {
            console.error("Erreur soumission formulaire:", error);
            Swal.fire({
                title: 'Oups...',
                text: "Une erreur est survenue lors de la sauvegarde. Veuillez réessayer.",
                icon: 'error',
                confirmButtonColor: '#ef4444'
            });
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-xl w-full shadow-2xl border border-gray-700 mx-auto">
            <div className='flex justify-between items-center mb-6 border-b border-gray-700 pb-2'>
                <h1 className="text-2xl font-bold text-gray-100">Formulaire de réservation</h1>
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

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Champs Standards */}
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
                            className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>
                ))}

                {/* Grid d'infos */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="guests" className="text-sm font-medium text-gray-300">Personnes :</label>
                        <input type="number" id="guests" name="guests" min="1" max="50" defaultValue="2" required className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="date" className="text-sm font-medium text-gray-300">Date :</label>
                        <input type="date" id="date" name="date" required className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="time" className="text-sm font-medium text-gray-300">Heure :</label>
                        <input type="time" id="time" name="time" required className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="dish" className="text-sm font-medium text-gray-300">Choix du plat :</label>
                        <select id="dish" name="dish" required className="w-full px-3 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                            <option value="">Sélectionnez...</option>
                            <option value="Menu Prestige">Menu Prestige</option>
                            <option value="Menu Découverte">Menu Découverte</option>
                            <option value="À la carte">À la carte</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                    <FaWhatsapp size={18} /> Réserver et envoyer sur WhatsApp
                </button>
            </form>

            <SocialLinks />
        </div>
    );
}
'use client';

import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiSave, FiX } from 'react-icons/fi';

export default function ProfileFormulaire({ initialData, isBlocked, onSave }) {
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState(initialData);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        const success = await onSave(form);
        if (success) {
            setMessage({ type: 'success', text: 'Profil mis à jour avec succès !' });
            setIsEditing(false);
        } else {
            setMessage({ type: 'error', text: 'Une erreur est survenue.' });
        }
    };

    return (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <FiUser className="text-stone-400" /> Informations du profil
                </h2>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        disabled={isBlocked}
                        className="flex items-center gap-2 text-sm font-semibold bg-stone-100 hover:bg-stone-200 disabled:opacity-50 px-4 py-2 rounded-xl transition"
                    >
                        <FiEdit2 size={14} /> Modifier
                    </button>
                ) : (
                    <button
                        onClick={() => { setIsEditing(false); setForm(initialData); }}
                        className="flex items-center gap-2 text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 px-4 py-2 rounded-xl transition"
                    >
                        <FiX size={14} /> Annuler
                    </button>
                )}
            </div>

            {message && (
                <div className={`p-4 rounded-xl mb-6 text-sm border ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-xs font-bold uppercase text-stone-400 mb-1.5">Nom complet</label>
                        <div className="relative">
                            <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                            <input type="text" name="nom" value={form.nom} onChange={handleChange} disabled={!isEditing} required className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white disabled:bg-stone-50 disabled:text-stone-500 transition" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase text-stone-400 mb-1.5">Téléphone</label>
                        <div className="relative">
                            <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                            <input type="tel" name="telephone" value={form.telephone} onChange={handleChange} disabled={!isEditing} className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white disabled:bg-stone-50 disabled:text-stone-500 transition" />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase text-stone-400 mb-1.5">Adresse Email</label>
                    <div className="relative">
                        <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input type="email" name="email" value={form.email} onChange={handleChange} disabled={!isEditing} className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white disabled:bg-stone-50 disabled:text-stone-500 transition" />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase text-stone-400 mb-1.5">Adresse de livraison par défaut</label>
                    <div className="relative">
                        <FiMapPin className="absolute left-3.5 top-4 text-stone-400" />
                        <textarea name="adresse" rows={3} value={form.adresse} onChange={handleChange} disabled={!isEditing} className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white disabled:bg-stone-50 disabled:text-stone-500 resize-none transition" />
                    </div>
                </div>

                {isEditing && (
                    <div className="flex justify-end pt-2">
                        <button type="submit" className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-md transition">
                            <FiSave size={16} /> Enregistrer
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}
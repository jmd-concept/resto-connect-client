'use client';

import React, { useState } from 'react';
import { FiShield, FiLock } from 'react-icons/fi';

export default function SecurityForm({ isBlocked, onSavePassword }) {
    const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (form.newPassword !== form.confirmPassword) {
            setMessage({ type: 'error', text: 'Les mots de passe ne correspondent pas.' });
            return;
        }

        const success = await onSavePassword(form);
        if (success) {
            setMessage({ type: 'success', text: 'Mot de passe modifié !' });
            setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } else {
            setMessage({ type: 'error', text: 'Une erreur est survenue.' });
        }
    };

    return (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-sm h-fit">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                <FiShield className="text-stone-400" /> Sécurité
            </h2>

            {message && (
                <div className={`p-4 rounded-xl mb-4 text-xs border ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {['currentPassword', 'newPassword', 'confirmPassword'].map((field) => (
                    <div key={field}>
                        <label className="block text-xs font-bold uppercase text-stone-400 mb-1.5">
                            {field === 'currentPassword' ? 'Mot de passe actuel' : field === 'newPassword' ? 'Nouveau mot de passe' : 'Confirmer le mot de passe'}
                        </label>
                        <div className="relative">
                            <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                            <input
                                type="password"
                                name={field}
                                value={(form)[field]}
                                onChange={handleChange}
                                required
                                disabled={isBlocked}
                                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white disabled:bg-stone-100 transition text-sm"
                            />
                        </div>
                    </div>
                ))}

                <button type="submit" disabled={isBlocked} className="w-full mt-2 bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-800 disabled:opacity-50 font-semibold py-2.5 px-4 rounded-xl text-sm transition duration-300">
                    Mettre à jour le mot de passe
                </button>
            </form>
        </div>
    );
}
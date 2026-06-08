'use client';

import React from 'react';
import { FiCheckCircle, FiAlertOctagon } from 'react-icons/fi';

export default function ProfileHeader({ id_client, nom, statut, createdAt }) {

    const renderStatusBadge = (currentStatus) => {
        const config = {
            actif: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: FiCheckCircle, text: 'Compte Actif' },
            inactif: { bg: 'bg-amber-50 text-amber-700 border-amber-200', icon: FiAlertOctagon, text: 'Compte Inactif' },
            bloque: { bg: 'bg-rose-50 text-rose-700 border-rose-200', icon: FiAlertOctagon, text: 'Compte Bloqué' },
        }[currentStatus] || { bg: 'bg-stone-50 text-stone-700 border-stone-200', icon: FiCheckCircle, text: currentStatus };

        const Icon = config.icon;
        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${config.bg}`}>
                <Icon />
                {config.text}
            </span>
        );
    };

    return (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
                <div className="w-16 h-16 bg-stone-900 text-white font-bold text-2xl rounded-2xl flex items-center justify-center uppercase shadow-inner">
                    {nom.slice(0, 2)}
                </div>
                <div>
                    <h1 className="text-2xl font-bold">{nom}</h1>
                    <p className="text-sm text-stone-400">
                        Client n° {id_client} • Membre depuis le {new Date(createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>
            <div>
                {renderStatusBadge(statut)}
            </div>
        </div>
    );
}
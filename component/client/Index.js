'use client';

import React from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileForm from './ProfileFormulaire';
import SecurityForm from './ProfileSecurite';

export default function GestionCompte({ client, onUpdateProfile, onUpdatePassword }) {
    const isBlocked = client.statut === 'bloque';

    const profileInitialData = {
        nom: client.nom,
        email: client.email || '',
        telephone: client.telephone || '',
        adresse: client.adresse || '',
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8 space-y-8 text-stone-800">

            <ProfileHeader
                id_client={client.id_client}
                nom={client.nom}
                statut={client.statut}
                createdAt={client.createdAt}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2">
                    <ProfileForm
                        initialData={profileInitialData}
                        isBlocked={isBlocked}
                        onSave={onUpdateProfile}
                    />
                </div>

                <div>
                    <SecurityForm
                        isBlocked={isBlocked}
                        onSavePassword={onUpdatePassword}
                    />
                </div>

            </div>
        </div>
    );
}
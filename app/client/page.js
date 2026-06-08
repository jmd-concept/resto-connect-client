'use client'

import GestionCompte from "@/component/client/Index";

export default function AccountPage() {
    const mockClient = {
        id_client: 341,
        nom: 'Sarah Benali',
        email: 'sarah.benali@example.com',
        telephone: '+33 6 99 88 77 66',
        adresse: '42 Rue de la Paix, 75002 Paris',
        statut: 'actif', // Essayer : 'actif', 'inactif', 'bloque'
        createdAt: '2025-01-15T10:30:00.000Z'
    };

    const handleUpdateProfile = async (formData) => {
        console.log("Données envoyées au backend :", formData);
        // ex: await fetch('/api/account/update-profile', { method: 'POST', body: JSON.stringify(formData) })
        return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
    };

    // Logique d'appel vers l'API de changement de mot de passe (Sequelize: validation + bcrypt)
    const handleUpdatePassword = async (passwordData) => {
        console.log("Changement de mot de passe demandé :", passwordData);
        return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
    };

    return (
        <div className="min-h-screen pt-22">
            <GestionCompte
                client={mockClient}
                onUpdateProfile={handleUpdateProfile}
                onUpdatePassword={handleUpdatePassword}
            />
        </div>
    );
}
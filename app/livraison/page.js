'use client'

import SuiviLivreur from "@/component/livraison/SuiviLivreur";
import UpdatePositionLivreur from "@/component/livraison/UpdatePositionLivreur";
import SuiviLivraisonGoogle from "@/component/livraison/SuiviLivraisonGoogle";
import SuiviLivraisonLeaflet from "@/component/livraison/SuiviLivraisonLeaflet";
import useSuiviLivraison from "@/hooks/useSuiviLivraison";

const mockLivraison = {
    id_livraison: 1,
    status: 'en_route',
    latitude: 48.8566,
    longitude: 2.3522,
    updatedAt: new Date().toISOString(),
    Commande: {
        id_commande: 1024,
        adresse_livraison: '12 Avenue des Champs-Élysées, 75008 Paris',
        total: '45.50'
    },
    Livreur: {
        nom: 'ATende',
        prenom: 'Robert',
        telephone: '+33 6 12 34 56 78',
        statut: 'occupe'
    }
};

export default function PageSuivi() {
    const { livraison, position, loading } = useSuiviLivraison(1);

    if (loading) {
        return (
            <p>
                Chargement...
            </p>
        );
    }

    return (
        <div className="min-h-screen pt-6 px-6 flex items-center justify-center gap-8">
            <UpdatePositionLivreur
                livraison={livraison.id_livraison}
            />

            <SuiviLivreur
                livraison={livraison}
            />

            {/*  <SuiviLivraisonGoogle
                position={position}
                livraison={livraison}
            /> */}

            <SuiviLivraisonLeaflet
                position={position}
                livraison={livraison}
            />
        </div>
    );
}
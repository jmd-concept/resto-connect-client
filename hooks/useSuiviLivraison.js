"use client";

import { useEffect, useState } from "react";
import socket from "@/lib/socket.service";
import livraisonService from "@/lib/livraison.service";

export default function useSuiviLivraison(idLivraison) {
    const [livraison, setLivraison] = useState(null);
    const [position, setPosition] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const interval = setInterval(async () => {
            chargerLivraison();
        }, 5000);

        return () => clearInterval(interval);

    }, [idLivraison]);

    const chargerLivraison = async () => {
        try {
            setLoading(true);

            const data = await livraisonService.getLivraisonById(idLivraison);
            const livraisonData = data.livraison || data;

            setLivraison(livraisonData);

            setPosition({
                lat: Number(livraisonData.latitude),
                lng: Number(livraisonData.longitude)
            });

        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        socket.on("position_update", (data) => {
            if (Number(data.id_livraison) !== Number(idLivraison)) {
                return;
            }

            setPosition({
                lat: Number(data.latitude),
                lng: Number(data.longitude)
            });

            setLivraison((prev) => ({
                ...prev,
                latitude: data.latitude,
                longitude: data.longitude,
                status: data.status
            })
            );
        }
        );

        return () => {
            socket.off("position_update");
        };

    }, [idLivraison]);

    return {
        livraison,
        position,
        loading,
        error
    };
}
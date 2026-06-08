
"use client";

import { useEffect, useRef } from "react";
import serviceLivraison from "@/lib/livraison.service";

/**
 * 
 * A mettre dans le portail livreur
 *
 */

export default function UpdatePositionLivreur({ idLivraison }) {
    //Pour éviter les petite déplacement
    const lastPosition = useRef(null);

    useEffect(() => {

        if (!navigator.geolocation) {
            console.error("Géolocalisation non supportée ou Veillez l'activé");
            return;
        }

        const watchId = navigator.geolocation.watchPosition(async (position) => {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            if (
                lastPosition.current &&
                Math.abs(latitude - lastPosition.current.latitude) < 0.00005 &&
                Math.abs(longitude - lastPosition.current.longitude) < 0.00005
            ) {
                return;
            }

            lastPosition.current = {
                latitude,
                longitude
            };

            await serviceLivraison.updatePosition(
                idLivraison,
                latitude,
                longitude
            );
        },
            (error) => {
                console.error(error);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 5000,
                timeout: 10000,
            }
        );

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };

    }, [idLivraison]);

    return null;
}


/**
 * const lat = Number(latitude);
const lng = Number(longitude);

if (isNaN(lat) || isNaN(lng)) {
    return res.status(400).json({
        success: false,
        message: "Coordonnées invalides"
    });
}


await livraison.update({
    latitude: lat,
    longitude: lng
});
 */
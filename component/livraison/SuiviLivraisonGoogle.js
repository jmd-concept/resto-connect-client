"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export default function SuiviLivraisonGoogle({ position }) {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    if (!position) return null;

    return (
        <>
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={{
                        width: "100%",
                        height: "500px",
                    }}
                    center={position}
                    zoom={15}
                >
                    <Marker position={position} />
                </GoogleMap>
            )}
        </>
    );
}




/* const [position, setPosition] =
useState({
    lat: -4.325,
    lng: 15.322
});

const [livraisons, setLivraisons] =
useState([]);

const { isLoaded } =
useJsApiLoader({
    googleMapsApiKey:
        process.env
            .NEXT_PUBLIC_GOOGLE_MAPS_KEY
});

useEffect(() => {
const socket = io(process.env.NEXT_PUBLIC_API_URL);

socket.on("position_update", (data) => {
    const nouvellePosition = {
        lat: Number(data.latitude),
        lng: Number(data.longitude)
    };

    setPosition(nouvellePosition);

    setLivraisons(
        (prev) => {
            const autres = prev.filter(item => item.id_livraison !== data.id_livraison);

            return [
                ...autres,
                data
            ];
        }
    );
}
);

return () => {
    socket.disconnect();
};

}, []);

if (!isLoaded) {
return (
    <p>Chargement carte...</p>
);
}
*/











/* import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5003");

export default function SuiviLivraison() {
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        socket.on("position_update", (data) => {
            setPositions((prev) => [...prev, data]);
        });

        return () => {
            socket.off("position_update");
        };
    }, []);

    return (
        <div>
            <h2>Suivi en temps réel 🚚</h2>
            <ul>
                {positions.map((pos, i) => (
                    <li key={i}>
                        Livraison {pos.id_livraison} → Lat: {pos.latitude}, Lng: {pos.longitude}, Status: {pos.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}
 */
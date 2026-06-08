"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(
    () => import("./LeafletMap"),
    {
        ssr: false,
        loading: () => <p>Chargement de la carte...</p>,
    }
);

export default function SuiviLivraisonLeaflet({ position }) {
    return <LeafletMap position={position} />;
}

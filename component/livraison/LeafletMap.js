"use client";

import { useEffect } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

//MARKER DE Position
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function RecenterMap({ position }) {
    const map = useMap();

    useEffect(() => {
        map.setView(position);
    }, [position, map]);

    return null;
}

export default function LeafletMap({ position }) {
    if (!position) return null;

    return (
        <MapContainer
            center={position}
            zoom={15}
            style={{
                height: "530px",
                width: "65%",
                border: "4px solid gray",
                borderRadius: "25px",
                zIndex: 10
            }}
        >
            <RecenterMap position={position} />

            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position}>
                <Popup>Livreur 🚚</Popup>
            </Marker>
        </MapContainer>
    );
}



/* const [position, setPosition] = useState([-4.325, 15.322]);
const [livraisons, setLivraisons] = useState([]);

useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL);

    socket.on("position_update", (data) => {

        const nouvellePosition = [
            Number(data.latitude),
            Number(data.longitude)
        ];

        setPosition(nouvellePosition);

        setLivraisons((prev) => {
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
*/
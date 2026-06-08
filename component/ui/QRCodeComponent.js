"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import jsQR from "jsqr";
//ICONS
import { FaQrcode } from 'react-icons/fa';

const isProd = process.env.NODE_ENV === "production";

/**
 * app/
└── verifier/
    └── [id]/
        └── page.jsx  <-- Votre VerifierPage se trouve ici
 */
export const QRCodeComponent = ({ url = "" }) => {
    const [codeSecret, setCodeSecret] = useState("");
    const [isUrl, setIsUrl] = useState("");
    const [isQROpen, setIsQROpen] = useState(false);

    useEffect(() => {
        setIsUrl(isProd ? `${process.env.NEXT_PUBLIC_PROD_FRONTEND}/pages/verifier/` : `${process.env.NEXT_PUBLIC_DEV_FRONTEND}/pages/verifier/`)
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setCodeSecret(window.crypto.randomUUID());
        }
    }, []);

    const toggleQRCode = () => setIsQROpen(isQROpen => !isQROpen);

    return (
        <div>
            <button
                onClick={toggleQRCode}
                className="flex flex-col justify-center items-center gap-1 px-2.5 py-3 text-[11px] border border-gray-200 rounded-md"
            >
                <FaQrcode size={28} />
                {/* <span>QRCode</span> */}
            </button>


            {isQROpen &&
                <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm gap-8 z-50">

                    <button
                        onClick={toggleQRCode}
                        className="flex flex-col justify-center items-center gap-1 px-4 py-2 text-[11px] border border-gray-200 rounded-md"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="p-2 rounded-xl bg-white max-w-sm w-full mx-4 shadow-xl">
                        <div
                            className="p-4 bg-white flex flex-col items-center justify-center relative border border-slate-200 rounded-2xl"
                            style={{
                                backgroundImage: "radial-gradient(#f8fafc 1px, transparent 1px)",
                                backgroundSize: "8px 8px"
                            }}
                        >
                            {/* Coins esthétiques style scanner de sécurité */}
                            <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-sky-500 rounded-tl" />
                            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-sky-500 rounded-tr" />
                            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-sky-500 rounded-bl" />
                            <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-sky-500 rounded-br" />

                            {codeSecret ? (
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&color=0c4a6e&bgcolor=ffffff&qzone=1&data=${encodeURIComponent(
                                        `${isUrl}?secret=${codeSecret}`
                                    )}`}
                                    alt="QR Code Sécurisé"
                                    className="transition-transform duration-300 hover:scale-105 w-32 h-32 object-contain mix-blend-multiply"
                                />
                            ) : (
                                <div className="w-32 h-32 flex items-center justify-center text-xs text-gray-400">
                                    Génération...
                                </div>
                            )}
                        </div>

                        <div className="m-4 text-center text-gray-400 font-bold text-sm">OU</div>

                        {/* On passe le codeSecret pour que le scanner puisse l'injecter au besoin */}
                        <QRScannerMenu codeSecret={codeSecret} />
                    </div>
                </div>
            }
        </div>
    );
};

export const QRScannerMenu = ({ message, codeSecret }) => {
    const router = useRouter();
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [scanResult, setScanResult] = useState("Alignez le QR Code du menu...");
    const isScanning = useRef(true);

    useEffect(() => {
        let stream;
        let animationFrameId;

        const startCamera = async () => {
            try {
                if (typeof window === "undefined" || !navigator.mediaDevices) {
                    setScanResult("Caméra non supportée par votre navigateur");
                    return;
                }

                stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: { ideal: "environment" } },
                    audio: false
                });

                const video = videoRef.current;
                if (!video) return;

                video.srcObject = stream;
                video.onloadedmetadata = async () => {
                    try {
                        await video.play();
                        animationFrameId = requestAnimationFrame(scanQR);
                    } catch (err) {
                        console.error("Erreur play :", err);
                    }
                };
            } catch (err) {
                console.error("Erreur caméra :", err);
                setScanResult("Accès caméra refusé ou indisponible");
            }
        };

        startCamera();

        function scanQR() {
            const video = videoRef.current;
            const canvas = canvasRef.current;

            if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
                const context = canvas.getContext("2d");

                if (context) {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);

                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height);

                    if (code && isScanning.current) {
                        isScanning.current = false;
                        const scannedData = code.data;

                        try {
                            // Vérifie si la donnée scannée est un URL valide
                            if (scannedData.startsWith("http://") || scannedData.startsWith("https://")) {
                                const urlObj = new URL(scannedData);

                                // Si c'est le même domaine, on fait une navigation interne fluide
                                if (urlObj.hostname === window.location.hostname) {
                                    router.push(`${urlObj.pathname}${urlObj.search}`);
                                } else {
                                    window.location.href = scannedData;
                                }
                            } else {
                                // Fallback : Redirection vers la page de vérification avec l'ID (scannedData)
                                // et transmission du secret via les Query Params si nécessaire
                                router.push(`/pages/verifier/${encodeURIComponent(scannedData)}?secret=${codeSecret}`);
                            }
                        } catch (e) {
                            setScanResult("Format de QR Code invalide");
                            isScanning.current = true; // Permet de re-scanner
                        }
                        return;
                    }
                }
            }

            if (isScanning.current) {
                animationFrameId = requestAnimationFrame(scanQR);
            }
        }

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [router, codeSecret]);

    return (
        <div className="flex flex-col items-center justify-center bg-neutral-900 text-white p-4 rounded-b-xl">
            <div className="text-center mb-4">
                <h1 className="text-xl font-bold tracking-tight">Scanner le QR Code</h1>
                <p className="text-neutral-400 text-xs mt-1">{message || "Pour afficher la carte et le menu"}</p>
            </div>

            <div className="relative w-full max-w-[240px] aspect-square bg-black rounded-2xl overflow-hidden shadow-2xl border border-neutral-800">
                <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
                <canvas ref={canvasRef} className="hidden" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-40 h-40 border-2 border-dashed border-sky-400 rounded-2xl opacity-70 animate-pulse" />
                </div>
            </div>

            <div className="mt-4 px-4 py-2 bg-neutral-800 rounded-full border border-neutral-700 w-full max-w-[240px] text-center shadow-lg">
                <p className="text-xs font-medium text-neutral-300 truncate">
                    {scanResult}
                </p>
            </div>
        </div>
    );
};
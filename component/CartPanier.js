'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import usePanierStore from "@/stores/usePanierStore";
import { useTheme } from "@/context/useThemeProvider";

export default function CartPanier({ onCheckout }) {

    const { isDark } = useTheme();

    const cart = usePanierStore((state) => state.cart);
    const totalPrix = usePanierStore((state) => state.totalPrix);
    const clearCart = usePanierStore((state) => state.clearCart);
    const removeFromCart = usePanierStore((state) => state.removeFromCart);
    const incrementQuantity = usePanierStore((state) => state.incrementQuantity);
    const decrementQuantity = usePanierStore((state) => state.decrementQuantity);

    //Livraison
    const seuilLivraisonGratuite = 50;
    const restePourLivraisonGratuite = seuilLivraisonGratuite - totalPrix;

    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleTogglePanel = () => {
        setIsCartOpen(prev => !prev);
    };

    const totalArticlesCount = cart.reduce((total, item) => total + (item.quantite || 0), 0);

    const handleCheckout = () => {
        if (onCheckout) onCheckout();
        setIsCartOpen(false); // Ferme automatiquement le panneau après action
    };

    return (
        <>
            <button
                onClick={handleTogglePanel}
                className="relative p-2 text-amber-500 hover:text-amber-400 transition-colors focus:outline-hidden"
                aria-label="Ouvrir le panier"
            >
                <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>

                {totalArticlesCount > 0 && (
                    <span className="absolute top-1 right-0 bg-red-500 text-white text-[8px] md:text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce shadow-md">
                        {totalArticlesCount}
                    </span>
                )}
            </button>

            {isCartOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-[0.5px] transition-opacity"
                        onClick={handleTogglePanel}
                    />

                    <div className={`fixed right-0 top-0 z-50 w-full max-w-lg h-screen shadow-2xl p-3 flex flex-col animate-in slide-in-from-right duration-300
                        ${isDark
                            ? "bg-gray-950 text-gray-50"
                            : "bg-slate-100 text-gray-700"}
                        `}>

                        {/* En-tête */}
                        <div className='flex justify-between items-center border-b border-slate-200 pb-4 mb-4'>
                            <h2 className="px-2 text-2xl font-bold text-amber-600 flex items-center gap-2">
                                🛒 Votre panier ({totalArticlesCount})
                            </h2>

                            <button
                                onClick={handleTogglePanel}
                                className="text-slate-500 hover:text-amber-900 transition-colors p-1"
                                aria-label="Fermer le panier"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-2 px-4">
                            {cart.length ? (
                                <>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-semibold text-slate-500">
                                            {cart.length} référence{cart.length > 1 ? 's' : ''} distincte{cart.length > 1 ? 's' : ''}
                                        </span>
                                        <button
                                            onClick={clearCart}
                                            className="text-red-500 hover:text-red-600 font-bold text-sm transition-all p-1 hover:underline"
                                        >
                                            Réinitialiser le panier
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {cart.map((item) => (
                                            <div
                                                key={item.id_produit}
                                                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                                            >
                                                {/* Section Gauche : Image + Infos Produit */}
                                                <div className="flex items-center gap-3.5 w-full sm:w-auto min-w-0">
                                                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0 border border-slate-100">
                                                        <Image
                                                            src={item.image || "/images/default-food.jpg"}
                                                            alt={item.nom}
                                                            fill
                                                            className="object-cover"
                                                            sizes="80px"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <h4 className="font-semibold text-sm text-slate-800 truncate max-w-[180px] sm:max-w-[220px]">
                                                            {item.nom}
                                                        </h4>
                                                        <p className="text-xs text-slate-400 mt-0.5">
                                                            {Number(item.prix_unitaire || 0).toFixed(2)} $ / unité
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t border-slate-50 sm:border-none">

                                                    <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl p-1 gap-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => decrementQuantity(item.id_produit)}
                                                            className="w-7 h-7 flex items-center justify-center font-medium text-slate-600 rounded-lg hover:bg-white hover:shadow-xs active:scale-95 transition-all text-base"
                                                        >
                                                            −
                                                        </button>
                                                        <span className="font-semibold min-w-[28px] text-center text-xs text-slate-800">
                                                            {item.quantite}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => incrementQuantity(item.id_produit)}
                                                            className="w-7 h-7 flex items-center justify-center font-medium text-slate-600 rounded-lg hover:bg-white hover:shadow-xs active:scale-95 transition-all text-base"
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <div className="flex items-center gap-2 ml-auto sm:ml-0">
                                                        <div className="text-right">
                                                            <p className="text-sm font-bold text-slate-900">
                                                                {(Number(item.prix_unitaire || 0) * item.quantite).toFixed(2)} $
                                                            </p>
                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={() => removeFromCart(item.id_produit)}
                                                            className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all duration-200"
                                                            aria-label="Supprimer le produit"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <p className='text-center py-18 text-sm text-gray-500'>
                                    Veillez selectionez les plats dont vous avez besoin
                                </p>
                            )}
                        </div>

                        <div className="mt-auto px-2 py-2 border-t border-slate-300">
                            {cart.length === 0 ? (
                                <button
                                    disabled
                                    className="flex justify-center w-full py-4 px-6 bg-slate-200 text-slate-400 rounded-2xl font-black cursor-not-allowed opacity-60"
                                >
                                    PASSEZ LA COMMANDE
                                </button>
                            ) : (
                                <>
                                    <div className="flex justify-between text-xl font-bold mb-3">
                                        <span>Total :</span>
                                        <span className="text-amber-500">
                                            {Number(totalPrix || 0).toFixed(2)} $
                                        </span>
                                    </div>

                                    <div className="mb-5 p-3 rounded-xl text-sm transition-all text-center font-medium bg-slate-50 border border-slate-200">
                                        {restePourLivraisonGratuite > 0 ? (
                                            <p className="text-slate-600">
                                                Ajoutez <span className="text-amber-600 font-bold">{restePourLivraisonGratuite.toFixed(2)} $</span> de plus pour bénéficier de la <span className="font-bold text-green-600">livraison gratuite</span> !
                                            </p>
                                        ) : (
                                            <p className="text-green-600 flex items-center justify-center gap-1.5 font-bold">
                                                🎉 Félicitations ! La livraison vous est offerte gratuitement.
                                            </p>
                                        )}
                                    </div>

                                    <Link
                                        href="/paiement"
                                        className="flex justify-center w-full py-4 px-6 bg-green-600 hover:bg-green-800 rounded-2xl font-black transition-all"
                                    >
                                        PASSEZ LA COMMANDE
                                    </Link>
                                </>
                            )}
                        </div>
                    </div >
                </>
            )
            }
        </>
    );
}
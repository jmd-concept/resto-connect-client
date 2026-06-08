'use client'

import { useMemo } from "react";
import Image from "next/image";
import { useTheme } from "@/context/useThemeProvider";
import usePanierStore from "@/stores/usePanierStore";

export default function CardFood({ produit = {} }) {

    const { isDark } = useTheme();

    const cart = usePanierStore((state) => state.cart);
    const addToCart = usePanierStore((state) => state.addToCart);
    const incrementQuantity = usePanierStore((state) => state.incrementQuantity);
    const decrementQuantity = usePanierStore((state) => state.decrementQuantity);

    const isAvailable = produit.status;

    const quantiteProduit = useMemo(() => {
        const cartItem = cart.find((item) => item.id_produit === produit.id_produit);
        return cartItem?.quantite || 0;
    }, [cart, produit.id_produit]);

    const { prixDeBase, prixPromo, hasPromo, prixAffichage, pourcentagePromo } = useMemo(() => {
        const base = Number(produit.prix_unitaire || 0);
        const promo = produit.prix_promo ? Number(produit.prix_promo) : 0;
        const isPromoValid = promo > 0 && promo < base;

        return {
            prixDeBase: base,
            prixPromo: promo,
            hasPromo: isPromoValid,
            prixAffichage: isPromoValid ? promo : base,
            pourcentagePromo: isPromoValid ? (((base - promo) / base) * 100).toFixed(0) : "0"
        };
    }, [produit.prix_unitaire, produit.prix_promo]);

    const handleAddToCartClick = () => {
        if (!isAvailable) return;
        addToCart({
            ...produit,
            prix_unitaire: prixAffichage
        });
    };

    return (
        <div className={`group relative flex flex-col rounded-3xl p-4 shadow-xs hover:shadow-2xl hover:shadow-zinc-200/50 dark:hover:shadow-none transition-all duration-300 hover:-translate-y-1.5
        ${isDark
                ? "dark:bg-zinc-900 border dark:border-zinc-800/80"
                : "bg-white border border-zinc-100"
            }`}>

            {/* Conteneur Image avec Badge */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-800 mb-4">
                <Image
                    src={produit.image || "/images/default-food.jpg"}
                    alt={produit.nom || "Produit"}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Badge optionnel (Promo ou Indisponible) */}
                {hasPromo && (
                    <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md">
                        -{pourcentagePromo}%
                    </span>
                )}
                {!isAvailable && (
                    <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-xs flex items-center justify-center">
                        <span className="bg-white/90 text-zinc-900 text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs">
                            Épuisé
                        </span>
                    </div>
                )}
            </div>

            {/* Infos Produit */}
            <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                    <h3 className="text-zinc-200 dark:text-zinc-400 font-semibold text-base tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors line-clamp-1">
                        {produit.nom}
                    </h3>
                    <p className="text-zinc-400 dark:text-zinc-500 text-xs line-clamp-2 leading-relaxed min-h-[36px]">
                        {produit.description}
                    </p>
                </div>

                {/* Prix et Actions */}
                <div className="flex items-center justify-between pt-3 mt-4 border-t border-zinc-100 dark:border-zinc-800/60">
                    <PriceDisplay
                        hasPromo={hasPromo}
                        prixAffichage={prixAffichage}
                        prixDeBase={prixDeBase}
                        pourcentagePromo={pourcentagePromo}
                    />

                    {/* Actions Panier */}
                    {isAvailable && (
                        <div>
                            {quantiteProduit > 0 ? (
                                <div className="flex items-center gap-2.5 bg-zinc-50 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-100 dark:border-zinc-700">
                                    <button
                                        type="button"
                                        onClick={() => decrementQuantity(produit.id_produit)}
                                        className="w-7 h-7 flex items-center justify-center font-medium text-zinc-600 dark:text-zinc-400 rounded-lg hover:bg-white dark:hover:bg-zinc-700 hover:shadow-xs transition-all active:scale-90"
                                    >
                                        —
                                    </button>

                                    <span className="font-bold min-w-[16px] text-center text-xs text-zinc-800 dark:text-zinc-200">
                                        {quantiteProduit}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() => incrementQuantity(produit.id_produit)}
                                        className="w-7 h-7 flex items-center justify-center font-bold rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-amber-600 dark:hover:bg-amber-500 dark:hover:text-white transition-colors active:scale-90"
                                    >
                                        +
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={handleAddToCartClick}
                                    className="h-9 px-3.5 bg-zinc-900 dark:bg-zinc-100 hover:bg-amber-600 dark:hover:bg-amber-500 text-white dark:text-zinc-900 dark:hover:text-white font-medium text-xs rounded-xl flex items-center gap-1.5 transition-all active:scale-95 shadow-xs"
                                >
                                    <span>Ajouter</span>
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}





/*{
    quantiteProduit > 0 && (
        <div className="absolute top-2 left-2 w-7 h-7 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
            {quantiteProduit}
        </div>
    )
}

<StatusBadge isAvailable={isAvailable} />

function StatusBadge({ isAvailable }) {
    return (
        <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-medium backdrop-blur-md shadow-xs flex items-center gap-1 ${isAvailable
            ? "bg-gray-50/80 text-emerald-600 border border-emerald-500/20"
            : "bg-gray-50/80 text-rose-600 border border-rose-500/20"
            }`}>
            <span className={`w-1 h-1 rounded-full ${isAvailable ? "bg-emerald-500" : "bg-rose-500"}`} />
            {isAvailable ? "Dispo" : "Épuisé"}
        </div>
    );
}
*/

function PriceDisplay({ hasPromo, prixAffichage, prixDeBase, pourcentagePromo }) {
    if (hasPromo) {
        return (
            <div className="flex flex-col items-baseline gap-2">
                <div className="flex gap-2 items-center">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Prix</span>
                    <span className="text-md font-black text-rose-600">
                        {prixAffichage.toFixed(2)} $
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-400 line-through decoration-slate-400/70">
                        {prixDeBase.toFixed(2)} $
                    </span>
                    <span className="text-[10px] bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded-md font-bold">
                        -{pourcentagePromo}%
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex gap-2 items-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Prix</span>
            <span className="text-lg font-black text-slate-900">
                {prixAffichage.toFixed(2)} $
            </span>
        </div>
    );
}





/* 'use client'

import Image from "next/image"
import useCartStore from "@/store/cartStore";

export default function CardFood({ produit }) {
    const isAvailable = produit.statut;
    const addToCart = useCartStore((state) => state.addToCart);
    const cart = useCartStore((state) => state.cart);

    const cartItem = cart.find((item) => item.id_produit === produit.id_produit);
    const quantiteProduit = cartItem?.quantite || 0;

    const prixDeBase = Number(produit.prix || 0);
    const prixPromo = produit.prix_promo ? Number(produit.prix_promo) : 0;
    const hasPromo = prixPromo > 0 && prixPromo < prixDeBase;

    const prixAffichage = hasPromo ? prixPromo : prixDeBase;

    const handleAddToCartClick = () => {
        addToCart({
            ...produit,
            prix: prixAffichage
        });
    };

    return (
        <div className="group relative flex flex-col bg-white rounded-3xl p-2.5 border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

            <div className="relative aspect-square w-full max-w-[225px] mx-auto rounded-2xl overflow-hidden bg-slate-50 mb-3">
                <Image
                    src={produit.image || "/images/default-food.jpg"}
                    alt={produit.nom || "Produit"}
                    fill
                    sizes="(max-width: 768px) 150px, 150px"
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {quantiteProduit > 0 && (
                    <div className="absolute top-2 left-2 w-7 h-7 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                        {quantiteProduit}
                    </div>
                )}

                <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-medium backdrop-blur-md shadow-xs flex items-center gap-1 ${isAvailable
                    ? "bg-gray-50/80 text-emerald-600 border border-emerald-500/20"
                    : "bg-gray-50/80 text-rose-600 border border-rose-500/20"
                    }`}>
                    <span className={`w-1 h-1 rounded-full ${isAvailable ? "bg-emerald-500" : "bg-rose-500"}`} />
                    {isAvailable ? "Dispo" : "Épuisé"}
                </div>
            </div>

            <div className="flex-1 px-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-slate-800 font-bold text-lg tracking-tight group-hover:text-amber-600 transition-colors line-clamp-1">
                        {produit.nom}
                    </h3>
                    <p className="text-slate-400 text-xs mt-1.5 line-clamp-2 leading-relaxed min-h-[36px]">
                        {produit.description}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row lg:items-center lg:justify-between gap-y-3 pt-2 mt-1.5 border-t border-slate-50">
                    <div className="flex flex-col">
                        {hasPromo ? (
                            <div className="flex flex-col items-baseline">

                                <div className="flex gap-2 items-center">
                                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Prix</span>
                                    <span className="text-md font-black text-rose-600">
                                        {prixAffichage.toFixed(2)} $
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-slate-400 line-through decoration-slate-400/70">
                                        {prixDeBase.toFixed(2)} $
                                    </span>

                                    <span className="text-[10px] bg-rose-100 text-rose-600 px-1.5 py-0.5 rounded-md font-bold">
                                        -{(((prixDeBase - prixPromo) / prixDeBase) * 100).toFixed(0)}%
                                    </span>
                                </div>
                            </div>
                        ) : (

                            <div className="flex gap-2 items-center">
                                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Prix</span>
                                <span className="text-lg font-black text-slate-900">
                                    {prixAffichage.toFixed(2)} $
                                </span>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleAddToCartClick}
                        disabled={!isAvailable}
                        className="h-10 px-4 bg-slate-900 hover:bg-amber-600 disabled:bg-slate-100 text-white disabled:text-slate-400 font-bold rounded-xl flex items-center gap-2 transition-all active:scale-95 disabled:pointer-events-none shadow-xs hover:shadow-md"
                    >
                        <span className="text-sm">Commander</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
} */
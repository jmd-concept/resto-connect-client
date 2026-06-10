'use client';

import { useEffect, useState } from "react";
import Image from 'next/image';
import CardFood from "./produit/CardFood";
import useMenuStore from "@/stores/useMenuStore";
import { useTheme } from "@/context/useThemeProvider";
import { FiSearch } from "react-icons/fi";

const INITIAL_ITEMS = 4;

// Liste simple d'icônes pour attribuer selon l'ordre des catégories
const ICONS = ["🍽️", "🥗", "🍖", "🍹", "🐠", "🍰", "✨"];

export default function MenuCard() {
    const { isDark } = useTheme();
    const {
        data,
        loading,
        error,
        fetchProduits
    } = useMenuStore();

    const [scrolled, setScrolled] = useState(false);
    const [visibleItems, setVisibleItems] = useState({});
    const [activeCategory, setActiveCategory] = useState("");

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        fetchProduits();
    }, [fetchProduits]);

    const handleVoirPlus = (categorieId) => {
        setVisibleItems(prev => ({
            ...prev,
            [categorieId]: (prev[categorieId] || INITIAL_ITEMS) + INITIAL_ITEMS
        }));
    };

    const scrollToCategory = (categoryId) => {
        const element = document.getElementById(`cat-${categoryId}`);

        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
            setActiveCategory(Number(categoryId));
        }
    };

    const produits = data?.data || [];
    const categories = data?.categories || [];

    useEffect(() => {
        if (categories.length > 0 && !activeCategory) {
            setActiveCategory(categories[0].id_categorie);
        }
    }, [categories, activeCategory]);

    if (loading) {
        return (
            <div className="p-6 text-center min-h-[400px] flex items-center justify-center">
                <p className="animate-pulse text-gray-500">
                    Chargement des données...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-20 text-center text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="w-full md:max-w-7xl mx-auto">
            {/**${scrolled ? "z-20 bg-gray-600 text-white shadow-md" : "z-10 bg-transparent"} */}

            {/* Navigation catégories (Sticky) */}
            <div className={`sticky top-21 z-10 bg-gray-400 text-white shadow-md rounded-md p-4 mb-8 flex gap-2 overflow-x-auto transition-all duration-300`}>
                {categories.map(categorie => (
                    <button
                        key={categorie.id_categorie}
                        onClick={() => scrollToCategory(categorie.id_categorie)}
                        className={`px-4 py-2 rounded-full whitespace-nowrap transition text-sm font-medium
                            ${activeCategory === categorie.id_categorie
                                ? "bg-amber-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-amber-100"
                            }`}
                    >
                        {categorie.nom}
                    </button>
                ))}
            </div>

            {produits.length === 0 ? (
                <div className="text-center py-20">
                    <FiSearch
                        size={50}
                        className="mx-auto text-amber-500 mb-4"
                    />
                    <h3 className="text-xl font-bold">
                        Aucun produit trouvé
                    </h3>
                </div>
            ) : (
                <div className="space-y-16">

                    {categories.map((categorie, index) => {
                        const produitsDeLaCategorie = produits.filter(
                            produit => produit.id_categorie === categorie.id_categorie
                        );

                        // Si la catégorie ne contient aucun produit, optionnel : on ne l'affiche pas
                        if (produitsDeLaCategorie.length === 0) return null;

                        const nombreVisible = visibleItems[categorie.id_categorie] || INITIAL_ITEMS;
                        const produitsVisibles = produitsDeLaCategorie.slice(0, nombreVisible);

                        // Assigne une icône de la liste ou une icône par défaut si l'index dépasse
                        const categoryIcon = ICONS[index % ICONS.length];

                        return (
                            <section
                                key={categorie.id_categorie}
                                id={`cat-${categorie.id_categorie}`}
                                className="scroll-mt-28"
                            >
                                {/* Une seule bannière Hero par catégorie */}
                                <div className={`flex items-center gap-3 mt-8 mb-6 pb-3 border-b
                                    ${isDark
                                        ? "border-gray-700"
                                        : "border-gray-200"} `}
                                >
                                    <CardHeroCategorie
                                        categorie={categorie.nom}
                                        count={produitsDeLaCategorie.length}
                                        icon={categoryIcon}
                                    />
                                </div>

                                {/* Titre de la section */}
                                {/*  <div className="flex items-center gap-3 mt-8 mb-6 border-b border-gray-200 pb-3">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {categorie.nom}
                                    </h2>
                                    <span className="bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                                        {produitsDeLaCategorie.length}
                                    </span>
                                </div> */}

                                {/* Grille de produits */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {produitsVisibles.map(produit => (
                                        <CardFood
                                            key={produit.id_produit}
                                            produit={produit}
                                        />
                                    ))}
                                </div>

                                {/* Bouton Voir Plus */}
                                {nombreVisible < produitsDeLaCategorie.length && (
                                    <div className="flex justify-center mt-8">
                                        <button
                                            onClick={() => handleVoirPlus(categorie.id_categorie)}
                                            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold transition shadow-md"
                                        >
                                            Voir plus ({produitsDeLaCategorie.length - nombreVisible})
                                        </button>
                                    </div>
                                )}

                            </section>
                        );
                    })}
                </div>
            )}
        </div>
    );
}


export const CardHeroCategorie = ({ categorie, count, icon }) => {

    const { isDark } = useTheme();

    return (
        <div className="relative min-h-[160px] p-8 md:p-12 w-full flex flex-col md:flex-row justify-between gap-6 items-center rounded-3xl overflow-hidden shadow-xl bg-gray-900 group">

            {/* Background Image Floue (Optionnel/Design) ou dégradé */}
            <div className={`absolute inset-0 z-5 transition-colors duration-300 ${isDark
                ? "bg-gradient-to-r from-amber-950/80 via-black/50 to-black/80"
                : "bg-gradient-to-r from-amber-500/40 via-white/20 to-white/80"
                }`} />

            {/* Icône en arrière-plan ou sur le côté */}
            <div className="absolute right-8 bottom-2 text-[120px] opacity-50 select-none z-5 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>

            <div className="flex w-full gap-6 justify-between items-center z-5 text-center md:text-left">
                <div className="flex items-center gap-4">
                    <span className="text-4xl hidden md:block">{icon}</span>
                    <h2 className="text-white font-serif font-bold text-2xl tracking-wide md:text-4xl">
                        {categorie}
                    </h2>
                </div>

                <p className="text-amber-500 text-center text-md font-medium tracking-wider bg-black/40 px-4 py-2 rounded-2xl border border-amber-500/30">
                    {count} {count > 1 ? 'articles disponibles' : 'article disponible'}
                </p>
            </div>
        </div>
    );
};






/* 'use client'

import { useEffect } from "react";
import useMenuStore from "@/stores/useMenuStore";
import CardFood from "./produit/CardFood";
import { SearchButton } from "./ui/SearchButton";
import ProduitPagination from "./produit/ProduitPagination";
// ICONS
import { FiSearch } from "react-icons/fi";

const CATEGORIES = [
    { nom: "Tous", icon: "🍽️" },
    { nom: "Entrées", icon: "🥗" },
    { nom: "Plats Principaux", icon: "🍖" },
    { nom: "Desserts", icon: "🍰" },
    { nom: "Boissons", icon: "🍹" },
    { nom: "Autres", icon: "✨" }
];

export default function MenuCard() {
    // On extrait tout ce dont on a besoin depuis le store Zustand
    const {
        searchQuery,
        selectedCategory,
        currentPage,
        data,
        loading,
        error,
        setSearchQuery,
        setDebouncedSearch,
        setSelectedCategory,
        setCurrentPage,
        fetchProduits
    } = useMenuStore();

    useEffect(() => {
        fetchProduits();
    }, []);

    // Gestion du Debounce pour la saisie clavier
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchQuery, setDebouncedSearch]);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 400, behavior: 'smooth' });
    };

    const produits = data?.data ?? [];
    const totalPages = data?.pagination?.totalPages ?? 1;

    if (loading) {
        return (
            <div className="p-6 text-center w-full min-h-[400px] flex items-center justify-center bg-amber-50">
                <p className="text-amber-800 font-medium animate-pulse">Chargement des données...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-20 text-center text-rose-500 font-semibold bg-amber-50">
                Erreur : {error}
            </div>
        );
    }

    return (
        <div className="p-4 flex flex-col gap-6 w-full h-full rounded-2xl">

            <div className="flex flex-col items-center gap-6 pb-2 w-full">

                <div className="flex gap-2 pb-3 overflow-x-auto w-full">
                    {CATEGORIES.map(categorie => (
                        <button
                            key={categorie.nom}
                            onClick={() => setSelectedCategory(categorie.nom)}
                            className={`px-5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200
                            ${selectedCategory === categorie.nom
                                    ? "bg-amber-600 text-white shadow-md"
                                    : "bg-white text-gray-600 hover:bg-amber-100"
                                }`}
                        >
                            {categorie.nom} {categorie.icon}
                        </button>
                    ))}
                </div>

                {/*  <div className="w-full">
                    <SearchButton
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div> *//*}
</div>

{produits.length === 0 && (
<div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
<div className="bg-amber-50 inline-block p-6 rounded-full mb-4">
<FiSearch size={40} className="text-amber-400" />
</div>
<h3 className="text-xl font-semibold text-gray-900">Aucun article trouvé</h3>
<p className="text-gray-500 mt-1">Modifier vos filtres ou affinez votre recherche.</p>
</div>
)}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
{produits.map((produit) => (
<CardFood
key={produit.id_produit}
produit={produit}
/>
))}
</div>

<ProduitPagination
currentPage={currentPage}
totalPages={totalPages}
onPageChange={paginate}
/>
</div>
);
} */
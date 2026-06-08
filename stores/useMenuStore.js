import { create } from 'zustand';
import serviceProduit from '@/lib/produit.service';

const cache = new Map();

export const useMenuStore = create((set, get) => ({
    // ---- ÉTATS DE L'UI ----
    searchQuery: "",
    debouncedSearch: "",
    selectedCategory: "Tous",
    currentPage: 1,
    postsPerPage: 8,

    // ---- ÉTATS DES DONNÉES (API) ----
    data: null,
    loading: true,
    error: null,

    // Référence interne pour éviter les conditions de concurrence (race conditions)
    currentFetchKey: null,

    setSearchQuery: (query) => set({ searchQuery: query }),

    setDebouncedSearch: (debouncedQuery) => {
        set({
            debouncedSearch: debouncedQuery,
            selectedCategory: "Tous",
            currentPage: 1
        });
        // Déclenche le fetch dès que le debounce change
        get().fetchProduits();
    },

    setSelectedCategory: (category) => {
        set({ selectedCategory: category, currentPage: 1 });
        get().fetchProduits();
    },

    setCurrentPage: (pageNumber) => {
        set({ currentPage: pageNumber });
        get().fetchProduits();
    },

    // ---- LOGIQUE ASYNCHRONE (Ancien hook injecté ici) ----
    fetchProduits: async () => {
        const { selectedCategory, debouncedSearch } = get();
        //const { currentPage, postsPerPage, selectedCategory, debouncedSearch } = get();

        const apiCategory = selectedCategory === "Tous" ? "" : selectedCategory;
        const key = `${apiCategory}-${debouncedSearch}`;
        //const key = `${currentPage}-${postsPerPage}-${apiCategory}-${debouncedSearch}`;

        // Enregistre la clé de la requête actuelle
        set({ currentFetchKey: key });

        if (cache.has(key)) {
            if (get().currentFetchKey === key) {
                set({ data: cache.get(key), loading: false, error: null });
            }
            return;
        }

        // 2. Lancement du Fetch
        set({ loading: true, error: null });

        try {
            const res = await serviceProduit.getProduit(apiCategory, debouncedSearch);
            //const res = await serviceProduit.getProduit(currentPage, postsPerPage, apiCategory, debouncedSearch);

            if (!res || res.success === false) {
                throw new Error(res?.error || 'Erreur lors de la récupération des produits');
            }

            cache.set(key, res);

            // Appliquer les données seulement si une requête plus récente n'a pas pris le dessus
            if (get().currentFetchKey === key) {
                set({ data: res, loading: false });
            }
        } catch (err) {
            if (get().currentFetchKey === key) {
                set({ error: err.message || 'Une erreur est survenue', loading: false });
            }
        }
    }
}));

export default useMenuStore;
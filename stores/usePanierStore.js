import { create } from "zustand";
import { persist } from "zustand/middleware";

const calculerTotal = (cart) => cart.reduce((sum, item) => sum + (Number(item.prix_unitaire || 0) * item.quantite), 0);
const calculerQuantite = (cart) => cart.reduce((sum, item) => sum + item.quantite, 0);

const usePanierStore = create(
    persist((set) => ({
        cart: [],
        quantite: 0,
        totalPrix: 0,
        activePanier: null,

        openPanier: (formId) => set({ activePanier: formId }),
        closePanierlStore: () => set({ activePanier: null }),
        toggleForm: (formId) => set((state) => ({
            activePanier: state.activePanier === formId ? null : formId
        })),

        addToCart: (item) =>
            set((state) => {
                const existingItem = state.cart.find((p) => p.id_produit === item.id_produit);

                let newCart;

                if (existingItem) {
                    newCart = state.cart.map((p) => p.id_produit === item.id_produit ? { ...p, quantite: p.quantite + 1, } : p);
                } else {
                    newCart = [...state.cart, { ...item, quantite: 1, },];
                }

                return {
                    cart: newCart,
                    quantite: calculerQuantite(newCart),
                    totalPrix: calculerTotal(newCart),
                };
            }),

        incrementQuantity: (id_produit) =>
            set((state) => {
                const newCart = state.cart.map((item) => item.id_produit === id_produit ? { ...item, quantite: item.quantite + 1 } : item);
                return {
                    cart: newCart,
                    quantite: calculerQuantite(newCart),
                    totalPrix: calculerTotal(newCart),
                };
            }),

        decrementQuantity: (id_produit) =>
            set((state) => {
                const newCart = state.cart.map((item) => item.id_produit === id_produit ? { ...item, quantite: item.quantite - 1, } : item)
                    .filter((item) => item.quantite > 0);

                return {
                    cart: newCart,
                    quantite: calculerQuantite(newCart),
                    totalPrix: calculerTotal(newCart),
                };
            }),

        removeFromCart: (id_produit) =>
            set((state) => {
                const newCart = state.cart.filter((item) => item.id_produit !== id_produit);

                return {
                    cart: newCart,
                    quantite: calculerQuantite(newCart),
                    totalPrix: calculerTotal(newCart),
                };
            }),

        clearCart: () =>
            set(() => ({
                cart: [],
                quantite: 0,
                totalPrix: 0,
            })),
    }),
        { name: "panier_data", }
    )
);

export default usePanierStore;


/* import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
    persist(
        (set) => ({
            cart: [],
            quantite: 1,
            totalPrix: 0,

            addToCart: (item) =>
                set((state) => {
                    const newCart = [...state.cart, item];
                    return {
                        cart: newCart,
                        quantite: newCart.length,
                        totalPrix: newCart.reduce((sum, index) => sum + parseFloat(index.prix || 0), 0),
                    };
                }),

            removeFromCart: (id_produit) =>
                set((state) => {
                    const newCart = state.cart.filter((item) => item.id_produit !== id_produit);
                    return {
                        cart: newCart,
                        quantite: newCart.length,
                        totalPrix: newCart.reduce((sum, index) => sum + parseFloat(index.prix || 0), 0),
                    };
                }),

            clearCart: () => set({ cart: [], quantite: 0, totalPrix: 0 }),
        }),
        {
            name: "panier_data",
            partialize: (state) => ({
                cart: state.cart,
                quantite: state.quantite,
                totalPrix: state.totalPrix
            }),
        }
    )
);

export default useCartStore; */
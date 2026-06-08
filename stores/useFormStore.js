import { create } from 'zustand';

export const useFormStore = create((set) => ({
    // Contient l'identifiant du formulaire ouvert : 'commande', 'livraison', 'reservation' ou null
    activeForm: null,

    // Action pour ouvrir un formulaire spécifique
    openForm: (formId) => set({ activeForm: formId }),

    // Action pour tout fermer
    closeForm: () => set({ activeForm: null }),

    // Action de bascule (toggle) au cas où on ré-appuie sur le même lien
    toggleForm: (formId) => set((state) => ({
        activeForm: state.activeForm === formId ? null : formId
    }))
}));
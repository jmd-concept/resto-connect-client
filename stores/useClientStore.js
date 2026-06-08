import { create } from "zustand";
import { alertnotification } from "@/utils/AlertFunction";
import { triggerNotification } from "@/utils/triggerNotification";

const initialFormData = {
    email: "",
    note: "",
    commentaire: ""
};

// Mock Dataconst 
const mockAvis = [
    {
        id: 1,
        email: "client1@gmail.com",
        note: 5,
        commentaire: "Excellent service"
    },
    {
        id: 2,
        email: "client2@gmail.com",
        note: 4,
        commentaire: "Très satisfait"
    },
    {
        id: 3,
        email: "client3@gmail.com",
        note: 3,
        commentaire: "Correct mais peut mieux faire"
    },
    {
        id: 4,
        email: "client4@gmail.com",
        note: 2,
        commentaire: "Temps d’attente trop long"
    },
    {
        id: 5,
        email: "client5@gmail.com",
        note: 5,
        commentaire: "Plats délicieux et bien présentés"
    },
];


const useClientStore = create((set, get) => ({
    error: null,
    loading: false,
    avis: mockAvis,
    formData: initialFormData,

    // Modifier les champs du formulaire
    handleChange: (e) => {
        const { name, value, type, checked } = e.target;

        set((state) => ({
            formData: {
                ...state.formData,
                [name]: type === "checkbox" ? checked : value
            }
        }));
    },

    // Lire les données (Read)
    fetchData: async () => {
        set({ loading: true });

        setTimeout(() => {
            set({
                avis: get().avis,
                loading: false,
                error: null
            });
        }, 500);
    },

    // Ajouter un avis (Create)
    handleSubmit: async (e) => {
        if (e?.preventDefault) e.preventDefault();

        set({ loading: true });

        try {
            const { formData, avis, handleCancel } = get();

            const nouvelAvis = {
                id: Date.now(),
                ...formData
            };

            set({
                avis: [...avis, nouvelAvis]
            });

            alertnotification("success", "Avis ajouté avec succès");
            triggerNotification(
                "Nouvel avis",
                "Merci pour votre évaluation"
            );

            handleCancel();
        } catch (error) {
            set({
                error: error.message
            });

            alertnotification("error", error.message);
        } finally {
            set({ loading: false });
        }
    },

    // Modifier un avis (Update)
    updateAvis: (id, data) => {
        set((state) => ({
            avis: state.avis.map((item) =>
                item.id === id
                    ? { ...item, ...data }
                    : item
            )
        }));

        alertnotification(
            "success",
            "Avis modifié avec succès"
        );
    },

    // Supprimer un avis (Delete)
    deleteAvis: (id) => {
        set((state) => ({
            avis: state.avis.filter(
                (item) => item.id !== id
            )
        }));

        alertnotification(
            "success",
            "Avis supprimé avec succès"
        );
    },

    // Réinitialiser le formulaire
    handleCancel: () => {
        set({
            formData: initialFormData
        });
    }
}));

export default useClientStore;

/* import { create } from "zustand";
import serviceAvis from "@/lib/client.service";
import { alertnotification } from "@/utils/AlertFunction";
import { triggerNotification } from "@/utils/triggerNotification";

const initialFormData = { email: '', note: '', commentaire: '' };

const useClientStore = create((set, get) => ({
    error: null,
    loading: false,
    avis: [],
    formData: initialFormData,

    // ---- ACTIONS ----
    handleChange: (e) => {
        const { name, value, type, checked } = e.target;
        set((state) => ({
            formData: {
                ...state.formData,
                [name]: type === "checkbox" ? checked : value
            }
        }));
    },

    fetchData: async () => {
        set({ loading: true });
        try {
            const [avis_client] = await Promise.allSettled([
                serviceAvis.getAvis()
            ]);

            const getValue = (res) => res.status === "fulfilled" ? res.value.data : [];

            set({ avis: getValue(avis_client), error: null });
        } catch (error) {
            const msg = error?.message || error?.data?.message || "Erreur données Dashboard";
            alertnotification("error", msg);
            set({ error: msg });
        } finally {
            set({ loading: false });
        }
    },

    handleSubmit: async (e) => {
        if (e && e.preventDefault) e.preventDefault();

        set({ loading: true });
        const { formData, fetchData, handleCancel } = get();

        try {
            const response = await serviceAvis.createAvis(formData);
            alertnotification("success", response.message || "Avis envoyé");
            triggerNotification("Avis envoyé", response.message || "Merci de nous évalué")

            await fetchData();
            handleCancel();
        } catch (error) {
            const errorMessage = error?.error || error?.message || 'Impossible de contacter le serveur.';
            alertnotification("error", errorMessage);
            set({ error: errorMessage });
        } finally {
            set({ loading: false });
        }
    },

    handleCancel: () => {
        set({ formData: initialFormData });
    }
}));

export default useClientStore; */
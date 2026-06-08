import http from "./api";

const serviceProduit = {
    getProduit: async (categorie = '', search = '') => {
        try {
            // Construction des query parameters dynamiques
            const queryParams = new URLSearchParams({
                categorie,
                search
            });
            // Appel de la route API Next.js locale
            const response = await fetch(`/api?${queryParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erreur de requêtage");
            }

            return data;
        } catch (error) {
            throw new Error(error.message || "Erreur réseau ou serveur");
        }
    },

    /*  getProduit: async (page = 1, limit = 6, categorie = '', search = '') => {
         try {
             const response = await http.get(`/produits`, {
                 params: { page, limit, categorie, search }
             });
             return response.data;
         } catch (error) {
             throw new Error(error?.response?.data?.message || error.message || "Erreur de requêtage");
         }
     },
  */
    getPopulaire: async () => {
        try {
            const response = await http.get(`/produits/populaire`);
            return response.data;
        } catch (error) {
            throw new Error(error?.response?.data?.message || error.message || "Erreur de requêtage");
        }
    }
};

export default serviceProduit;

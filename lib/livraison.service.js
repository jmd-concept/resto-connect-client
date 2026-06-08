import http from "./api";

const serviceLivraison = {

    createLivraison: async (data) => {
        const response = await http.post('/livraisons', data);
        return response.data;
    },

    getLivraisonById: async (idLivraison) => {
        const response = await http.get(`/livraisons/${idLivraison}`);
        return response.data;
    },

    updatePosition: async (idLivraison, latitude, longitude) => {
        const response = await http.patch(`/livraisons/${idLivraison}/position`,
            {
                latitude,
                longitude
            },
        );

        return response.data;
    },
}

export default serviceLivraison;
import http from "./api";

const serviceAvis = {
    createAvis: async (data) => {
        try {
            const response = await http.post('/avis', data);
            return response.data;
        } catch (error) {
            throw new Error(error?.response.data.message || error.message || "Erreur avis");
        }
    },

    getAvis: async () => {
        try {
            const response = await http.get(`/avis`);
            return response.data;
        } catch (error) {
            throw new Error(error?.response?.data?.message || error.message || "Erreur de avis");
        }
    }
};

export default serviceAvis;
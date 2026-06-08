import http from "./api";

const serviceAuthClient = {

    profil: async () => {
        const response = await http.get('/client/me');
        // utilisateur non connecté
        if (response.status === 401) {
            return null;
        }

        return response.data;
    },

    login: async (formData) => {
        try {
            const { data } = await http.post("/client/login", formData);
            return data;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || "Erreur login";
            throw new Error(message);
        }
    },

    register: async (formData) => {
        try {
            const { data } = await http.post("/client/register", formData);
            return data;
        } catch (error) {
            const message = error?.response?.data?.message || error?.message || "Erreur login";
            throw new Error(message);
        }
    },

    logout: async () => {
        try {
            const token = localStorage.getItem('token');

            await http.post("/client/logout", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Si ta route est protégée
                },
            },);
        } catch (error) {
            throw error.response?.data || error?.message || "Erreur serveur lors de la déconnexion";
        }
    },
}

export default serviceAuthClient;
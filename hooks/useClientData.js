import { useState, useEffect } from "react";
import serviceAvis from "@/lib/client.service";

import { alertnotification } from "@/utils/AlertFunction";

const useClientData = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [avis, setAvis] = useState([])
    const [formData, setFormData] = useState({ email: '', note: '', commentaire: '', });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        setLoading(true)

        try {
            const [
                avis_client
            ] = await Promise.allSettled([
                serviceAvis.getAvis()
            ]);

            const getValue = (res) => res.status === "fulfilled" ? res.value.data : [];

            setAvis(getValue(avis_client));
        } catch (error) {
            alertnotification("error", error?.message || error?.data?.message || "Erreur données Dashboard");
            setError(error?.message || error?.data?.message || "Erreur est survenue");
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await serviceAvis.createAvis(formData);
            alertnotification("success", response.message || "Avis envoyé");

            await fetchData();
            handleCancel();
        } catch (error) {
            const errorMessage = error?.error || error?.message || 'Une erreur est survenue.';
            alertnotification("error", errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({ email: '', note: '', commentaire: '', });
    };

    return {
        error,
        loading,
        avis,

        handleChange,
        fetchData,
        handleSubmit
    }
}

export default useClientData;
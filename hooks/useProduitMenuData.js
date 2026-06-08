import { useState, useEffect, useRef } from 'react';
import serviceProduit from '@/lib/produit.service';

const cache = new Map();

//export function useProduitData(page, limit, categorie, search) {
export function useProduitData(categorie, search) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const key = `${categorie}-${search}`;
    //const key = `${page}-${limit}-${categorie}-${search}`;
    const fetchRef = useRef(null);

    useEffect(() => {
        let cancelled = false;
        fetchRef.current = key;

        const fetchData = async () => {
            if (cache.has(key)) {
                if (fetchRef.current === key && !cancelled) {
                    setData(cache.get(key));
                    setLoading(false);
                }
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const res = await serviceProduit.getProduit(categorie, search);
                //const res = await serviceProduit.getProduit(page, limit, categorie, search);

                if (!res || res.success === false) {
                    throw new Error(res?.error || 'Erreur lors de la récupération des produits');
                }

                cache.set(key, res);
                if (fetchRef.current === key && !cancelled) {
                    setData(res);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err.message || 'Une erreur est survenue');
                }
            } finally {
                if (!cancelled && fetchRef.current === key) {
                    setLoading(false);
                }
            }
        };

        fetchData();
        return () => { cancelled = true; };
    }, [key]);

    return { data, loading, error };
}


/* import { useState, useEffect, useRef } from 'react';
import ProduitService from '@/services/produit.service';

const cache = new Map();

export function useProduitData(page, limit, categorie, search) {
    const [data, setData] = useState({
        data: [],
        pagination: {}
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const key = `${page}-${limit}-${categorie}-${search}`;
    const fetchRef = useRef(null);

    useEffect(() => {
        let cancelled = false;
        fetchRef.current = key;

        const fetchData = async () => {
            if (cache.has(key)) {
                if (fetchRef.current === key && !cancelled) {
                    setData(cache.get(key));
                    setLoading(false);
                }
                return;
            }

            setLoading(true);
            try {
                const res = await ProduitService.getAll(page, limit, categorie, search)

                if (!res || res.success === false) throw new Error('Erreur réseau');

                cache.set(key, res);
                if (fetchRef.current === key && !cancelled) {
                    setData(res || []);
                }
            } catch (error) {
                if (!cancelled) {
                    setError(
                        error?.message || 'Une erreur est survenue'
                    );
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchData();
        return () => { cancelled = true; };
    }, [key]);

    return {
        data,
        loading,
        error
    };
} */
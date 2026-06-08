'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const HomeContext = createContext();

// Données utilisateur fictives pour le test
const MOCK_USER = {
    id: "1",
    nom: "jmdconcept3",
    email: "jmdconcept3@gmail.com"
};
const MOCK_TOKEN = "mock-jwt-token-12345";

export default function HomeContextProvider({ children }) {
    const routerNavigation = useRouter();

    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Vérification de l'état au chargement de l'application
    const checkAuth = () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user_profile');

            if (token && storedUser) {
                // On parse uniquement si storedUser existe bel et bien
                setUser(JSON.parse(storedUser));
                setIsLoggedIn(true);
            } else {
                setUser(null);
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error("Erreur checkAuth locale:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    // Simuler une inscription (Register)
    const handleSubmit = async (dataForm) => {
        setError('');
        setLoading(true);

        try {
            // Simulation d'un délai réseau (500ms)
            await new Promise(resolve => setTimeout(resolve, 500));

            if (!dataForm.email || !dataForm.mot_de_passe) {
                throw new Error("Veuillez remplir tous les champs obligatoires");
            }

            const newUser = {
                id: Date.now().toString(),
                nom: dataForm.nom || "jmdconcept3",
                email: dataForm.email,
                mot_de_passe: "1234"
            };

            // Sauvegarde des données fictives
            localStorage.setItem('token', MOCK_TOKEN);
            localStorage.setItem('user_profile', JSON.stringify(newUser || MOCK_USER));

            setUser(newUser);
            setIsLoggedIn(true);

            const configs = {
                success: {
                    title: 'Opération réussie',
                    text: 'Compte test créé avec succès !',
                    icon: 'success',
                    confirmButtonColor: '#7cd1f9'
                },
            };

            Swal.fire(configs['success']);

            routerNavigation.push("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Simuler une connexion (Login)
    const handleLogin = async (dataForm) => {
        setError('');
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 500));

            // Permet de se connecter avec n'importe quel identifiant pour le test
            if (!dataForm.email || !dataForm.mot_de_passe) {
                throw new Error("Email et mot de passe requis");
            }

            // Version test : si l'adresse entrée est celle par défaut ou une nouvelle
            const userProfile = {
                id: "1",
                nom: "jmdconcept3",
                email: dataForm.email,
                mot_de_passe: "1234"
            };

            localStorage.setItem('token', MOCK_TOKEN);
            localStorage.setItem('user_profile', JSON.stringify(userProfile || MOCK_USER));

            setUser(userProfile || MOCK_USER);
            setIsLoggedIn(true);

            const configs = {
                success: {
                    title: 'Opération réussie',
                    text: 'Compte test créé avec succès !',
                    icon: 'success',
                    confirmButtonColor: '#7cd1f9'
                },
            };

            Swal.fire(configs['success']);

            routerNavigation.push("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Simuler une déconnexion (Logout)
    const handleLogout = async () => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 300));

            // Nettoyage complet du localStorage lié à l'auth
            localStorage.removeItem('token');
            localStorage.removeItem('user_profile');

            setIsLoggedIn(false);
            setUser(null);

            const configs = {
                success: {
                    title: 'Opération réussie',
                    text: 'Déconnecté avec succès (Local) !',
                    icon: 'success',
                    confirmButtonColor: '#7cd1f9'
                },
            };

            Swal.fire(configs['success']);

            window.location.href = '/login';
        } catch (error) {
            console.error("Erreur lors de la déconnexion locale", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <HomeContext.Provider
            value={{
                user,
                error,
                loading,
                isLoggedIn,
                handleSubmit,
                handleLogin,
                handleLogout,
            }}
        >
            {children}
        </HomeContext.Provider>
    );
}

export const useUserHome = () => useContext(HomeContext);

/* 'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import serviceAuthClient from "@/lib/login.service";

const HomeContext = createContext();

export default function HomeContextProvider({ children }) {

    const routerNavigation = useRouter()

    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkAuth = async () => {
        setLoading(true);
        try {
            const response = await serviceAuthClient.profil();
            if (response?.user) {
                setUser(response.user);
                setIsLoggedIn(true);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error(error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);


    const handleSubmit = async (dataForm) => {
        // e.preventDefault();
        setError('');

        try {
            const response = await serviceAuthClient.register(dataForm);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Erreur lors de l'inscription");
            }

            // Automatiquement connecter l'utilisateur après inscription en stockant le token
            localStorage.setItem('token', data.token);
            alert('Compte créé avec succès !');
            routerNavigation.push("/");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogin = async (dataForm) => {
        //e.preventDefault();
        setError('');

        try {
            const response = await serviceAuthClient.login(dataForm);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Une erreur est survenue');
            }

            setIsLoggedIn(true);

            // 💾 Stockage du token dans le localStorage
            localStorage.setItem('token', data.token);
            alert('Connexion réussie !');
            routerNavigation.push("/");

        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogout = async (clientId) => {
        try {
            const response = await serviceAuthClient.logout(clientId);

            if (response.ok) {
                setIsLoggedIn(false);

                // 🗑️ Supprimer le token du navigateur
                localStorage.removeItem('token');
                alert('Déconnecté avec succès');
                window.location.href = '/login';
            }
        } catch (error) {
            console.error("Erreur lors de la déconnexion", error);
        }
    };

    return (
        <HomeContext.Provider
            value={{
                user,
                error,
                loading,
                isLoggedIn,

                handleSubmit,
                handleLogin,
                handleLogout,
            }}
        >
            {children}
        </HomeContext.Provider>
    );
}

export const useUserHome = () => useContext(HomeContext);
 */
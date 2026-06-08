"use client";

import React from 'react';
import Swal from 'sweetalert2';

export default function ActionAlerts() {

    // 1. Alerte de Confirmation (Suppression)
    const handleConfirmDelete = () => {
        Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: "Cette action est irréversible !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer !',
            cancelButtonText: 'Annuler',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Supprimé !',
                    text: 'Le fichier a été supprimé.',
                    icon: 'success',
                    confirmButtonColor: '#7cd1f9'
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: 'Annulé',
                    text: 'Votre fichier est en sécurité :)',
                    icon: 'error',
                    confirmButtonColor: '#7cd1f9'
                });
            }
        });
    };

    // 2. Notification de sauvegarde temporaire avec Loading
    const handleSaveWithTimer = () => {
        Swal.fire({
            title: 'Sauvegarde en cours...',
            timer: 2000,
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("La modale s'est fermée automatiquement au bout de 2 secondes");

                // Optionnel : Notification Toast pour confirmer que c'est bien enregistré après le loading
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Sauvegarde réussie',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        });
    };

    return (
        <div className="flex flex-col gap-4 p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-lg max-w-md w-full mx-auto">
            <div className="flex gap-3">
                {/* Bouton de Suppression */}
                <button
                    onClick={handleConfirmDelete}
                    className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-sm font-semibold rounded-lg shadow transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                    Supprimer l'élément
                </button>

                {/* Bouton de Sauvegarde */}
                <button
                    onClick={handleSaveWithTimer}
                    className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-lg shadow transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                    Sauvegarder les données
                </button>
            </div>
        </div>
    );
}

export const AlertButtons = () => {
    const handleStandardAlert = (type = 'success' || 'error' || 'warning' || 'info') => {
        const configs = {
            success: {
                title: 'Opération réussie',
                text: 'Les données ont été modifiées avec succès !',
                icon: 'success',
                confirmButtonColor: '#7cd1f9'
            },
            error: {
                title: 'Une erreur est survenue',
                text: 'Impossible d\'enregistrer les modifications.',
                icon: 'error',
                confirmButtonColor: '#e74c3c'
            },
            warning: {
                title: 'Attention',
                text: 'Cette action pourrait impacter d\'autres utilisateurs.',
                icon: 'warning',
                confirmButtonColor: '#f39c12'
            },
            info: {
                title: 'Information',
                text: 'Une mise à jour système est prévue ce soir.',
                icon: 'info',
                confirmButtonColor: '#3498db'
            }
        };

        Swal.fire(configs[type]);
    };

    const buttonStyle = "px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-800 transition text-sm font-medium m-1";

    return (
        <div className="p-4 bg-gray-900 rounded-lg shadow-inner">
            <div className="flex flex-wrap gap-2">
                <button className={buttonStyle + `${buttonStyle ? 'flex' : 'hidden'}`} onClick={() => handleStandardAlert('success')}>Succès</button>
                <button className={buttonStyle} onClick={() => handleStandardAlert('error')}>Erreur</button>
                <button className={buttonStyle} onClick={() => handleStandardAlert('warning')}>Avertissement</button>
                <button className={buttonStyle} onClick={() => handleStandardAlert('info')}>Info</button>
            </div>
        </div>
    );
}

export const AlertButtonsAction = () => {
    const handleConfirmAlert = () => {
        Swal.fire({
            title: 'Êtes-vous sûr ?',
            text: "Vous ne pourrez pas annuler cette action !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2ecc71',
            cancelButtonColor: '#95a5a6',
            confirmButtonText: 'Oui, je confirme',
            cancelButtonText: 'Annuler',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Confirmé !', 'L\'action a été exécutée.', 'success');
            }
        });
    };

    // 3. Notification éphémère (Toast)
    const handleToastAlert = () => {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Connexion réussie',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });
    };

    // 4. Processus de Chargement
    const handleLoadingAlert = () => {
        Swal.fire({
            title: 'Traitement en cours',
            text: 'Veuillez patienter pendant la génération...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
                setTimeout(() => {
                    Swal.fire('Terminé !', 'Le document est prêt.', 'success');
                }, 3000);
            }
        });
    };

    // 5. Alerte avec Champ de saisie
    const handleInputAlert = () => {
        Swal.fire({
            title: 'Modifier le profil',
            input: 'text',
            inputLabel: 'Entrez votre nouveau pseudonyme :',
            inputPlaceholder: 'Ex: DevNext_2026',
            showCancelButton: true,
            confirmButtonColor: '#34495e',
            inputValidator: (value) => {
                if (!value) {
                    return 'Ce champ ne peut pas être vide !';
                }
            }
        }).then((result) => {
            if (result.value) {
                Swal.fire(`Mis à jour !`, `Votre pseudo : ${result.value}`, 'success');
            }
        });
    };

    const buttonStyle = "px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-800 transition text-sm font-medium m-1";

    return (
        <div className="p-4 bg-gray-900 rounded-lg shadow-inner">
            <div className="flex flex-wrap gap-2">
                <button className={`${buttonStyle} bg-emerald-600 hover:bg-emerald-700`} onClick={handleConfirmAlert}>Confirmation (Promesse)</button>
                <button className={`${buttonStyle} bg-amber-600 hover:bg-amber-700`} onClick={handleToastAlert}>Notification Toast</button>
                <button className={`${buttonStyle} bg-blue-600 hover:bg-blue-700`} onClick={handleLoadingAlert}>Loading Synchrone</button>
                <button className={`${buttonStyle} bg-purple-600 hover:bg-purple-700`} onClick={handleInputAlert}>Saisie Texte</button>
            </div>
        </div>
    );
}

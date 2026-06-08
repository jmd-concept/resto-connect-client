'use client'

import Swal from 'sweetalert2';

export const AlerteButton = ({
    titre,
    icon,
    html,
    footer,
    imageUrl,
    bgColor = "bg-blue-600",
    textColor = "text-white"
}) => {

    const handleCliek = () => {
        Swal.fire({
            title: '<strong>Opération Réussie !</strong>',
            icon: 'success',
            html: 'Vos modifications ont été enregistrées. Vous pouvez consulter votre <b>tableau de bord</b> dès maintenant.',
            footer: '<a href="#">Pourquoi ai-je ce message ?</a>',
            imageUrl: 'https://unsplash.it/400/200',
            imageWidth: 200,
            imageHeight: 150,
            imageAlt: 'Image personnalisée'
        });
    }
    return (
        <div>
            <button
                onClick={() => handleCliek}
                className={`${bgColor, textColor} text-[16px]`}
            >
                Clieck moi
            </button>
        </div>
    )
}


/**
 * import Swal from 'sweetalert2';

const AlertButton = ({ type, label, bgClass, onClick }) => {
    return (
        <button 
            className={`px-4 py-2 text-white rounded transition text-sm font-medium m-1 shadow-md ${bgClass}`}
            onClick={() => onClick(type)}
        >
            {label}
        </button>
    );
};

export const AlertButtons = () => {
    const handleStandardAlert = (type) => {
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

        const currentConfig = configs[type] || configs.info;
        Swal.fire(currentConfig);
    };

    return (
        <div className="p-4 bg-gray-900 rounded-lg shadow-inner">
            <div className="flex flex-wrap gap-2">
                {/* Bouton 1 : Succès *//*}
<AlertButton
type="success"
label="Succès"
bgClass="bg-emerald-600 hover:bg-emerald-700"
onClick={handleStandardAlert}
/>

{/* Bouton 2 : Erreur */ /*}
<AlertButton
    type="error"
    label="Erreur"
    bgClass="bg-rose-600 hover:bg-rose-700"
    onClick={handleStandardAlert}
/>

{/* Bouton 3 : Avertissement *//* }
<AlertButton
    type="warning"
    label="Avertissement"
    bgClass="bg-amber-500 hover:bg-amber-600 text-gray-900"
    onClick={handleStandardAlert}
/>

{/* Bouton 4 : Info *//* }
<AlertButton
    type="info"
    label="Info"
    bgClass="bg-sky-600 hover:bg-sky-700"
    onClick={handleStandardAlert}
/>
            </div >
        </div >
    );
};
 */
import Swal from 'sweetalert2';

export const alertnotification = (type = 'success' || 'error' || 'warning' || 'info', message) => {
    const configs = {
        success: {
            title: 'Opération réussie',
            text: message || 'Les données ont été modifiées avec succès !',
            icon: 'success',
            confirmButtonColor: '#7cd1f9'
        },
        error: {
            title: 'Une erreur est survenue',
            text: message || 'Impossible d\'enregistrer les modifications.',
            icon: 'error',
            confirmButtonColor: '#e74c3c'
        },
        warning: {
            title: 'Attention',
            text: message || 'Cette action pourrait impacter d\'autres utilisateurs.',
            icon: 'warning',
            confirmButtonColor: '#f39c12'
        },
        info: {
            title: 'Information',
            text: message || 'Une mise à jour système est prévue ce soir.',
            icon: 'info',
            confirmButtonColor: '#3498db'
        }
    };

    Swal.fire(configs[type]);
};
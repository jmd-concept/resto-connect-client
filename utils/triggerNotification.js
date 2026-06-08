
export const triggerNotification = (titre = "Bienvenue sur JMD RestoConnect ! 🎉", message = "Vous avez activé les notifications.") => {
    if (typeof window !== "undefined" && "Notification" in window) {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                new Notification(titre, {
                    body: message,
                    icon: "/favicon.ico", // Ajoute un chemin vers ton logo public (ex: dans ton dossier public/)
                    badge: "/favicon.ico", // Pour Android
                    //tag: "jmd-resto-notif" // Évite les doublons en remplaçant la notification précédente 
                });
            }
        });
    }
};

/*
export const triggerNotification = (titre, message, restaurantOptions = {}) => {
    if (typeof window !== "undefined" && "Notification" in window) {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                // Construction du corps de la notification avec les infos du restaurant si elles existent
                let corpsNotification = message;

                if (restaurantOptions.nom) {
                    corpsNotification += `\n\n🏬 ${restaurantOptions.nom}`;
                    if (restaurantOptions.telephone) corpsNotification += `\n📞 ${restaurantOptions.telephone}`;
                    if (restaurantOptions.adresse) corpsNotification += `\n📍 ${restaurantOptions.adresse}`;
                }

                new Notification(titre, {
                    body: corpsNotification,
                    icon: "/favicon.ico",
                    badge: "/favicon.ico",
                });
            }
        });
    }
};

triggerNotification(
    "Nouveau",
    "Salut Didi 👋",
    {
        nom: "JMD RestoConnect",
        telephone: "+243 850 000 000",
        adresse: "Kinshasa, DRC"
    }
);*/
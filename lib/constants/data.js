import {
    FaFish,
    FaDrumstickBite,
    FaCarrot,
    FaIceCream,
    FaCoffee,
    FaWineBottle,
    FaPizzaSlice,
    FaHamburger
} from 'react-icons/fa'

export const PRODUIT_CATEGORIES = [
    "Tous",
    "Entrées",
    "Plats Principaux",
    "Desserts",
    "Boissons",
    "Autres"
];

export const menuData = [
    {
        id: 'starters',
        name: 'Entrées',
        icon: FaCarrot,
        items: [
            {
                id: 1,
                name: 'Salade de chèvre chaud',
                description: 'Mélange de jeunes pousses, fromage de chèvre pané, noix et miel',
                price: 8.90,
                icon: FaCarrot,
                isVegetarian: true
            },
            {
                id: 2,
                name: 'Calamars frits',
                description: 'Anneaux de calamars croustillants, sauce tartare maison',
                price: 10.50,
                icon: FaFish,
            },
            {
                id: 3,
                name: 'Burrata crémeuse',
                description: 'Burrata, tomates cerises, pesto et pain grillé',
                price: 12.90,
                icon: FaPizzaSlice,
                isVegetarian: true
            }
        ]
    },
    {
        id: 'mains',
        name: 'Plats principaux',
        icon: FaDrumstickBite,
        items: [
            {
                id: 4,
                name: 'Burger signature',
                description: 'Boeuf angus, cheddar, bacon, salade, tomate, sauce maison',
                price: 16.90,
                icon: FaHamburger,
            },
            {
                id: 5,
                name: 'Saumon grillé',
                description: 'Filet de saumon, beurre citronné, riz sauvage et légumes verts',
                price: 19.50,
                icon: FaFish,
            },
            {
                id: 6,
                name: 'Risotto aux champignons',
                description: 'Riz arborio, champignons de Paris, parmesan, persil',
                price: 15.90,
                icon: FaCarrot,
                isVegetarian: true
            }
        ]
    },
    {
        id: 'desserts',
        name: 'Desserts',
        icon: FaIceCream,
        items: [
            {
                id: 7,
                name: 'Fondant au chocolat',
                description: 'Cœur coulant, glace vanille maison',
                price: 7.90,
                icon: FaIceCream,
                isVegetarian: true
            },
            {
                id: 8,
                name: 'Tiramisu',
                description: 'Mascarpone, café, biscuit à la cuillère, cacao',
                price: 6.90,
                icon: FaCoffee,
                isVegetarian: true
            },
            {
                id: 9,
                name: 'Tarte aux pommes',
                description: 'Tarte fine cannelle, crème anglaise',
                price: 7.50,
                icon: FaCarrot,
                isVegetarian: true
            }
        ]
    },
    {
        id: 'drinks',
        name: 'Boissons',
        icon: FaCoffee,
        items: [
            {
                id: 10,
                name: 'Café gourmand',
                description: 'Expresso et trois mini-desserts',
                price: 5.50,
                icon: FaCoffee,
                isVegetarian: true
            },
            {
                id: 11,
                name: 'Jus pressé maison',
                description: 'Carotte, orange, gingembre',
                price: 4.90,
                icon: FaCarrot,
                isVegetarian: true
            },
            {
                id: 12,
                name: 'Vin du mois',
                description: 'Au verre (rouge ou blanc)',
                price: 5.00,
                icon: FaWineBottle,
                isVegetarian: true
            }
        ]
    }
]
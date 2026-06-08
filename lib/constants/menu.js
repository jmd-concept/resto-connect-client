// 1. Vos données réelles basées sur la capture d'écran de la base de données
export const produitData = [
    { id_produit: 1, id_categorie: 1, id_restaurant: 1, nom: 'Pizza Margherita', description: 'Pizza classique avec mozzarella et basilic', prix_unitaire: 12.50, prix_promo: 10.89, image: "/plats/pizza.jpeg", status: true },
    { id_produit: 2, id_categorie: 1, id_restaurant: 2, nom: 'Poulet braisé', description: 'Poulet grillé avec épices locales', prix_unitaire: 8.75, prix_promo: null, image: "/plats/plats1.webp", status: false },
    { id_produit: 3, id_categorie: 3, id_restaurant: 1, nom: 'Salade César', description: 'Poulet croustillant, romaine, parmesan, sauce César', prix_unitaire: 14.00, prix_promo: 12.75, image: "/plats/legumes.jpg", status: true },
    { id_produit: 4, id_categorie: 4, id_restaurant: 1, nom: 'Game de Jus', description: 'Jus bien tapé', prix_unitaire: 5.00, prix_promo: 2.50, image: "/plats/jus.jpeg", status: true },
    { id_produit: 5, id_categorie: 1, id_restaurant: 1, nom: 'Poissons', description: 'Poisson frais grillé', prix_unitaire: 8.00, prix_promo: null, image: "/plats/poissons.jpeg", status: true },
    { id_produit: 6, id_categorie: 1, id_restaurant: 1, nom: 'Frites', description: 'Frites croustillantes dorées', prix_unitaire: 5.00, prix_promo: 4.10, image: "/plats/frites.jpeg", status: true },
    { id_produit: 7, id_categorie: 2, id_restaurant: 1, nom: 'Sharwama', description: 'Sharwama small avec sauce maison', prix_unitaire: 8.50, prix_promo: 7.00, image: "/plats/sharwama.jpeg", status: true },

    // Nouveaux plats variés
    { id_produit: 8, id_categorie: 1, id_restaurant: 2, nom: 'Burger Double Cheese', description: 'Burger avec double steak et fromage fondant', prix_unitaire: 9.90, prix_promo: 8.50, image: "/plats/Burger-King.webp", status: true },
    { id_produit: 9, id_categorie: 3, id_restaurant: 2, nom: 'Taboulé', description: 'Salade orientale avec persil, menthe et semoule', prix_unitaire: 6.50, prix_promo: null, image: "/plats/tabouli.jpeg", status: true },
    { id_produit: 10, id_categorie: 4, id_restaurant: 3, nom: 'Smoothie Mangue', description: 'Boisson fraîche à base de mangue et yaourt', prix_unitaire: 4.75, prix_promo: 3.90, image: "/plats/jus_mangue.jpeg", status: true },
    { id_produit: 11, id_categorie: 6, id_restaurant: 1, nom: 'Tiramisu', description: 'Dessert italien au café et mascarpone', prix_unitaire: 6.00, prix_promo: null, image: "/plats/tiramisu.jpeg", status: true },
    { id_produit: 12, id_categorie: 6, id_restaurant: 2, nom: 'Glace Vanille', description: 'Glace artisanale à la vanille', prix_unitaire: 3.50, prix_promo: 2.90, image: "/plats/glace_vanille.jpeg", status: 0 },
    { id_produit: 13, id_categorie: 5, id_restaurant: 3, nom: 'Crevettes grillées', description: 'Crevettes fraîches grillées avec ail et citron', prix_unitaire: 11.00, prix_promo: 9.50, image: "/plats/crevette.jpeg", status: 0 },
    { id_produit: 14, id_categorie: 2, id_restaurant: 3, nom: 'Brochettes de bœuf', description: 'Brochettes marinées servies avec légumes grillés', prix_unitaire: 13.00, prix_promo: 11.20, image: "/plats/kabab.webp", status: true },
    { id_produit: 15, id_categorie: 2, id_restaurant: 2, nom: 'Lasagnes Bolognaises', description: 'Pâtes en couches avec viande hachée et sauce tomate', prix_unitaire: 12.00, prix_promo: 10.50, image: "/plats/taboue.webp", status: true },
    { id_produit: 16, id_categorie: 5, id_restaurant: 3, nom: 'Sushi Mix', description: 'Assortiment de sushis variés', prix_unitaire: 18.00, prix_promo: 15.00, image: "/plats/shushi.jpeg", status: true },
    { id_produit: 17, id_categorie: 4, id_restaurant: 2, nom: 'Café Latte', description: 'Café expresso avec lait chaud et mousse', prix_unitaire: 3.20, prix_promo: null, image: "/plats/cafe_au_lait.jpeg", status: true },

    // Ajouts supplémentaires pour tester davantage
    { id_produit: 18, id_categorie: 1, id_restaurant: 3, nom: 'Quiche Lorraine', description: 'Tarte salée avec lardons et fromage', prix_unitaire: 7.50, prix_promo: 6.20, image: "/plats/cheesesteak.webp", status: true },
    { id_produit: 19, id_categorie: 2, id_restaurant: 1, nom: 'Steak Frites', description: 'Steak grillé accompagné de frites maison', prix_unitaire: 15.00, prix_promo: 13.50, image: "/plats/steak_rites.jpeg", status: true },
    { id_produit: 20, id_categorie: 3, id_restaurant: 2, nom: 'Mousse au Chocolat', description: 'Dessert gourmand au chocolat noir', prix_unitaire: 5.50, prix_promo: null, image: "/plats/Mouse_chocolat.jpeg", status: true },
    { id_produit: 21, id_categorie: 4, id_restaurant: 3, nom: 'Champanhe', description: 'Infusion de thé vert bio', prix_unitaire: 2.80, prix_promo: null, image: "/plats/Champanhe.webp", status: true },
    { id_produit: 22, id_categorie: 6, id_restaurant: 2, nom: 'Pain Maison', description: 'Pain artisanal cuit au four', prix_unitaire: 3.00, prix_promo: 2.50, image: "/plats/pain_maison.jpeg", status: true },

    // Ajouts pour atteindre +15 nouveaux produits
    { id_produit: 23, id_categorie: 1, id_restaurant: 2, nom: 'Pizza Pepperoni', description: 'Pizza garnie de pepperoni et mozzarella', prix_unitaire: 13.00, prix_promo: 11.50, image: "/plats/pizza2.webp", status: true },
    { id_produit: 24, id_categorie: 2, id_restaurant: 3, nom: 'Kebab Mixte', description: 'Kebab avec viande mixte et crudités', prix_unitaire: 9.80, prix_promo: 8.20, image: "/plats/kebabe_mixe.jpeg", status: true },
    { id_produit: 25, id_categorie: 3, id_restaurant: 1, nom: 'Salade Niçoise', description: 'Salade avec thon, olives, œufs et haricots verts', prix_unitaire: 7.50, prix_promo: null, image: "/plats/salade_noircis.jpeg", status: true },
    { id_produit: 26, id_categorie: 4, id_restaurant: 2, nom: 'Cocktail Tropical', description: 'Cocktail sans alcool à base de fruits exotiques', prix_unitaire: 6.20, prix_promo: 5.00, image: "/plats/wisky.webp", status: true },
    { id_produit: 27, id_categorie: 5, id_restaurant: 1, nom: 'Calamars frits', description: 'Calamars croustillants servis avec sauce tartare', prix_unitaire: 10.00, prix_promo: 8.50, image: "/plats/calamars.jpeg", status: true },
    { id_produit: 28, id_categorie: 6, id_restaurant: 3, nom: 'Cheesecake Fraise', description: 'Gâteau crémeux avec coulis de fraise', prix_unitaire: 6.80, prix_promo: 5.90, image: "/plats/cheesecake.jpeg", status: true },
    { id_produit: 29, id_categorie: 3, id_restaurant: 2, nom: 'Hot Dog Classique', description: 'Pain moelleux avec saucisse grillée et moutarde', prix_unitaire: 5.50, prix_promo: 4.70, image: "/plats/hot_dog.webp", status: true },
    { id_produit: 30, id_categorie: 2, id_restaurant: 1, nom: 'Raviolis Maison', description: 'Pâtes farcies aux légumes et viande', prix_unitaire: 11.00, prix_promo: 9.80, image: "/plats/raviolis.jpeg", status: true },
    { id_produit: 31, id_categorie: 3, id_restaurant: 3, nom: 'Soupe Tomate', description: 'Soupe chaude à base de tomates fraîches', prix_unitaire: 4.50, prix_promo: null, image: "/plats/soupe_tomat.webp", status: true },
    { id_produit: 32, id_categorie: 4, id_restaurant: 1, nom: 'Milkshake Chocolat', description: 'Boisson glacée au chocolat et lait', prix_unitaire: 4.20, prix_promo: 3.50, image: "/plats/chocolate.jpeg", status: true },
    { id_produit: 33, id_categorie: 5, id_restaurant: 2, nom: 'Huîtres fraîches', description: 'Huîtres servies avec citron et vinaigre', prix_unitaire: 14.00, prix_promo: 12.00, image: "/plats/Mushrooms.jpeg", status: true },
    { id_produit: 34, id_categorie: 6, id_restaurant: 1, nom: 'Crème brûlée', description: 'Dessert français avec caramel croquant', prix_unitaire: 5.80, prix_promo: null, image: "/plats/creme_brulee.jpeg", status: true },
    { id_produit: 35, id_categorie: 1, id_restaurant: 3, nom: 'Panini Jambon Fromage', description: 'Sandwich chaud avec jambon et fromage fondu', prix_unitaire: 6.00, prix_promo: 5.20, image: "/plats/jambon.jpeg", status: false },
    { id_produit: 36, id_categorie: 2, id_restaurant: 2, nom: 'Risotto Champignons', description: 'Riz crémeux aux champignons frais', prix_unitaire: 12.50, prix_promo: 11.00, image: "/plats/risotto.jpeg", status: true },
    { id_produit: 37, id_categorie: 7, id_restaurant: 1, nom: 'Plats international 1', description: 'Plats international', prix_unitaire: 12.50, prix_promo: 11.00, image: "/plats/international.jpeg", status: true },
];
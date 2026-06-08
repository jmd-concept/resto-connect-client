import { NextResponse } from 'next/server';
import { produitData } from '@/lib/constants/menu';

const categorieData = {
    1: { id_categorie: 1, nom: 'Entrées' },
    2: { id_categorie: 2, nom: 'Plats Principaux' },
    3: { id_categorie: 3, nom: 'Desserts' },
    4: { id_categorie: 4, nom: 'Boissons' },
    5: { id_categorie: 5, nom: 'Poissons & Fruits de mer' },
    6: { id_categorie: 6, nom: 'Autres' },
    7: { id_categorie: 7, nom: 'Spécialités Internationales' }
};

export async function GET(request) {
    try {
        const { searchParams } = request.nextUrl;

        const categorie = searchParams.get('categorie') || '';
        const search = searchParams.get('search') || '';

        let filteredProducts = produitData.map(product => ({
            ...product,
            categorie:
                categorieData[product.id_categorie]?.nom || 'Autres',
            Categorie:
                categorieData[product.id_categorie] || null
        }));

        // Recherche
        if (search) {
            filteredProducts = filteredProducts.filter(item =>
                item.nom.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Filtre catégorie
        if (categorie) {
            filteredProducts = filteredProducts.filter(item =>
                item.categorie.toLowerCase() === categorie.toLowerCase()
            );
        }

        // Tri
        filteredProducts.sort((a, b) =>
            a.nom.localeCompare(b.nom)
        );

        return NextResponse.json({
            success: true,
            data: filteredProducts,
            categories: Object.values(categorieData)
        });

    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: 'Erreur interne du serveur',
                message: error.message
            },
            {
                status: 500
            }
        );
    }
}

/*import { NextResponse } from 'next/server';
import { produitData } from '@/lib/constants/menu';

const categorieData = {
    1: { id_categorie: 1, nom: 'Entrées' },
    2: { id_categorie: 2, nom: 'Plats Principaux' },
    3: { id_categorie: 3, nom: 'Desserts' },
    4: { id_categorie: 4, nom: 'Boissons' },
    5: { id_categorie: 5, nom: 'Poissons & Fruits de mer' },
    6: { id_categorie: 6, nom: 'Autres' },
    7: { id_categorie: 7, nom: 'Spécialités Internationales' }
};

export async function GET(request) {
    try {
        const { searchParams } = request.nextUrl;

        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 8;
        const offset = (page - 1) * limit;

        const categorie = searchParams.get('categorie') || '';
        const search = searchParams.get('search') || '';

        // 2. Filtrage & Jointure simulée
        let filteredProducts = produitData.map(product => ({
            ...product,
            // Simule l'include de Sequelize : rajoute l'objet Categorie imbriqué
            Categorie: categorieData[product.id_categorie] || null
        }));

        // Filtre textuel (recherche sur le nom du produit)
        if (search) {
            filteredProducts = filteredProducts.filter(item =>
                item.nom.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Filtre par nom de catégorie (ex: ?categorie=Pizzas)
        if (categorie) {
            filteredProducts = filteredProducts.filter(item =>
                item.Categorie && item.Categorie.nom.toLowerCase() === categorie.toLowerCase()
            );
        }

        // Tri alphabétique par nom (A-Z)
        filteredProducts.sort((a, b) => a.nom.localeCompare(b.nom));

        const totalItems = filteredProducts.length;
        const paginatedProducts = filteredProducts.slice(offset, offset + limit);

        // 3. Réponse standardisée
        return NextResponse.json({
            success: true,
            data: paginatedProducts,
            pagination: {
                totalItems: totalItems,
                totalPages: Math.ceil(totalItems / limit),
                currentPage: page,
            },
        });

    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: "Erreur interne du serveur",
                message: error.message
            },
            { status: 500 }
        );
    }
}*/
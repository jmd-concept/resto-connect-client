'use client'

import { useState, useEffect } from "react";
import CardFood from "./produit/CardFood";
import { useProduitData } from "@/hooks/useProduitMenuData";
import { SearchButton } from "./produit/SearchButton";
import ProduitPagination from "./produit/ProduitPagination";
//ICONS
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const CATEGORIES = [
  { nom: "Tous", icon: "🍽️" },
  { nom: "Entrées", icon: "🥗" },
  { nom: "Plats Principaux", icon: "🍖" },
  { nom: "Desserts", icon: "🍰" },
  { nom: "Boissons", icon: "🍹" },
  { nom: "Autres", icon: "✨" }
];

export default function MenuCard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setSelectedCategory("Tous");
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const { data, loading, error } = useProduitData(
    currentPage,
    postsPerPage,
    selectedCategory === "Tous" ? "" : selectedCategory,
    debouncedSearch
  );

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const produits = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

  if (loading) {
    return (
      <div className="p-6 text-center w-full min-h-[400px] flex items-center justify-center bg-amber-50">
        <p className="text-amber-800 font-medium animate-pulse">Chargement des données...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-rose-500 font-semibold bg-amber-50">
        Erreur : {error}
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-6 w-full h-full rounded-2xl">

      <div className="flex flex-col items-center gap-6 pb-2 w-full">

        <div className="flex gap-2 pb-3 overflow-x-auto w-full">
          {CATEGORIES.map(categorie => (
            <button
              key={categorie.nom}
              onClick={() => handleCategoryChange(categorie.nom)}
              className={`px-5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200
                            ${selectedCategory === categorie.nom
                  ? "bg-amber-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-amber-100"
                }`}
            >
              {categorie.nom} {categorie.icon}
            </button>
          ))}
        </div>

        <div className="w-full">
          <SearchButton
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {produits.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
          <div className="bg-amber-50 inline-block p-6 rounded-full mb-4">
            <FiSearch size={40} className="text-amber-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Aucun article trouvé</h3>
          <p className="text-gray-500 mt-1">Modifier vos filtres ou affinez votre recherche.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {produits.map((produit) => (
          <CardFood
            key={produit.id_produit}
            produit={produit}
          />
        ))}
      </div>

      <ProduitPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={paginate}
      />
    </div>
  );
};


// pages/index.js
import {
  FaInstagram,
  FaHeart,
  FaRegHeart,
  FaComment,
  FaShare,
  FaBookmark,
  FaEllipsisH,
  FaClock,
  FaHome,
  FaArrowRight,
  FaUserCircle,
  FaFire,
  FaCheckCircle
} from 'react-icons/fa';

export function PageHome() {
  const habits = [
    { name: 'Works', percentage: 34, color: 'bg-blue-500' },
    { name: 'Health', percentage: 79, color: 'bg-green-500' },
    { name: 'School', percentage: 32, color: 'bg-purple-500' },
    { name: 'Workout', percentage: 67, color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Main Instagram-style card */}
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">

        {/* Header Instagram */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-gray-100">
          <div className="flex items-center gap-1">
            <FaInstagram className="text-2xl text-black" />
            <span className="font-semibold text-xl tracking-tight">Instagram</span>
          </div>
          <div className="flex gap-4">
            <FaHeart className="text-xl text-black" />
            <FaComment className="text-xl text-black" />
          </div>
        </div>

        {/* Supabase Post */}
        <div className="px-4 pt-2">
          {/* Post header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 to-red-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">S</span>
              </div>
              <div>
                <span className="font-semibold text-sm">supabasecom</span>
              </div>
            </div>
            <FaEllipsisH className="text-gray-700" />
          </div>

          {/* Post content */}
          <div className="mt-2">
            <p className="text-sm">
              Passkey sign-in is here. <span className="text-gray-500">... plus</span>
            </p>
          </div>

          {/* Post actions */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-4">
              <FaRegHeart className="text-xl" />
              <FaComment className="text-xl" />
              <FaShare className="text-xl" />
            </div>
            <FaBookmark className="text-xl" />
          </div>

          {/* Likes and comments */}
          <div className="mt-2">
            <span className="font-semibold text-sm">337 J'aime</span>
          </div>
          <div className="mt-1">
            <span className="text-sm text-gray-600">Voir les 9 commentaires</span>
          </div>
          <div className="mt-1 text-xs text-gray-400 flex gap-2">
            <span>mai 29</span>
            <span>·</span>
            <span>Voir la traduction</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-3"></div>

        {/* Iconlypro Section */}
        <div className="px-4">
          <div className="flex items-center gap-2 mb-3">
            <FaUserCircle className="text-2xl text-gray-600" />
            <span className="font-bold text-base">iconlypro</span>
          </div>

          {/* Last updated and Good Morning */}
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
            <FaClock className="text-xs" />
            <span>Last updated 3 minutes ago</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">Good Morning</h2>

          {/* Habits section */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg">Your Habits</h3>
            <div className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
              <FaFire className="text-orange-500 text-sm" />
              <span className="font-semibold text-sm">49 remaining</span>
            </div>
          </div>

          {/* Habits list */}
          <div className="space-y-4">
            {habits.map((habit) => (
              <div key={habit.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{habit.name}</span>
                  <span className="text-gray-600">{habit.percentage}% in 7 days</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${habit.color} h-2 rounded-full`}
                    style={{ width: `${habit.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Home and Swipe for More */}
          <div className="flex items-center justify-between mt-6 py-2">
            <div className="flex items-center gap-1">
              <FaHome className="text-gray-700" />
              <span className="font-medium">Home</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <span className="text-sm">Swipe for More</span>
              <FaArrowRight className="text-sm" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-2"></div>

        {/* Bottom interactions */}
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <FaHeart className="text-red-500 text-lg" />
            <span className="text-sm">
              Aimé par <span className="font-semibold">sujon.co</span> et <span className="font-semibold">1 057 autres personnes</span>
            </span>
          </div>

          <div className="mb-1">
            <span className="font-semibold text-sm">iconlypro</span>
            <span className="text-sm ml-1">Great products feel simple.</span>
            <span className="text-gray-500 text-sm ml-1">... plus</span>
          </div>

          <div className="mt-2">
            <span className="text-sm text-gray-600">Voir les 9 commentaires</span>
          </div>
        </div>
      </div>
    </div>
  );
}

//const [totalPrix, setTotalPrix] = useState(0);

/* useEffect(() => {
  const stored = localStorage.getItem("panier_data");
  if (stored) {
    setCart(JSON.parse(stored));
  }
}, []); */

/*  useEffect(() => {
   localStorage.setItem("panier_data", JSON.stringify(cart));
   const total = cart.reduce((sum, item) => sum + parseFloat(item.prix || 0), 0);
   setTotalPrix(total);
 }, [cart]); */

/*  const handleAddToCart = (book) => {
   const itemToAdd = { ...book, cartId: Date.now() + Math.random() };
   setCart((prev) => [...prev, itemToAdd]);
 }; */












/**
 * 'use client'

import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const [socket, setSocket] = useState(null);
  const [index, setIndex] = useState(["hello", "Nice"]);
  const [message, setMessage] = useState("");
  const [roomName, setRoomName] = useState("");

  const handleSendMessage = () => {
    socket.emit("message", { room: roomName, content: message });
  }

  useEffect(() => {
    const newSocket = io("http://localhost:5003");
    newSocket.on('message', (message) => {
      setIndex((prev) => [...prev, message]);
    });
    setSocket(newSocket);
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold">Bienvenue sur JMD Resto Connect</h1>
      <p className="text-sm text-gray-500 mt-2">Ce projet est en cours de développement. Restez à l'écoute pour les mises à jour !</p>

      <div>
        {index.map((item, idx) => (
          <p key={idx}>{item}</p>
        ))}
      </div>

      <div>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="text"
          onChange={(e) => setRoomName(e.target.value)}
        />

        <button
          onClick={handleSendMessage}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Envoyer un message au serveur Socket.io
        </button>
      </div>
      <div>
        <p className="text-sm text-gray-500 mt-2">ID de socket actuel : {socket ? socket.id : "Non connecté"}</p>
      </div>
    </div>
  )
}

 */



'use client';

import CardFood from "./CardFood";

export default function ProduitList({
  produits,
  addToCart
}) {

  if (!produits?.length) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-semibold text-gray-900">
          Aucun article trouvé
        </h3>

        <p className="text-gray-500">
          Essayez de modifier vos filtres ou votre recherche.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {produits.map((produit) => (
        <CardFood
          key={produit.id_produit}
          produit={produit}
          onAddToCart={addToCart}
        />
      ))}
    </div>
  );
}



{/* 
  
const produitData = [
  { id_produit: 1, nom: 'Burger Classic', description: 'Bœuf, cheddar, salade, tomate, sauce maison', prix: 12.50, promo: 9.09, image: "/plats/Burger King.jpg", status: true },
  { id_produit: 2, nom: 'Pizza Margherita', description: 'Sauce tomate, mozzarella fior di latte, basilic', prix: 10.90, promo: 8.52, image: "/plats/plats1.jpg", status: false },
  { id_produit: 3, nom: 'Salade César', description: 'Poulet croustillant, romaine, parmesan, croûtons', prix: 14.00, promo: 12.78, image: "/plats/legumes.jpg", status: true },
  { id_produit: 4, nom: 'Fondant au Chocolat', description: 'Cœur coulant, glace vanille de Madagascar', prix: 6.50, promo: 0.0, image: "/plats/legumes.jpg", status: false },
  { id_produit: 5, nom: 'Fondant au Chocolat', description: 'Cœur coulant, glace vanille de Madagascar', prix: 6.50, promo: 0.0, image: "/plats/legumes.jpg", status: true },
  { id_produit: 6, nom: 'Fondant au Chocolat', description: 'Cœur coulant, glace vanille de Madagascar', prix: 6.50, promo: 0.0, image: "/plats/legumes.jpg", status: true },
]

  <div className='m-auto grid grid-cols-4 gap-8'>
  {produitData.map((produit) => {
    return (
      <CardFood
        key={produit.id_produit}
        produit={produit}
        onAddToCart={addToCart}
      />
    );
  })}
</div> */}



const produitData = [
  {
    id: 1,
    nom: 'Burger Classic',
    description: 'Bœuf, cheddar, salade, tomate, sauce maison',
    prix: 12.50,
    image: "/plats/legumes.jpg",
    disponible: true
  },
  {
    id: 2,
    nom: 'Pizza Margherita',
    description: 'Sauce tomate, mozzarella fior di latte, basilic',
    prix: 10.90,
    image: "/plats/legumes.jpg",
    disponible: true
  },
  {
    id: 3,
    nom: 'Salade César',
    description: 'Poulet croustillant, romaine, parmesan, croûtons',
    prix: 14.00,
    image: "/plats/legumes.jpg",
    disponible: true
  },
  {
    id: 4,
    nom: 'Fondant au Chocolat',
    description: 'Cœur coulant, glace vanille de Madagascar',
    prix: 6.50,
    image: "/plats/legumes.jpg",
    disponible: true
  },
]


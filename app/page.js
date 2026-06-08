'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from 'framer-motion';
import useMenuStore from '@/stores/useMenuStore';
import useCartStore from '@/stores/usePanierStore';
import { useFormStore } from "@/stores/useFormStore";

import dynamic from 'next/dynamic';
import { useTheme } from "@/context/useThemeProvider";

// Chargement dynamique des composants principaux (SSR désactivé)
const NavBarComponent = dynamic(() => import('../component/NavBar'), { ssr: false });
const HeroComponent = dynamic(() => import('../component/Hero'), { ssr: false });
const MenuCard = dynamic(() => import('../component/Menu'), { ssr: false });
const AvisSlider = dynamic(() => import('../component/avis/AvisSlider'), { ssr: false });
const FooterComponent = dynamic(() => import('../component/Footer'), { ssr: false });
//FORMULAIRE
const FormCommande = dynamic(() => import('../component/Formulaires/FormCommande'), { ssr: false });
const FormLivraison = dynamic(() => import('../component/Formulaires/FormLivraison'), { ssr: false });
const FormReservation = dynamic(() => import('../component/Formulaires/FormReservation'), { ssr: false });

const Preloader = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    className="fixed inset-0 z-[999] bg-white flex items-center justify-center text-black"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-4"
    >
      <h1 className="uppercase text-4xl md:text-6xl font-bold tracking-tighter">
        JMD RestConnect <br />
        <motion.span
          initial={{ letterSpacing: "0.1em", opacity: 0 }}
          animate={{ letterSpacing: "0.3em", opacity: 1 }}
          transition={{ duration: 1.2 }}
          className='text-xs block text-neutral-500'
        >
          PROFESSIONAL
        </motion.span>
      </h1>
    </motion.div>
  </motion.div>
);

const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Extract the hash from the window object safely inside useEffect
    const hash = window.location.hash;

    if (hash) {
      setTimeout(() => {
        try {
          // Use decodeURIComponent in case your hash contains special formatting
          const element = document.querySelector(decodeURIComponent(hash));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } catch (error) {
          console.warn("Invalid selector from hash:", hash, error);
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]); // Monitored via pathname transitions

  return null;
};

export default function Home() {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Stores Zustand
  const cart = useCartStore((state) => state.cart);
  const searchQuery = useMenuStore((state) => state.searchQuery);
  const { activeForm, closeForm, openForm } = useFormStore();

  // On garde ce useState uniquement s'il gère un panneau spécifique aux avis/footer
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleShowPanel = () => {
    setIsPanelOpen(prev => !prev);
  };

  // Actions pour ouvrir tes formulaires directement via le Store Zustand global
  const handleOpenOrderForm = () => {
    if (cart.length > 0) {
      openForm('commande'); // Ouvre le tiroir de commande Zustand
    } else {
      alert("Votre panier est vide !");
    }
  };

  const handleOpenTableForm = () => {
    openForm('reservation'); // Ouvre le tiroir de réservation Zustand
  };

  return (
    <div className={`${isDark ? "bg-zinc-900 text-white" : "bg-white text-black"} w-screen min-h-screen font-sans overflow-x-hidden`}>

      <ScrollToTop />

      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      {!loading && (
        <>
          <NavBarComponent
            cartCount={cart.length}
            openOrderForm={handleOpenOrderForm}
          />

          {/* Contenu principal */}
          <main className="pt-25 flex gap-6 w-full m-auto max-w-xl md:max-w-7xl flex-col px-2 sm:items-start">

            {/* N'affiche le Hero que s'il n'y a pas de recherche en cours */}
            {!searchQuery && (
              <HeroComponent
                openOrderForm={handleOpenOrderForm}
                openTableForm={handleOpenTableForm}
              />
            )}

            <MenuCard />

            <AvisSlider
              handleShowPanel={handleShowPanel}
            />

            <FooterComponent
              isPanelOpen={isPanelOpen}
              handleShowPanel={handleShowPanel}
            />
          </main>

          {activeForm && (
            <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm z-50 animate-fade-in">
              {/* Arrière-plan cliquable pour fermer le formulaire */}
              <div className="absolute inset-0" onClick={closeForm} />

              <div className="mt-2 flex-1 max-w-lg z-10">
                {(() => {
                  const FormComponents = {
                    commande: FormCommande,
                    livraison: FormLivraison,
                    reservation: FormReservation,
                  };
                  const Component = FormComponents[activeForm];
                  return Component ? <Component closeForm={closeForm} /> : null;
                })()}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}


'use client'

import { useState } from "react"
import { menuData } from "@/lib/constants/data"
import CategorieSection from "./CategorieSection"

const MenuPrincipal = () => {
    const [activeCategory, setActiveCategory] = useState(menuData[0].id)

    const scrollToCategory = (categoryId) => {
        const element = document.getElementById(categoryId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            setActiveCategory(categoryId)
        }
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-2">

            <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm mb-8 p-4 flex flex-wrap justify-center gap-2">
                {menuData.map((category) => {
                    const Icon = category.icon
                    return (
                        <button
                            key={category.id}
                            onClick={() => scrollToCategory(category.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${activeCategory === category.id
                                ? 'bg-amber-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-amber-100'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span className="font-medium">{category.name}</span>
                        </button>
                    )
                })}
            </div>

            {menuData.map((category) => (
                <div key={category.id} id={category.id}>
                    <CategorieSection category={category} />
                </div>
            ))}

            <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                <p>📍 Livraison disponible • 🕒 Lun - Dim : 12h - 22h</p>
                <p className="mt-1">✨ Tous nos plats sont préparés avec des produits frais</p>
            </div>
        </div>
    )
}

export default MenuPrincipal;
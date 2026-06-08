'use client'

import { useEffect } from "react";
import { useTheme } from "@/context/useThemeProvider";
// Store & State
import useClientStore from "@/stores/useClientStore";

// Swiper Components & Modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";

export default function AvisSlider({ handleShowPanel }) {
    const { isDark } = useTheme();
    const { avis, fetchData, loading } = useClientStore();

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const renderStars = (note) => {
        const totalStars = 5;
        const noteNumber = Number(note) || 0;

        return (
            <div className="flex text-amber-400 text-lg">
                {Array.from({ length: totalStars }, (_, index) => (
                    <span key={index}>
                        {index < noteNumber ? "★" : "☆"}
                    </span>
                ))}
            </div>
        );
    };

    if (loading && avis.length === 0) {
        return (
            <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (avis.length === 0) {
        return (
            <div className="m-auto max-w-4xl px-6 py-2 rounded-2xl">
                <p className="text-center text-gray-500 my-8">
                    Aucun avis client pour le moment.
                </p>
            </div>
        );
    }

    return (
        <div className={`w-full max-w-7xl mx-auto px-8 py-18 mt-8 rounded-2xl
        ${isDark
                ? "bg-gray-950 text-gray-200"
                : "bg-slate-200 text-gray-700"}`}
        >

            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 gap-6 mb-16">
                <h2 className="md:pl-8 text-3xl font-bold text-center sm:text-left">
                    Ce que nos clients disent de nous
                </h2>

                <button
                    onClick={handleShowPanel}
                    className="flex items-center justify-center gap-2 px-6 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-medium text-sm shadow-md hover:shadow-amber-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 whitespace-nowrap self-stretch sm:self-auto"
                >
                    <span className="inline-block animate-pulse">✨</span>
                    Votre avis nous intéresse
                </button>
            </div>

            <div className="w-full px-8">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    centeredSlides={avis.length < 3}
                    centeredSlidesBounds={true}
                    autoplay={{
                        delay: 6000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            centeredSlides: avis.length < 2,
                        },
                        1024: {
                            slidesPerView: 3,
                            centeredSlides: avis.length < 3,
                        },
                    }}
                    className="pb-12"
                >
                    {avis.map((item, index) => (
                        <SwiperSlide key={item.id || index} className="h-full">
                            <div className={`border border-gray-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-52
                                ${isDark
                                    ? "text-gray-300"
                                    : "bg-white"}`}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        {renderStars(item.note)}
                                        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                            {item.note}/5
                                        </span>
                                    </div>

                                    <p className="text-sm line-clamp-4 italic">
                                        "{item.commentaire || "Pas de commentaire écrit."}"
                                    </p>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-sky-400 flex items-center justify-center text-white text-xs font-bold uppercase shrink-0">
                                        {item.Client?.email ? item.Client.email[0] : "?"}
                                    </div>

                                    <span className="text-xs font-medium text-gray-500 truncate max-w-[180px]">
                                        {item.Client?.email || "Client Anonyme"}
                                    </span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
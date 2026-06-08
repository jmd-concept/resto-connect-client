'use client'

import useClientStore from "@/stores/useClientStore";
import { IoIosRefreshCircle } from "react-icons/io";

export default function AvisClient({ handleShowPanel }) {
    const {
        formData,
        loading,
        handleChange,
        handleSubmit
    } = useClientStore();

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl flex flex-col gap-4 p-6 rounded-xl bg-black/80 backdrop-blur-sm"
        >

            <div className="flex justify-between">
                <h3 className="text-gray-200">Laissez-nous votre avis</h3>
                <button
                    type="button"
                    disabled={loading}
                    onClick={handleShowPanel}
                    className="text-blue-50 rounded-2xl font-bold text-md shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className="relative group space-y-4">
                <div className="flex gap-x-4 items-center">
                    <div>
                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
                            Votre adresse mail
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="votre@email.com"
                            className="mt-2 w-full pl-5 pr-5 py-3 bg-white text-gray-800 border border-gray-100 rounded-xl placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 shadow-lg"
                            required
                        />
                    </div>

                    <div className="">
                        <label htmlFor="note" className="block text-xs font-bold uppercase tracking-widest text-gray-400 ml-1 pt-2">
                            Note (sur 5)
                        </label>
                        <input
                            id="note"
                            type="number"
                            name="note"
                            min="1"
                            max="5"
                            value={formData.note}
                            onChange={handleChange}
                            placeholder="Ex: 5"
                            className="mt-2 w-full pl-8 pr-5 py-3 bg-white text-gray-800 border border-gray-100 rounded-xl placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-lg"
                            required
                        />
                    </div>
                </div>


                <label htmlFor="commentaire" className="block text-xs font-bold uppercase tracking-widest text-gray-400 ml-1 pt-2">
                    Votre message
                </label>
                <textarea
                    id="commentaire"
                    name="commentaire"
                    rows="3"
                    value={formData.commentaire}
                    onChange={handleChange}
                    className="mt-2 w-full px-5 py-2 text-gray-800 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white border border-gray-200 resize-none"
                    placeholder="Votre avis ici"
                    required
                ></textarea>
            </div>

            <div className="flex gap-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-2 bg-blue-700 text-blue-50 rounded-2xl font-bold text-md shadow-xl hover:bg-sky-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70"
                >
                    {loading ? <IoIosRefreshCircle className="animate-spin text-2xl" /> : "Envoyer"}
                </button>
            </div>
        </form>
    );
}
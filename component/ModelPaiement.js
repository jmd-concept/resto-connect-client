'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation'
import useCartStore from "@/stores/usePanierStore";

import { FiChevronDown } from 'react-icons/fi';
import { triggerNotification } from "@/utils/triggerNotification";

export default function PaymentModal() {
    const router = useRouter()
    const totalPrix = useCartStore((state) => state.totalPrix);
    const clearCart = useCartStore((state) => state.clearCart);

    const [paymentMethod, setPaymentMethod] = useState('mobile_money');
    const [formData, setFormData] = useState({
        fullName: '',
        adresse: '',
        phoneNumber: '',
        provider: '',
        cardNumber: '',
        cardExpiry: '',
        cardCvc: ''
    });

    const message = paymentMethod === "cash"
        ? "Commande valider avec success !"
        : `Le paiement de ${totalPrix.toLocaleString()} $ via ${paymentMethod === 'mobile_money' ? 'Mobile Money' : 'Carte Visa/Mastercard'} a été effectué avec succès !`;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!formData.fullName) {
            Swal.fire({
                title: 'Erreur',
                text: 'Veuillez entrer votre nom complet.',
                icon: 'error',
                confirmButtonColor: '#f59e0b'
            });
            return;
        }

        const configs = {
            success: {
                title: 'Opération réussie',
                text: message,
                icon: 'success',
                confirmButtonColor: '#7cd1f9'
            },
        };

        Swal.fire(configs['success']).then(() => {
            onClose();
        });
        triggerNotification("Success", "Opération réussie")
        clearCart();
        setTimeout(() => router.push('/'), 5000);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 bg-black/80 backdrop-blur-sm">
            <div className="bg-slate-800 border border-amber-500/20 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-200">

                <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-amber-100">Finaliser la commande</h3>

                    <Link
                        href="/"
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4 text-slate-300">

                    <p className="text-lg">
                        Total à payer : <span className="text-amber-400 font-bold">{totalPrix.toLocaleString()} $</span>
                    </p>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-400">Moyen de paiement</label>

                        <div className="grid grid-cols-3 gap-6 mt-2.5">
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('mobile_money')}
                                className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${paymentMethod === 'mobile_money'
                                    ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                                    : 'border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600'
                                    }`}
                            >
                                <span className="text-xl">📱</span>
                                <span className="text-sm font-medium">Mobile Money</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('card')}
                                className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${paymentMethod === 'card'
                                    ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                                    : 'border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600'
                                    }`}
                            >
                                <span className="text-xl">💳</span>
                                <span className="text-sm font-medium">Carte Visa / MC</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('cash')}
                                className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${paymentMethod === 'cash'
                                    ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                                    : 'border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600'
                                    }`}
                            >
                                <span className="text-xl">💵</span>
                                <span className="text-sm font-medium">Cash</span>
                            </button>
                        </div>
                    </div>

                    {/* Information commune */}
                    <div className="flex gap-4 space-y-1">
                        <div>
                            <label className="text-sm text-slate-400">Nom complet</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder="Ex: Votre nom complet"
                                className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-white focus:outline-none focus:border-amber-500 transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm text-slate-400">Adresse Complet</label>
                            <input
                                type="text"
                                name="adresse"
                                value={formData.adresse}
                                onChange={handleInputChange}
                                placeholder="Ex: Votre adresse complet"
                                className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-white focus:outline-none focus:border-amber-500 transition-colors"
                                required
                            />
                        </div>

                    </div>

                    {paymentMethod === 'mobile_money' && (
                        <div className="space-y-2 animate-in fade-in duration-150">
                            <div className="space-y-1">
                                <label className="text-sm text-slate-400">Opérateur</label>
                                <div className="relative">
                                    <select
                                        name="provider"
                                        value={formData.provider}
                                        onChange={handleInputChange}
                                        className="w-full px-5 py-3 rounded-2xl border border-slate-700 bg-slate-900 text-white outline-none appearance-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all"
                                        required
                                    >
                                        <option value="" disabled>Sélectionnez un opérateur</option>
                                        <option value="orange">Orange Money</option>
                                        <option value="mopesa">M-Pesa</option>
                                        <option value="airtel">Airtel Money</option>
                                    </select>

                                    <FiChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm text-slate-400">Numéro de téléphone</label>
                                <input
                                    type="number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    placeholder="Ex: +243 850 000 000"
                                    className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-white focus:outline-none focus:border-amber-500 transition-colors"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {paymentMethod === 'card' && (
                        <div className="space-y-2 animate-in fade-in duration-150">
                            <div className="space-y-1">
                                <label className="text-sm text-slate-400">Numéro de carte</label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                    placeholder="0000 0000 0000 0000"
                                    className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-white focus:outline-none focus:border-amber-500 transition-colors"
                                    maxLength="16"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                    <label className="text-sm text-slate-400">Date d'expiration</label>
                                    <input
                                        type="text"
                                        name="cardExpiry"
                                        value={formData.cardExpiry}
                                        onChange={handleInputChange}
                                        placeholder="MM/AA"
                                        className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-white focus:outline-none focus:border-amber-500 transition-colors"
                                        maxLength="5"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm text-slate-400">CVC / CVC2</label>
                                    <input
                                        type="text"
                                        name="cardCvc"
                                        value={formData.cardCvc}
                                        onChange={handleInputChange}
                                        placeholder="123"
                                        className="w-full bg-slate-900 border border-slate-700 p-3 rounded-xl text-white focus:outline-none focus:border-amber-500 transition-colors"
                                        maxLength="3"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {paymentMethod === "cash" && (
                        <div className='text-center p-6 text-sm bg-gray-700 rounded-2xl'>
                            Merci de <strong>valider votre commande</strong> et de passer dans notre restaurant pour <strong>payer votre commande</strong> ou <strong>attendre le livreur</strong>.
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full mt-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer shadow-lg shadow-amber-500/10"
                    >
                        {paymentMethod === "cash" ? 'Valider la commande' : ' Confirmer le paiement'}
                    </button>
                </form>
            </div>
        </div>
    );
}
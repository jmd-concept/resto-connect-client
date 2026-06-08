'use client'

export default function Error({ error, reset }) {

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center">

            <h1 className="text-3xl font-bold mb-4">
                Une erreur est survenue
            </h1>

            <p className="text-gray-600 mb-6">
                {error?.message || "Erreur inattendue"}
            </p>

            <button
                onClick={() => reset()}
                className="px-6 py-3 bg-blue-600 text-white rounded"
            >
                Réessayer
            </button>

        </div>
    )
}
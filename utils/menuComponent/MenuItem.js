
const MenuItem = ({ item }) => {
    const IconComponent = item.icon

    return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex items-start gap-4">
            {/* Icône */}
            <div className="flex-shrink-0 w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
                <IconComponent className="w-6 h-6" />
            </div>

            {/* Détails */}
            <div className="flex-grow">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        {item.name}
                        {item.isVegetarian && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                Végé
                            </span>
                        )}
                        {item.isSpicy && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                                🌶️ Épicé
                            </span>
                        )}
                    </h3>
                    <span className="text-lg font-bold text-amber-600">
                        {item.price.toFixed(2)} €
                    </span>
                </div>
                <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
        </div>
    )
}

export default MenuItem;

import {
    FiChevronLeft,
    FiChevronRight
} from "react-icons/fi";

export default function ProduitPagination({
    currentPage,
    totalPages,
    onPageChange
}) {
    return (
        <div className="flex justify-center gap-2 text-gray-500">
            {totalPages > 1 && (
                <>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                        className="px-4 py-1.5 rounded-xl border bg-white border-gray-500 disabled:opacity-30 hover:bg-amber-100 hover:text-gray-200 transition-colors"
                    >
                        <FiChevronLeft />
                    </button>

                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => onPageChange(i + 1)}
                            className={`w-16 h-10 rounded-xl font-bold transition-all ${currentPage === i + 1
                                ? "bg-gray-600 text-white shadow-md"
                                : "bg-white text-gray-600 hover:bg-amber-100"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => onPageChange(currentPage + 1)}
                        className="px-4 py-1.5 rounded-xl border bg-white border-gray-500 disabled:opacity-30 hover:bg-gray-500 hover:text-gray-200 transition-colors"
                    >
                        <FiChevronRight />
                    </button>

                </>
            )}
        </div>
    );
}


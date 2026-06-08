import { FiSearch } from "react-icons/fi";

export function SearchButton({ value, onChange }) {
    return (
        <div className="relative w-full max-w-xs md:max-w-md mx-auto flex items-center">
            <FiSearch size={18} className="absolute left-3 text-gray-400 pointer-events-none z-10" />
            <input
                type="text"
                placeholder="Rechercher un plat..."
                value={value}
                onChange={onChange}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-amber-500 bg-gray-50 text-black placeholder-gray-400"
            />
        </div>
    );
}
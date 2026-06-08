
export default function ProduitFilters({
    categories,
    selectedCategory,
    onChange
}) {
    return (
        <div className="flex gap-2 overflow-x-auto">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => onChange(cat)}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}

/**
 * export default function CategoryFilter({
categories,
onChange,
}) {
return (
    <select
        onChange={(e) =>
            onChange(e.target.value)
        }
        className="border p-2"
    >
        <option value="">
            Toutes
        </option>

        {categories.map((cat) => (
            <option
                key={cat.id}
                value={cat.name}
            >
                {cat.name}
            </option>
        ))}
    </select>
);
}
 */
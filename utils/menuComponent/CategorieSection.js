
import MenuItem from "./MenuItem";

const CategorySection = ({ category }) => {
    const CategoryIcon = category.icon

    return (
        <section className="mb-12">
            <div className="flex items-center gap-3 mb-6 pb-2 border-b-2 border-amber-200">
                <CategoryIcon className="w-7 h-7 text-amber-600" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-400">
                    {category.name}
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {category.items.map((item) => (
                    <MenuItem key={item.id} item={item} />
                ))}
            </div>
        </section>
    )
}

export default CategorySection;

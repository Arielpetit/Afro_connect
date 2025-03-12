interface CategoriesGridProps {
    categories: any[];
    onCategoryClick: (categoryName: string) => void;
  }
  
  export const CategoriesGrid = ({ categories, onCategoryClick }: CategoriesGridProps) => (
    <div className="mb-12 md:mb-16 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
        Trouvez votre expert
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(({ name, image }) => (
          <div
            key={name}
            onClick={() => onCategoryClick(name)}
            className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100"
          >
            <div className="aspect-video w-full overflow-hidden rounded-lg">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mt-6 text-center group-hover:text-blue-600 transition-colors">
              {name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
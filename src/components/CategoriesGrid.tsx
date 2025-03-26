import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

interface CategoriesGridProps {
  categories: { name: string; image: string }[];
  onCategoryClick: (categoryName: string) => void;
}

export const CategoriesGrid = ({
  categories,
  onCategoryClick,
}: CategoriesGridProps) => {
  const location = useLocation();
  const title =
    location.pathname === "/profile-liste"
      ? "Liste des professionnels"
      : "Trouvez votre expert immobilier facilement";

  return (
    <div className="mb-12 md:mb-16 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent"
      >
        {title}
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {categories.map(({ name, image }, index) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group relative cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div
              onClick={() => onCategoryClick(name)}
              className="relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 transition-all h-full shadow-sm hover:shadow-lg"
            >
              <div className="overflow-hidden rounded-xl mb-4 relative">
                <motion.img
                  src={image}
                  alt={name}
                  className="w-full h-48 object-cover rounded-xl"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {name}
              </h3>

              <div className="absolute bottom-6 right-6 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg 
                  className="w-4 h-4 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
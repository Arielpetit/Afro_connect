import { FiStar, FiMapPin, FiGlobe, FiAward } from "react-icons/fi";

interface FiltersSectionProps {
  filters: any;
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const FiltersSection = ({ filters, onFilterChange }: FiltersSectionProps) => (
  <div className="bg-white rounded-2xl shadow-sm p-6 mb-12 border border-gray-100">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Rating Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Évaluation minimum
        </label>
        <div className="relative">
          <FiStar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            name="rating"
            value={filters.rating}
            onChange={onFilterChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          >
            <option value={0}>Toutes les évaluations</option>
            <option value={4}>4 étoiles et plus</option>
            <option value={3}>3 étoiles et plus</option>
            <option value={2}>2 étoiles et plus</option>
            <option value={1}>1 étoile et plus</option>
          </select>
        </div>
      </div>

      {/* Location Filter */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Localisation
        </label>
        <div className="relative">
          <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            name="coverageZone"
            value={filters.coverageZone}
            onChange={onFilterChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          >
            <option value="">Zone de couverture</option>
            <option value="Alberta">Alberta</option>
            <option value="Colombie-Britannique">Colombie-Britannique</option>
            <option value="Île-du-Prince-Édouard">Île-du-Prince-Édouard</option>
            <option value="Manitoba">Manitoba</option>
            <option value="Nouveau-Brunswick">Nouveau-Brunswick</option>
            <option value="Nouvelle-Écosse">Nouvelle-Écosse</option>
            <option value="Nunavut">Nunavut</option>
            <option value="Ontario">Ontario</option>
            <option value="Québec">Québec</option>
            <option value="Saskatchewan">Saskatchewan</option>
            <option value="Terre-Neuve-et-Labrador">Terre-Neuve-et-Labrador</option>
            <option value="Territoires du Nord-Ouest">Territoires du Nord-Ouest</option>
            <option value="Yukon">Yukon</option>
          </select>
          <FiGlobe className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Experience Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Expérience
        </label>
        <div className="relative">
          <FiAward className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            name="experience"
            value={filters.experience}
            onChange={onFilterChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          >
            <option value={0}>Toutes expériences</option>
            <option value={1}>1+ année</option>
            <option value={2}>2+ années</option>
            <option value={3}>3+ années</option>
            <option value={5}>5+ années</option>
            <option value={7}>7+ années</option>
            <option value={10}>10+ années</option>
            <option value={15}>15+ années</option>
          </select>
        </div>
      </div>

      {/* Language Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Langues
        </label>
        <div className="relative">
          <FiGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            name="languages"
            value={filters.languages}
            onChange={onFilterChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          >
            <option value="">Langues</option>
            <option value="français">Français</option>
            <option value="anglais">Anglais</option>
            <option value="espagnol">Espagnol</option>
            <option value="allemand">Allemand</option>
            <option value="italien">Italien</option>
            <option value="portugais">Portugais</option>
            <option value="arabe">Arabe</option>
            <option value="chinois">Chinois</option>
            <option value="russe">Russe</option>
            <option value="japonais">Japonais</option>
            <option value="néerlandais">Néerlandais</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);
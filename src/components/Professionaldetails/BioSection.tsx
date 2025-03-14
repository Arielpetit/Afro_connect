import { FiInfo } from "react-icons/fi";

export const BioSection = ({ bio }: { bio: string }) => (
  <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border-l-4 border-indigo-500">
    <div className="flex items-center gap-2 mb-3">
      <FiInfo className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800">À propos de moi</h3>
    </div>
    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
      {bio || "Aucune bio fournie"}
    </p>
  </div>
);
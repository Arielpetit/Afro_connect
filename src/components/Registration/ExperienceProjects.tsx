interface ExperienceProps {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  }
  
  const ExperienceProjects: React.FC<ExperienceProps> = ({ formData, handleChange }) => {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Années d'expérience
          </label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Projets réalisés
          </label>
          <input
            type="number"
            name="projectsCompleted"
            value={formData.projectsCompleted}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            min="0"
            required
          />
        </div>
      </div>
    );
  };
  
  export default ExperienceProjects;
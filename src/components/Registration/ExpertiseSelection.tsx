import { expertiseOptions } from "../../constants/registration";

interface ExpertiseProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const ExpertiseSelection: React.FC<ExpertiseProps> = ({ formData, handleChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Expertise *
      </label>
      <select
        name="expertise"
        value={formData.expertise}
        onChange={handleChange}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        required
      >
        <option value="">Select your expertise</option>
        {expertiseOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExpertiseSelection;
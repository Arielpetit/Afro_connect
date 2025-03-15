import { coverageZones, languages } from "../../constants/registration";
import AvailabilityPicker from "./AvailabilityPicker";
import FileUpload from "./FileUpload";

interface ProfessionalInfoProps {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const ProfessionalInfoForm: React.FC<ProfessionalInfoProps> = ({
  formData,
  handleChange,
  setFormData,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Adresse physique *
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Site web (si disponible)
        </label>
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://votresite.com"
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Zone de couverture *
        </label>
        <select
          name="coverageZone"
          value={formData.coverageZone}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="">Sélectionnez votre zone</option>
          {coverageZones.map((zone) => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Langues parlées
        </label>
        <select
          name="languages"
          value={formData.languages}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="">Sélectionnez votre Langue</option>
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Disponibilité (jours et heures de service)
        </label>
        <AvailabilityPicker formData={formData} setFormData={setFormData} />
      </div>
      <FileUpload
        name="profilePicture"
        label="Photo de Profil"
        file={formData.profilePicture}
        accept="image/*"
        onChange={handleChange}
      />
    </div>
  );
};

export default ProfessionalInfoForm;

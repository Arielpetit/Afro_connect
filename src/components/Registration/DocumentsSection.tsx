import FileUpload from "./FileUpload";

interface DocumentsProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const DocumentsSection: React.FC<DocumentsProps> = ({ formData, handleChange }) => {
  return (
    <div className="md:col-span-2 space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">Documents et références</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FileUpload
          name="businessCard"
          label="Carte d’affaires (PDF/JPG/PNG)"
          file={formData.businessCard}
          accept=".pdf,.jpg,.png"
          onChange={handleChange}
        />
        <FileUpload
          name="licenseCertification"
          label="Licence / Certification"
          file={formData.licenseCertification}
          accept=".pdf,.jpg,.png"
          onChange={handleChange}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Numéro de permis professionnel (si applicable)
          </label>
          <input
            type="text"
            name="professionalPermitNumber"
            value={formData.professionalPermitNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <FileUpload
          name="identityCard"
          label="Carte d'identité (PDF/JPG/PNG)"
          file={formData.identityCard}
          accept=".pdf,.jpg,.png"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default DocumentsSection;
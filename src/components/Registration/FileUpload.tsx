import { FiUploadCloud } from "react-icons/fi";

interface FileUploadProps {
  name: string;
  label: string;
  file: File | string | null;
  accept?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ name, label, file, accept, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
        {file ? (
          <span className="text-indigo-600">
            {typeof file === 'string' ? 'Fichier déjà téléchargé' : `Fichier sélectionné: ${file.name}`}
          </span>
        ) : (
          <div className="flex flex-col items-center">
            <FiUploadCloud className="w-6 h-6 text-gray-400 mb-2" />
            <span className="text-gray-500">Cliquez pour télécharger</span>
          </div>
        )}
        <input
          type="file"
          name={name}
          onChange={onChange}
          className="hidden"
          accept={accept}
        />
      </label>
    </div>
  );
};

export default FileUpload;
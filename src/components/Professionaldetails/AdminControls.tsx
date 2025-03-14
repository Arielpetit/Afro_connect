import { FiCheckCircle, FiTrash2, FiFile, FiFileText } from "react-icons/fi";
import { DocumentInfoCard, InfoCard } from "./InfoCard";

export const AdminControls = ({ 
  user,
  handleApprove,
  handleDelete
}: { 
  user: any;
  handleApprove: () => void;
  handleDelete: () => void;
}) => (
  <div className="bg-gray-50 p-4 sm:p-6 border-t border-b border-gray-200">
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
      <button
        onClick={handleApprove}
        className="bg-green-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 justify-center text-sm sm:text-base"
      >
        <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
        Approve Professional
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 justify-center text-sm sm:text-base"
      >
        <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
        Delete Professional
      </button>
    </div>
    
    <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border-l-4 border-indigo-500 mt-4">
      <div className="flex items-center gap-2 mb-3">
        <FiFile className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Verification Documents</h3>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        <DocumentInfoCard 
          title="Business Card"
          value={user.businessCard}
          downloadUrl={user.businessCard}
        />
        <DocumentInfoCard 
          title="License/Certification"
          value={user.licenseCertification}
          downloadUrl={user.licenseCertification}
        />
        <InfoCard 
            icon={<FiFileText className="w-5 h-5" />}
            title="Professional Permit Number"
            value={user.professionalPermitNumber || "Not provided"}
        />
        <DocumentInfoCard 
          title="Identity Card"
          value={user.identityCard}
          downloadUrl={user.identityCard}
        />
      </div>
    </div>
  </div>
);
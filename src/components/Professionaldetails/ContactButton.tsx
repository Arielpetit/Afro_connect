import { FiSend } from "react-icons/fi";

export const ContactButton = ({ onClick }: { onClick: () => void }) => (
  <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border-l-4 border-indigo-500">
    <button
      onClick={onClick}
      className="w-full sm:w-auto bg-white text-indigo-600 px-6 py-2 rounded-full hover:bg-indigo-50 transition-colors flex items-center gap-2 shadow-sm justify-center"
    >
      <FiSend className="w-5 h-5" />
      Contact
    </button>
  </div>
);

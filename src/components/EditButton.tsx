import React from "react";

interface EditButtonProps {
  onEdit: (id: string) => void;
  resource: { id: string };
}

const EditButton: React.FC<EditButtonProps> = ({ onEdit, resource }) => (
  <button
    onClick={() => onEdit(resource.id)}
    className="flex items-center gap-1 px-2 py-1 text-blue-600 bg-white rounded-md border border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
    aria-label="Edit"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 114.95 0 2.5 2.5 0 01-4.95 0M4 13.5v-1a4 4 0 014-4h1"
      />
    </svg>
    <span className="text-xs font-medium md:text-sm">Edit</span>
  </button>
);

export default EditButton;

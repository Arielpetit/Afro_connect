import React from "react";

interface ApproveButtonProps {
  onApprove: (id: string) => void;
  user: { id: string };
}

const ApproveButton: React.FC<ApproveButtonProps> = ({ onApprove, user }) => (
  <button
    onClick={() => onApprove(user.id)}
    className="flex items-center gap-1 px-2 py-1 text-green-600 bg-white rounded-md border border-green-200 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
    aria-label="Approve"
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
        d="M5 13l4 4L19 7"
      />
    </svg>
    <span className="text-xs font-medium md:text-sm">Approve</span>
  </button>
);

export default ApproveButton;

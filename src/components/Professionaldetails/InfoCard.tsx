import React from "react";
import { FiFile, FiFileText, FiDownload } from "react-icons/fi";

export const InfoCard = ({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-start gap-3 p-3 sm:p-4 bg-white rounded-lg border border-gray-100 hover:border-indigo-100 transition-colors duration-200">
    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">{icon}</div>
    <div className="flex-1 min-w-0">
      <h4 className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">
        {title}
      </h4>
      <div className="mt-1 text-base sm:text-lg text-gray-800 font-medium break-words">
        {value || "-"}
      </div>
    </div>
  </div>
);

export const DocumentInfoCard = ({
  title,
  value,
  downloadUrl,
  iconType = "file",
}: {
  title: string;
  value: string;
  downloadUrl?: string;
  iconType?: "file" | "text";
}) => (
  <InfoCard
    icon={
      iconType === "file" ? (
        <FiFile className="w-5 h-5" />
      ) : (
        <FiFileText className="w-5 h-5" />
      )
    }
    title={title}
    value={
      value ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline break-all"
          >
            View {title}
          </a>
          {downloadUrl && (
            <a
              href={downloadUrl}
              download
              className="flex items-center gap-1 text-blue-500 hover:text-blue-700 text-sm font-medium"
            >
              <FiDownload className="w-4 h-4" /> Download
            </a>
          )}
        </div>
      ) : (
        "Not uploaded"
      )
    }
  />
);

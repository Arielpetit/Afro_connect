import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, FilePlus, Settings, Menu, X } from "lucide-react";
// import { FiMail } from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-gray-900 text-gray-100 p-2.5 rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300 hover:shadow-lg"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-900 text-gray-100 shadow-xl transition-all duration-300 ease-in-out 
          ${isOpen ? "w-64 opacity-100" : "w-0 opacity-0 overflow-hidden"}`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="pb-6 border-b border-gray-700 mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                ⚡
              </span>
              {isOpen && <span className="text-gray-100">Admin Portal</span>}
            </h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            <SidebarItem
              icon={<Home size={18} className="flex-shrink-0" />}
              label="Dashboard"
              isOpen={isOpen}
              onClick={() => navigate("/admin")}
            />
            <SidebarItem
              icon={<FilePlus size={18} className="flex-shrink-0" />}
              label="Add Resource"
              isOpen={isOpen}
              onClick={() => navigate("/resource/new")}
              active
            />
            {/* <SidebarItem
              icon={<FiMail size={18} className="flex-shrink-0" />}
              label="Send Email"
              isOpen={isOpen}
              onClick={() => navigate("/SendEmail")}
            /> */}

            <SidebarItem
              icon={<Settings size={18} className="flex-shrink-0" />}
              label="Settings"
              isOpen={isOpen}
              onClick={() => navigate("/settings")}
            />
          </nav>

          {/* Footer */}
          {isOpen && (
            <div className="pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-400">v2.4.0 • ProConnect</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({
  icon,
  label,
  isOpen,
  onClick,
  active = false,
}: {
  icon: JSX.Element;
  label: string;
  isOpen: boolean;
  onClick: () => void;
  active?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg transition-all duration-200
        ${
          active
            ? "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border-l-4 border-blue-500"
            : "hover:bg-gray-800 text-gray-300 hover:text-gray-100"
        }
        ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
    >
      <span className={`${active ? "text-blue-400" : "text-gray-400"}`}>
        {icon}
      </span>
      {isOpen && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
};

export default Sidebar;

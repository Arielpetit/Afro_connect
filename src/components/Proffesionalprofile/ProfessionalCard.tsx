import { FiUser, FiMail, FiBriefcase, FiClock, FiStar } from "react-icons/fi";
import { ProfessionalBadge } from "./ProfessionalBadge";

interface ProfessionalCardProps {
  user: any;
  onProfileClick: (userId: string) => void;
}

export const ProfessionalCard = ({ user, onProfileClick }: ProfessionalCardProps) => (
  <div
    key={user.id}
    onClick={() => onProfileClick(user.id)}
    className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
  >
    <div className="relative h-48 bg-indigo-50">
      <img
        src={user.profilePicture || "https://avatar.vercel.sh/placeholder"}
        alt={user.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      {user.userType === "professional" && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-lg font-semibold text-white">{user.name}</h3>
          <p className="text-sm text-indigo-200">{user.expertise}</p>
        </div>
      )}
    </div>

    <div className="p-6 space-y-4">
      {user.userType !== "professional" && (
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <FiUser className="text-indigo-600" /> {user.name}
        </h3>
      )}
      <div className="flex items-center gap-2 text-gray-600">
        <FiMail className="flex-shrink-0" />
        <span className="truncate">{user.email}</span>
      </div>
      {user.userType === "professional" && (
        <div className="space-y-2">
          <ProfessionalBadge
            icon={<FiBriefcase />}
            label="Expérience"
            value={`${user.experience} années`}
          />
          <ProfessionalBadge
            icon={<FiClock />}
            label="Projets réalisés"
            value={user.projectsCompleted ? String(user.projectsCompleted) : "N/A"}
          />
          <ProfessionalBadge
            icon={<FiStar />}
            label="Évaluation"
            value={
              user.numberOfRatings > 0
                ? `${(user.totalRatings / user.numberOfRatings).toFixed(1)}/5`
                : "Nouveau"
            }
          />
        </div>
      )}
    </div>
  </div>
);
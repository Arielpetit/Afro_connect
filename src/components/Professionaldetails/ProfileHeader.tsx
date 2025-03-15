import { FiStar } from "react-icons/fi";

export const ProfileHeader = ({ user }: { user: any }) => (
  <div className="bg-indigo-600 p-6 sm:p-8 text-center">
    <div className="relative inline-block group">
      <img
        src={user.profilePicture || "https://avatar.vercel.sh/placeholder"}
        alt="Profile"
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg transform group-hover:scale-105 transition-transform duration-200 object-cover"
      />
    </div>
    <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-white">
      {user.name}
    </h1>
    {user.userType === "professional" && (
      <div className="mt-4">
        <p className="text-indigo-100">{user.expertise}</p>
        <div className="mt-2 flex justify-center items-center gap-2">
          <FiStar className="text-yellow-400" />
          <span className="text-white font-medium">
            {user.numberOfRatings > 0
              ? (user.totalRatings / user.numberOfRatings).toFixed(1)
              : "Nouveau"}
          </span>
          <span className="text-indigo-200 text-sm">
            ({user.numberOfRatings} avis)
          </span>
        </div>
      </div>
    )}
  </div>
);

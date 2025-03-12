
interface ProfessionalBadgeProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export const ProfessionalBadge = ({
  icon,
  label,
  value,
}: ProfessionalBadgeProps) => (
  <div className="flex items-center gap-3 text-sm">
    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">{icon}</div>
    <div>
      <span className="block text-gray-600">{label}</span>
      <span className="text-indigo-600">{value}</span>
    </div>
  </div>
);
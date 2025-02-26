    export const ProfessionalsTable = ({ users, onDelete, onRowClick }: { 
      users: any[], onDelete: (userId: string) => void ,
      onRowClick: (userId: string) => void 
    }
    ) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="p-4 md:p-6">
      <h3 className="text-base md:text-lg font-semibold mb-4">Professional Management</h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] md:min-w-0">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expertise</th>
              <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone</th>
              <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exp.</th>
              <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
              <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
                <tr 
                key={user.id}
                onClick={() => onRowClick(user.id)}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">{user.name}</td>
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">{user.expertise}</td>
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">{user.coverageZone}</td>
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">{user.experience} yrs</td>
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">{user.projectsCompleted}</td>
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => onDelete(user.id)}
                    className="text-red-600 hover:text-red-900 text-xs md:text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
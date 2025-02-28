import ApproveButton from "./ApproveButton";
import DeleteButton from "./DeleteButton";

export const PendingApprovalsTable = ({ 
    users, 
    onApprove, 
    onDelete,
    onRowClick 
  }: { 
    users: any[], 
    onApprove: (userId: string) => void, 
    onDelete: (userId: string) => void,
    onRowClick: (userId: string) => void 
  }) => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-8">
      <div className="p-4 md:p-6">
        <h3 className="text-base md:text-lg font-semibold mb-4">Pending Approvals</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] md:min-w-0">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expertise</th>
                <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone</th>
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
                  <td 
                    className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm space-x-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                  <div className="flex items-center gap-2">
                  <ApproveButton onApprove={onApprove} user={user} />
                  <DeleteButton onDelete={onDelete} user={user} />
                </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
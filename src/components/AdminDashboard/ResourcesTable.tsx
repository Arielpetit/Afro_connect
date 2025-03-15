import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

const resourceCategories = [
  { id: "market-trends", name: "Market Trends" },
  { id: "buying-guides", name: "Buying Guides" },
  { id: "legal-advice", name: "Legal Advice" },
  { id: "investment-strategies", name: "Investment Strategies" },
];

export const ResourcesTable = ({
  resources,
  onEdit,
  onDelete,
}: {
  resources: any[];
  onEdit: (resourceId: string) => void;
  onDelete: (resourceId: string) => void;
}) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-8">
    <div className="p-4 md:p-6">
      <h3 className="text-base md:text-lg font-semibold mb-4">
        Resource Management
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] md:min-w-0">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Source
              </th>
              <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {resources.map((resource) => (
              <tr key={resource.id}>
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">
                  {resource.title}
                </td>
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">
                  {
                    resourceCategories.find((c) => c.id === resource.category)
                      ?.name
                  }
                </td>
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm">
                  {resource.source}
                </td>
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm space-x-3">
                  <div className="flex items-center gap-2">
                    <EditButton onEdit={onEdit} resource={resource} />
                    <DeleteButton onDelete={onDelete} user={resource} />
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

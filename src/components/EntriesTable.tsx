import { MoreVertical, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

const entries = [
  {
    id: 1,
    project: 'Website Redesign',
    client: 'Acme Corp',
    status: 'In Progress',
    priority: 'High',
    date: '2024-11-15',
    budget: '$45,000',
    completion: 65,
  },
  {
    id: 2,
    project: 'Mobile App Development',
    client: 'TechStart Inc',
    status: 'In Progress',
    priority: 'High',
    date: '2024-11-10',
    budget: '$120,000',
    completion: 40,
  },
  {
    id: 3,
    project: 'Brand Identity',
    client: 'Creative Studios',
    status: 'Completed',
    priority: 'Medium',
    date: '2024-10-28',
    budget: '$15,000',
    completion: 100,
  },
  {
    id: 4,
    project: 'E-commerce Platform',
    client: 'ShopEasy',
    status: 'In Progress',
    priority: 'High',
    date: '2024-11-18',
    budget: '$85,000',
    completion: 25,
  },
  {
    id: 5,
    project: 'Marketing Campaign',
    client: 'GrowthCo',
    status: 'Planning',
    priority: 'Low',
    date: '2024-11-20',
    budget: '$8,500',
    completion: 10,
  },
  {
    id: 6,
    project: 'API Integration',
    client: 'DataFlow',
    status: 'In Progress',
    priority: 'Medium',
    date: '2024-11-12',
    budget: '$32,000',
    completion: 55,
  },
  {
    id: 7,
    project: 'Cloud Migration',
    client: 'Enterprise Systems',
    status: 'Planning',
    priority: 'High',
    date: '2024-11-25',
    budget: '$95,000',
    completion: 5,
  },
  {
    id: 8,
    project: 'Dashboard Analytics',
    client: 'Metrics Pro',
    status: 'Completed',
    priority: 'Medium',
    date: '2024-10-15',
    budget: '$28,000',
    completion: 100,
  },
];

const statusColors: Record<string, string> = {
  'In Progress': 'bg-blue-100 text-blue-700',
  'Completed': 'bg-green-100 text-green-700',
  'Planning': 'bg-purple-100 text-purple-700',
};

const priorityColors: Record<string, string> = {
  'High': 'text-red-600',
  'Medium': 'text-orange-600',
  'Low': 'text-slate-600',
};

export function EntriesTable() {
  const [showOptions, setShowOptions] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-slate-900 mb-1">Recent Projects</h2>
            <p className="text-slate-600">Manage and track your project entries</p>
          </div>
          <button className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4" />
            <span>Sort</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-slate-600">Project</th>
              <th className="px-6 py-3 text-left text-slate-600">Client</th>
              <th className="px-6 py-3 text-left text-slate-600">Status</th>
              <th className="px-6 py-3 text-left text-slate-600">Priority</th>
              <th className="px-6 py-3 text-left text-slate-600">Date</th>
              <th className="px-6 py-3 text-left text-slate-600">Budget</th>
              <th className="px-6 py-3 text-left text-slate-600">Progress</th>
              <th className="px-6 py-3 text-left text-slate-600"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {entries.map((entry) => (
              <tr key={entry.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-slate-900">{entry.project}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-slate-600">{entry.client}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-3 py-1 rounded-full ${statusColors[entry.status]}`}>
                    {entry.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={priorityColors[entry.priority]}>
                    {entry.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-slate-600">{entry.date}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-slate-900">{entry.budget}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-200 rounded-full h-2 max-w-[100px]">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${entry.completion}%` }}
                      />
                    </div>
                    <span className="text-slate-600">{entry.completion}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="relative">
                    <button
                      onClick={() => setShowOptions(showOptions === entry.id ? null : entry.id)}
                      className="p-1 hover:bg-slate-200 rounded transition-colors"
                    >
                      <MoreVertical className="w-5 h-5 text-slate-600" />
                    </button>
                    {showOptions === entry.id && (
                      <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-10">
                        <button className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100">
                          View Details
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-100">
                          Edit
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-red-600 hover:bg-slate-100">
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
        <p className="text-slate-600">Showing 1 to 8 of 48 entries</p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
          <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded transition-colors">
            2
          </button>
          <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded transition-colors">
            3
          </button>
          <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

import { Clock, CheckCircle, AlertCircle, Folder } from 'lucide-react';

const summaryData = [
  {
    icon: Folder,
    title: 'Total Projects',
    value: '48',
    description: '12 active projects',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: CheckCircle,
    title: 'Completed Tasks',
    value: '324',
    description: 'Last 30 days',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Clock,
    title: 'Pending Tasks',
    value: '23',
    description: '8 due this week',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: AlertCircle,
    title: 'Issues',
    value: '5',
    description: '2 critical issues',
    color: 'bg-red-100 text-red-600',
  },
];

export function SummaryCards() {
  return (
    <div className="mb-8">
      <h2 className="text-slate-900 mb-4">Quick Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryData.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-slate-900 mb-1">{item.value}</h3>
              <p className="text-slate-600 mb-2">{item.title}</p>
              <p className="text-slate-500">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

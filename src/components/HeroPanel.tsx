import { TrendingUp, Users, Target, Award } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Jan', value: 4000, revenue: 2400 },
  { name: 'Feb', value: 3000, revenue: 1398 },
  { name: 'Mar', value: 2000, revenue: 9800 },
  { name: 'Apr', value: 2780, revenue: 3908 },
  { name: 'May', value: 1890, revenue: 4800 },
  { name: 'Jun', value: 2390, revenue: 3800 },
  { name: 'Jul', value: 3490, revenue: 4300 },
];

const achievementStats = [
  {
    icon: TrendingUp,
    label: 'Revenue Growth',
    value: '24.5%',
    change: '+12.3%',
    positive: true,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Users,
    label: 'Active Users',
    value: '12,543',
    change: '+8.2%',
    positive: true,
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Target,
    label: 'Goal Completion',
    value: '87%',
    change: '+5.1%',
    positive: true,
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Award,
    label: 'Success Rate',
    value: '94.2%',
    change: '+2.4%',
    positive: true,
    color: 'from-green-500 to-emerald-500'
  },
];

export function HeroPanel() {
  return (
    <div className="mb-8">
      {/* Summary Section */}
      <div className="mb-6">
        <h1 className="text-slate-900 mb-2">Welcome back, John!</h1>
        <p className="text-slate-600">
          Here's what's happening with your projects today. You have 3 pending tasks and 12 active projects.
        </p>
      </div>

      {/* Achievement Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {achievementStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-sm ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-slate-600 mb-1">{stat.label}</p>
              <p className="text-slate-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Data Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Area Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="mb-4">
            <h3 className="text-slate-900 mb-1">Performance Trend</h3>
            <p className="text-slate-600">Monthly performance overview</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="mb-4">
            <h3 className="text-slate-900 mb-1">Revenue Analysis</h3>
            <p className="text-slate-600">Monthly revenue breakdown</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="revenue" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

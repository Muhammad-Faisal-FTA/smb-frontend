'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jun', revenue: 98000, expenses: 72000 },
  { month: 'Jul', revenue: 105000, expenses: 68000 },
  { month: 'Aug', revenue: 112000, expenses: 75000 },
  { month: 'Sep', revenue: 108000, expenses: 71000 },
  { month: 'Oct', revenue: 118000, expenses: 76000 },
  { month: 'Nov', revenue: 124580, expenses: 78340 },
  { month: 'Dec', revenue: 130000, expenses: 80000 },

];

export function RevenueExpenseChart() {
  return (
    <div className="rounded-xl p-6 border shadow-sm" style={{ backgroundColor: '#FFFFFF', borderColor: '#D1D5DB' }}>
      <div className="mb-6">
        <h3 style={{ color: '#111827' }} className="mb-1">Revenue vs Expenses</h3>
        <p style={{ color: '#4B5563' }}>6-month trend analysis</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#D1D5DB" />
          <XAxis dataKey="month" stroke="#4B5563" />
          <YAxis stroke="#4B5563" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #D1D5DB',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Bar
            dataKey="revenue"
            fill="#10B981"
            radius={[8, 8, 0, 0]}
          />
          <Bar
            dataKey="expenses"
            fill="#EF4444"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

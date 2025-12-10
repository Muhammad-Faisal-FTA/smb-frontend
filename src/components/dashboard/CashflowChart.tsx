'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jun', cashflow: 26000 },
  { month: 'Jul', cashflow: 37000 },
  { month: 'Aug', cashflow: 37000 },
  { month: 'Sep', cashflow: 37000 },
  { month: 'Oct', cashflow: 42000 },
  { month: 'Nov', cashflow: 46240 },
  { month: 'Dec (Proj)', cashflow: 51000 },
];

export function CashflowChart() {
  return (
    <div className="rounded-xl p-6 border shadow-sm" style={{ backgroundColor: '#FFFFFF', borderColor: '#D1D5DB' }}>
      <div className="mb-6">
        <h3 style={{ color: '#111827' }} className="mb-1">Cashflow Trend</h3>
        <p style={{ color: '#4B5563' }}>Monthly net cashflow with projection</p>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
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
          <Line
            dataKey="cashflow"
            fill="#0EA5E9"
            stroke="#0EA5E9"
            strokeWidth={3}
            dot={{ fill: '#0EA5E9', r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

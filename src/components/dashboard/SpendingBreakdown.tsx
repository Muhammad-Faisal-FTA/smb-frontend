// 'use client';

// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// const data = [
//   { name: 'Payroll', value: 28500, color: '#0EA5E9' },
//   { name: 'Marketing', value: 18200, color: '#4F46E5' },
//   { name: 'Operations', value: 15300, color: '#10B981' },
//   { name: 'Software', value: 8900, color: '#F59E0B' },
//   { name: 'Rent', value: 7440, color: '#EF4444' },
// ];

// export function SpendingBreakdown() {
//   return (
//     <div className="rounded-xl p-6 border shadow-sm" style={{ backgroundColor: '#FFFFFF', borderColor: '#D1D5DB' }}>
//       <div className="mb-6">
//         <h3 style={{ color: '#111827' }} className="mb-1">Spending Breakdown</h3>
//         <p style={{ color: '#4B5563' }}>Current month by category</p>
//       </div>

//       <ResponsiveContainer width="100%" height={250}>
//         <PieChart>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             innerRadius={60}
//             outerRadius={90}
//             paddingAngle={2}
//             dataKey="value"
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={entry.color} />
//             ))}
//           </Pie>
//           <Tooltip
//             contentStyle={{
//               backgroundColor: '#FFFFFF',
//               border: '1px solid #D1D5DB',
//               borderRadius: '8px',
//             }}
//           />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>

//       <div className="space-y-2 mt-4">
//         {data.map((item) => (
//           <div key={item.name} className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
//               <span style={{ color: '#4B5563' }}>{item.name}</span>
//             </div>
//             <span style={{ color: '#111827' }}>${item.value.toLocaleString()}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

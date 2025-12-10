// 'use client';

// import { useState } from 'react';
// import { FileText, Download, Calendar, Loader } from 'lucide-react';

// export function ReportsPage() {
//   const [reportType, setReportType] = useState('profit-loss');
//   const [dateRange, setDateRange] = useState('this-month');
//   const [isGenerating, setIsGenerating] = useState(false);

//   const handleGenerate = (format: 'pdf' | 'excel') => {
//     setIsGenerating(true);
//     // Simulate generation
//     setTimeout(() => {
//       setIsGenerating(false);
//     }, 2000);
//   };

//   return (
//     <div className="space-y-4 sm:space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-slate-900 mb-2">Financial Reports</h1>
//         <p className="text-slate-600">Generate comprehensive financial reports and export data</p>
//       </div>

//       {/* Report Configuration */}
//       <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200 shadow-sm">
//         <h3 className="text-slate-900 mb-4">Report Configuration</h3>

//         <div className="space-y-4">
//           {/* Report Type */}
//           <div>
//             <label className="block text-slate-700 mb-2">Report Type</label>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//               {[
//                 { id: 'profit-loss', label: 'Profit & Loss', description: 'Income statement' },
//                 { id: 'cashflow', label: 'Cashflow Statement', description: 'Cash movement' },
//                 { id: 'summary', label: 'Financial Summary', description: 'Overview report' },
//                 { id: 'ai-insights', label: 'AI Insights Report', description: 'Predictive analysis' },
//               ].map((type) => (
//                 <button
//                   key={type.id}
//                   onClick={() => setReportType(type.id)}
//                   className={`p-4 border-2 rounded-lg transition-all text-left ${
//                     reportType === type.id
//                       ? 'border-blue-600 bg-blue-50'
//                       : 'border-slate-200 hover:border-slate-300'
//                   }`}
//                 >
//                   <p className="text-slate-900 mb-1">{type.label}</p>
//                   <p className="text-slate-600">{type.description}</p>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Date Range */}
//           <div>
//             <label className="block text-slate-700 mb-2">Date Range</label>
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
//               {[
//                 { id: 'this-month', label: 'This Month' },
//                 { id: 'last-month', label: 'Last Month' },
//                 { id: 'this-quarter', label: 'This Quarter' },
//                 { id: 'this-year', label: 'This Year' },
//                 { id: 'custom', label: 'Custom Range' },
//               ].map((range) => (
//                 <button
//                   key={range.id}
//                   onClick={() => setDateRange(range.id)}
//                   className={`px-4 py-3 border-2 rounded-lg transition-all ${
//                     dateRange === range.id
//                       ? 'border-blue-600 bg-blue-50 text-blue-700'
//                       : 'border-slate-200 text-slate-700 hover:border-slate-300'
//                   }`}
//                 >
//                   {range.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {dateRange === 'custom' && (
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-slate-700 mb-2">Start Date</label>
//                 <input
//                   type="date"
//                   className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-slate-700 mb-2">End Date</label>
//                 <input
//                   type="date"
//                   className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-200">
//           <button
//             onClick={() => handleGenerate('pdf')}
//             disabled={isGenerating}
//             className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isGenerating ? (
//               <>
//                 <Loader className="w-5 h-5 animate-spin" />
//                 <span>Generating...</span>
//               </>
//             ) : (
//               <>
//                 <Download className="w-5 h-5" />
//                 <span>Generate PDF</span>
//               </>
//             )}
//           </button>
//           <button
//             onClick={() => handleGenerate('excel')}
//             disabled={isGenerating}
//             className="flex-1 bg-white border-2 border-slate-300 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isGenerating ? (
//               <>
//                 <Loader className="w-5 h-5 animate-spin" />
//                 <span>Generating...</span>
//               </>
//             ) : (
//               <>
//                 <Download className="w-5 h-5" />
//                 <span>Export Excel</span>
//               </>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Report Preview */}
//       <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
//         <h3 className="text-slate-900 mb-4">Report Preview</h3>

//         {reportType === 'profit-loss' && (
//           <div className="space-y-4">
//             <div className="border-b border-slate-200 pb-4">
//               <h4 className="text-slate-700 mb-3">Profit & Loss Statement - November 2024</h4>
//             </div>

//             <div>
//               <p className="text-slate-600 mb-2">Revenue</p>
//               <div className="space-y-2 ml-4">
//                 <div className="flex items-center justify-between py-2">
//                   <span className="text-slate-700">Sales Revenue</span>
//                   <span className="text-slate-900">$112,300</span>
//                 </div>
//                 <div className="flex items-center justify-between py-2">
//                   <span className="text-slate-700">Service Revenue</span>
//                   <span className="text-slate-900">$12,280</span>
//                 </div>
//                 <div className="flex items-center justify-between py-2 border-t border-slate-200">
//                   <span className="text-slate-900">Total Revenue</span>
//                   <span className="text-slate-900">$124,580</span>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <p className="text-slate-600 mb-2">Expenses</p>
//               <div className="space-y-2 ml-4">
//                 <div className="flex items-center justify-between py-2">
//                   <span className="text-slate-700">Payroll</span>
//                   <span className="text-slate-900">$28,500</span>
//                 </div>
//                 <div className="flex items-center justify-between py-2">
//                   <span className="text-slate-700">Marketing</span>
//                   <span className="text-slate-900">$18,200</span>
//                 </div>
//                 <div className="flex items-center justify-between py-2">
//                   <span className="text-slate-700">Operations</span>
//                   <span className="text-slate-900">$15,300</span>
//                 </div>
//                 <div className="flex items-center justify-between py-2">
//                   <span className="text-slate-700">Software & Tools</span>
//                   <span className="text-slate-900">$8,900</span>
//                 </div>
//                 <div className="flex items-center justify-between py-2">
//                   <span className="text-slate-700">Rent</span>
//                   <span className="text-slate-900">$7,440</span>
//                 </div>
//                 <div className="flex items-center justify-between py-2 border-t border-slate-200">
//                   <span className="text-slate-900">Total Expenses</span>
//                   <span className="text-slate-900">$78,340</span>
//                 </div>
//               </div>
//             </div>

//             <div className="pt-4 border-t-2 border-slate-300">
//               <div className="flex items-center justify-between py-2">
//                 <span className="text-slate-900">Net Profit</span>
//                 <span className="text-green-600">$46,240</span>
//               </div>
//               <div className="flex items-center justify-between py-2">
//                 <span className="text-slate-600">Profit Margin</span>
//                 <span className="text-slate-900">37.1%</span>
//               </div>
//             </div>
//           </div>
//         )}

//         {reportType === 'cashflow' && (
//           <div className="space-y-4">
//             <div className="border-b border-slate-200 pb-4">
//               <h4 className="text-slate-700 mb-3">Cashflow Statement - November 2024</h4>
//             </div>

//             <div>
//               <p className="text-slate-600 mb-2">Cash Inflows</p>
//               <div className="space-y-2 ml-4">
//                 <div className="flex items-center justify-between py-2">
//                   <span className="text-slate-700">Customer Payments</span>
//                   <span className="text-green-600">+$124,580</span>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <p className="text-slate-600 mb-2">Cash Outflows</p>
//               <div className="space-y-2 ml-4">
//                 <div className="flex items-center justify-between py-2">
//                   <span className="text-slate-700">Operating Expenses</span>
//                   <span className="text-red-600">-$78,340</span>
//                 </div>
//               </div>
//             </div>

//             <div className="pt-4 border-t-2 border-slate-300">
//               <div className="flex items-center justify-between py-2">
//                 <span className="text-slate-900">Net Cashflow</span>
//                 <span className="text-green-600">+$46,240</span>
//               </div>
//               <div className="flex items-center justify-between py-2">
//                 <span className="text-slate-600">Ending Cash Balance</span>
//                 <span className="text-slate-900">$158,450</span>
//               </div>
//             </div>
//           </div>
//         )}

//         {reportType === 'summary' && (
//           <div className="space-y-4">
//             <div className="border-b border-slate-200 pb-4">
//               <h4 className="text-slate-700 mb-3">Financial Summary - November 2024</h4>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-green-50 rounded-lg p-4 border border-green-200">
//                 <p className="text-slate-600 mb-1">Total Revenue</p>
//                 <p className="text-slate-900">$124,580</p>
//                 <p className="text-green-600">+12.5% vs last month</p>
//               </div>
//               <div className="bg-red-50 rounded-lg p-4 border border-red-200">
//                 <p className="text-slate-600 mb-1">Total Expenses</p>
//                 <p className="text-slate-900">$78,340</p>
//                 <p className="text-red-600">+8.2% vs last month</p>
//               </div>
//               <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
//                 <p className="text-slate-600 mb-1">Net Profit</p>
//                 <p className="text-slate-900">$46,240</p>
//                 <p className="text-blue-600">37.1% margin</p>
//               </div>
//               <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
//                 <p className="text-slate-600 mb-1">Cash Balance</p>
//                 <p className="text-slate-900">$158,450</p>
//                 <p className="text-purple-600">Healthy reserves</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {reportType === 'ai-insights' && (
//           <div className="space-y-4">
//             <div className="border-b border-slate-200 pb-4">
//               <h4 className="text-slate-700 mb-3">AI Insights Report - November 2024</h4>
//             </div>

//             <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
//               <p className="text-slate-700 leading-relaxed mb-4">
//                 Based on 6 months of data analysis, your business demonstrates strong growth potential with 
//                 revenue trending upward at 12.5% month-over-month. AI forecasting predicts continued growth 
//                 of 15% over the next quarter.
//               </p>
//               <ul className="space-y-2 text-slate-700">
//                 <li>• Revenue forecast for December: $135,000 (±$8,000)</li>
//                 <li>• Recommended expense optimization in Marketing category</li>
//                 <li>• Cash runway: 8.2 months at current burn rate</li>
//                 <li>• Profit margin expected to stabilize at 38-40%</li>
//               </ul>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Recent Reports */}
//       <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
//         <h3 className="text-slate-900 mb-4">Recent Reports</h3>

//         <div className="space-y-3">
//           {[
//             { name: 'Profit & Loss - October 2024', date: '2024-11-01', type: 'P&L', size: '248 KB' },
//             { name: 'Cashflow Statement - Q3 2024', date: '2024-10-15', type: 'Cashflow', size: '156 KB' },
//             { name: 'Financial Summary - September 2024', date: '2024-10-01', type: 'Summary', size: '189 KB' },
//           ].map((report, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                   <FileText className="w-5 h-5 text-blue-600" />
//                 </div>
//                 <div>
//                   <p className="text-slate-900">{report.name}</p>
//                   <p className="text-slate-600">
//                     {report.type} • {report.date} • {report.size}
//                   </p>
//                 </div>
//               </div>
//               <button className="text-blue-600 hover:text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
//                 <Download className="w-4 h-4" />
//                 <span>Download</span>
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
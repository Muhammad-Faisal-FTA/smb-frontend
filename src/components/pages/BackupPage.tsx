// 'use client';

// import { useState } from 'react';
// import { Database, Download, Upload, AlertTriangle, CheckCircle, X } from 'lucide-react';

// const backups = [
//   {
//     id: 1,
//     name: 'Full Backup - Nov 21, 2024',
//     date: '2024-11-21 08:00:00',
//     size: '4.2 MB',
//     type: 'Automatic',
//     status: 'complete',
//   },
//   {
//     id: 2,
//     name: 'Full Backup - Nov 20, 2024',
//     date: '2024-11-20 08:00:00',
//     size: '4.1 MB',
//     type: 'Automatic',
//     status: 'complete',
//   },
//   {
//     id: 3,
//     name: 'Manual Backup - Nov 18, 2024',
//     date: '2024-11-18 14:30:00',
//     size: '3.9 MB',
//     type: 'Manual',
//     status: 'complete',
//   },
//   {
//     id: 4,
//     name: 'Full Backup - Nov 17, 2024',
//     date: '2024-11-17 08:00:00',
//     size: '3.8 MB',
//     type: 'Automatic',
//     status: 'complete',
//   },
// ];

// export function BackupPage() {
//   const [showRestoreModal, setShowRestoreModal] = useState(false);
//   const [selectedBackup, setSelectedBackup] = useState<typeof backups[0] | null>(null);
//   const [isCreating, setIsCreating] = useState(false);

//   const handleCreateBackup = () => {
//     setIsCreating(true);
//     setTimeout(() => {
//       setIsCreating(false);
//     }, 2000);
//   };

//   const handleRestore = (backup: typeof backups[0]) => {
//     setSelectedBackup(backup);
//     setShowRestoreModal(true);
//   };

//   const confirmRestore = () => {
//     setShowRestoreModal(false);
//     setSelectedBackup(null);
//   };

//   return (
//     <div className="space-y-4 sm:space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-slate-900 mb-2">Backup & Restore</h1>
//           <p className="text-slate-600">Protect your financial data with encrypted backups</p>
//         </div>
//         <button
//           onClick={handleCreateBackup}
//           disabled={isCreating}
//           className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 disabled:opacity-50"
//         >
//           <Database className="w-5 h-5" />
//           <span>{isCreating ? 'Creating...' : 'Create Backup'}</span>
//         </button>
//       </div>

//       {/* Info Banner */}
//       <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
//         <div className="flex items-start gap-4">
//           <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
//             <Database className="w-5 h-5 text-blue-600" />
//           </div>
//           <div>
//             <h3 className="text-slate-900 mb-2">Automatic Backups Enabled</h3>
//             <p className="text-slate-700 mb-3">
//               Your data is automatically backed up daily at 8:00 AM. Backups are encrypted and stored securely. 
//               You can create manual backups at any time or restore from previous snapshots.
//             </p>
//             <div className="flex items-center gap-6 text-slate-700">
//               <div className="flex items-center gap-2">
//                 <CheckCircle className="w-4 h-4 text-green-600" />
//                 <span>256-bit Encryption</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <CheckCircle className="w-4 h-4 text-green-600" />
//                 <span>30-day Retention</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <CheckCircle className="w-4 h-4 text-green-600" />
//                 <span>Point-in-time Recovery</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//               <Database className="w-5 h-5 text-green-600" />
//             </div>
//             <p className="text-slate-600">Total Backups</p>
//           </div>
//           <p className="text-slate-900">{backups.length}</p>
//         </div>

//         <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//               <CheckCircle className="w-5 h-5 text-blue-600" />
//             </div>
//             <p className="text-slate-600">Last Backup</p>
//           </div>
//           <p className="text-slate-900">Today, 8:00 AM</p>
//         </div>

//         <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//               <Database className="w-5 h-5 text-purple-600" />
//             </div>
//             <p className="text-slate-600">Total Size</p>
//           </div>
//           <p className="text-slate-900">16.0 MB</p>
//         </div>

//         <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
//               <AlertTriangle className="w-5 h-5 text-orange-600" />
//             </div>
//             <p className="text-slate-600">Retention</p>
//           </div>
//           <p className="text-slate-900">30 Days</p>
//         </div>
//       </div>

//       {/* Backups List */}
//       <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
//         <div className="px-4 sm:px-6 py-4 border-b border-slate-200">
//           <h3 className="text-slate-900">Available Backups</h3>
//           <p className="text-slate-600">Select a backup to restore your data</p>
//         </div>

//         <div className="overflow-x-auto -mx-4 sm:mx-0">
//           <table className="w-full min-w-[640px]">
//             <thead className="bg-slate-50 border-b border-slate-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-slate-600">Backup Name</th>
//                 <th className="px-6 py-3 text-left text-slate-600">Date & Time</th>
//                 <th className="px-6 py-3 text-left text-slate-600">Size</th>
//                 <th className="px-6 py-3 text-left text-slate-600">Type</th>
//                 <th className="px-6 py-3 text-left text-slate-600">Status</th>
//                 <th className="px-6 py-3 text-left text-slate-600">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-200">
//               {backups.map((backup) => (
//                 <tr key={backup.id} className="hover:bg-slate-50 transition-colors">
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//                         <Database className="w-5 h-5 text-blue-600" />
//                       </div>
//                       <p className="text-slate-900">{backup.name}</p>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <p className="text-slate-600">{backup.date}</p>
//                   </td>
//                   <td className="px-6 py-4">
//                     <p className="text-slate-600">{backup.size}</p>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`inline-flex px-3 py-1 rounded-full ${
//                         backup.type === 'Automatic'
//                           ? 'bg-blue-100 text-blue-700'
//                           : 'bg-purple-100 text-purple-700'
//                       }`}
//                     >
//                       {backup.type}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="inline-flex items-center gap-2 text-green-600">
//                       <CheckCircle className="w-4 h-4" />
//                       <span>Complete</span>
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-2">
//                       <button className="text-blue-600 hover:text-blue-700 px-3 py-1 rounded hover:bg-blue-50 transition-colors flex items-center gap-2">
//                         <Download className="w-4 h-4" />
//                         <span>Download</span>
//                       </button>
//                       <button
//                         onClick={() => handleRestore(backup)}
//                         className="text-purple-600 hover:text-purple-700 px-3 py-1 rounded hover:bg-purple-50 transition-colors flex items-center gap-2"
//                       >
//                         <Upload className="w-4 h-4" />
//                         <span>Restore</span>
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Restore Confirmation Modal */}
//       {showRestoreModal && selectedBackup && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl max-w-md w-full p-6">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
//                 <AlertTriangle className="w-6 h-6 text-orange-600" />
//               </div>
//               <h2 className="text-slate-900">Confirm Restore</h2>
//             </div>

//             <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
//               <p className="text-slate-700 mb-2">
//                 Are you sure you want to restore this backup? This action will:
//               </p>
//               <ul className="space-y-1 text-slate-700 ml-4">
//                 <li>• Replace all current data with backup data</li>
//                 <li>• Cannot be undone</li>
//                 <li>• May take a few minutes to complete</li>
//               </ul>
//             </div>

//             <div className="bg-slate-50 rounded-lg p-4 mb-6">
//               <p className="text-slate-600 mb-1">Restoring from:</p>
//               <p className="text-slate-900">{selectedBackup.name}</p>
//               <p className="text-slate-600">{selectedBackup.date}</p>
//             </div>

//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => setShowRestoreModal(false)}
//                 className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmRestore}
//                 className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
//               >
//                 Confirm Restore
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
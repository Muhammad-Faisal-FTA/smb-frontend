// 'use client';

// import { useState } from 'react';
// import { Plus, TrendingUp, TrendingDown, Package } from 'lucide-react';
// import { ProductModal } from '../products/ProductModal';

// const products = [
//   {
//     id: 1,
//     name: 'Premium Plan',
//     sku: 'PLAN-PREM-001',
//     costPrice: 0,
//     sellingPrice: 299,
//     stock: null,
//     sold: 45,
//     profit: 13455,
//     profitMargin: 100,
//   },
//   {
//     id: 2,
//     name: 'Professional Services - Consulting',
//     sku: 'SERV-CONS-001',
//     costPrice: 50,
//     sellingPrice: 150,
//     stock: null,
//     sold: 28,
//     profit: 2800,
//     profitMargin: 66.7,
//   },
//   {
//     id: 3,
//     name: 'Product A - Widget Pro',
//     sku: 'PROD-WID-001',
//     costPrice: 25,
//     sellingPrice: 79,
//     stock: 145,
//     sold: 156,
//     profit: 8424,
//     profitMargin: 68.4,
//   },
//   {
//     id: 4,
//     name: 'Product B - Starter Kit',
//     sku: 'PROD-KIT-001',
//     costPrice: 40,
//     sellingPrice: 99,
//     stock: 89,
//     sold: 92,
//     profit: 5428,
//     profitMargin: 59.6,
//   },
//   {
//     id: 5,
//     name: 'Basic Plan',
//     sku: 'PLAN-BASIC-001',
//     costPrice: 0,
//     sellingPrice: 99,
//     stock: null,
//     sold: 134,
//     profit: 13266,
//     profitMargin: 100,
//   },
// ];

// export function ProductsPage() {
//   const [showAddModal, setShowAddModal] = useState(false);

//   return (
//     <div className="space-y-4 sm:space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-slate-900 mb-2">Products & Inventory</h1>
//           <p className="text-slate-600">Manage your products, services, and track profitability</p>
//         </div>
//         <button
//           onClick={() => setShowAddModal(true)}
//           className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
//         >
//           <Plus className="w-5 h-5" />
//           <span>Add Product</span>
//         </button>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
//           <div className="flex items-center gap-3 mb-3">
//             <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//               <Package className="w-5 h-5 text-blue-600" />
//             </div>
//             <p className="text-slate-600">Total Products</p>
//           </div>
//           <p className="text-slate-900">5</p>
//         </div>

//         <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
//           <div className="flex items-center gap-3 mb-3">
//             <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//               <TrendingUp className="w-5 h-5 text-green-600" />
//             </div>
//             <p className="text-slate-600">Total Revenue</p>
//           </div>
//           <p className="text-slate-900">$43,373</p>
//         </div>

//         <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
//           <div className="flex items-center gap-3 mb-3">
//             <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//               <TrendingUp className="w-5 h-5 text-purple-600" />
//             </div>
//             <p className="text-slate-600">Total Profit</p>
//           </div>
//           <p className="text-slate-900">$43,373</p>
//         </div>

//         <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
//           <div className="flex items-center gap-3 mb-3">
//             <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
//               <Package className="w-5 h-5 text-orange-600" />
//             </div>
//             <p className="text-slate-600">Low Stock Items</p>
//           </div>
//           <p className="text-slate-900">2</p>
//         </div>
//       </div>

//       {/* Products Table */}
//       <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
//         <div className="overflow-x-auto -mx-4 sm:mx-0">
//           <table className="w-full min-w-[800px]">
//             <thead className="bg-slate-50 border-b border-slate-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-slate-600">Product</th>
//                 <th className="px-6 py-3 text-left text-slate-600">SKU</th>
//                 <th className="px-6 py-3 text-left text-slate-600">Cost Price</th>
//                 <th className="px-6 py-3 text-left text-slate-600">Selling Price</th>
//                 <th className="px-6 py-3 text-left text-slate-600">Stock</th>
//                 <th className="px-6 py-3 text-left text-slate-600">Units Sold</th>
//                 <th className="px-6 py-3 text-left text-slate-600">Profit</th>
//                 <th className="px-6 py-3 text-left text-slate-600">Margin</th>
//                 <th className="px-6 py-3 text-left text-slate-600">Status</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-200">
//               {products.map((product) => (
//                 <tr key={product.id} className="hover:bg-slate-50 transition-colors">
//                   <td className="px-6 py-4">
//                     <p className="text-slate-900">{product.name}</p>
//                   </td>
//                   <td className="px-6 py-4">
//                     <p className="text-slate-600">{product.sku}</p>
//                   </td>
//                   <td className="px-6 py-4">
//                     <p className="text-slate-900">${product.costPrice}</p>
//                   </td>
//                   <td className="px-6 py-4">
//                     <p className="text-slate-900">${product.sellingPrice}</p>
//                   </td>
//                   <td className="px-6 py-4">
//                     {product.stock !== null ? (
//                       <span
//                         className={`inline-flex px-3 py-1 rounded-full ${
//                           product.stock < 100
//                             ? 'bg-orange-100 text-orange-700'
//                             : 'bg-green-100 text-green-700'
//                         }`}
//                       >
//                         {product.stock}
//                       </span>
//                     ) : (
//                       <span className="text-slate-400">N/A</span>
//                     )}
//                   </td>
//                   <td className="px-6 py-4">
//                     <p className="text-slate-900">{product.sold}</p>
//                   </td>
//                   <td className="px-6 py-4">
//                     <p className="text-green-600">${product.profit.toLocaleString()}</p>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-2">
//                       {product.profitMargin >= 70 ? (
//                         <TrendingUp className="w-4 h-4 text-green-600" />
//                       ) : (
//                         <TrendingDown className="w-4 h-4 text-orange-600" />
//                       )}
//                       <span
//                         className={
//                           product.profitMargin >= 70 ? 'text-green-600' : 'text-orange-600'
//                         }
//                       >
//                         {product.profitMargin.toFixed(1)}%
//                       </span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="inline-flex px-3 py-1 bg-green-100 text-green-700 rounded-full">
//                       Active
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between">
//           <p className="text-slate-600">Showing {products.length} products</p>
//           <div className="flex items-center gap-2">
//             <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded transition-colors">
//               Previous
//             </button>
//             <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
//             <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded transition-colors">
//               Next
//             </button>
//           </div>
//         </div>
//       </div>

//       {showAddModal && <ProductModal onClose={() => setShowAddModal(false)} />}
//     </div>
//   );
// }
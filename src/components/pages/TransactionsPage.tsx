'use client';

import { useState } from 'react';
import { Plus, Filter, Download, Search, Calendar } from 'lucide-react';
import { TransactionModal } from '../transactions/TransactionModal';

const transactions = [
  {
    id: 1,
    date: '2024-11-21',
    description: 'Client Payment - Website Design',
    category: 'Revenue',
    type: 'Income',
    amount: 5000,
    paymentMethod: 'Bank Transfer',
    product: 'Web Design Service',
  },
  {
    id: 2,
    date: '2024-11-20',
    description: 'Office Supplies Purchase',
    category: 'Operations',
    type: 'Expense',
    amount: -450,
    paymentMethod: 'Credit Card',
    product: null,
  },
  {
    id: 3,
    date: '2024-11-20',
    description: 'Google Ads Campaign',
    category: 'Marketing',
    type: 'Expense',
    amount: -1200,
    paymentMethod: 'Credit Card',
    product: null,
  },
  {
    id: 4,
    date: '2024-11-19',
    description: 'Product Sale - Premium Plan',
    category: 'Revenue',
    type: 'Income',
    amount: 299,
    paymentMethod: 'Stripe',
    product: 'Premium Plan',
  },
  {
    id: 5,
    date: '2024-11-19',
    description: 'Monthly Software Subscription',
    category: 'Software',
    type: 'Expense',
    amount: -89,
    paymentMethod: 'Credit Card',
    product: null,
  },
  {
    id: 6,
    date: '2024-11-18',
    description: 'Freelancer Payment',
    category: 'Payroll',
    type: 'Expense',
    amount: -2500,
    paymentMethod: 'Bank Transfer',
    product: null,
  },
];

export function TransactionsPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = transactions.filter((t) => {
    if (filterType !== 'all' && t.type.toLowerCase() !== filterType) return false;
    if (searchQuery && !t.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-slate-900 mb-2">Transactions</h1>
          <p className="text-slate-600">Manage and track all financial transactions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          <span>Add Transaction</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-slate-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search transactions..."
                className="w-full pl-11 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 mb-2">Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 mb-2">Date Range</label>
            <button className="w-full px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-slate-400" />
              <span className="text-slate-600">This Month</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mt-4">
          <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg flex items-center justify-center gap-2">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
          <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full min-w-[640px]">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-slate-600">Date</th>
                <th className="px-6 py-3 text-left text-slate-600">Description</th>
                <th className="px-6 py-3 text-left text-slate-600">Category</th>
                <th className="px-6 py-3 text-left text-slate-600">Type</th>
                <th className="px-6 py-3 text-left text-slate-600">Payment Method</th>
                <th className="px-6 py-3 text-right text-slate-600">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-slate-600">{transaction.date}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-900">{transaction.description}</p>
                    {transaction.product && (
                      <p className="text-slate-500">{transaction.product}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full ${
                        transaction.type === 'Income'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-600">{transaction.paymentMethod}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p
                      className={`${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 sm:px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600">Showing {filteredTransactions.length} transactions</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded transition-colors text-sm">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
            <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded transition-colors text-sm">
              2
            </button>
            <button className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded transition-colors text-sm">
              Next
            </button>
          </div>
        </div>
      </div>

      {showAddModal && <TransactionModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
}
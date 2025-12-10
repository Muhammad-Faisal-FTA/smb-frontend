'use client';

import { useState, useEffect } from 'react';
import { Receipt, ChevronDown, ChevronUp, Save, RotateCcw, CheckCircle } from 'lucide-react';

interface TransactionSummarySectionProps {
  onCompletionChange: (percentage: number) => void;
}

export function TransactionSummarySection({ onCompletionChange }: TransactionSummarySectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    totalTransactions: '',
    monthlySalesTransactions: '',
    monthlyExpenseTransactions: '',
    refundReturnCounts: '',
    nonRecurringCosts: '',
  });

  const totalFields = Object.keys(formData).length;

  useEffect(() => {
    const filledFields = Object.values(formData).filter(val => val !== '').length;
    onCompletionChange(Math.round((filledFields / totalFields) * 100));
  }, [formData, totalFields]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
            <Receipt className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="text-left">
            <h3 className="text-slate-900">Transaction Summary</h3>
            <p className="text-slate-600">Overall transaction metrics (Optional)</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-600">
            {Object.values(formData).filter(v => v).length}/{totalFields} complete
          </span>
          {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>
      </button>

      {isExpanded && (
        <div className="p-6 pt-0 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 mb-2">Total Transactions (All Time)</label>
              <input
                type="number"
                value={formData.totalTransactions}
                onChange={(e) => handleChange('totalTransactions', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-2">Monthly Sales Transactions</label>
              <input
                type="number"
                value={formData.monthlySalesTransactions}
                onChange={(e) => handleChange('monthlySalesTransactions', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-2">Monthly Expense Transactions</label>
              <input
                type="number"
                value={formData.monthlyExpenseTransactions}
                onChange={(e) => handleChange('monthlyExpenseTransactions', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-2">Refund/Return Counts (Monthly)</label>
              <input
                type="number"
                value={formData.refundReturnCounts}
                onChange={(e) => handleChange('refundReturnCounts', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-slate-700 mb-2">Non-Recurring Costs (Last 12 Months)</label>
              <input
                type="number"
                value={formData.nonRecurringCosts}
                onChange={(e) => handleChange('nonRecurringCosts', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-slate-200">
            <button
              onClick={() => setFormData({
                totalTransactions: '', monthlySalesTransactions: '', monthlyExpenseTransactions: '',
                refundReturnCounts: '', nonRecurringCosts: '',
              })}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Validate</span>
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2">
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
'use client';

import { useState } from 'react';
import { X, Calendar, DollarSign } from 'lucide-react';

interface TransactionModalProps {
  onClose: () => void;
}

export function TransactionModal({ onClose }: TransactionModalProps) {
  const [formData, setFormData] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    type: 'expense',
    description: '',
    product: '',
    paymentMethod: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    if (!formData.description) {
      newErrors.description = 'Please enter a description';
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success - would save here
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 sm:p-6 flex items-center justify-between">
          <div>
            <h2 className="text-slate-900 mb-1">Add Transaction</h2>
            <p className="text-slate-600">Record a new financial transaction</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          {/* Type Selection */}
          <div>
            <label className="block text-slate-700 mb-2">Transaction Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'income' })}
                className={`p-4 border-2 rounded-lg transition-all ${
                  formData.type === 'income'
                    ? 'border-green-600 bg-green-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <p className="text-slate-900">Income</p>
                <p className="text-slate-600">Money received</p>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'expense' })}
                className={`p-4 border-2 rounded-lg transition-all ${
                  formData.type === 'expense'
                    ? 'border-red-600 bg-red-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <p className="text-slate-900">Expense</p>
                <p className="text-slate-600">Money spent</p>
              </button>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-slate-700 mb-2">Amount</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.amount ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder="0.00"
              />
            </div>
            {errors.amount && <p className="text-red-600 mt-1">{errors.amount}</p>}
          </div>

          {/* Date */}
          <div>
            <label className="block text-slate-700 mb-2">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-slate-700 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.category ? 'border-red-500' : 'border-slate-300'
              }`}
            >
              <option value="">Select category...</option>
              {formData.type === 'income' ? (
                <>
                  <option value="Revenue">Revenue</option>
                  <option value="Sales">Sales</option>
                  <option value="Services">Services</option>
                  <option value="Other Income">Other Income</option>
                </>
              ) : (
                <>
                  <option value="Payroll">Payroll</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                  <option value="Software">Software</option>
                  <option value="Rent">Rent</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Other">Other</option>
                </>
              )}
            </select>
            {errors.category && <p className="text-red-600 mt-1">{errors.category}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-slate-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? 'border-red-500' : 'border-slate-300'
              }`}
              rows={3}
              placeholder="Enter transaction details..."
            />
            {errors.description && <p className="text-red-600 mt-1">{errors.description}</p>}
          </div>

          {/* Product (Optional) */}
          <div>
            <label className="block text-slate-700 mb-2">Product/Service (Optional)</label>
            <input
              type="text"
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Link to a product or service"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-slate-700 mb-2">Payment Method</label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.paymentMethod ? 'border-red-500' : 'border-slate-300'
              }`}
            >
              <option value="">Select payment method...</option>
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Stripe">Stripe</option>
              <option value="Other">Other</option>
            </select>
            {errors.paymentMethod && <p className="text-red-600 mt-1">{errors.paymentMethod}</p>}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
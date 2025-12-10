'use client';

import { useState, useEffect } from 'react';
import { Wallet, ChevronDown, ChevronUp, Save, RotateCcw, CheckCircle } from 'lucide-react';

interface AssetsLiabilitiesSectionProps {
  onCompletionChange: (percentage: number) => void;
}

export function AssetsLiabilitiesSection({ onCompletionChange }: AssetsLiabilitiesSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    cashOnHand: '',
    bankBalance: '',
    accountsReceivable: '',
    inventoryValue: '',
    currentLiabilities: '',
    longTermDebt: '',
    vendorPayables: '',
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
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Wallet className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-left">
            <h3 className="text-slate-900">Assets & Liabilities</h3>
            <p className="text-slate-600">Balance sheet information</p>
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
              <label className="block text-slate-700 mb-2">Cash on Hand</label>
              <input
                type="number"
                value={formData.cashOnHand}
                onChange={(e) => handleChange('cashOnHand', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-2">Bank Balance</label>
              <input
                type="number"
                value={formData.bankBalance}
                onChange={(e) => handleChange('bankBalance', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-2">Accounts Receivable</label>
              <input
                type="number"
                value={formData.accountsReceivable}
                onChange={(e) => handleChange('accountsReceivable', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-2">Inventory Value</label>
              <input
                type="number"
                value={formData.inventoryValue}
                onChange={(e) => handleChange('inventoryValue', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-2">Current Liabilities</label>
              <input
                type="number"
                value={formData.currentLiabilities}
                onChange={(e) => handleChange('currentLiabilities', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-2">Long-Term Debt</label>
              <input
                type="number"
                value={formData.longTermDebt}
                onChange={(e) => handleChange('longTermDebt', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-2">Vendor Payables</label>
              <input
                type="number"
                value={formData.vendorPayables}
                onChange={(e) => handleChange('vendorPayables', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-slate-200">
            <button
              onClick={() => setFormData({
                cashOnHand: '', bankBalance: '', accountsReceivable: '', inventoryValue: '',
                currentLiabilities: '', longTermDebt: '', vendorPayables: '',
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
'use client';

import { useState, useEffect } from 'react';
import { Users, ChevronDown, ChevronUp, Save, RotateCcw, CheckCircle } from 'lucide-react';
import { postApiResponseS } from '@/utils/ApiResponse';

interface CustomerReceivablesSectionProps {
  onCompletionChange: (percentage: number) => void;
}
const safeNumber = (value: string) => (value === "" ? 0 : Number(value));

export function CustomerReceivablesSection({ onCompletionChange }: CustomerReceivablesSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    totalCustomers: '',
    receivables30: '',
    receivables60: '',
    receivables90: '',
    avgInvoiceSize: '',
    paymentTerms: '',
    badDebtPercentage: '',
    repeatCustomerRate: '',
  });

  const totalFields = Object.keys(formData).length;

  useEffect(() => {
    const filledFields = Object.values(formData).filter(val => val !== '').length;
    onCompletionChange(Math.round((filledFields / totalFields) * 100));
  }, [formData, totalFields]);


    const endPoint = "/input/customer-receivables/monthly";

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const buildPayload = () => ({
    periodValue: new Date().toISOString().slice(0, 7), // YYYY-MM

    totalCustomers: safeNumber(formData.totalCustomers),

    receivablesAging: {
      days30: safeNumber(formData.receivables30),
      days60: safeNumber(formData.receivables60),
      days90: safeNumber(formData.receivables90),
    },

    avgInvoiceSize: safeNumber(formData.avgInvoiceSize),

    paymentTerms: formData.paymentTerms.trim(),

    badDebtPercentage: safeNumber(formData.badDebtPercentage),

    repeatCustomerRate: safeNumber(formData.repeatCustomerRate),
  });

    const handleInsert = () => {
      try {
        const token = localStorage.getItem("accessToken");
        const payload = buildPayload();
        if (!token) {
          console.log("Token not found in revenue form.");
        }
        const result = postApiResponseS(endPoint, payload, token);
        console.log("result", result);
        alert("Revenue data saved!");
      } catch (error) {
        console.log("result", error);

        alert("Revenue data Failed!");
      }
    };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-left">
            <h3 className="text-slate-900">Customer & Receivables</h3>
            <p className="text-slate-600">Customer metrics and payment data</p>
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
              <label className="block text-slate-700 mb-2">Total Customers</label>
              <input
                type="number"
                value={formData.totalCustomers}
                onChange={(e) => handleChange('totalCustomers', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-2">Average Invoice Size</label>
              <input
                type="number"
                value={formData.avgInvoiceSize}
                onChange={(e) => handleChange('avgInvoiceSize', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-2">Receivables Aging 0-30 Days</label>
              <input
                type="number"
                value={formData.receivables30}
                onChange={(e) => handleChange('receivables30', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-2">Receivables Aging 31-60 Days</label>
              <input
                type="number"
                value={formData.receivables60}
                onChange={(e) => handleChange('receivables60', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-2">Receivables Aging 60+ Days</label>
              <input
                type="number"
                value={formData.receivables90}
                onChange={(e) => handleChange('receivables90', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-2">Payment Terms</label>
              <select
                value={formData.paymentTerms}
                onChange={(e) => handleChange('paymentTerms', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select terms</option>
                <option value="immediate">Immediate/COD</option>
                <option value="net15">Net 15</option>
                <option value="net30">Net 30</option>
                <option value="net60">Net 60</option>
                <option value="net90">Net 90</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 mb-2">Bad Debt %</label>
              <input
                type="number"
                value={formData.badDebtPercentage}
                onChange={(e) => handleChange('badDebtPercentage', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="block text-slate-700 mb-2">Repeat Customer Rate %</label>
              <input
                type="number"
                value={formData.repeatCustomerRate}
                onChange={(e) => handleChange('repeatCustomerRate', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                min="0"
                max="100"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-slate-200">
            <button
              onClick={() => setFormData({
                totalCustomers: '', receivables30: '', receivables60: '', receivables90: '',
                avgInvoiceSize: '', paymentTerms: '', badDebtPercentage: '', repeatCustomerRate: '',
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
            <button onClick={handleInsert}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2">
              <Save className="w-4 h-4" />
              <span>Insert</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
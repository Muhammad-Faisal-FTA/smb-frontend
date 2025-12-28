'use client';

import { useState, useEffect } from 'react';
import { DollarSign, ChevronDown, ChevronUp, Save, RotateCcw, CheckCircle } from 'lucide-react';
import { postApiResponseS } from '@/utils/ApiResponse';

interface RevenueSectionProps {
  onCompletionChange: (percentage: number) => void;
}

export function RevenueSection({ onCompletionChange }: RevenueSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    monthlyRevenue: '',
    salesChannels: '',
    topProducts: '',
    avgSellingPrice: '',
    seasonalPatterns: '',
    creditSalesPercentage: '',
  });

  const totalFields = Object.keys(formData).length;

  const endPoint = "/input/revenue/insert";
  
  useEffect(() => {
    const filledFields = Object.values(formData).filter(val => val !== '').length;
    const percentage = Math.round((filledFields / totalFields) * 100);
    onCompletionChange(percentage);
  }, [formData, totalFields]);

  const buildPayload = () => ({
    periodValue: new Date().toISOString().slice(0, 7), // e.g. "2025-01"

    monthlyRevenue: Number(formData.monthlyRevenue),

    salesChannel: formData.salesChannels.trim(),

    topProductsServices: formData.topProducts.trim(),

    averageSellingPrice: Number(formData.avgSellingPrice),

    seasonalPattern: formData.seasonalPatterns.trim(),

    creditSalesPercentage: Number(formData.creditSalesPercentage),
  });


  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInsert = () => {
    try {
      const token = localStorage.getItem("accessToken");
      const payload = buildPayload()
      if(!token){
        console.log("Token not found in revenue form.")
      }
      const result = postApiResponseS(endPoint, payload, token )
      console.log("result", result)
      alert('Revenue data saved!');
    } catch (error) {
      console.log("result", error)
      
      alert('Revenue data Failed!');
    }
  };

  const handleReset = () => {
    setFormData({
      monthlyRevenue: '',
      salesChannels: '',
      topProducts: '',
      avgSellingPrice: '',
      seasonalPatterns: '',
      creditSalesPercentage: '',
    });
  };

  const handleValidate = () => {
    const missing = Object.entries(formData)
      .filter(([_, value]) => !value)
      .map(([key]) => key);
    
    if (missing.length === 0) {
      alert('✓ All fields are complete!');
    } else {
      alert(`Missing fields: ${missing.join(', ')}`);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-left">
            <h3 className="text-slate-900">Revenue Inputs</h3>
            <p className="text-slate-600">Sales and revenue information</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-600">
            {Object.values(formData).filter(v => v).length}/{totalFields} complete
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="p-6 pt-0 border-t border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 mb-2">
                Monthly Revenue <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.monthlyRevenue}
                onChange={(e) => handleChange('monthlyRevenue', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-2">
                Sales Channels <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.salesChannels}
                onChange={(e) => handleChange('salesChannels', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select channel</option>
                <option value="online">Online Only</option>
                <option value="offline">Offline/Store Only</option>
                <option value="hybrid">Hybrid (Online + Offline)</option>
                <option value="b2b">B2B Direct</option>
                <option value="marketplace">Marketplace</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-700 mb-2">
                Top Products/Services <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.topProducts}
                onChange={(e) => handleChange('topProducts', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Premium Plan, Product A, Consulting Services"
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-2">
                Average Selling Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.avgSellingPrice}
                onChange={(e) => handleChange('avgSellingPrice', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-2">
                Seasonal Patterns <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.seasonalPatterns}
                onChange={(e) => handleChange('seasonalPatterns', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select pattern</option>
                <option value="none">No Seasonality</option>
                <option value="q4">Peak Q4 (Holiday Season)</option>
                <option value="summer">Peak Summer</option>
                <option value="winter">Peak Winter</option>
                <option value="variable">Variable/Unpredictable</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 mb-2">
                Credit Sales % <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.creditSalesPercentage}
                onChange={(e) => handleChange('creditSalesPercentage', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                min="0"
                max="100"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-slate-200">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleValidate}
              className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Validate</span>
            </button>
            <button
              onClick={handleInsert}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Insert</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
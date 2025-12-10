'use client';

import { useState } from 'react';
import { X, Package } from 'lucide-react';

interface ProductModalProps {
  onClose: () => void;
}

export function ProductModal({ onClose }: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    costPrice: '',
    sellingPrice: '',
    stock: '',
    type: 'product',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    if (!formData.name) newErrors.name = 'Product name is required';
    if (!formData.sku) newErrors.sku = 'SKU is required';
    if (!formData.sellingPrice || parseFloat(formData.sellingPrice) <= 0) {
      newErrors.sellingPrice = 'Valid selling price is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 sm:p-6 flex items-center justify-between">
          <div>
            <h2 className="text-slate-900 mb-1">Add Product</h2>
            <p className="text-slate-600">Create a new product or service</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          {/* Type Selection */}
          <div>
            <label className="block text-slate-700 mb-2">Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'product' })}
                className={`p-4 border-2 rounded-lg transition-all ${
                  formData.type === 'product'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Package className="w-6 h-6 text-slate-600 mb-2" />
                <p className="text-slate-900">Physical Product</p>
                <p className="text-slate-600">With inventory tracking</p>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'service' })}
                className={`p-4 border-2 rounded-lg transition-all ${
                  formData.type === 'service'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Package className="w-6 h-6 text-slate-600 mb-2" />
                <p className="text-slate-900">Service</p>
                <p className="text-slate-600">No inventory needed</p>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 mb-2">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="Enter product name"
            />
            {errors.name && <p className="text-red-600 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-slate-700 mb-2">SKU</label>
            <input
              type="text"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.sku ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="PROD-001"
            />
            {errors.sku && <p className="text-red-600 mt-1">{errors.sku}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 mb-2">Cost Price</label>
              <input
                type="number"
                step="0.01"
                value={formData.costPrice}
                onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-2">Selling Price</label>
              <input
                type="number"
                step="0.01"
                value={formData.sellingPrice}
                onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.sellingPrice ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder="0.00"
              />
              {errors.sellingPrice && <p className="text-red-600 mt-1">{errors.sellingPrice}</p>}
            </div>
          </div>

          {formData.type === 'product' && (
            <div>
              <label className="block text-slate-700 mb-2">Initial Stock Quantity</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
          )}

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
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
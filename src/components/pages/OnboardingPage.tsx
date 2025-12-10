'use client';

import { useState } from 'react';
import { TrendingUp, Building2, DollarSign, Briefcase, ArrowRight, Check } from 'lucide-react';

interface OnboardingPageProps {
  onComplete: (businessName: string) => void;
}

export function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [businessType, setBusinessType] = useState('');

  const handleComplete = () => {
    if (businessName && currency && businessType) {
      onComplete(businessName);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
            <TrendingUp className="w-8 h-8 text-green" />
          </div>
          <h1 className="text-slate-900 mb-2">Welcome to FinancePulse</h1>
          <p className="text-slate-600"> Let&apos;s set up your financial dashboard</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  step >= num
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                {step > num ? <Check className="w-5 h-5" /> : num}
              </div>
              {num < 3 && (
                <div
                  className={`w-12 h-1 rounded ${
                    step > num ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Onboarding Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          {step === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-slate-900">Business Information</h2>
                  <p className="text-slate-600">Tell us about your business</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-slate-700 mb-2">Business Name</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your business name"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-slate-900">Currency Settings</h2>
                  <p className="text-slate-600">Select your primary currency</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      currency === curr
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <p className="text-slate-900">{curr}</p>
                    <p className="text-slate-500">
                      {curr === 'USD' && 'US Dollar'}
                      {curr === 'EUR' && 'Euro'}
                      {curr === 'GBP' && 'British Pound'}
                      {curr === 'CAD' && 'Canadian Dollar'}
                      {curr === 'AUD' && 'Australian Dollar'}
                      {curr === 'JPY' && 'Japanese Yen'}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-slate-900">Business Type</h2>
                  <p className="text-slate-600">What type of business do you run?</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  'Retail & E-commerce',
                  'Professional Services',
                  'Manufacturing',
                  'Restaurant & Food Service',
                  'Technology & Software',
                  'Other',
                ].map((type) => (
                  <button
                    key={type}
                    onClick={() => setBusinessType(type)}
                    className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                      businessType === type
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <p className="text-slate-900">{type}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              className={`px-6 py-2 rounded-lg transition-colors ${
                step === 1
                  ? 'text-slate-400 cursor-not-allowed'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
              disabled={step === 1}
            >
              Back
            </button>

            <button
              onClick={() => {
                if (step < 3) {
                  setStep(step + 1);
                } else {
                  handleComplete();
                }
              }}
              disabled={
                (step === 1 && !businessName) ||
                (step === 2 && !currency) ||
                (step === 3 && !businessType)
              }
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <span>{step === 3 ? 'Get Started' : 'Continue'}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
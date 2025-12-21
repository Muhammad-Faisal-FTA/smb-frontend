'use client';

import { useState } from 'react';
import { DataCompletenessTracker } from '../input-data/DataCompletenessTracker';
import { BusinessProfileSection } from '../input-data/BusinessProfileSection';
import { RevenueSection } from '../input-data/RevenueSection';
import { ExpenseSection } from '../input-data/ExpenseSection';
import { AssetsLiabilitiesSection } from '../input-data/AssetsLiabilitiesSection';
import { CustomerReceivablesSection } from '../input-data/CustomerReceivablesSection';
import { VendorPayablesSection } from '../input-data/VendorPayablesSection';
import { TransactionSummarySection } from '../input-data/TransactionSummarySection';
import {FinancialHealthSection} from '../input-data/FinancialData'
import { PenSquare } from 'lucide-react';

export function InputDataPage() {
  const [sectionCompletion, setSectionCompletion] = useState({
    businessProfile: 0,
    FinancialHealthSection: 0,
    revenue: 0,
    expense: 0,
    assetsLiabilities: 0,
    customerReceivables: 0,
    vendorPayables: 0,
    transactionSummary: 0,
  });

  // const updateCompletion = (section: keyof typeof sectionCompletion, percentage: number) => {
  //   setSectionCompletion(prev => ({ ...prev, [section]: percentage }));
  // };

  const updateCompletion = (
    section: keyof typeof sectionCompletion,
    percentage: number
  ) => {
    setSectionCompletion((prev) => {
      // ✅ Only update if value changed
      if (prev[section] === percentage) {
        return prev; // Don't create new object
      }
      return { ...prev, [section]: percentage };
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Main Content */}
      <div className="flex-1 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <PenSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-slate-900 mb-1">Input Financial Data</h1>
            <p className="text-slate-600">
              Enter your business financial information for AI-powered
              forecasting and insights
            </p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6">
          <h3 className="text-slate-900 mb-2">Why Input Data?</h3>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            The more complete your financial data, the more accurate our AI
            forecasting becomes. Fill in as many sections as possible to unlock
            powerful insights, risk detection, and predictive analytics for your
            business.
          </p>
        </div>

        {/* Data Input Sections */}
        <BusinessProfileSection
          onCompletionChange={(pct) => updateCompletion("businessProfile", pct)}
        />
        <FinancialHealthSection
          onCompletionChange={(pct) =>
            updateCompletion("FinancialHealthSection", pct)
          }
        />
        <RevenueSection
          onCompletionChange={(pct) => updateCompletion("revenue", pct)}
        />
        <ExpenseSection
          onCompletionChange={(pct) => updateCompletion("expense", pct)}
        />
        <AssetsLiabilitiesSection
          onCompletionChange={(pct) =>
            updateCompletion("assetsLiabilities", pct)
          }
        />
        <CustomerReceivablesSection
          onCompletionChange={(pct) =>
            updateCompletion("customerReceivables", pct)
          }
        />
        <VendorPayablesSection
          onCompletionChange={(pct) => updateCompletion("vendorPayables", pct)}
        />
        {/* <TransactionSummarySection hide due to not in use
          onCompletionChange={(pct) =>
            updateCompletion("transactionSummary", pct)
          }
        /> */}
      </div>

      {/* Floating Sidebar */}
      <DataCompletenessTracker completion={sectionCompletion} />
    </div>
  );
}
'use client';

import { KPICard } from '../dashboard/KPICard';
import { RevenueExpenseChart } from '../dashboard/RevenueExpenseChart';
import { SpendingBreakdown } from '../dashboard/SpendingBreakdown';
import { CashflowChart } from '../dashboard/CashflowChart';
import { AIHealthSummary } from '../dashboard/AIHealthSummary';
import { AlertsWidget } from '../dashboard/AlertsWidget';
import { HealthScoreGauge } from '../dashboard/HealthScoreGauge';
import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  Wallet,
  PieChart,
  Droplets,
} from 'lucide-react';

export function MainDashboard() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 style={{ color: '#111827' }} className="mb-2">Financial Dashboard</h1>
        <p style={{ color: '#4B5563' }}>Real-time overview of your business financial health</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <KPICard
          title="Total Revenue"
          value="$124,580"
          change="+12.5%"
          trend="up"
          icon={DollarSign}
          status="good"
          period="vs last month"
        />
        <KPICard
          title="Total Expenses"
          value="$78,340"
          change="+8.2%"
          trend="up"
          icon={TrendingDown}
          status="moderate"
          period="vs last month"
        />
        <KPICard
          title="Net Profit"
          value="$46,240"
          change="+18.3%"
          trend="up"
          icon={TrendingUp}
          status="good"
          period="vs last month"
        />
        <KPICard
          title="Cashflow Trend"
          value="Positive"
          change="+$12,450"
          trend="up"
          icon={Wallet}
          status="good"
          period="this month"
        />
        <KPICard
          title="Profitability Ratio"
          value="37.1%"
          change="+2.4%"
          trend="up"
          icon={PieChart}
          status="good"
          period="vs last month"
        />
        <KPICard
          title="Liquidity Ratio"
          value="1.45"
          change="-0.12"
          trend="down"
          icon={Droplets}
          status="critical"
          period="vs last month"
        />
      </div>

      {/* Health Score, AI Summary & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div>
          <HealthScoreGauge />
        </div>
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <AIHealthSummary />
          <AlertsWidget />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <RevenueExpenseChart />
        </div>
        <div>
          <SpendingBreakdown />
        </div>
      </div>

      <div className="grid grid-cols-1">
        <CashflowChart />
      </div>
    </div>
  );
}

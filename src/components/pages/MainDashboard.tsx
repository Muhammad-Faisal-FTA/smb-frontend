/* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';

// import { KPICard } from '../dashboard/KPICard';
// import { RevenueExpenseChart } from '../dashboard/RevenueExpenseChart';
// // import { SpendingBreakdown } from '../dashboard/SpendingBreakdown';
// import { CashflowChart } from '../dashboard/CashflowChart';
// import { AIHealthSummary } from '../dashboard/AIHealthSummary';
// import { AlertsWidget } from '../dashboard/AlertsWidget';
// import { HealthScoreGauge } from '../dashboard/HealthScoreGauge';
// import {
//   DollarSign,
//   TrendingDown,
//   TrendingUp,
//   Wallet,
//   PieChart,
//   Droplets,
// } from 'lucide-react';

// export function MainDashboard() {
//   return (
//     <div className="space-y-4 sm:space-y-6">
//       {/* Header */}
//       <div>
//         <h1 style={{ color: '#111827' }} className="mb-2">Financial Dashboard</h1>
//         <p style={{ color: '#4B5563' }}>Real-time overview of your business financial health</p>
//       </div>

//       {/* KPI Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//         <KPICard
//           title="Total Revenue"
//           value="$124,580"
//           change="+12.5%"
//           trend="up"
//           icon={DollarSign}
//           status="good"
//           period="vs last month"
//         />
//         <KPICard
//           title="Total Expenses"
//           value="$78,340"
//           change="+8.2%"
//           trend="up"
//           icon={TrendingDown}
//           status="moderate"
//           period="vs last month"
//         />
//         <KPICard
//           title="Net Profit"
//           value="$46,240"
//           change="+18.3%"
//           trend="up"
//           icon={TrendingUp}
//           status="good"
//           period="vs last month"
//         />
//         <KPICard
//           title="Cashflow Trend"
//           value="Positive"
//           change="+$12,450"
//           trend="up"
//           icon={Wallet}
//           status="good"
//           period="this month"
//         />
//         <KPICard
//           title="Profitability Ratio"
//           value="37.1%"
//           change="+2.4%"
//           trend="up"
//           icon={PieChart}
//           status="good"
//           period="vs last month"
//         />
//         <KPICard
//           title="Liquidity Ratio"
//           value="1.45"
//           change="-0.12"
//           trend="down"
//           icon={Droplets}
//           status="critical"
//           period="vs last month"
//         />
//       </div>

//       {/* Health Score, AI Summary & Alerts */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
//         <div>
//           <HealthScoreGauge />
//         </div>
//         <div className="lg:col-span-2 space-y-4 sm:space-y-6">
//           <AIHealthSummary />
//           <AlertsWidget />
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">
//         <div className="lg:col-span-3">
//           <RevenueExpenseChart />
//         </div>
//         <div>
//           {/* <SpendingBreakdown /> */}
//         </div>
//       </div>

//       <div className="grid grid-cols-1">
//         <CashflowChart />
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";

import { KPICard } from "../dashboard/KPICard";
import { RevenueExpenseChart } from "../dashboard/RevenueExpenseChart";
import { CashflowChart } from "../dashboard/CashflowChart";
import { AIHealthSummary } from "../dashboard/AIHealthSummary";
import { AlertsWidget } from "../dashboard/AlertsWidget";
import { HealthScoreGauge } from "../dashboard/HealthScoreGauge";

import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  Wallet,
  PieChart,
  Droplets,
} from "lucide-react";
import { getApiResponseS } from "@/utils/ApiResponse";

const iconMap: Record<string, any> = {
  dollar: DollarSign,
  "trending-down": TrendingDown,
  "trending-up": TrendingUp,
  wallet: Wallet,
  "pie-chart": PieChart,
  droplet: Droplets,
};

type TrendType = "up" | "down";

interface KpiCardApi {
  id: string;
  icon: string;
  title: string;
  label: string;
  sublabel: string;
  change: string;
  trend: "increase" | "decrease";
  status?: "healthy" | "warning" | "critical";
}

interface DashboardApiResponse {
  cards: KpiCardApi[];
  chart: {
    month: string;
    revenue: number;
    expenses: number;
  }[];
}

export function MainDashboard() {
  const [data, setData] = useState<DashboardApiResponse | null>(null);

  const endPoint = "/dashboard/kpi";

useEffect(() => {
  const fetchDashboard = async () => {
    const token = localStorage.getItem("accessToken"); // adjust key name

    const res = await getApiResponseS(endPoint, token);
    const test = localStorage.setItem("userId", res.userId);
    console.log("Usert in dash board:", res);
    console.log("KPI : ", res)
    if (!res) {
      console.error("Dashboard KPI fetch failed", res.status);
      return;
    }

    // const json = await res.json();
    setData(res);
  };

  fetchDashboard();
}, []);


  if (!data) return null;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 style={{ color: "#111827" }} className="mb-2">
          Financial Dashboard
        </h1>
        <p style={{ color: "#4B5563" }}>
          Real-time overview of your business financial health
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {data.cards.map((card) => {
          const Icon = iconMap[card.icon];
          const trend: TrendType = card.trend === "increase" ? "up" : "down";

          const status =
            card.status === "healthy"
              ? "good"
              : card.trend === "increase"
              ? "good"
              : "critical";

          return (
            <KPICard
              key={card.id}
              title={card.label}
              value={card.title}
              change={card.change}
              trend={trend}
              icon={Icon}
              status={status}
              period={card.sublabel}
            />
          );
        })}
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6">
        <div className="lg:col-span-3">
          <RevenueExpenseChart data={data.chart} />
        </div>
      </div>

      <div className="grid grid-cols-1">
        <CashflowChart
          data={data?.chart?.map((item) => ({
            month: item.month,
            value: item.revenue - item.expenses,
          }))}
        />
      </div>
    </div>
  );
}

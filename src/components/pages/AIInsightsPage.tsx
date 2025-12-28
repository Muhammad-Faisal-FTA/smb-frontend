/* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';

// import { Sparkles, TrendingUp, TrendingDown, AlertTriangle, Target, DollarSign, Users, Brain } from 'lucide-react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

// const revenueForecast = [
//   { month: 'Jun', actual: 98000, forecast: null },
//   { month: 'Jul', actual: 105000, forecast: null },
//   { month: 'Aug', actual: 112000, forecast: null },
//   { month: 'Sep', actual: 108000, forecast: null },
//   { month: 'Oct', actual: 118000, forecast: null },
//   { month: 'Nov', actual: 124580, forecast: null },
//   { month: 'Dec', actual: null, forecast: 135000 },
//   { month: 'Jan', actual: null, forecast: 142000 },
//   { month: 'Feb', actual: null, forecast: 148000 },
// ];

// const expenseForecast = [
//   { month: 'Jun', actual: 72000, forecast: null },
//   { month: 'Jul', actual: 68000, forecast: null },
//   { month: 'Aug', actual: 75000, forecast: null },
//   { month: 'Sep', actual: 71000, forecast: null },
//   { month: 'Oct', actual: 76000, forecast: null },
//   { month: 'Nov', actual: 78340, forecast: null },
//   { month: 'Dec', actual: null, forecast: 82000 },
//   { month: 'Jan', actual: null, forecast: 85000 },
//   { month: 'Feb', actual: null, forecast: 87000 },
// ];

// const cashflowProjection = [
//   { month: 'Dec', low: 40000, expected: 53000, high: 65000 },
//   { month: 'Jan', low: 48000, expected: 57000, high: 72000 },
//   { month: 'Feb', low: 52000, expected: 61000, high: 78000 },
//   { month: 'Mar', low: 55000, expected: 68000, high: 85000 },
// ];

// const anomalies = [
//   {
//     id: 1,
//     date: '2024-11-18',
//     type: 'Expense Spike',
//     description: 'Marketing expenses 45% higher than average',
//     severity: 'high',
//     impact: '$8,200 above normal',
//   },
//   {
//     id: 2,
//     date: '2024-11-15',
//     type: 'Revenue Pattern Change',
//     description: 'Unusual spike in Premium Plan purchases',
//     severity: 'medium',
//     impact: '+$4,500 above forecast',
//   },
//   {
//     id: 3,
//     date: '2024-11-12',
//     type: 'Payment Delay',
//     description: 'Invoice payment received 15 days late',
//     severity: 'low',
//     impact: 'Temporary cashflow impact',
//   },
// ];

// export function AIInsightsPage() {
//   return (
//     <div className="space-y-4 sm:space-y-6">
//       {/* Header */}
//       <div className="flex items-start gap-3">
//         <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
//           <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
//         </div>
//         <div>
//           <h1 className="text-slate-900 mb-1">AI-Powered Insights</h1>
//           <p className="text-slate-600">Advanced forecasting and predictive analytics for your business</p>
//         </div>
//       </div>

//       {/* AI Summary Card */}
//       <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-4 sm:p-6 lg:p-8 text-white shadow-xl">
//         <div className="flex items-start gap-4 mb-6">
//           <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
//             <Brain className="w-7 h-7 text-white" />
//           </div>
//           <div className="flex-1">
//             <h2 className="text-white mb-2">Comprehensive Business Intelligence Report</h2>
//             <p className="text-blue-100 leading-relaxed">
//               Our AI has analyzed 6 months of financial data, identifying key trends and generating predictive models. 
//               Based on current patterns, your business is positioned for <strong>sustained growth</strong> with a projected 
//               15% revenue increase over the next quarter. However, expense management requires attention to maintain optimal profit margins.
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
//             <div className="flex items-center gap-2 mb-2">
//               <TrendingUp className="w-5 h-5 text-green-300" />
//               <p className="text-white">Growth Potential</p>
//             </div>
//             <p className="text-white">High</p>
//             <p className="text-blue-100">Based on revenue trajectory</p>
//           </div>

//           <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
//             <div className="flex items-center gap-2 mb-2">
//               <Target className="w-5 h-5 text-yellow-300" />
//               <p className="text-white">Risk Level</p>
//             </div>
//             <p className="text-white">Moderate</p>
//             <p className="text-blue-100">Monitor liquidity closely</p>
//           </div>

//           <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
//             <div className="flex items-center gap-2 mb-2">
//               <Sparkles className="w-5 h-5 text-blue-300" />
//               <p className="text-white">Confidence Score</p>
//             </div>
//             <p className="text-white">87%</p>
//             <p className="text-blue-100">Model accuracy rating</p>
//           </div>
//         </div>
//       </div>

//       {/* Forecasts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Revenue Forecast */}
//         <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
//           <div className="mb-6">
//             <h3 className="text-slate-900 mb-1">Revenue Forecast</h3>
//             <p className="text-slate-600">3-month projection based on historical trends</p>
//           </div>

//           <ResponsiveContainer width="100%" height={280}>
//             <AreaChart data={revenueForecast}>
//               <defs>
//                 <linearGradient id="actualRevenue" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
//                   <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
//                 </linearGradient>
//                 <linearGradient id="forecastRevenue" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
//                   <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
//               <XAxis dataKey="month" stroke="#64748b" />
//               <YAxis stroke="#64748b" />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: 'white',
//                   border: '1px solid #e2e8f0',
//                   borderRadius: '8px',
//                 }}
//               />
//               <Area
//                 type="monotone"
//                 dataKey="actual"
//                 stroke="#10b981"
//                 strokeWidth={3}
//                 fill="url(#actualRevenue)"
//               />
//               <Area
//                 type="monotone"
//                 dataKey="forecast"
//                 stroke="#3b82f6"
//                 strokeWidth={3}
//                 strokeDasharray="5 5"
//                 fill="url(#forecastRevenue)"
//               />
//             </AreaChart>
//           </ResponsiveContainer>

//           <div className="flex items-center gap-4 mt-4">
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//               <span className="text-slate-600">Actual</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
//               <span className="text-slate-600">Forecast</span>
//             </div>
//           </div>
//         </div>

//         {/* Expense Forecast */}
//         <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
//           <div className="mb-6">
//             <h3 className="text-slate-900 mb-1">Expense Forecast</h3>
//             <p className="text-slate-600">Predicted spending patterns and trends</p>
//           </div>

//           <ResponsiveContainer width="100%" height={280}>
//             <AreaChart data={expenseForecast}>
//               <defs>
//                 <linearGradient id="actualExpense" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
//                   <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
//                 </linearGradient>
//                 <linearGradient id="forecastExpense" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
//                   <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
//               <XAxis dataKey="month" stroke="#64748b" />
//               <YAxis stroke="#64748b" />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: 'white',
//                   border: '1px solid #e2e8f0',
//                   borderRadius: '8px',
//                 }}
//               />
//               <Area
//                 type="monotone"
//                 dataKey="actual"
//                 stroke="#ef4444"
//                 strokeWidth={3}
//                 fill="url(#actualExpense)"
//               />
//               <Area
//                 type="monotone"
//                 dataKey="forecast"
//                 stroke="#f59e0b"
//                 strokeWidth={3}
//                 strokeDasharray="5 5"
//                 fill="url(#forecastExpense)"
//               />
//             </AreaChart>
//           </ResponsiveContainer>

//           <div className="flex items-center gap-4 mt-4">
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//               <span className="text-slate-600">Actual</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
//               <span className="text-slate-600">Forecast</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Cashflow Projection */}
//       <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
//         <div className="mb-6">
//           <h3 className="text-slate-900 mb-1">Cashflow Projection</h3>
//           <p className="text-slate-600">Expected, optimistic, and pessimistic scenarios</p>
//         </div>

//         <ResponsiveContainer width="100%" height={280}>
//           <LineChart data={cashflowProjection}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
//             <XAxis dataKey="month" stroke="#64748b" />
//             <YAxis stroke="#64748b" />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: 'white',
//                 border: '1px solid #e2e8f0',
//                 borderRadius: '8px',
//               }}
//             />
//             <Line
//               type="monotone"
//               dataKey="low"
//               stroke="#ef4444"
//               strokeWidth={2}
//               strokeDasharray="5 5"
//               dot={{ fill: '#ef4444', r: 4 }}
//             />
//             <Line
//               type="monotone"
//               dataKey="expected"
//               stroke="#10b981"
//               strokeWidth={3}
//               dot={{ fill: '#10b981', r: 5 }}
//             />
//             <Line
//               type="monotone"
//               dataKey="high"
//               stroke="#3b82f6"
//               strokeWidth={2}
//               strokeDasharray="5 5"
//               dot={{ fill: '#3b82f6', r: 4 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>

//         <div className="flex items-center gap-4 mt-4">
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//             <span className="text-slate-600">Pessimistic</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//             <span className="text-slate-600">Expected</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
//             <span className="text-slate-600">Optimistic</span>
//           </div>
//         </div>
//       </div>

//       {/* Detected Anomalies */}
//       <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
//         <div className="flex items-center gap-2 mb-6">
//           <AlertTriangle className="w-5 h-5 text-orange-600" />
//           <h3 className="text-slate-900">Detected Anomalies</h3>
//         </div>

//         <div className="space-y-3">
//           {anomalies.map((anomaly) => {
//             const severityColors = {
//               high: 'border-red-200 bg-red-50',
//               medium: 'border-orange-200 bg-orange-50',
//               low: 'border-blue-200 bg-blue-50',
//             };

//             const severityIcons = {
//               high: 'text-red-600',
//               medium: 'text-orange-600',
//               low: 'text-blue-600',
//             };

//             return (
//               <div
//                 key={anomaly.id}
//                 className={`p-4 rounded-lg border ${severityColors[anomaly.severity as keyof typeof severityColors]}`}
//               >
//                 <div className="flex items-start justify-between mb-2">
//                   <div className="flex items-center gap-2">
//                     <AlertTriangle className={`w-5 h-5 ${severityIcons[anomaly.severity as keyof typeof severityIcons]}`} />
//                     <p className="text-slate-900">{anomaly.type}</p>
//                   </div>
//                   <span className="text-slate-500">{anomaly.date}</span>
//                 </div>
//                 <p className="text-slate-700 mb-1">{anomaly.description}</p>
//                 <p className="text-slate-600">Impact: {anomaly.impact}</p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { getApiResponseS } from "@/utils/ApiResponse";

/* ---------------- TYPES ---------------- */

interface ForecastRow {
  month: number; // T+1, T+2, T+3 (AI-relative)
  revenue: number;
  expenses: number;
  cashScenarios: {
    pessimistic: number;
    expected: number;
    optimistic: number;
  };
}

interface ChartPoint {
  timestamp: number;
  value?: number;
  low?: number;
  expected?: number;
  high?: number;
}
const getTicks = (data: { timestamp: number }[]) =>
  data.map((d) => d.timestamp);

/* ---------------- COMPONENT ---------------- */

export function AIInsightsPage() {
  const [revenueForecast, setRevenueForecast] = useState<ChartPoint[]>([]);
  const [expenseForecast, setExpenseForecast] = useState<ChartPoint[]>([]);
  const [cashflowProjection, setCashflowProjection] = useState<ChartPoint[]>(
    []
  );

  const endPoint = "/ai/forecast";

  /* ---------------- FETCH AI FORECAST ---------------- */

  useEffect(() => {
    const fetchForecast = async () => {
      const token = localStorage.getItem("accessToken");
      const res = await getApiResponseS(endPoint, token);

      const forecast: ForecastRow[] = res?.threeMonthForecast || [];

      const now = new Date();

      const toTimestamp = (offset: number) =>
        new Date(now.getFullYear(), now.getMonth() + offset, 1).getTime();

      /* ---------------- MAP REVENUE ---------------- */
      setRevenueForecast(
        forecast.map((item) => ({
          timestamp: toTimestamp(item.month),
          value: item.revenue,
        }))
      );

      /* ---------------- MAP EXPENSES ---------------- */
      setExpenseForecast(
        forecast.map((item) => ({
          timestamp: toTimestamp(item.month),
          value: item.expenses,
        }))
      );

      /* ---------------- MAP CASHFLOW ---------------- */
      setCashflowProjection(
        forecast.map((item) => ({
          timestamp: toTimestamp(item.month),
          low: item.cashScenarios.pessimistic,
          expected: item.cashScenarios.expected,
          high: item.cashScenarios.optimistic,
        }))
      );
    };

    fetchForecast();
  }, []);

  /* ---------------- FORMATTERS ---------------- */

  const monthFormatter = (value: number) =>
    new Date(value).toLocaleString("default", {
      month: "short",
      year: "2-digit",
    });

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-slate-900">AI-Powered Insights</h1>
          <p className="text-slate-600">
            Forward-looking forecasts powered by AI
          </p>
        </div>
      </div>

      {/* Revenue & Expense Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue */}
        <div className="bg-white rounded-xl p-6 border">
          <h3 className="mb-4">Revenue Forecast</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueForecast}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                type="number"
                scale="time"
                ticks={revenueForecast.map((d) => d.timestamp)}
                tickFormatter={monthFormatter}
              />
              <YAxis />
              <Tooltip labelFormatter={(v) => monthFormatter(v as number)} />
              <Area
                dataKey="value"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Expenses */}
        <div className="bg-white rounded-xl p-6 border">
          <h3 className="mb-4">Expense Forecast</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={expenseForecast}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                type="number"
                scale="time"
                ticks={expenseForecast.map((d) => d.timestamp)}
                tickFormatter={monthFormatter}
              />
              <YAxis />
              <Tooltip labelFormatter={(v) => monthFormatter(v as number)} />
              <Area
                dataKey="value"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cashflow Projection */}
      <div className="bg-white rounded-xl p-6 border">
        <h3 className="mb-4">Cashflow Projection</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={cashflowProjection}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              type="number"
              scale="time"
              ticks={cashflowProjection.map((d) => d.timestamp)}
              tickFormatter={monthFormatter}
            />
            <YAxis />
            <Tooltip labelFormatter={(v) => monthFormatter(v as number)} />
            <Line dataKey="low" stroke="#ef4444" strokeDasharray="5 5" />
            <Line dataKey="expected" stroke="#10b981" strokeWidth={3} />
            <Line dataKey="high" stroke="#3b82f6" strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

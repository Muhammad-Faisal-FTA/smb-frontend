// 'use client';

// import { Sparkles, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

// export function AIHealthSummary() {
//   return (
//     <div 
//       className="rounded-xl p-4 sm:p-6 text-white shadow-xl"
//       style={{ background: 'linear-gradient(to bottom right, #4F46E5, #6366F1)' }}
//     >
//       <div className="flex items-center gap-3 mb-4">
//         <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
//           <Sparkles className="w-6 h-6 text-white" />
//         </div>
//         <div>
//           <h2 className="text-white mb-1">AI Financial Health Summary</h2>
//           <p style={{ color: '#E0E7FF' }}>Generated analysis based on your latest data</p>
//         </div>
//       </div>

//       <div className="rounded-lg p-4 mb-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
//         <p className="text-white leading-relaxed">
//           Your business is showing <strong>strong performance</strong> this month with revenue growth outpacing expenses. 
//           However, your liquidity ratio has decreased slightly, suggesting you should maintain closer monitoring of cash reserves. 
//           Revenue forecasts indicate a potential <strong>15% growth</strong> over the next quarter based on current trends.
//         </p>
//       </div>

//       <div className="space-y-3">
//         <div className="flex items-start gap-3">
//           <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#6EE7B7' }} />
//           <div>
//             <p className="text-white">Revenue growth is exceeding industry benchmarks</p>
//             <p style={{ color: '#E0E7FF' }}>+12.5% above average for your sector</p>
//           </div>
//         </div>

//         <div className="flex items-start gap-3">
//           <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#FCD34D' }} />
//           <div>
//             <p className="text-white">Marketing expenses increased 45% this month</p>
//             <p style={{ color: '#E0E7FF' }}>Consider reviewing ROI on recent campaigns</p>
//           </div>
//         </div>

//         <div className="flex items-start gap-3">
//           <TrendingUp className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#7DD3FC' }} />
//           <div>
//             <p className="text-white">Optimal time to invest in growth initiatives</p>
//             <p style={{ color: '#E0E7FF' }}>Based on cash flow projections and runway analysis</p>
//           </div>
//         </div>
//       </div>

//       <button 
//         className="w-full mt-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
//         style={{ backgroundColor: '#FFFFFF', color: '#4F46E5' }}
//         onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#EEF2FF'}
//         onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
//       >
//         <Sparkles className="w-4 h-4" />
//         <span>View Detailed AI Insights</span>
//       </button>
//     </div>
//   );
// }


// "use client";

// import { useState, useEffect } from "react";
// import { Sparkles, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

// interface Insight {
//   type: "positive" | "recommendation";
//   message: string;
// }

// interface Summary {
//   revenue: number;
//   expenses: number;
//   netProfit: number;
//   avgCash: number;
//   avgPayables: number;
//   healthSignal: string;
// }

// interface AIResponse {
//   periodType: string;
//   summary: Summary;
//   insights: {
//     period: string;
//     overallHealth: string;
//     insights: Insight[];
//   };
// }

// interface AIHealthSummaryProps {
//   data: AIResponse;
// }

// export function AIHealthSummary({ data }: AIHealthSummaryProps) {
//   const { summary, insights } = data;

//   const getIconColor = (type: string) => {
//     switch (type) {
//       case "positive":
//         return "#6EE7B7";
//       case "recommendation":
//         return "#FCD34D";
//       default:
//         return "#7DD3FC";
//     }
//   };

//   const getIcon = (type: string) => {
//     switch (type) {
//       case "positive":
//         return (
//           <CheckCircle
//             className="w-5 h-5 mt-0.5 flex-shrink-0"
//             style={{ color: getIconColor(type) }}
//           />
//         );
//       case "recommendation":
//         return (
//           <AlertTriangle
//             className="w-5 h-5 mt-0.5 flex-shrink-0"
//             style={{ color: getIconColor(type) }}
//           />
//         );
//       default:
//         return (
//           <TrendingUp
//             className="w-5 h-5 mt-0.5 flex-shrink-0"
//             style={{ color: getIconColor(type) }}
//           />
//         );
//     }
//   };

//   return (
//     <div
//       className="rounded-xl p-4 sm:p-6 text-white shadow-xl"
//       style={{
//         background: "linear-gradient(to bottom right, #4F46E5, #6366F1)",
//       }}
//     >
//       <div className="flex items-center gap-3 mb-4">
//         <div
//           className="w-10 h-10 rounded-lg flex items-center justify-center"
//           style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
//         >
//           <Sparkles className="w-6 h-6 text-white" />
//         </div>
//         <div>
//           <h2 className="text-white mb-1">AI Financial Health Summary</h2>
//           <p style={{ color: "#E0E7FF" }}>
//             Generated analysis for period: <strong>{data.periodType}</strong>
//           </p>
//         </div>
//       </div>

//       <div
//         className="rounded-lg p-4 mb-4"
//         style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
//       >
//         <p className="text-white leading-relaxed">
//           Revenue: <strong>${summary.revenue.toLocaleString()}</strong> <br />
//           Expenses: <strong>${summary.expenses.toLocaleString()}</strong> <br />
//           Net Profit: <strong>
//             ${summary.netProfit.toLocaleString()}
//           </strong>{" "}
//           <br />
//           Average Cash: <strong>
//             ${summary.avgCash.toLocaleString()}
//           </strong>{" "}
//           <br />
//           Average Payables:{" "}
//           <strong>${summary.avgPayables.toLocaleString()}</strong> <br />
//           Health Signal: <strong>{summary.healthSignal}</strong>
//         </p>
//       </div>

//       <div className="space-y-3">
//         {insights.insights.map((insight, idx) => (
//           <div key={idx} className="flex items-start gap-3">
//             {getIcon(insight.type)}
//             <div>
//               <p className="text-white">{insight.message}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <button
//         className="w-full mt-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
//         style={{ backgroundColor: "#FFFFFF", color: "#4F46E5" }}
//         onMouseEnter={(e) =>
//           (e.currentTarget.style.backgroundColor = "#EEF2FF")
//         }
//         onMouseLeave={(e) =>
//           (e.currentTarget.style.backgroundColor = "#FFFFFF")
//         }
//       >
//         <Sparkles className="w-4 h-4" />
//         <span>View Detailed AI Insights</span>
//       </button>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { Sparkles, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { postApiResponseS } from '@/utils/ApiResponse';

interface Insight {
  type: 'positive' | 'recommendation';
  message: string;
}

interface Summary {
  revenue: number;
  expenses: number;
  netProfit: number;
  avgCash: number;
  avgPayables: number;
  healthSignal: string;
}

interface AIResponse {
  periodType: string;
  summary: Summary;
  insights: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [x: string]: any;
    period: string;
    overallHealth: string;
    insights: Insight[];
  };
}

export function AIHealthSummary() {
  const [data, setData] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
 const endpoint = "/ai/insights";

 const token = localStorage.getItem("accessToken");
 
  const handleFetchInsights = async () => {
    setLoading(true);
    const result = await postApiResponseS(
      endpoint,
      {
        periodType: "daily",
        startDate: "2024-12-26",
        endDate: "2024-12-26",
      },
      token
    );
    setData(result);
    console.log("Daily insights:",data);
    // try {
    //   const response = await fetch("http://localhost:5000/api/v1/ai/insights", {
    //     method: "POST",
    //     Authorization: `Bearer ${token}`,
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       periodType: "daily",
    //       startDate: "2024-12-26",
    //       endDate: "2024-12-26",
    //     }),
    //   });
    //   const result = await response.json();
    //   if (result.success) {
    //     setData(result.data);
    //   }
    // } catch (error) {
    //   console.error('Failed to fetch AI insights:', error);
    // } finally {
    //   setLoading(false);
    // }
  };

  const renderIcon = (type: string) => {
    switch(type) {
      case 'positive':
        return <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#6EE7B7' }} />;
      case 'recommendation':
        return <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#FCD34D' }} />;
      default:
        return <TrendingUp className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#7DD3FC' }} />;
    }
  };

  // Format numbers nicely
  const formatCurrency = (num: number) => `$${num.toLocaleString()}`;

  return (
    <div
      className="rounded-xl p-4 sm:p-6 text-white shadow-xl"
      style={{
        background: "linear-gradient(to bottom right, #4F46E5, #6366F1)",
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
        >
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-white mb-1">AI Financial Health Summary</h2>
          <p style={{ color: "#E0E7FF" }}>
            Generated analysis based on your latest data
          </p>
        </div>
      </div>

      <div
        className="rounded-lg p-4 mb-4"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
      >
        {data ? (
          <div className="text-white leading-relaxed space-y-4">
            {data.insights?.summary && (
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-sm text-gray-200">{data.insights.summary}</p>
              </div>
            )}
            
            {/* Accounting Section */}
            <div>
              <p>
                Revenue: <strong>{formatCurrency(data.summary.revenue)}</strong>
              </p>
              <p>
                Expenses:{" "}
                <strong>{formatCurrency(data.summary.expenses)}</strong>
              </p>
              <p>
                Net Profit:{" "}
                <strong>{formatCurrency(data.summary.netProfit)}</strong>
              </p>
              <p>
                Average Cash:{" "}
                <strong>{formatCurrency(data.summary.avgCash)}</strong>
              </p>
              <p>
                Average Payables:{" "}
                <strong>{formatCurrency(data.summary.avgPayables)}</strong>
              </p>
              <p>
                Health Signal: <strong>{data.summary.healthSignal}</strong>
              </p>
            </div>

            {/* AI Summary Section */}
          </div>
        ) : (
          <p className="text-white leading-relaxed">
            Your business is showing <strong>strong performance</strong> this
            month with revenue growth outpacing expenses. However, your
            liquidity ratio has decreased slightly, suggesting closer monitoring
            of cash reserves. Revenue forecasts indicate a potential{" "}
            <strong>15% growth</strong> over the next quarter based on current
            trends.
          </p>
        )}
      </div>

      <div className="space-y-3">
        {" "}
        {/*paid service*/}
        {data ? (
          data.insights.insights.map((insight, idx) => (
            <div key={idx} className="flex items-start gap-3">
              {renderIcon(insight.type)}
              <div>
                <p className="text-white">{insight.message}</p>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="flex items-start gap-3">
              <CheckCircle
                className="w-5 h-5 mt-0.5 flex-shrink-0"
                style={{ color: "#6EE7B7" }}
              />
              <div>
                <p className="text-white">
                  Revenue growth is exceeding industry benchmarks
                </p>
                <p style={{ color: "#E0E7FF" }}>
                  +12.5% above average for your sector
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle
                className="w-5 h-5 mt-0.5 flex-shrink-0"
                style={{ color: "#FCD34D" }}
              />
              <div>
                <p className="text-white">
                  Marketing expenses increased 45% this month
                </p>
                <p style={{ color: "#E0E7FF" }}>
                  Consider reviewing ROI on recent campaigns
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <TrendingUp
                className="w-5 h-5 mt-0.5 flex-shrink-0"
                style={{ color: "#7DD3FC" }}
              />
              <div>
                <p className="text-white">
                  Optimal time to invest in growth initiatives
                </p>
                <p style={{ color: "#E0E7FF" }}>
                  Based on cash flow projections and runway analysis
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <button
        className="w-full mt-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        style={{ backgroundColor: "#FFFFFF", color: "#4F46E5" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#EEF2FF")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#FFFFFF")
        }
        onClick={handleFetchInsights}
      >
        <Sparkles className="w-4 h-4" />
        <span>{loading ? "Loading..." : "View Detailed AI Insights"}</span>
      </button>
    </div>
  );
}

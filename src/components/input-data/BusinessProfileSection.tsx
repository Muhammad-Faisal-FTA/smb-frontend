// 'use client';

// import { useState, useEffect } from 'react';
// import { Building2, ChevronDown, ChevronUp, Save, RotateCcw, CheckCircle } from 'lucide-react';
// import { patchApiResponseS } from "@/utils/ApiResponse";


// interface BusinessProfileSectionProps {
//   onCompletionChange: (percentage: number) => void;
// }

// export function BusinessProfileSection({ onCompletionChange }: BusinessProfileSectionProps) {
//   const [isExpanded, setIsExpanded] = useState(true);
//   const [formData, setFormData] = useState({
//     businessName: "",
//     sector: "",
//     businessAge: "",
//     employees: "",
//     region: "",
//     annualRevenue: "",
//     operatingModel: "",
//     adminEmail: '',
//   });

//   const totalFields = Object.keys(formData).length;

//   useEffect(() => {
//     const filledFields = Object.values(formData).filter(val => val !== '').length;
//     const percentage = Math.round((filledFields / totalFields) * 100);
//     onCompletionChange(percentage);
//   }, [formData, totalFields]);

//   const buildPayload = () => ({
//     businessName: formData.businessName.trim(),
//     businessType: formData.sector,
//     businessAge: Number(formData.businessAge),
//     employeesRange: formData.employees,
//     region: formData.region.trim(),
//     annualRevenueBracket: formData.annualRevenue,
//     operatingModel: formData.operatingModel,
//     adminEmail: formData.adminEmail,
//   });

//   const endpoint = `/profile/business-profile`;

//   const handleChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");

//       if (!token) {
//         alert("Authentication required. Please login again.");
//         return;
//       }

//       const payload = buildPayload();
//       console.log("this is Patch data: ",endpoint, payload, token)

//       const result = await patchApiResponseS(endpoint, payload, token);
//       console.log(result)
//       alert("Business profile saved successfully!");
//     } catch (error) {
//       console.log("Save failed:", error);
      
//       alert("Failed to save business profile.");
//     }
//   };


//   const handleReset = () => {
//     setFormData({
//       businessName: "",
//       sector: "",
//       businessAge: "",
//       employees: "",
//       region: "",
//       annualRevenue: "",
//       operatingModel: "",
//       adminEmail: '',
//     });
//   };

//   const handleValidate = () => {
//     const missing = Object.entries(formData)
//       .filter(([_, value]) => !value)
//       .map(([key]) => key);
    
//     if (missing.length === 0) {
//       alert('✓ All fields are complete!');
//     } else {
//       alert(`Missing fields: ${missing.join(', ')}`);
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
//       {/* Header */}
//       <button
//         onClick={() => setIsExpanded(!isExpanded)}
//         className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors"
//       >
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//             <Building2 className="w-5 h-5 text-blue-600" />
//           </div>
//           <div className="text-left">
//             <h3 className="text-slate-900">Business Profile</h3>
//             <p className="text-slate-600">
//               Core business information and details
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-4">
//           <span className="text-slate-600">
//             {Object.values(formData).filter((v) => v).length}/{totalFields}{" "}
//             complete
//           </span>
//           {isExpanded ? (
//             <ChevronUp className="w-5 h-5 text-slate-400" />
//           ) : (
//             <ChevronDown className="w-5 h-5 text-slate-400" />
//           )}
//         </div>
//       </button>

//       {/* Content */}
//       {isExpanded && (
//         <div className="p-6 pt-0 border-t border-slate-200">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-slate-700 mb-2">
//                 Business Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={formData.businessName}
//                 onChange={(e) => handleChange("businessName", e.target.value)}
//                 className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter business name"
//               />
//             </div>

//             <div>
//               <label className="block text-slate-700 mb-2">
//                 Sector <span className="text-red-500">*</span>
//               </label>
//               <select
//                 value={formData.sector}
//                 onChange={(e) => handleChange("sector", e.target.value)}
//                 className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select sector</option>
//                 <option value="retail">Retail & E-commerce</option>
//                 <option value="services">Professional Services</option>
//                 <option value="manufacturing">Manufacturing</option>
//                 <option value="food">Restaurant & Food Service</option>
//                 <option value="tech">Technology & Software</option>
//                 <option value="healthcare">Healthcare</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-slate-700 mb-2">
//                 Business Age (Years) <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="number"
//                 value={formData.businessAge}
//                 onChange={(e) => handleChange("businessAge", e.target.value)}
//                 className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="0"
//                 min="0"
//               />
//             </div>

//             <div>
//               <label className="block text-slate-700 mb-2">
//                 Number of Employees <span className="text-red-500">*</span>
//               </label>
//               <select
//                 value={formData.employees}
//                 onChange={(e) => handleChange("employees", e.target.value)}
//                 className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select range</option>
//                 <option value="1-5">1-5</option>
//                 <option value="6-10">6-10</option>
//                 <option value="11-25">11-25</option>
//                 <option value="26-50">26-50</option>
//                 <option value="51-100">51-100</option>
//                 <option value="100+">100+</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-slate-700 mb-2">
//                 Region <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={formData.region}
//                 onChange={(e) => handleChange("region", e.target.value)}
//                 className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="e.g., California, USA"
//               />
//             </div>

//             <div>
//               <label className="block text-slate-700 mb-2">
//                 Annual Revenue Bracket <span className="text-red-500">*</span>
//               </label>
//               <select
//                 value={formData.annualRevenue}
//                 onChange={(e) => handleChange("annualRevenue", e.target.value)}
//                 className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select bracket</option>
//                 <option value="0-100k">$0 - $100K</option>
//                 <option value="100k-500k">$100K - $500K</option>
//                 <option value="500k-1m">$500K - $1M</option>
//                 <option value="1m-5m">$1M - $5M</option>
//                 <option value="5m-10m">$5M - $10M</option>
//                 <option value="10m+">$10M+</option>
//               </select>
//             </div>

//             <div className="md:col-span-2">
//               <label className="block text-slate-700 mb-2">
//                 Operating Model <span className="text-red-500">*</span>
//               </label>
//               <select
//                 value={formData.operatingModel}
//                 onChange={(e) => handleChange("operatingModel", e.target.value)}
//                 className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">Select model</option>
//                 <option value="b2b">B2B (Business to Business)</option>
//                 <option value="b2c">B2C (Business to Consumer)</option>
//                 <option value="b2b2c">B2B2C (Hybrid)</option>
//                 <option value="marketplace">Marketplace</option>
//                 <option value="subscription">Subscription-based</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-slate-700 mb-2">
//                 Admin Email <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="email"
//                 value={formData.adminEmail}
//                 onChange={(e) => handleChange("adminEmail", e.target.value)}
//                 className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="e.g admin@company.com | ad@comp.pk.com | ad@comp.gmail.com"
//               />
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-slate-200">
//             <button
//               onClick={handleReset}
//               className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2"
//             >
//               <RotateCcw className="w-4 h-4" />
//               <span>Reset</span>
//             </button>
//             <button
//               onClick={handleValidate}
//               className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
//             >
//               <CheckCircle className="w-4 h-4" />
//               <span>Validate</span>
//             </button>
//             <button
//               onClick={handleSave}
//               className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
//             >
//               <Save className="w-4 h-4" />
//               <span>Save</span>
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import {
  Building2,
  ChevronDown,
  ChevronUp,
  Save,
  RotateCcw,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { getApiResponseS, patchApiResponseS } from "@/utils/ApiResponse";

interface BusinessProfileSectionProps {
  onCompletionChange: (percentage: number) => void;
}

export function BusinessProfileSection({
  onCompletionChange,
}: BusinessProfileSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    businessName: "",
    sector: "",
    businessAge: "",
    employees: "",
    region: "",
    annualRevenue: "",
    operatingModel: "",
    adminEmail: "",
  });

  const totalFields = Object.keys(formData).length;
  const endpointg = `/profile/business-profile-data`;
  const endpointp = `/profile/business-profile`;

  // Fetch existing data on component mount
  useEffect(() => {
    const fetchBusinessProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          setMessage("Authentication required. Please login again.");
          setLoading(false);
          return;
        }

        const response =getApiResponseS(endpointg, token);

        if (!response) {
          throw new Error("Failed to fetch business profile");
        }

        const result = await response;

        // Map API response to form data
        setFormData({
          businessName: result.businessName || "",
          sector: result.businessType || "",
          businessAge: result.businessAge?.toString() || "",
          employees: result.employeesRange || "",
          region: result.region || "",
          annualRevenue: result.annualRevenueBracket || "",
          operatingModel: result.operatingModel || "",
          adminEmail: result.adminEmail || "",
        });

        setMessage("Profile loaded successfully");
      } catch (error) {
        console.error("Error fetching business profile:", error);
        setMessage("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessProfile();
  }, []);

  // Calculate completion percentage
  useEffect(() => {
    const filledFields = Object.values(formData).filter(
      (val) => val !== ""
    ).length;
    const percentage = Math.round((filledFields / totalFields) * 100);
    onCompletionChange(percentage);
  }, [formData, totalFields, onCompletionChange]);

  const buildPayload = () => ({
    businessName: formData.businessName.trim(),
    businessType: formData.sector,
    businessAge: Number(formData.businessAge),
    employeesRange: formData.employees,
    region: formData.region.trim(),
    annualRevenueBracket: formData.annualRevenue,
    operatingModel: formData.operatingModel,
    adminEmail: formData.adminEmail,
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setMessage(""); // Clear message on change
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setMessage("Authentication required. Please login again.");
        return;
      }

      const payload = buildPayload();
      console.log("PATCH data:", endpointp, payload);

      const result = await patchApiResponseS(endpointp, payload, token);
      console.log(result);
      setMessage("✅ Business profile saved successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Save failed:", error);
      setMessage("❌ Failed to save business profile.");
    }
  };

  const handleReset = () => {
    setFormData({
      businessName: "",
      sector: "",
      businessAge: "",
      employees: "",
      region: "",
      annualRevenue: "",
      operatingModel: "",
      adminEmail: "",
    });
    setMessage("Form reset");
  };

  const handleValidate = () => {
    const missing = Object.entries(formData)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missing.length === 0) {
      setMessage("✓ All fields are complete!");
    } else {
      setMessage(`Missing fields: ${missing.join(", ")}`);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-center gap-3">
          <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          <span className="text-slate-600">Loading business profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-left">
            <h3 className="text-slate-900">Business Profile</h3>
            <p className="text-slate-600">
              Core business information and details
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-600">
            {Object.values(formData).filter((v) => v).length}/{totalFields}{" "}
            complete
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="p-6 pt-0 border-t border-slate-200">
          {/* Message Display */}
          {message && (
            <div
              className={`mb-4 p-3 rounded-lg ${
                message.includes("✅") || message.includes("✓")
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : message.includes("❌")
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-blue-50 text-blue-700 border border-blue-200"
              }`}
            >
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 mb-2">
                Business Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => handleChange("businessName", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter business name"
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-2">
                Sector <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.sector}
                onChange={(e) => handleChange("sector", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select sector</option>
                <option value="retail">Retail & E-commerce</option>
                <option value="services">Professional Services</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="food">Restaurant & Food Service</option>
                <option value="tech">Technology & Software</option>
                <option value="healthcare">Healthcare</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 mb-2">
                Business Age (Years) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.businessAge}
                onChange={(e) => handleChange("businessAge", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                min="0"
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-2">
                Number of Employees <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.employees}
                onChange={(e) => handleChange("employees", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select range</option>
                <option value="1-5">1-5</option>
                <option value="6-10">6-10</option>
                <option value="11-25">11-25</option>
                <option value="26-50">26-50</option>
                <option value="51-100">51-100</option>
                <option value="100+">100+</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 mb-2">
                Region <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.region}
                onChange={(e) => handleChange("region", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., California, USA"
              />
            </div>

            <div>
              <label className="block text-slate-700 mb-2">
                Annual Revenue Bracket <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.annualRevenue}
                onChange={(e) => handleChange("annualRevenue", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select bracket</option>
                <option value="0-100k">$0 - $100K</option>
                <option value="100k-500k">$100K - $500K</option>
                <option value="500k-1m">$500K - $1M</option>
                <option value="1m-5m">$1M - $5M</option>
                <option value="5m-10m">$5M - $10M</option>
                <option value="10m+">$10M+</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-700 mb-2">
                Operating Model <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.operatingModel}
                onChange={(e) => handleChange("operatingModel", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select model</option>
                <option value="b2b">B2B (Business to Business)</option>
                <option value="b2c">B2C (Business to Consumer)</option>
                <option value="b2b2c">B2B2C (Hybrid)</option>
                <option value="marketplace">Marketplace</option>
                <option value="subscription">Subscription-based</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 mb-2">
                Admin Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.adminEmail}
                onChange={(e) => handleChange("adminEmail", e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g admin@company.com"
              />
            </div>
          </div>

          {/* Action Buttons */}
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
              onClick={handleSave}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
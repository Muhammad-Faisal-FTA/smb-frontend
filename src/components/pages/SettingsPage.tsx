'use client';

import { useState } from 'react';
import { Building2, DollarSign, Tag, Bell, User, Save } from 'lucide-react';

interface SettingsPageProps {
  businessName: string;
}

export function SettingsPage({ businessName }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState('business');

  const tabs = [
    { id: 'business', label: 'Business Profile', icon: Building2 },
    { id: 'currency', label: 'Currency & Regional', icon: DollarSign },
    { id: 'categories', label: 'Categories', icon: Tag },
    { id: 'alerts', label: 'Alert Preferences', icon: Bell },
    { id: 'profile', label: 'User Profile', icon: User },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900 mb-2">Settings</h1>
        <p className="text-slate-600">Manage your account and application preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-2 overflow-x-auto">
            <div className="flex lg:flex-col gap-1 min-w-max lg:min-w-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="hidden lg:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6">
            {activeTab === 'business' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-slate-900 mb-4">Business Profile</h3>
                  <p className="text-slate-600 mb-6">
                    Update your business information and details
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-700 mb-2">Business Name</label>
                    <input
                      type="text"
                      defaultValue={businessName}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-2">Business Type</label>
                    <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Retail & E-commerce</option>
                      <option>Professional Services</option>
                      <option>Manufacturing</option>
                      <option>Restaurant & Food Service</option>
                      <option>Technology & Software</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 mb-2">Tax ID / EIN</label>
                      <input
                        type="text"
                        placeholder="XX-XXXXXXX"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-2">Registration Number</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-2">Business Address</label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your business address"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-200">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'currency' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-slate-900 mb-4">Currency & Regional Settings</h3>
                  <p className="text-slate-600 mb-6">
                    Configure currency, timezone, and formatting preferences
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-700 mb-2">Primary Currency</label>
                    <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>USD - US Dollar</option>
                      <option>EUR - Euro</option>
                      <option>GBP - British Pound</option>
                      <option>CAD - Canadian Dollar</option>
                      <option>AUD - Australian Dollar</option>
                      <option>JPY - Japanese Yen</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-2">Timezone</label>
                    <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>UTC-08:00 (Pacific Time)</option>
                      <option>UTC-05:00 (Eastern Time)</option>
                      <option>UTC+00:00 (GMT)</option>
                      <option>UTC+01:00 (Central European Time)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-2">Date Format</label>
                    <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>MM/DD/YYYY (US)</option>
                      <option>DD/MM/YYYY (EU)</option>
                      <option>YYYY-MM-DD (ISO)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-2">Number Format</label>
                    <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>1,234.56 (US)</option>
                      <option>1.234,56 (EU)</option>
                      <option>1 234.56 (International)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-2">Fiscal Year Start</label>
                    <select className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>January</option>
                      <option>April</option>
                      <option>July</option>
                      <option>October</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-200">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'categories' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-slate-900 mb-4">Category Management</h3>
                  <p className="text-slate-600 mb-6">
                    Customize income and expense categories
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-slate-900 mb-3">Income Categories</h4>
                    <div className="space-y-2">
                      {['Revenue', 'Sales', 'Services', 'Other Income'].map((cat) => (
                        <div key={cat} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                          <span className="text-slate-900">{cat}</span>
                          <button className="text-red-600 hover:text-red-700">Remove</button>
                        </div>
                      ))}
                    </div>
                    <button className="mt-3 text-blue-600 hover:text-blue-700 px-3 py-2 rounded hover:bg-blue-50 transition-colors">
                      + Add Income Category
                    </button>
                  </div>

                  <div>
                    <h4 className="text-slate-900 mb-3">Expense Categories</h4>
                    <div className="space-y-2">
                      {['Payroll', 'Marketing', 'Operations', 'Software', 'Rent', 'Utilities'].map((cat) => (
                        <div key={cat} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                          <span className="text-slate-900">{cat}</span>
                          <button className="text-red-600 hover:text-red-700">Remove</button>
                        </div>
                      ))}
                    </div>
                    <button className="mt-3 text-blue-600 hover:text-blue-700 px-3 py-2 rounded hover:bg-blue-50 transition-colors">
                      + Add Expense Category
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'alerts' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-slate-900 mb-4">Alert Preferences</h3>
                  <p className="text-slate-600 mb-6">
                    Configure when and how you receive notifications
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Low Liquidity Warnings', description: 'Alert when cash balance is low', enabled: true },
                    { label: 'Expense Spike Detection', description: 'Notify about unusual spending', enabled: true },
                    { label: 'Revenue Anomalies', description: 'Alert on abnormal revenue patterns', enabled: true },
                    { label: 'Profit Margin Decline', description: 'Warn when margins decrease', enabled: false },
                    { label: 'Invoice Reminders', description: 'Upcoming payment due dates', enabled: true },
                    { label: 'Monthly Reports', description: 'Automatic report generation alerts', enabled: true },
                    { label: 'Backup Notifications', description: 'Backup completion status', enabled: false },
                  ].map((alert, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div>
                        <p className="text-slate-900">{alert.label}</p>
                        <p className="text-slate-600">{alert.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={alert.enabled}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-200">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    <span>Save Preferences</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-slate-900 mb-4">User Profile</h3>
                  <p className="text-slate-600 mb-6">
                    Manage your personal account information
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl">
                      {(businessName || 'MB').charAt(0)}
                    </div>
                    <div>
                      <button className="text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                        Change Photo
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 mb-2">First Name</label>
                      <input
                        type="text"
                        defaultValue="John"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        defaultValue="Doe"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      defaultValue="john@example.com"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-2">Role</label>
                    <input
                      type="text"
                      defaultValue="Owner"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50"
                      disabled
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="text-slate-900 mb-4">Change Password</h4>
                    <div className="space-y-3">
                      <input
                        type="password"
                        placeholder="Current Password"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-200">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
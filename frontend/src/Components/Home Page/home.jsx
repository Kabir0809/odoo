import React from "react";
import { useNavigate } from "react-router-dom";

const LocalGovernmentDashboard = () => {
  const navigate = useNavigate();

  const recentPolicies = [
    { id: 1, title: "Municipal Waste Management Update", date: "Feb 25, 2025", category: "Environment" },
    { id: 2, title: "Local Business Tax Incentive Program", date: "Feb 20, 2025", category: "Economy" },
    { id: 3, title: "Public Park Renovation Guidelines", date: "Feb 15, 2025", category: "Urban Development" },
    { id: 4, title: "Neighborhood Traffic Calming Measures", date: "Feb 10, 2025", category: "Transportation" },
    { id: 5, title: "Community Solar Energy Initiative", date: "Feb 5, 2025", category: "Sustainability" },
  ];

  const handlePolicyClick = (id) => {
    navigate(`/policy/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 001 1h5v-2H5V8.35l5-2.857 5 2.857v5.65h-2v2h5a1 1 0 001-1V8a1 1 0 00-.504-.868l-7-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-bold text-xl">CivicBridge</span>
              </div>
              <div className="ml-10 flex items-center space-x-4">
                <button className="px-3 py-2 rounded-md text-sm font-medium bg-gray-900">Dashboard</button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 p-6">
        {/* Upcoming Elections & Local Government Meetings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Upcoming Elections</h2>
            <div className="text-center">
              <div className="text-4xl font-bold">125 Days</div>
              <div className="text-sm text-gray-600">Until Local Elections 2025</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Local Government Meetings</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">City Council Meeting</div>
                  <div className="text-sm text-gray-600">March 15, 2025</div>
                </div>
                <button className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm0 2h8v12H6V4z" />
                  </svg>
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Budget Planning Session</div>
                  <div className="text-sm text-gray-600">March 20, 2025</div>
                </div>
                <button className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm0 2h8v12H6V4z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Policies */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recent Policies</h2>
          <div className="space-y-2">
            {recentPolicies.map((policy) => (
              <div key={policy.id} className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer" onClick={() => handlePolicyClick(policy.id)}>
                <div className="font-medium">{policy.title}</div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{policy.date}</span>
                  <span className="text-blue-600">{policy.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LocalGovernmentDashboard;

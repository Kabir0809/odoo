import React, { useState } from "react";
import AuthCard from "../Login/login";

const LocalGovernmentDashboard = () => {
  const [activePage, setActivePage] = useState("home");
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  // const openAuthCard = () => {
  //   setShowAuth(true);
  // };

  const closeAuthCard = () => {
    setShowAuth(false);
  };
  const recentPolicies = [
    {
      id: 1,
      title: "Municipal Waste Management Update",
      date: "February 25, 2025",
      category: "Environment",
    },
    {
      id: 2,
      title: "Local Business Tax Incentive Program",
      date: "February 20, 2025",
      category: "Economy",
    },
    {
      id: 3,
      title: "Public Park Renovation Guidelines",
      date: "February 15, 2025",
      category: "Urban Development",
    },
    {
      id: 4,
      title: "Neighborhood Traffic Calming Measures",
      date: "February 10, 2025",
      category: "Transportation",
    },
    {
      id: 5,
      title: "Community Solar Energy Initiative",
      date: "February 5, 2025",
      category: "Sustainability",
    },
  ];

  // Policy detail sample content
  const policyDetails = {
    1: {
      title: "Municipal Waste Management Update",
      date: "February 25, 2025",
      category: "Environment",
      summary:
        "Updates to the municipal waste collection schedule and recycling program requirements.",
      details:
        "This policy introduces bi-weekly collection of recyclable materials, establishes new guidelines for separating waste types, and introduces penalties for non-compliance with recycling regulations. The goal is to increase our community's recycling rate from 35% to 60% by the end of 2025.",
      stakeholders: [
        "Residents",
        "Waste Management Department",
        "Environmental Committee",
      ],
      timeline: "Implementation begins April 1, 2025",
    },
    2: {
      title: "Local Business Tax Incentive Program",
      date: "February 20, 2025",
      category: "Economy",
      summary:
        "New tax benefits for businesses hiring local residents and investing in underserved areas.",
      details:
        "Qualifying businesses can receive up to 25% reduction in local taxes when hiring at least 50% of employees from within city limits. Additional incentives available for businesses establishing operations in designated development zones.",
      stakeholders: [
        "Local Business Owners",
        "Chamber of Commerce",
        "Economic Development Office",
      ],
      timeline: "Applications open March 15, 2025",
    },
    3: {
      title: "Public Park Renovation Guidelines",
      date: "February 15, 2025",
      category: "Urban Development",
      summary:
        "Standards for upcoming renovations to public parks and recreational spaces.",
      details:
        "All renovations must include accessible pathways, sustainable landscaping, and modernized play equipment. Community input is required at multiple stages of the design process.",
      stakeholders: [
        "Parks Department",
        "Accessibility Advocates",
        "Neighborhood Associations",
      ],
      timeline: "Effective immediately for all new renovation projects",
    },
    4: {
      title: "Neighborhood Traffic Calming Measures",
      date: "February 10, 2025",
      category: "Transportation",
      summary:
        "New regulations allowing for speed bumps, traffic circles, and other traffic calming devices.",
      details:
        "Neighborhoods can now petition for traffic calming measures with signatures from 60% of affected residents. The city will cover 75% of installation costs, with the remaining 25% funded through neighborhood association contributions.",
      stakeholders: [
        "Traffic Department",
        "Neighborhood Associations",
        "Emergency Services",
      ],
      timeline: "Petition process opens March 1, 2025",
    },
    5: {
      title: "Community Solar Energy Initiative",
      date: "February 5, 2025",
      category: "Sustainability",
      summary:
        "Program to facilitate community investment in shared solar energy projects.",
      details:
        "Residents can now invest in community solar projects with minimum contributions of $100. Returns will be provided as credits on electricity bills. The city will match contributions up to a total of $500,000.",
      stakeholders: [
        "Sustainability Office",
        "Utility Companies",
        "Resident Investors",
      ],
      timeline: "First project investment period: March 1-31, 2025",
    },
  };

  const handlePolicyClick = (id) => {
    setSelectedPolicy(id);
    setActivePage("policyDetail");
  };

  const renderHome = () => (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Upcoming Elections</h2>
          <div className="text-center">
            <div className="text-4xl font-bold">125 Days</div>
            <div className="text-sm text-gray-600">
              Until Local Elections 2025
            </div>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm0 2h8v12H6V4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recent Policies</h2>
          <div className="space-y-2">
            {recentPolicies.map((policy) => (
              <div
                key={policy.id}
                className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                onClick={() => handlePolicyClick(policy.id)}
              >
                <div className="font-medium">{policy.title}</div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{policy.date}</span>
                  <span className="text-blue-600">{policy.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Active Complaints</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
              <span>Road Maintenance #2234</span>
            </div>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
              In Progress
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              <span>Street Light #2235</span>
            </div>
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
              Under Review
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Community Discussions</h2>
        <div className="border border-gray-200 rounded-md p-4">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
            <span className="font-medium">Sarah Johnson</span>
          </div>
          <p className="mb-2">Thoughts on the new park development project?</p>
          <div className="flex text-sm text-gray-600">
            <span className="flex items-center mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              24 replies
            </span>
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              12 likes
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Civic Engagement Points</h2>
        <div className="text-center mb-4">
          <div className="text-4xl font-bold">750 Points</div>
          <div className="text-sm text-gray-600">Current Balance</div>
        </div>
        <div className="flex justify-between">
          <button className="bg-gray-800 text-white px-4 py-2 rounded">
            Redeem Points
          </button>
          <button className="border border-gray-800 text-gray-800 px-4 py-2 rounded">
            View History
          </button>
        </div>
      </div> */}
    </div>
  );

  const renderPolicyDetail = () => {
    const policy = policyDetails[selectedPolicy];

    return (
      <div className="max-w-3xl mx-auto p-6">
        <button
          onClick={() => setActivePage("home")}
          className="flex items-center text-blue-600 mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Dashboard
        </button>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-6">
            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded mb-2">
              {policy.category}
            </span>
            <h1 className="text-2xl font-bold">{policy.title}</h1>
            <p className="text-gray-600">Published on {policy.date}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <p className="text-gray-800">{policy.summary}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            <p className="text-gray-800">{policy.details}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Stakeholders</h2>
            <ul className="list-disc list-inside">
              {policy.stakeholders.map((stakeholder, index) => (
                <li key={index} className="text-gray-800">
                  {stakeholder}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Timeline</h2>
            <p className="text-gray-800">{policy.timeline}</p>
          </div>

          <div className="flex justify-between">
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Download PDF
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>
    );
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
                <button
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activePage === "home" ? "bg-gray-900" : "hover:bg-gray-700"
                  }`}
                  onClick={() => setActivePage("home")}
                >
                  Dashboard
                </button>
                <button className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                  Policies
                </button>
                <button className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                  Services
                </button>
                <button className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                  Community
                </button>
              </div>
            </div>
            {/* <div className="flex items-center">
              <div className="mr-4 flex items-center">
                <span className="text-sm mr-2">John Doe</span>
                <div className="h-8 w-8 rounded-full bg-gray-500"></div>
              </div>
              <button
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium"
                onClick={openAuthCard}
              >
                Login
              </button>
            </div> */}
          </div>
        </div>
      </nav>
      {/* Authentication Card */}
      {showAuth && <AuthCard onClose={closeAuthCard} />}
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6">
        {activePage === "home" && renderHome()}
        {activePage === "policyDetail" && renderPolicyDetail()}
      </main>
    </div>
  );
};

export default LocalGovernmentDashboard;

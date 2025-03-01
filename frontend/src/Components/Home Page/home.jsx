import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatbotButton from "../ChatBot/ChatbotButton";
import ChatbotUI from "../ChatBot/ChatbotUI";

const LocalGovernmentDashboard = () => {
  const navigate = useNavigate();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [hasSeenGuide, setHasSeenGuide] = useState(false);

  useEffect(() => {
    // Check if user has seen the guide before
    const guideSeen = localStorage.getItem("policyGuideShown");
    if (guideSeen) {
      setShowGuide(true);
      setHasSeenGuide(false);
    }
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const dismissGuide = () => {
    setShowGuide(false);
    localStorage.setItem("policyGuideShown", "true");
    setHasSeenGuide(true);
  };

  const reOpenGuide = () => {
    setShowGuide(true);
  };

  const recentPolicies = [
    { id: 1, title: "Budget 2025", date: "Feb 25, 2025", category: "Environment", pdfUrl: "/pdfs/1.pdf" },
    { id: 2, title: "Local Business Tax Incentive Program", date: "Feb 20, 2025", category: "Economy", pdfUrl: "/pdfs/2.pdf" },
    { id: 3, title: "Public Park Renovation Guidelines", date: "Feb 15, 2025", category: "Urban Development", pdfUrl: "/pdfs/3.pdf" },
    { id: 4, title: "Neighborhood Traffic Calming Measures", date: "Feb 10, 2025", category: "Transportation", pdfUrl: "/pdfs/budget1.pdf" },
    { id: 5, title: "Community Solar Energy Initiative", date: "Feb 5, 2025", category: "Sustainability", pdfUrl: "/pdfs/solar_initiative.pdf" },
  ];

  const handlePolicyClick = (policy) => {
    console.log("Navigating to Policy Details with PDF:", policy.pdfUrl);
    navigate(`/policy/${policy.id}`, { state: { pdfUrl: policy.pdfUrl } });
  };

  const handleComplaintClick = () => {
    navigate(`/complaints`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
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
              <div className="ml-10 flex items-center space-x-2">
                <button className="px-3 py-2 rounded-md text-sm font-medium bg-gray-900">Dashboard</button>
              </div>
              <div className="ml-10 flex items-center space-x-2">
                <button className="px-3 py-2 rounded-md text-sm font-medium bg-gray-900" onClick={() => handleComplaintClick()}>Complaints</button>
              </div>
            </div>
            <div className="flex items-center">
              {hasSeenGuide && (
                <button 
                  onClick={reOpenGuide} 
                  className="flex items-center text-sm text-white bg-blue-600 px-3 py-2 rounded mr-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                  Help Guide
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 p-6">
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
                {/* <button className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm0 2h8v12H6V4z" />
                  </svg>
                </button> */}
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">Budget Planning Session</div>
                  <div className="text-sm text-gray-600">March 20, 2025</div>
                </div>
                {/* <button className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm0 2h8v12H6V4z" />
                  </svg>
                </button> */}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 bg-white rounded-lg shadow p-6 relative">
          <h2 className="text-xl font-bold mb-4">Recent Policies</h2>
          {showGuide && (
            <div className="absolute -top-12 right-6 bg-amber-100 p-4 border-2 border-amber-300 rounded-lg shadow-lg w-72 z-10">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-bold text-amber-800">Policy Documents</h3>
                  <p className="text-sm text-amber-700">Click on any policy in this list to view its summary and access the full document.</p>
                </div>
                <button 
                  className="ml-auto -mt-1 text-amber-500 hover:text-amber-700" 
                  onClick={dismissGuide}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="mt-1 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          )}
          <div className="space-y-2">
            {recentPolicies.map((policy) => (
              <div
                key={policy.id}
                className={`p-3 border rounded-md hover:bg-gray-50 cursor-pointer relative ${showGuide && policy.id === 1 ? "border-amber-500 border-2 shadow-md" : "border-gray-200"}`}
                onClick={() => handlePolicyClick(policy)}
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
        <ChatbotButton onClick={toggleChat} isOpen={isChatOpen} />
        <ChatbotUI isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </main>
    </div>
  );
};

export default LocalGovernmentDashboard;
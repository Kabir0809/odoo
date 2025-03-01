/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MyComplaintsPage = () => {
  const navigate = useNavigate();
  
  // Mock user complaints data
  const [userComplaints, setUserComplaints] = useState([
    {
      id: "2025-001",
      title: "Road Pothole",
      category: "Road Maintenance",
      location: "123 Main St",
      reportedDate: "Jan 15, 2025",
      status: "In Progress",
      progressStage: 2,
      description: "Large pothole causing damage to vehicles",
      images: ["/api/placeholder/100/100"],
    },
    {
      id: "2025-002",
      title: "Street Light",
      category: "Street Lighting",
      location: "456 Oak Ave",
      reportedDate: "Jan 10, 2025",
      status: "Resolved",
      progressStage: 3,
      description: "Street light flickering and sometimes not working at night",
      images: ["/api/placeholder/100/100", "/api/placeholder/100/100"],
    },
    {
      id: "2025-003",
      title: "Garbage Collection",
      category: "Waste Management",
      location: "789 Pine Rd",
      reportedDate: "Jan 5, 2025",
      status: "Under Review",
      progressStage: 1,
      description: "Garbage not collected for two consecutive weeks",
      images: [],
    },
  ]);

  // Render progress bar for complaint status
  const renderProgressBar = (stage) => {
    const stages = ["Submitted", "Under Review", "In Progress", "Resolved"];
    
    return (
      <div className="flex items-center w-full mt-2">
        {stages.map((label, index) => (
          <div key={index} className="flex-1 relative">
            <div className={`h-2 ${index <= stage ? "bg-blue-600" : "bg-gray-300"}`}></div>
            <div className="text-xs mt-1 text-center">{label}</div>
          </div>
        ))}
      </div>
    );
  };

  // Filter complaints by status
  const [statusFilter, setStatusFilter] = useState("All");
  
  const filteredComplaints = statusFilter === "All" 
    ? userComplaints 
    : userComplaints.filter(complaint => complaint.status === statusFilter);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center" onClick={() => navigate("/")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 mr-2 cursor-pointer"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 001 1h5v-2H5V8.35l5-2.857 5 2.857v5.65h-2v2h5a1 1 0 001-1V8a1 1 0 00-.504-.868l-7-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-bold text-xl cursor-pointer">CivicBridge</span>
              </div>
              <div className="ml-10 flex items-center space-x-2">
                <button 
                  className="px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => navigate("/")}
                >
                  Dashboard
                </button>
              </div>
              <div className="ml-10 flex items-center space-x-2">
                <button 
                  className="px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => navigate("/complaints")}
                >
                  Complaints
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <button className="px-3 py-2 rounded-md text-sm font-medium bg-gray-900">
                My Complaints
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">My Complaints</h1>
            
            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Filter by status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="All">All</option>
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>

          {/* Complaints List */}
          {filteredComplaints.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No complaints found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-lg">
                        {complaint.title} #{complaint.id}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {complaint.category} • Reported on {complaint.reportedDate}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Location: {complaint.location}
                      </p>
                    </div>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      complaint.status === 'Resolved' 
                        ? 'bg-green-100 text-green-800' 
                        : complaint.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : complaint.status === 'Under Review'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {complaint.status}
                    </span>
                  </div>
                  
                  {/* Status Progress Bar */}
                  {renderProgressBar(complaint.progressStage)}
                  
                  {/* Description */}
                  <div className="mt-4">
                    <p className="text-sm">{complaint.description}</p>
                  </div>
                  
                  {/* Images */}
                  {complaint.images.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Attached Images:</p>
                      <div className="flex space-x-2">
                        {complaint.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Complaint ${index}`}
                            className="h-16 w-16 object-cover rounded"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Response from authorities (if available) */}
                  {complaint.status !== 'Submitted' && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm font-medium">Response from authorities:</p>
                      <p className="text-sm mt-1">
                        {complaint.status === 'Resolved' 
                          ? "Your issue has been resolved. The maintenance team has fixed the reported problem. Thank you for your patience."
                          : complaint.status === 'In Progress'
                          ? "Our team is currently working on this issue. We expect to resolve it within 3-5 business days."
                          : "Your complaint has been received and is under review by our team. We will update you once we begin working on it."}
                      </p>
                    </div>
                  )}
                  
                  {/* Actions */}
                  <div className="mt-4 flex justify-end space-x-2">
                    {complaint.status !== 'Resolved' && (
                      <button className="text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                        Update
                      </button>
                    )}
                    <button className="text-sm px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                      Contact
                    </button>
                    {complaint.status === 'Resolved' && (
                      <button className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Reopen
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyComplaintsPage;
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  "Road Maintenance", "Street Lighting", "Waste Management", "Public Safety",
  "Water Supply", "Drainage Issues", "Public Property Damage", "Noise Complaint", "Other"
];

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa",
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const cities = {
  "Maharashtra": ["Mumbai", "Pune", "Nashik"],
  "Delhi": ["New Delhi"],
  "Karnataka": ["Bangalore", "Mysore", "Hubli"]
};

const statusColors = {
  "Reported": "bg-yellow-100 text-yellow-800",
  "Reviewed": "bg-blue-100 text-blue-800",
  "In Progress": "bg-purple-100 text-purple-800",
  "Completed": "bg-green-100 text-green-800"
};

const GovernmentDashboard = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [stateFilter, setStateFilter] = useState("All States");
  const [cityFilter, setCityFilter] = useState("All Cities");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState({});
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [stats, setStats] = useState({
    total: 0,
    reported: 0,
    inProgress: 0,
    completed: 0
  });

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    // Update statistics based on all complaints
    if (complaints.length > 0) {
      setStats({
        total: complaints.length,
        reported: complaints.filter(c => c.status === "Reported").length,
        inProgress: complaints.filter(c => c.status === "In Progress").length,
        completed: complaints.filter(c => c.status === "Completed").length
      });
    }
  }, [complaints]);

  // Hide notification after 5 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ show: false, message: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/complaints");
      const data = await response.json();
      setComplaints(Array.isArray(data) ? data : data.complaints || []);
    } catch (error) {
      console.error("Error fetching complaints:", error);
      setComplaints([]);
      showNotification("Failed to fetch complaints", "error");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    if (!id) {
      console.error("Error: complaint ID is undefined!");
      showNotification("Error: Complaint ID is missing!", "error");
      return;
    }
  
    console.log("Updating status for:", id, "to", status);
    
    try {
      const response = await fetch(`http://localhost:3000/api/complaints/${id}/status`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ status }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server Response:", errorData);
        throw new Error(errorData.message || "Failed to update status");
      }
  
      fetchComplaints();
      showNotification(`Complaint marked as ${status}`, "success");
    } catch (error) {
      console.error("Error updating status:", error);
      showNotification(error.message || "Failed to update status", "error");
    }
  };
  
  

  const showNotification = (message, type) => {
    setNotification({
      show: true,
      message,
      type
    });
  };

  const filteredComplaints = complaints.filter((complaint) =>
    (stateFilter === "All States" || complaint.state === stateFilter) &&
    (cityFilter === "All Cities" || complaint.city === cityFilter) &&
    (categoryFilter === "All Categories" || complaint.category === categoryFilter) &&
    (statusFilter === "All Status" || complaint.status === statusFilter)
  );

  const handleStateChange = (e) => {
    setStateFilter(e.target.value);
    setCityFilter("All Cities"); // Reset city when state changes
  };

  const clearFilters = () => {
    setStateFilter("All States");
    setCityFilter("All Cities");
    setCategoryFilter("All Categories");
    setStatusFilter("All Status");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 max-w-md px-4 py-3 rounded-lg shadow-lg z-50 ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          <div className="flex items-center">
            {notification.type === 'success' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
            <p>{notification.message}</p>
            <button 
              onClick={() => setNotification({ show: false, message: '', type: '' })}
              className="ml-auto text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <nav className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>CivicBridge</span>
          </div>
          <button 
            onClick={() => { localStorage.removeItem("token"); navigate("/login"); }} 
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition flex items-center space-x-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Government Dashboard</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
            <p className="text-sm text-gray-500">Total Complaints</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
            <p className="text-sm text-gray-500">Reported</p>
            <p className="text-2xl font-bold">{stats.reported}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
            <p className="text-sm text-gray-500">In Progress</p>
            <p className="text-2xl font-bold">{stats.inProgress}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-2xl font-bold">{stats.completed}</p>
          </div>
        </div>
        
        {/* Filters */}
        {/* <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Filter Complaints</h2>
            <button 
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear Filters
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <select 
                value={stateFilter} 
                onChange={handleStateChange} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>All States</option>
                {states.map((state) => <option key={state}>{state}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <select 
                value={cityFilter} 
                onChange={(e) => setCityFilter(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={stateFilter === "All States"}
              >
                <option>All Cities</option>
                {(cities[stateFilter] || []).map((city) => <option key={city}>{city}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>All Categories</option>
                {categories.map((category) => <option key={category}>{category}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>All Status</option>
                <option>Reported</option>
                <option>Reviewed</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>
        </div> */}

        {/* Complaints List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700">
              Complaints {filteredComplaints.length > 0 && `(${filteredComplaints.length})`}
            </h2>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredComplaints.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredComplaints.map((complaint) => (
                <div key={complaint._id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{complaint.title}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[complaint.status] || "bg-gray-100 text-gray-800"}`}>
                      {complaint.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{complaint.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {complaint.state}, {complaint.city}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {complaint.category}
                    </span>
                    {complaint.priority && (
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-red-100 text-red-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        {complaint.priority} Priority
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    {complaint.status !== "In Progress" && (
                      <button
                        onClick={() => updateStatus(complaint._id, "In Progress")}
                        disabled={updateLoading[complaint._id]}
                        className={`inline-flex items-center ${
                          updateLoading[complaint._id] 
                            ? "bg-blue-300 cursor-not-allowed" 
                            : "bg-blue-500 hover:bg-blue-600"
                        } text-white px-3 py-1.5 rounded transition text-sm`}
                      >
                        {updateLoading[complaint._id] ? (
                          <>
                            <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                            Updating...
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Mark In Progress
                          </>
                        )}
                      </button>
                    )}
                    {complaint.status !== "Completed" && (
                      <button
                        onClick={() => updateStatus(complaint._id, "Completed")}
                        disabled={updateLoading[complaint._id]}
                        className={`inline-flex items-center ${
                          updateLoading[complaint._id] 
                            ? "bg-green-300 cursor-not-allowed" 
                            : "bg-green-500 hover:bg-green-600"
                        } text-white px-3 py-1.5 rounded transition text-sm`}
                      >
                        {updateLoading[complaint._id] ? (
                          <>
                            <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                            Updating...
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Mark Completed
                          </>
                        )}
                      </button>
                    )}
                    <button className="inline-flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1.5 rounded transition text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 mb-2">No complaints found.</p>
              <p className="text-gray-400 text-sm">Try adjusting your filters or check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GovernmentDashboard;
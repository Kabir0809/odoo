import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ComplaintsPage = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [recentComplaints, setRecentComplaints] = useState([
    {
      id: "2025-001",
      title: "Road Pothole",
      reportedDate: "Jan 15, 2025",
      status: "In Progress",
      progressStage: 2, // 0: Submitted, 1: Under Review, 2: In Progress, 3: Resolved
    },
    {
      id: "2025-002",
      title: "Street Light",
      reportedDate: "Jan 10, 2025",
      status: "Resolved",
      progressStage: 3,
    },
  ]);

  const categories = [
    "Road Maintenance",
    "Street Lighting",
    "Waste Management",
    "Public Safety",
    "Water Supply",
    "Drainage Issues",
    "Public Property Damage",
    "Noise Complaint",
    "Other"
  ];

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Create preview URLs for the selected images
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setImages([...images, ...newImages]);
  };

  // Remove uploaded image
  const removeImage = (index) => {
    const updatedImages = [...images];
    URL.revokeObjectURL(updatedImages[index].preview);
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  // Submit complaint
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!category || !description) {
      alert("Please select a category and provide a description");
      return;
    }
    
    // Generate a unique ID for the new complaint
    const date = new Date();
    const year = date.getFullYear();
    const newId = `${year}-${(recentComplaints.length + 1).toString().padStart(3, '0')}`;
    
    // Create new complaint object
    const newComplaint = {
      id: newId,
      title: category,
      reportedDate: `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`,
      status: "Submitted",
      progressStage: 0,
    };
    
    // In a real application, you would upload the images and send the data to a backend
    // For this example, we'll just update the local state
    setRecentComplaints([newComplaint, ...recentComplaints]);
    
    // Reset form fields
    setLocation("");
    setCategory("");
    setDescription("");
    setImages([]);
    
    alert("Complaint submitted successfully!");
  };

  // Navigate to My Complaints page
  const navigateToMyComplaints = () => {
    navigate("/my-complaints");
  };

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
                <button className="px-3 py-2 rounded-md text-sm font-medium bg-gray-900">
                  Complaints
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <button 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                onClick={navigateToMyComplaints}
              >
                My Complaints
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Submit New Complaint Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Report an Issue</h2>
            <form onSubmit={handleSubmit}>
              {/* Location */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Location</label>
                <div className="relative bg-gray-200 rounded-lg h-40 flex items-center justify-center">
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  {location && (
                    <div className="absolute bottom-2 left-2 right-2 bg-white bg-opacity-75 p-2 rounded">
                      <p className="text-sm truncate">{location}</p>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  className="mt-2 text-blue-600 font-medium text-sm"
                  onClick={getCurrentLocation}
                >
                  Use current location
                </button>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter address manually"
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              {/* Issue Category */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Issue Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upload Images */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Upload Images</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="mt-1 text-sm text-gray-500">Drag and drop or click to upload</p>
                  </label>
                </div>
                
                {/* Preview uploaded images */}
                {images.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image.preview}
                          alt={`Preview ${index}`}
                          className="h-20 w-full object-cover rounded"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                          onClick={() => removeImage(index)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Issue Description */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Issue Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue in detail..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="4"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700"
              >
                Submit Report
              </button>
            </form>
          </div>

          {/* Recent Complaints */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Recent Complaints</h2>
            <div className="space-y-4">
              {recentComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">
                        {complaint.title} #{complaint.id}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Reported on {complaint.reportedDate}
                      </p>
                    </div>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      complaint.status === 'Resolved' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {complaint.status}
                    </span>
                  </div>
                  {renderProgressBar(complaint.progressStage)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComplaintsPage;
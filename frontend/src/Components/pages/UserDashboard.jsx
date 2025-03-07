/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [wordCount, setWordCount] = useState(0);
  const [complaints, setComplaints] = useState([]);
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("http://localhost:3000/complaints");
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };
    fetchComplaints();
  }, []);
  
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
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
  // Indian States and Cities
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",    
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ];
  
  const cities = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur" , "Nellore"],
    "Arunachal Pradesh": ["Itanagar"],
    "Assam": ["Dispur", "Guwahati", "Silchar"],
    "Bihar": ["Patna", "Gaya", "Muzaffarpur"],
    "Chhattisgarh": ["Raipur", "Bilaspur", "Dhanbad"],
    "Goa": ["Panaji"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara" , "Rajkot"],
    "Haryana": ["Chandigarh", "Panipat", "Faridabad"],
    "Himachal Pradesh": ["Shimla"],
    "Jammu and Kashmir": ["Srinagar", "Jammu"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior"],
    "Maharashtra": ["Mumbai", "Pune", "Nashik"],
    "Manipur": ["Imphal"],
    "Meghalaya": ["Shillong"],
    "Mizoram": ["Aizawl"],
    "Nagaland": ["Kohima"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela"],
    "Punjab": ["Chandigarh", "Ludhiana", "Amritsar"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur"],
    "Sikkim": ["Gangtok"],
    "Tamil Nadu": ["Chennai", "Madurai", "Coimbatore"],
    "Telangana": ["Hyderabad", "Secunderabad", "Warangal"],
    "Tripura": ["Agartala"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur"]
  }
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

  // Handle description change and update word count
  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    setDescription(text);
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    setWordCount(words);
  };

  // Handle state change
  const handleStateChange = (e) => {
    setState(e.target.value);
    setCity("");
  };

  // Submit complaint
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!category || !description) {
      alert("Please select a category and provide a description");
      return;
    }
  
    const userId = localStorage.getItem("userId") || "defaultUser"; // Replace with actual user authentication
    const date = new Date();
    const complaintData = {
      id: `CMP-${Date.now()}`,
      userId,  // Attach user ID
      title: category,
      category,
      location,
      reportedDate: `${date.toLocaleString("default", { month: "short" })} ${date.getDate()}, ${date.getFullYear()}`,
      status: "Submitted",
      progressStage: 0,
      description,
      images: images.map((img) => img.preview),
    };
  
    try {
      const response = await fetch("http://localhost:3000/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(complaintData),
      });
  
      if (response.ok) {
        alert("Complaint submitted successfully!");
        setComplaints([complaintData, ...complaints]); 
  
        setState("");
        setCity("");
        setLocation("");
        setCategory("");
        setDescription("");
        setImages([]);
        setWordCount(0);
      } else {
        alert("Error submitting complaint");
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
    }
  };
  

  // Fetch complaints from backend when component mounts
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("http://localhost:3000/complaints");
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };
    fetchComplaints();
  }, []);

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
    <div className="flex justify-between h-16 items-center">
      
      {/* Left Section - Logo & Navigation */}
      <div className="flex items-center">
        <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate("/")}>
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

        {/* Navigation Links */}
        <div className="ml-10 flex items-center space-x-2">
          <button className="px-3 py-2 rounded-md text-sm font-medium" onClick={() => navigate("/")}>
            Dashboard
          </button>
          <button className="px-3 py-2 rounded-md text-sm font-medium bg-gray-900">
            Complaints
          </button>
        </div>
      </div>

      {/* Right Section - Logout Button (Extreme Right) & My Complaints */}
      <div className="ml-auto flex items-center space-x-4">
        <button 
          className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
          onClick={navigateToMyComplaints}
        >
          My Complaints
        </button>
        <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded">
          Logout
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
              {/* Upload Photos */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Upload Photos</label>
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
                    <p className="mt-1 text-sm text-gray-500">Drag and drop your photos here or</p>
                    <div className="mt-2">
                      <span className="bg-blue-600 text-white py-1 px-4 rounded-md text-sm">Browse Files</span>
                    </div>
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

              {/* State and City Selection */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">State</label>
                  <select
                    value={state}
                    onChange={handleStateChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select State</option>
                    {states.map((stateName) => (
                      <option key={stateName} value={stateName}>
                        {stateName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    disabled={!state}
                  >
                    <option value="">Select City</option>
                    {state && cities[state] && cities[state].map((cityName) => (
                      <option key={cityName} value={cityName}>
                        {cityName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter specific location"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Issue Description */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="Describe the issue (max 200 words)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="4"
                ></textarea>
                <div className="text-xs text-gray-500 text-right mt-1">
                  {wordCount}/200 words
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Submit Report
              </button>
            </form>
          </div>

          {/* Recent Complaints */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Recent Complaints</h2>
            <div className="space-y-4">
              {complaints.map((complaint) => (
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

export default UserDashboard;